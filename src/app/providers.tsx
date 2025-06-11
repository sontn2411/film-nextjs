'use client'

import Header from '@/components/shared/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      if (pathname.startsWith('/phim')) {
        document.body.classList.add('bg-[#191B24]')
      } else {
        document.body.classList.remove('bg-[#191B24]')
      }
    }
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className='container mx-auto py-4 px-4 mt-10'>{children}</div>
    </QueryClientProvider>
  )
}
