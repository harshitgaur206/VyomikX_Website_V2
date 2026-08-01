// Next.js API route proxy for Google Drive videos to stream 100% MUTED HTML5 video
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return new NextResponse("Missing video ID", { status: 400 })
  }

  const driveUrl = `https://drive.google.com/uc?id=${id}&export=download&confirm=t`

  try {
    const response = await fetch(driveUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    })

    if (!response.ok && response.status !== 206) {
      return new NextResponse("Failed to stream drive video", { status: response.status })
    }

    const headers = new Headers()
    headers.set("Content-Type", "video/mp4")
    headers.set("Cache-Control", "public, max-age=31536000, immutable")
    if (response.headers.get("content-length")) {
      headers.set("Content-Length", response.headers.get("content-length")!)
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    })
  } catch (error) {
    return new NextResponse("Stream error", { status: 500 })
  }
}
