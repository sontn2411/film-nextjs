import FilmUpdate from '@/components/shared/FilmUpdate'
import Interested from '@/components/shared/Interested'
import { Metadata } from 'next'

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Xem phim online | Cập nhật phim mới nhất 2025',
    description:
      'Tổng hợp phim hot, phim lẻ, phim bộ cập nhật liên tục. Xem phim miễn phí, chất lượng cao không quảng cáo.',
  }
}

export default async function Home({ searchParams }: Props) {
  const sp = await searchParams

  const rawPage = sp.page
  const page = Array.isArray(rawPage)
    ? parseInt(rawPage[0] ?? '1', 10)
    : parseInt(rawPage ?? '1', 10)

  return (
    <div className='flex flex-col gap-20'>
      <Interested />
      <FilmUpdate page={page} />
    </div>
  )
}
