import { Loader2, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useGetDataSearchFilm } from '@/api/query'
import type { filmItemType } from '@/types/film'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SearchFilm = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearch = useDebounce(searchValue, 500)

  // const [isShowResult, setIsShowResult] = useState<boolean>(false)

  const { pathname } = useLocation()

  const navigate = useNavigate()
  useEffect(() => {
    setSearchValue('')
  }, [pathname])

  const { data: results, isFetching } = useGetDataSearchFilm({
    keyword: debouncedSearch,
    page: '1',
    limit: '5',
  })

  const handleNavigate = () => {
    navigate('/tim-kiem?keyword=' + debouncedSearch)
  }

  return (
    <div className='relative w-[360px]'>
      <div className='flex items-center gap-4 py-2 px-4 rounded-sm bg-[#2c3141] w-full'>
        {isFetching ? (
          <Loader2 className='text-white animate-spin' size={20} />
        ) : (
          <Search className='text-white' size={20} />
        )}
        <input
          name='search'
          type='text'
          className='outline-none bg-transparent text-white placeholder:text-white/60 w-full'
          placeholder='Tìm kiếm phim'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {debouncedSearch && (
        <div className='absolute top-full left-0 mt-2 w-full bg-[rgba(15,17,26,.95)] text-white shadow-lg rounded z-50'>
          {isFetching ? (
            <div className='p-4'>Đang tìm kiếm...</div>
          ) : results?.items?.length > 0 ? (
            <ul className='space-y-1'>
              <li className='text-sm pb-4 text-[#aaa] p-4'>Danh sách phim</li>
              {results.items.map((film: filmItemType) => {
                const {
                  poster_url,
                  _id,
                  name,
                  origin_name,
                  episode_current,
                  year,
                  slug,
                } = film
                const domainImage = 'https://phimimg.com'
                const imagSrc = poster_url.includes(domainImage)
                  ? poster_url
                  : domainImage + '/' + poster_url

                return (
                  <li key={_id} className='px-4 py-2'>
                    <Link
                      to={`/phim/${slug}`}
                      className='hover:bg-amber-300 cursor-pointer rounded-md block'
                    >
                      <div className='flex gap-4 p-2'>
                        <div className='w-[50px] h-[70px] overflow-hidden rounded-md shrink-0'>
                          <img
                            src={imagSrc}
                            alt={name}
                            width={50}
                            height={70}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <p className='text-sm'>{name}</p>
                          <p className='text-sm text-[#aaa]'>{origin_name}</p>
                          <ul className='flex gap-4 text-sm text-[#aaa]'>
                            <li>{episode_current}</li>
                            <li>{year}</li>
                          </ul>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
              <li
                onClick={handleNavigate}
                className='flex justify-center items-center h-11 cursor-pointer bg-[#ffffff10] text-sm'
              >
                <span>Toàn bộ kết quả</span>
              </li>
            </ul>
          ) : (
            <div className='p-4'>Không có kết quả</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchFilm
