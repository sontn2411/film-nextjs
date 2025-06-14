import { useGetDataFilmUpday } from '@/api/query'
import { useSearchParams } from 'react-router-dom'
import ListFilm from './ListFilm'
import LoadingFilm from './LoadingFilm'
import PaginationFilm from './PaginationFilm'

const FilmUpdate = () => {
  const [searchParams] = useSearchParams()

  const page = searchParams.get('page') || '1'

  const { data, isLoading } = useGetDataFilmUpday(page)

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex  items-end gap-4'>
        <h2 className='text-3xl font-semibold'>Phim mới cập nhật</h2>
      </div>

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
    </div>
  )
}

export default FilmUpdate
