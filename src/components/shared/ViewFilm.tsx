import dynamic from 'next/dynamic'
import Hls from 'hls.js'
import 'vnetwork-player/dist/vnetwork-player.min.css'
const VPlayer = dynamic(() => import('vnetwork-player'), { ssr: false })

const ViewFilm = ({ src }: { src: string }) => {
  return <VPlayer source={src} autoPlay Hls={Hls} color='#FFD875' />
}

export default ViewFilm
