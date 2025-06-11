import ContentFilmDetail from './content'

interface Props {
  params: Promise<{ slug: string }>
}

const FilmDetailPage = async ({ params }: Props) => {
  const { slug } = await params

  return <ContentFilmDetail slug={slug} />
}

export default FilmDetailPage
