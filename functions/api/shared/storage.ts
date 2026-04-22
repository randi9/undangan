import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export function buildR2Client(env: any) {
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
  try {
    const isImage = file.type.startsWith("image/");
    const isMusic = file.type.startsWith("audio/");

    // Use Uint8Array instead of Node.js Buffer (Cloudflare Workers compatible)
    const arrayBuffer = await file.arrayBuffer();
    const body = new Uint8Array(arrayBuffer);

    const extMatch = /\.[a-z0-9]+$/i.exec(file.name);
    let ext = extMatch?.[0] || (isImage ? ".jpg" : ".bin");
    let contentType = file.type || "application/octet-stream";

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
  } catch (err: any) {
    throw new Error(`R2 Upload Failed: ${err?.message || String(err)}`);
  }
}

export async function deleteR2Url(env: any, url: string) {
  if (!url) return;
  try {
    const isMusic = url.includes("music.mengundanganda.com");
    const bucket = isMusic ? "music" : "uploads";
    
    // Safely parse URL
    let key = url;
    try {
      key = new URL(url).pathname.replace(/^\//, "");
    } catch {
      // If it's not a valid URL, assume it's already a relative path/key
      key = url.replace(/^\//, "");
    }

    const s3Client = buildR2Client(env);
    await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
  } catch (err: any) {
    console.error("[Storage] Failed to delete R2 URL:", url, err);
    // Don't throw for deletes, just log it so it doesn't break cascading deletes
  }
}
