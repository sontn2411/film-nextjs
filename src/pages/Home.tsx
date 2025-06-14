import FilmUpdate from '@/components/shared/FilmUpdate'
import Interested from '@/components/shared/Interested'

const Home = () => {
  return (
    <>
      <title>Phim Hay</title>
      <div className='flex flex-col gap-20'>
        <Interested />
        <FilmUpdate />
      </div>
    </>
  )
}

export default Home
