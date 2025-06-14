/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetDataSearchFilm } from '@/api/query'
import ListFilm from '@/components/shared/ListFilm'
import PaginationFilm from '@/components/shared/PaginationFilm'
import dataFilter from '@/contants/dataFilter'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const keyword = searchParams.get('keyword')
  const category = searchParams.get('category')
  const country = searchParams.get('country')
  const year = searchParams.get('year') || '2025'
  const page = searchParams.get('page') || '1'

  const { data: results } = useGetDataSearchFilm({
    keyword: keyword || '',
    page: page,
    limit: '20',
  })

  const isActive = (groupKey: string, slug: string, name: string) => {
    if (groupKey === 'category') {
      if (!category) return slug === ''
      return slug === category
    }

    if (groupKey === 'country') {
      return slug === country
    }

    if (groupKey === 'years') {
      return name == year
    }

    if (groupKey === 'type') {
      // return slug === type_list
    }

    return false
  }

  const handleChangeFilter = (
    groupKey: string,
    item: { slug: string; name: string }
  ) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    if (groupKey === 'category') {
      if (item.slug) {
        params.set('category', item.slug)
      } else {
        params.delete('category')
      }
    }

    if (groupKey === 'country') {
      if (item.slug) {
        params.set('country', item.slug)
      } else {
        params.delete('country')
      }
    }
    if (groupKey === 'type') {
      const newPath = `/danh-sach/${item.slug}`
      const newQuery = params.toString()
      navigate(`${newPath}?${newQuery}`)
      return
    }

    if (groupKey === 'years') {
      if (item.name) {
        params.set('year', item.name)
      } else {
        params.delete('year')
      }
    }

    const newQuery = params.toString()
    navigate(`?${newQuery}`)
  }

  return (
    <div>
      <div
        className='
          absolute top-0 left-0 right-0 bg-[#7761b4]
          w-full h-[50vh]
          opacity-50
          bg-cover bg-center bg-no-repeat
          [mask-image:linear-gradient(0deg,transparent_0,black)]
          [--tw-webkit-mask-image:linear-gradient(0deg,transparent_0,black)]
        '
      />

      {/* Filter lists */}
      <div className='flex flex-col z-50 relative'>
        <div className='flex flex-col border border-[#ffffff10]'>
          {dataFilter &&
            Object.entries(dataFilter).map(([key, value]) => {
              const list = Array.isArray(value) ? value : []

              return (
                <div
                  key={key}
                  className='flex px-10 py-8 border-b border-[#ffffff10]'
                >
                  <span className='font-bold text-sm whitespace-nowrap w-32 shrink-0'>
                    {key === 'type' && 'Danh Sách'}
                    {key === 'category' && 'Thể Loại'}
                    {key === 'years' && 'Năm'}
                    {key === 'country' && 'Quốc Gia'}:
                  </span>

                  <ul className='flex flex-wrap gap-4'>
                    {list.map((item: any, index: number) => (
                      <li
                        key={item.id ?? `${key}-${index}`}
                        className={`text-sm font-semibold opacity-80 px-2 py-1 border-2 cursor-pointer hover:text-[#FFD875] ${
                          isActive(key, item.slug, item.name)
                            ? 'border-[#ffffff10] rounded text-[#FFD875]'
                            : 'border-transparent'
                        }`}
                        onClick={() => handleChangeFilter(key, item)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
        </div>
      </div>
      <div className='pt-10 flex flex-col justify-center '>
        {results && (
          <>
            <ListFilm data={results.items} />
            <PaginationFilm totalItems={results.params.pagination.totalPages} />
          </>
        )}
      </div>
    </div>
  )
}

export default SearchPage
