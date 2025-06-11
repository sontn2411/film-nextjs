/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // 👈 dạng Promise
) {
  const { slug } = await params // 👈 luôn phải `await`

  const url = `https://phimapi.com/phim/${slug}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi gọi phimapi' }, { status: 500 })
  }
}
