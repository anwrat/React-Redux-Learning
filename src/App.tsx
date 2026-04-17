import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import Favourites from './pages/Favourites'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App