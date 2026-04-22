import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

function buildR2Client(env: any) {
  return new S3Client({
    region: "auto",
    endpoint: `https://${env?.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env?.R2_ACCESS_KEY_ID || "",
      secretAccessKey: env?.R2_SECRET_ACCESS_KEY || "",
    },
  });
}

export async function uploadToR2(env: any, file: File, slug?: string) {
  const isImage = file.type.startsWith("image/");
  const isMusic = file.type.startsWith("audio/");

  // Use Uint8Array instead of Node.js Buffer (Cloudflare Workers compatible)
  const arrayBuffer = await file.arrayBuffer();
  const body = new Uint8Array(arrayBuffer);

  const extMatch = /\.[a-z0-9]+$/i.exec(file.name);
  let ext = extMatch?.[0] || (isImage ? ".jpg" : ".bin");
  let contentType = file.type || "application/octet-stream";

  // Image compression is handled client-side (Canvas API in browser) before
  // upload, so the file arrives already resized & converted to WebP.
  // We just preserve the content type the browser sent.
  if (isImage && file.type === "image/webp") {
    ext = ".webp";
  }

  const filename = `${crypto.randomUUID()}${ext.replaceAll(/[^a-zA-Z0-9.]/g, "") || ".bin"}`;
  const key = slug ? `${slug}/${filename}` : filename;
  const bucket = isMusic ? "music" : "uploads";
  const publicUrlBase = isMusic
    ? env?.R2_PUBLIC_URL_MUSIC || "https://music.mengundanganda.com"
    : env?.R2_PUBLIC_URL_UPLOADS || "https://media.mengundanganda.com";

  const s3Client = buildR2Client(env);
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );

  return { url: `${publicUrlBase}/${key}`, filename: key };
}

export async function deleteR2Url(env: any, url: string) {
  const isMusic = url.includes("music.mengundanganda.com");
  const bucket = isMusic ? "music" : "uploads";
  const key = new URL(url).pathname.replace(/^\//, "");
  const s3Client = buildR2Client(env);
  await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
