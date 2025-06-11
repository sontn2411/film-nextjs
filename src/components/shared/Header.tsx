'use client'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='w-full shadow-sm bg-transparent sticky z-10  '>
      <div className='container mx-auto flex items-center justify-between py-4 px-4'>
        <div className='flex gap-6 items-center'>
          <Link href='/'>
            <div className='text-white w-10 h-auto'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='-3.71 0 122.88 122.88'
              >
                <path
                  d='M108.07,15.56L5.7,52.84L0,37.22L102.37,0L108.07,15.56z M115.46,122.88H5.87V53.67h109.59V122.88z 
              M101.79,15.65V2.36l-7.23,2.61v13.34L101.79,15.65z M87.39,20.93V7.59l-7.26,2.58v13.45L87.39,20.93z 
              M72.49,26.07v-13.2l-7.26,2.61v13.26L72.49,26.07z M113.43,68.32l-4.56-12.54h-7.73l4.56,12.54H113.43z 
              M97.64,68.32l-4.56-12.54h-7.76l4.59,12.54H97.64z M57.98,31.69V18.32l-7.25,2.61v13.34L57.98,31.69z 
              M82.41,68.32l-4.56-12.54h-7.73l4.56,12.54H82.41z M43.08,36.8V23.54l-7.34,2.61v13.34L43.08,36.8z 
              M66.62,68.32l-4.56-12.54h-7.75l4.56,12.54H66.62z M28.82,42.28V28.9l-7.31,2.7v13.26L28.82,42.28z 
              M51.06,68.32L46.5,55.78h-7.73l4.56,12.54H51.06z M13.84,47.39V34.13l-7.26,2.58v13.37L13.84,47.39z 
              M35.36,68.32l-4.64-12.54h-7.67l4.48,12.54H35.36z M19.96,68.32l-4.64-12.54h-7.73l4.56,12.54H19.96z'
                />
              </svg>
            </div>
          </Link>

          <div className=''>
            <div className=' flex items-center gap-4 py-2 px-4 rounded-sm bg-[#2c3141]'>
              <Search className='text-white' size={20} />
              <input
                name='search'
                type='text'
                className=' outline-none'
                placeholder='Tìm kiếm'
              />
            </div>
          </div>
        </div>
        <div>
          <Button variant='secondary'>Thành Viên</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
