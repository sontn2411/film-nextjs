import FilmUpdate from '@/components/shared/FilmUpdate'
import Interested from '@/components/shared/Interested'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Home({ searchParams }: Props) {
  const rawPage = searchParams.page
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
