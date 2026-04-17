import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import Favourites from './pages/Favourites'
import AddMovie from './pages/AddMovie'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/add" element={<AddMovie />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App