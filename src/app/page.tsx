import FilmUpdate from '@/components/shared/FilmUpdate'
import Interested from '@/components/shared/Interested'

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Home({ searchParams }: Props) {
  const sp = await searchParams

  const rawPage = sp.page
  const page = Array.isArray(rawPage)
    ? parseInt(rawPage[0] ?? '1', 10)
    : parseInt(rawPage ?? '1', 10)

  return (
    <div className='flex flex-col gap-20'>
      <Interested />
      <FilmUpdate page={page} />
    </div>
  )
}
