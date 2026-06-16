import { requireUserOrClient, unauthorized } from "../shared/auth";
import { json, getEffectiveMethod } from "../shared/http";
import { deleteR2Url, uploadToR2 } from "../shared/storage";
import type { ApiDispatcher } from "../types/api";

async function handleUploadSingle(db: D1Database, env: any, request: Request) {
  const auth = await requireUserOrClient(db, request, env);
  if (!auth) return unauthorized();

  const form = await request.formData();
  const file = form.get("photo") as File | null;
  if (!file) return json({ error: "No file uploaded" }, 400);

  const slug = new URL(request.url).searchParams.get("slug") || undefined;
  return json(await uploadToR2(env, file, slug));
}

async function handleUploadMultiple(db: D1Database, env: any, request: Request) {
  const auth = await requireUserOrClient(db, request, env);
  if (!auth) return unauthorized();

  const form = await request.formData();
  const files = form
    .getAll("photos")
    .filter((f): f is File => f instanceof File);
  if (!files.length) return json({ error: "No files uploaded" }, 400);

  const slug = new URL(request.url).searchParams.get("slug") || undefined;
  const uploaded = await Promise.all(
    files.map((file) => uploadToR2(env, file, slug)),
  );
  return json(uploaded);
}

async function handleUploadDelete(db: D1Database, env: any, request: Request) {
  const auth = await requireUserOrClient(db, request, env);
  if (!auth) return unauthorized();

  const body = await request.json();
  if (!body.url) return json({ error: "No URL provided" }, 400);

  await deleteR2Url(env, body.url);
  return json({ success: true, message: "File deleted from R2" });
}

export const dispatchUploadRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  const method = getEffectiveMethod(request);
  if (pathname === "upload/single" && method === "POST")
    return await handleUploadSingle(db, env, request);
  if (pathname === "upload/multiple" && method === "POST")
    return await handleUploadMultiple(db, env, request);
  if (pathname === "upload/file" && method === "DELETE")
    return await handleUploadDelete(db, env, request);

  return null;
};
