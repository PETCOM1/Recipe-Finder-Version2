import Header from "../components/Header"
import RecipeCard from "../components/RecipeCard"
import FavourateContect from "../contexts/FavourateContect"

const Favourate = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center m-4 p-4 rounded-2xl shadow-2xl">
        <h1 className="text-red-600 text-4xl font-bold">
          Favorite Recipe(s)
        </h1>
      </div>
      <FavourateContect />
    </>
  )
}

export default Favourate
