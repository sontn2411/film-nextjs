import { AspectRatio } from '../ui/aspect-ratio'

const LoadingFilm = () => {
  return (
    <AspectRatio
      ratio={4 / 6}
      className='relative bg-muted rounded-lg overflow-hidden animate-pulse'
    >
      <div className='absolute inset-0 bg-gray-200' />
    </AspectRatio>
  )
}

export default LoadingFilm
