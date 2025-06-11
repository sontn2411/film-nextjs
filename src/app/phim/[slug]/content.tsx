'use client'

import { useGetDataDetalFilm } from '@/axios/query'
import 'vnetwork-player/dist/vnetwork-player.min.css'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ViewFilm from '@/components/shared/ViewFilm'
import DetailFilm from '@/components/shared/DetailFilm'

export default function ContentFilmDetail({ slug }: { slug: string }) {
  const { data, isLoading } = useGetDataDetalFilm(slug)

  const searchParams = useSearchParams()
  const router = useRouter()

  const tap = searchParams.get('chap') || 'tap-01'
  const server_name = searchParams.get('server_name')

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

  if (isLoading) return <p>Loading…</p>

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

      router.replace(
        `?chap=${chapter.slug}&server_name=${encodeURIComponent(
          item.server_name
        )}`,
        { scroll: false }
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

    router.replace(
      `?chap=${chapter.slug}&server_name=${encodeURIComponent(
        activeVideo.server_name
      )}`,
      { scroll: false }
    )
  }

  return (
    <div className='flex flex-col gap-10  '>
      {data && <DetailFilm {...data.movie} />}
      {activeVideo.chapter.src ? (
        <ViewFilm key={activeVideo.chapter.src} src={activeVideo.chapter.src} />
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
  )
}
