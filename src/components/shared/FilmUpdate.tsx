'use client'
import { useGetDataFilmUpday } from '@/axios/query'
import Link from 'next/link'
import ListFilm from './ListFilm'
import LoadingFilm from './LoadingFilm'
import PaginationFilm from './PaginationFilm'

interface FilmUpdateProps {
  page: number
}

const FilmUpdate = ({ page }: FilmUpdateProps) => {
  const { data, isLoading } = useGetDataFilmUpday(page.toString())

  return (
    <div className='flex flex-col gap-6'>
      <Link href='' className='flex  items-end gap-4'>
        <h2 className='text-3xl font-semibold'>Phim mới cập nhật</h2>
      </Link>

      {isLoading && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {Array.from({ length: 24 }).map((_, index) => (
            <LoadingFilm key={index} />
          ))}
        </div>
      )}

      {data && (
        <>
          <ListFilm data={data.items} />
          <PaginationFilm totalItems={data.pagination.totalPages} />
        </>
      )}

      {/* <PaginationFilm page={page} totalItems={data.pagination.totalPages} /> */}
    </div>
  )
}
export default FilmUpdate
