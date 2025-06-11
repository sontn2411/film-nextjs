/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  params: { category: string }
}

export async function GET(req: NextRequest, { params }: Params) {
  const { category } = params
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') || '1'
  const category_type = searchParams.get('category')
  const country = searchParams.get('country')

  const url = `https://phimapi.com/v1/api/danh-sach/${category}?page=${page}${
    category_type ? `&category=${category_type}` : ''
  }&country=${country}&limit=24`

  console.log('======ssss', url)

  try {
    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi gọi phimapi' }, { status: 500 })
  }
}
