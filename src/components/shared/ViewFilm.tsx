import Hls from 'hls.js'
import VPlayer from 'vnetwork-player'
import 'vnetwork-player/dist/vnetwork-player.min.css'

const ViewFilm = ({ src }: { src: string }) => {
  return <VPlayer source={src} autoPlay Hls={Hls} color='#FFD875' />
}

export default ViewFilm
