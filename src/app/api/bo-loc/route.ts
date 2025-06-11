export async function GET() {
  const resCategory = await fetch('https://phimapi.com/the-loai', {
    next: { revalidate: 3600 },
  })

  const dataCategory = await resCategory.json()

  const dataResCountry = [
    {
      _id: '3e075636c731fe0f889c69e0bf82c083',
      name: 'Trung Quốc',
      slug: 'trung-quoc',
    },
    {
      _id: '05de95be5fc404da9680bbb3dd8262e6',
      name: 'Hàn Quốc',
      slug: 'han-quoc',
    },
  ]

  const dataType = [
    {
      id: 1,
      name: 'Phim bộ',
      slug: 'phim-bo',
    },
    {
      id: 2,
      name: 'Phim lẻ',
      slug: 'phim-le',
    },
    {
      id: 3,
      name: 'TV Shows',
      slug: 'tv-shows',
    },
    {
      id: 4,
      name: 'Hoạt hình',
      slug: 'hoat-hinh',
    },
    {
      id: 5,
      name: 'Phim Vietsub',
      slug: 'phim-vietsub',
    },
    {
      id: 6,
      name: 'Phim Thuyết Minh',
      slug: 'phim-thuyet-minh',
    },
    {
      id: 7,
      name: 'Phim Lồng Tiếng',
      slug: 'phim-long-tieng',
    },
  ]
  const currentYear = new Date().getFullYear()
  const dataYear = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => ({
    id: i + 1,
    name: 2015 + i,
  })).reverse()

  return new Response(
    JSON.stringify({
      category: [{ id: 1, name: 'Tất cả', slug: '' }, ...dataCategory],
      country: dataResCountry,
      type: dataType,
      years: dataYear,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
