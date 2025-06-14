import { useQuery } from '@tanstack/react-query'

const BASE_URL = 'https://phimapi.com'

// 1. Lấy danh sách phim mới cập nhật
const fetchDataFilmUpdate = async (page: string) => {
  const res = await fetch(
    `${BASE_URL}/danh-sach/phim-moi-cap-nhat-v3?page=${page}`,
  )
  const data = await res.json()
  return data
}

export const useGetDataFilmUpday = (page: string) => {
  return useQuery({
    queryKey: ['phim-moi', page],
    queryFn: () => fetchDataFilmUpdate(page),
    staleTime: 5 * 60 * 1000,
  })
}

// 2. Lấy danh sách phim theo bộ lọc
interface RequestDataFilmList {
  page: string | number
  type_list: string
  category: string
  country: string
  year: string
}

const fetchDataFilmList = async ({
  page,
  type_list,
  category,
  country,
  year,
}: RequestDataFilmList) => {
  const query = new URLSearchParams({
    page: String(page),
    ...(category ? { category } : {}),
    ...(country ? { country } : {}),
    ...(year ? { year } : {}),
  }).toString()

  const res = await fetch(`${BASE_URL}/v1/api/danh-sach/${type_list}?${query}`)
  const data = await res.json()
  return data?.data ?? []
}

export const useGetDataFilmList = (params: RequestDataFilmList) => {
  return useQuery({
    queryKey: ['danh-sach', params],
    queryFn: () => fetchDataFilmList(params),
    staleTime: 5 * 60 * 1000,
  })
}

// 3. Lấy dữ liệu filter
const fetchDataFilter = async () => {
  const res = await fetch(`${BASE_URL}/api/bo-loc`)
  const data = await res.json()
  return data
}

export const useGetDataFilter = () => {
  return useQuery({
    queryKey: ['filter'],
    queryFn: fetchDataFilter,
    staleTime: 5 * 60 * 1000,
  })
}

// 4. Lấy chi tiết phim
export const fetchDataDetailFilm = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/phim/${slug}`)
  const data = await res.json()
  return data
}

export const useGetDataDetalFilm = (slug: string) => {
  return useQuery({
    queryKey: ['phim', slug],
    queryFn: () => fetchDataDetailFilm(slug),
    staleTime: 5 * 60 * 1000,
  })
}

// 5. Tìm kiếm phim
interface DataSearch {
  keyword: string
  page: string
  limit: string
}

const fetchDataSearchFilm = async ({ keyword, page, limit }: DataSearch) => {
  const query = new URLSearchParams({
    keyword,
    page,
    limit,
  }).toString()

  const res = await fetch(`${BASE_URL}/v1/api/tim-kiem?${query}`)
  const data = await res.json()
  return data.data
}

export const useGetDataSearchFilm = (params: DataSearch) => {
  return useQuery({
    queryKey: ['tim-kiem', params],
    queryFn: () => fetchDataSearchFilm(params),
    staleTime: 5 * 60 * 1000,
    enabled: !!params.keyword,
  })
}
