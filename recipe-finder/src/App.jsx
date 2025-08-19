
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//Pages to route to...
import Favourate from './pages/Favourate'
import RecipeDetails from './pages/RecipeDetails'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import RecipeCard from './components/RecipeCard'  




function App() {

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favourate />} />
          <Route path='/recipe/:id' element={<RecipeDetails />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
