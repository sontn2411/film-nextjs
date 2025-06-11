import { categoryItem } from '@/types/film'

import Image from 'next/image'

interface DetailFilmProps {
  poster_url: string
  content: string
  name: string
  origin_name: string
  category: categoryItem[]
  episode_current: string
  episode_total: string
  thumb_url: string
}

const DetailFilm = ({
  poster_url,
  content,
  name,
  origin_name,
  category,
  thumb_url,
}: DetailFilmProps) => {
  return (
    <>
      <div
        className='absolute top-0 left-0 w-full h-full bg-center bg-cover bg-no-repeat opacity-10 z-0'
        style={{ backgroundImage: `url(${thumb_url})` }}
      ></div>
      <div className='flex gap-8 justify-between z-10'>
        <Image
          src={poster_url}
          alt='Photo by Drew Beamer'
          width={150}
          height={300}
          className='object-cover rounded-lg'
        />

        <div className=' flex flex-col gap-2 w-full'>
          <p className='text-2xl font-semibold'>{name}</p>
          <p className='text-base  text-[#FFD875]'>{origin_name}</p>
          <ul className='flex gap-2'>
            {category.map((item) => (
              <li key={item.id} className='bg-[#ffffff10] px-4 rounded'>
                <span className='text-xs'>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className=''>
          <span className='text-sm text-[#aaa]'>{content}</span>
        </div>
      </div>
    </>
  )
}

export default DetailFilm
