'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationFilmProps {
  totalItems: number
}

const PaginationFilm = ({ totalItems }: PaginationFilmProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || '1')

  const handleNextPage = () => {
    if (currentPage < totalItems) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(currentPage + 1))
      router.push(`?${params.toString()}`)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(currentPage - 1))
      router.push(`?${params.toString()}`)
    }
  }

  return (
    <div className='flex justify-center items-center gap-4 py-10'>
      <button
        className='rounded-full bg-[#2F3346] p-2 disabled:opacity-50'
        onClick={handlePrevPage}
        disabled={currentPage <= 1}
      >
        <ArrowLeft />
      </button>

      <div className='flex bg-[#2F3346] py-2 px-4 rounded-full'>
        <span>Trang</span>
        <div className='flex items-center'>
          <div className='px-2'>
            <input
              name='page'
              value={currentPage}
              readOnly
              className='w-14 text-center border border-[#ffffff20] rounded bg-transparent text-white'
            />
          </div>
          <span className='text-white'>/ {totalItems}</span>
        </div>
      </div>

      <button
        className='rounded-full bg-[#2F3346] p-2 disabled:opacity-50'
        onClick={handleNextPage}
        disabled={currentPage >= totalItems}
      >
        <ArrowRight />
      </button>
    </div>
  )
}

export default PaginationFilm
