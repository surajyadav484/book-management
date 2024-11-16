const SearchBar = ({ searchTerm, setSearchTerm, setPageNumber }) => {
  const handleSearchChange = (e) => {
    setPageNumber(1);
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={handleSearchChange}
        type="text"
        placeholder="Search for a book"
        className="border-2 border-gray-300 p-2 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
