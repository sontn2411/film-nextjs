import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/shared/Header'
import TypeListPage from './pages/TypeList'
import FilmDetail from './pages/FilmDetail'
import SearchPage from './pages/Search'

function App() {
  return (
    <div>
      <Header />
      <div className='container mx-auto py-4 px-4 mt-10'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/danh-sach/:type_list' element={<TypeListPage />} />
          <Route path='/phim/:slug' element={<FilmDetail />} />
          <Route path='/tim-kiem' element={<SearchPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
