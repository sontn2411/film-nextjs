import ContentTypeList from './content'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ type_list: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type_list } = await params // 👈  phải await

  const titleMap: Record<string, string> = {
    'phim-moi': 'Phim Mới Nhất',
    'phim-le': 'Phim Lẻ',
    'phim-bo': 'Phim Bộ',
    'phim-chieu-rap': 'Phim Chiếu Rạp',
  }

  const base = titleMap[type_list] || 'Danh sách phim'
  return {
    title: `${base} | Xem phim online`,
    description: `Tổng hợp ${base.toLowerCase()} cập nhật liên tục, chất lượng cao, không quảng cáo.`,
  }
}

export default async function TypeListPage({ params, searchParams }: Props) {
  const [{ type_list }, sp] = await Promise.all([params, searchParams])

  const rawPage = sp.page
  const page = Array.isArray(rawPage)
    ? parseInt(rawPage[0] ?? '1', 10)
    : parseInt(rawPage ?? '1', 10)

  return <ContentTypeList type_list={type_list} page={page} />
}
