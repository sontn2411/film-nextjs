import type { filmItemType } from '@/types/film'
import FlimItem from './FlimItem'

interface ListFilmProps {
  data: filmItemType[]
}

const ListFilm = ({ data }: ListFilmProps) => {
  return (
    <>
      <ul className='flex justify-center flex-wrap gap-10'>
        {data &&
          data.map((item: filmItemType) => (
            <li key={item._id} className='w-64'>
              <FlimItem {...item} />
            </li>
          ))}
      </ul>
    </>
  )
}

export default ListFilm
