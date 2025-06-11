import ContentTypeList from './content'
import { Metadata } from 'next'

interface Props {
  params: { type_list: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export function generateMetadata({ params }: Props): Metadata {
  const titleMap: Record<string, string> = {
    'phim-moi': 'Phim Mới Nhất',
    'phim-le': 'Phim Lẻ',
    'phim-bo': 'Phim Bộ',
    'phim-chieu-rap': 'Phim Chiếu Rạp',
  }

  const title = titleMap[params.type_list] || 'Danh sách phim'
  return {
    title: `${title} | Xem phim online`,
    description: `Tổng hợp ${title.toLowerCase()} cập nhật liên tục, chất lượng cao, không quảng cáo.`,
  }
}

const TypeListPage = ({ params, searchParams }: Props) => {
  const { type_list } = params
  const rawPage = searchParams.page
  const page = Array.isArray(rawPage)
    ? parseInt(rawPage[0] ?? '1', 10)
    : parseInt(rawPage ?? '1', 10)

  return <ContentTypeList type_list={type_list} page={page} />
}

export default TypeListPage
