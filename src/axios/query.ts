import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchDataFilmUpdate = async (page: string) => {
  const res = await axios.get('/api/phim-moi?page=' + page)

  return res.data
}

export const useGetDataFilmUpday = (page: string) => {
  return useQuery({
    queryKey: ['phim-moi', page],
    queryFn: () => fetchDataFilmUpdate(page),
    staleTime: 5 * 60 * 1000,
  })
}

interface RequestDataFilmList {
  page: string | number
  type_list: string
  category: string
  country: string
}

const fetchDataFilmList = async ({
  page,
  type_list,
  category,
  country,
}: RequestDataFilmList) => {
  const res = await axios.get(
    `/api/danh-sach/${type_list}?page=${page}${
      category ? `&category=${category}` : ''
    }&country=${country}`
  )

  return res.data?.data ?? []
}

export const useGetDataFilmList = ({
  page,
  type_list,
  category,
  country,
}: RequestDataFilmList) => {
  return useQuery({
    queryKey: ['danh-sach', page, type_list, category, country],
    queryFn: () => fetchDataFilmList({ page, type_list, category, country }),
    staleTime: 5 * 60 * 1000,
  })
}

const fetchDataFilter = async () => {
  const res = await axios.get('/api/bo-loc')
  return res.data
}

export const useGetDataFilter = () => {
  return useQuery({
    queryKey: ['filter'],
    queryFn: () => fetchDataFilter(),
    staleTime: 5 * 60 * 1000,
  })
}

export const fetchĐataDetailFilm = async (slug: string) => {
  const res = await axios.get('/api/phim/' + slug)

  return res.data
}

export const useGetDataDetalFilm = (slug: string) => {
  return useQuery({
    queryKey: ['phim', slug],
    queryFn: () => fetchĐataDetailFilm(slug),
    staleTime: 5 * 60 * 1000,
  })
}
