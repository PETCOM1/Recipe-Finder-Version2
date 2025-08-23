
const SearchBar = ({handleSearchChange,searchTerm,handleMaxTimeChange,maxTime}) => {
  return (
    <section className="w-full max-w-xl mx-auto my-6 p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-2">Find Your Perfect Recipe</h2>
      <p className="text-gray-600 text-center mb-4">Search through our smart collective recipe finder</p>
      <form className="flex flex-col sm:flex-row gap-2 items-center justify-center">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input
          type="number"
          placeholder="Max Minutes"
          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          value={maxTime}
          onChange={handleMaxTimeChange}
        />
     
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          onClick={() => {
            handleSearchChange({ target: { value: '' } });
            handleMaxTimeChange({ target: { value: '' } });
          }}
        >
          Clear
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
