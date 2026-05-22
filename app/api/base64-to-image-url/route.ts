import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let base64 = body.image_base64;
    const filename = body.filename || `linkedin-image-${Date.now()}.png`;

    if (!base64) {
      return NextResponse.json({ error: "Missing image_base64" }, { status: 400 });
    }

    base64 = base64
      .replace(/^data:image\/[^;]+;base64,/, "")
      .replace(/\s/g, "");

    const buffer = Buffer.from(base64, "base64");

    const pngHeader = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);

    if (!buffer.subarray(0, 8).equals(pngHeader)) {
      return NextResponse.json({ error: "Not a valid PNG" }, { status: 400 });
    }

    const blob = await put(filename, buffer, {
      access: "public",
      contentType: "image/png",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      success: true,
      image_url: blob.url,
      download_url: blob.downloadUrl,
      pathname: blob.pathname,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
