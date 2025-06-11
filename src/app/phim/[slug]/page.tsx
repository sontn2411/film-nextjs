import ContentFilmDetail from './content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/* -------------  META ĐỘNG --------------- */
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const sp = await searchParams
  const chapSlugRaw = sp.chap
  const chapSlug = Array.isArray(chapSlugRaw) ? chapSlugRaw[0] : chapSlugRaw

  const res = await fetch(`https://phimapi.com/phim/${slug}`, {
    next: { revalidate: 86_400 },
  })
  const json = await res.json()
  const movie = json?.movie ?? {}

  const baseTitle = movie.name ?? 'Xem phim'
  const title = chapSlug
    ? `${baseTitle} – ${chapSlug.toUpperCase()}`
    : baseTitle

  const description = movie.origin_name
    ? `Xem ${movie.name} (${movie.origin_name}) miễn phí, chất lượng cao.`
    : `Xem ${movie.name} chất lượng cao.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: movie.thumb_url ? [movie.thumb_url] : [],
    },
  }
}

export default async function FilmDetailPage({ params }: Props) {
  const { slug } = await params
  return <ContentFilmDetail slug={slug} />
}
