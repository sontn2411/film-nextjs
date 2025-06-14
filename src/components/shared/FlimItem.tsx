/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { filmItemType } from '@/types/film'
import { AspectRatio } from '../ui/aspect-ratio'
import { useNavigate } from 'react-router-dom'

interface FilmItemProps extends filmItemType {}

const FlimItem = ({
  poster_url,
  name,
  lang,
  episode_current,
  time,
  slug,
}: FilmItemProps) => {
  const domainImage = 'https://phimimg.com'

  const navigate = useNavigate()

  const imagSrc = poster_url.includes(domainImage)
    ? poster_url
    : domainImage + '/' + poster_url

  const handleNavigate = () => {
    navigate('/phim/' + slug)
  }

  return (
    <div onClick={handleNavigate}>
      <AspectRatio
        ratio={4 / 6}
        className='relative bg-muted rounded-lg overflow-hidden'
      >
        <img
          src={imagSrc}
          alt={name}
          className='object-cover w-full h-full rounded-lg'
          loading='lazy'
        />
        <div className='bg-[#2ca35d] absolute top-0 left-0 text-[12px] font-bold p-1 '>
          <span>{lang}</span>
        </div>
        <div className='bg-[#5e6070] absolute bottom-0 right-0 text-xs font-bold p-1'>
          <span>{episode_current}</span>
        </div>
        <div className='bg-[#d7110e] absolute bottom-0 left-0 text-xs font-bold p-1'>
          <span>{time}</span>
        </div>
      </AspectRatio>
      <h3 className='font-bold mt-2 pl-2'>{name}</h3>
    </div>
  )
}

export default FlimItem
