export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'

  const res = await fetch(
    `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=${page}`,
    {
      next: { revalidate: 3600 }, // Cache 1 giờ nếu cần
    }
  )
  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
