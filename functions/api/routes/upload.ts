import { requireUser, unauthorized } from "../shared/auth";
import { json, getEffectiveMethod } from "../shared/http";
import { deleteR2Url, uploadToR2, buildR2Client } from "../shared/storage";
import type { ApiDispatcher } from "../types/api";

async function handleUploadSingle(supabase: any, env: any, request: Request) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  const form = await request.formData();
  const file = form.get("photo") as File | null;
  if (!file) return json({ error: "No file uploaded" }, 400);

  const slug = new URL(request.url).searchParams.get("slug") || undefined;
  return json(await uploadToR2(env, file, slug));
}

async function handleUploadMultiple(supabase: any, env: any, request: Request) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

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

async function handleUploadDelete(supabase: any, env: any, request: Request) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  const body = await request.json();
  if (!body.url) return json({ error: "No URL provided" }, 400);

  await deleteR2Url(env, body.url);
  return json({ success: true, message: "File deleted from R2" });
}

export const dispatchUploadRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  const method = getEffectiveMethod(request);
  if (pathname === "upload/single" && method === "POST")
    return await handleUploadSingle(supabase, env, request);
  if (pathname === "upload/multiple" && method === "POST")
    return await handleUploadMultiple(supabase, env, request);
  if (pathname === "upload/file" && method === "DELETE")
    return await handleUploadDelete(supabase, env, request);

  if (pathname === "upload/debug" && method === "GET") {
    try {
      const s3Client = buildR2Client(env);
      return json({ status: "S3 Client initialized successfully" });
    } catch (err: any) {
      return json({ error: `S3 Client init failed: ${err.message}`, stack: err.stack }, 500);
    }
  }

  return null;
};
