import { Link } from 'react-router-dom'
import SearchFilm from './SearchFilm'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className='w-full shadow-sm bg-transparent sticky z-10'>
      <div className='container mx-auto flex items-center justify-between py-4 px-4'>
        <div className='flex gap-6 items-center'>
          <Link to='/'>
            <div className='text-white w-10 h-auto font-bold uppercase '>
              <span>Home</span>
            </div>
          </Link>
          <SearchFilm />
        </div>
        <div>
          <Button variant='secondary'>Thành Viên</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
