import '../styles.css'
import Header from "../components/Header"
import Slider from '../components/Slider'
import TopDelTop from '../components/TopDelTop'
import Mosaico from '../components/Mosaico'
import RinconDelColeccionista from '../components/RinconDelColeccionista'
import FrikiBlog from '../components/FrikiBlog'
import Footer from "../components/Footer";


function Home() {
  return (
    <>
      <Slider />
      <TopDelTop />
      <Mosaico />
      <RinconDelColeccionista />
      <FrikiBlog />
    </>
  )
}

export default Home
