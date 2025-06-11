import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> } // 👈  params là Promise
) {
  const { category } = await params // 👈  phải await

  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') ?? '1'
  const category_type = searchParams.get('category')
  const country = searchParams.get('country')

  const url =
    `https://phimapi.com/v1/api/danh-sach/${category}` +
    `?page=${page}` +
    (category_type ? `&category=${category_type}` : '') +
    `&country=${country}&limit=24`

  try {
    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Lỗi khi gọi phimapi' }, { status: 500 })
  }
}
