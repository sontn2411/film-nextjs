/* eslint-disable react-hooks/rules-of-hooks */
import { useGetDataDetalFilm } from '@/api/query'
import DetailFilm from '@/components/shared/DetailFilm'
import ViewFilm from '@/components/shared/ViewFilm'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const FilmDetail = () => {
  const { slug } = useParams()
  if (!slug) return

  const { data, isLoading } = useGetDataDetalFilm(slug)

  const [searchParams] = useSearchParams()
  const tap = searchParams.get('chap') || 'tap-01'
  const server_name = searchParams.get('server_name')

  const navigate = useNavigate()

  const [episode, setEpisode] = useState<{
    server_data?: { name: string; link_m3u8: string; slug: string }[]
  }>({})
  const [activeVideo, setActiveVideo] = useState<{
    server_name: string
    chapter: { name: string; src: string; slug: string }
  }>({ server_name: '', chapter: { name: '', src: '', slug: '' } })

  useEffect(() => {
    if (data) {
      const serverName = server_name || data.episodes[0].server_name
      const foundEpisode = data.episodes.find(
        (item: { server_name: string }) => item.server_name === serverName
      )
      if (foundEpisode) {
        const chapter =
          foundEpisode.server_data.find(
            (item: { slug: string }) => item.slug === tap
          ) || foundEpisode.server_data[0]

        if (chapter) {
          setEpisode(foundEpisode)
          setActiveVideo({
            server_name: serverName,
            chapter: {
              name: chapter.name,
              src: chapter.link_m3u8,
              slug: chapter.slug,
            },
          })
        }
      }
    }
  }, [data, tap, server_name])

  const handleChangeServer = (item: {
    server_name: string
    server_data: { name: string; link_m3u8: string; slug: string }[]
  }) => {
    const chapter =
      item.server_data.find((c: { slug: string }) => c.slug === tap) ||
      item.server_data[0]

    if (chapter) {
      setEpisode(item)
      setActiveVideo({
        server_name: item.server_name,
        chapter: {
          name: chapter.name,
          src: chapter.link_m3u8,
          slug: chapter.slug,
        },
      })

      navigate(
        `?chap=${chapter.slug}&server_name=${encodeURIComponent(
          item.server_name
        )}`
      )
    }
  }

  const handleChangeChapter = (item: { name: string; slug: string }) => {
    if (!episode.server_data) return

    const chapter = episode.server_data.find((c) => c.slug === item.slug)
    if (!chapter) return

    setActiveVideo({
      server_name: activeVideo.server_name,
      chapter: {
        name: chapter.name,
        src: chapter.link_m3u8,
        slug: chapter.slug,
      },
    })

    navigate(
      `?chap=${chapter.slug}&server_name=${encodeURIComponent(
        activeVideo.server_name
      )}`
    )
  }

  if (isLoading) return <p>Loading…</p>

  const title = `${data.movie.name} | ${tap} `

  return (
    <>
      <title>{title}</title>
      <div className='flex flex-col gap-10  '>
        {data && <DetailFilm {...data.movie} />}
        {activeVideo.chapter.src ? (
          <ViewFilm
            key={activeVideo.chapter.src}
            src={activeVideo.chapter.src}
          />
        ) : (
          <p>Đang tải video...</p>
        )}

        <div className='flex gap-5'>
          {data.episodes.map(
            (item: {
              server_name: string
              server_data: { name: string; link_m3u8: string; slug: string }[]
            }) => (
              <div
                key={item.server_name}
                onClick={() => handleChangeServer(item)}
                className={`border text-xs px-2 py-1 rounded-sm font-medium hover:cursor-pointer h-10 flex items-center ${
                  activeVideo.server_name === item.server_name
                    ? ''
                    : 'border-transparent opacity-70'
                }`}
              >
                {item.server_name}
              </div>
            )
          )}
        </div>

        <ul className='flex gap-8 flex-wrap z-10'>
          {Array.isArray(episode.server_data) &&
            episode.server_data.map((item: { name: string; slug: string }) => (
              <li
                key={item.name}
                className={` p-4 rounded-md bg-[#282B3A] text-sm font-medium h-14 max-w-32 w-full text-center hover:cursor-pointer ${
                  activeVideo.chapter.name === item.name
                    ? 'bg-[#FFD875] text-black'
                    : ''
                }`}
                onClick={() => handleChangeChapter(item)}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default FilmDetail
