import { readFile } from "node:fs/promises";
import path from "node:path";
import { UPLOAD_DIR } from "@/lib/upload";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;

  if (filename.includes("..") || filename.includes("/")) {
    return new Response("Not found", { status: 404 });
  }

  const contentType = MIME_TYPES[path.extname(filename).toLowerCase()];
  if (!contentType) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const data = await readFile(path.join(/* turbopackIgnore: true */ UPLOAD_DIR, filename));
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
