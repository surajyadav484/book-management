import { useState } from "react";
import { useGetAllBooksQuery } from "../redux/slices/book";
import BookCard from "./components/book-card";
import SearchBar from "./components/search-bar";
import useDebounce from "../hooks/useDebounce";
import Filter from "./Filter";
import { useGetSelectedFiltersAndSort } from "../hooks/useGetSelectedFiltersAndSort";
import Sort from "./Sort";
import { RecommendationDrawer } from "./components/recommendation-drawer";
import { AddBookModal } from "./components/add-book-modal";
import FilterDrawer from "./components/filter-drawer";

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { selectedAuthors, selectedGenre, selectedRatings, selectedSort } =
    useGetSelectedFiltersAndSort();

  const filters = {
    authors: selectedAuthors?.length ? selectedAuthors : null,
    genre: selectedGenre?.length ? selectedGenre : null,
    ratings: selectedRatings?.length ? selectedRatings : null,
  };

  const { data, isLoading, isError } = useGetAllBooksQuery({
    pageNumber,
    title: debouncedSearchTerm,
    filters,
    sort: selectedSort,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex">
      <div className="sm:min-w-[20%] border-r-2 p-5 hidden lg:block">
        <div className="mb-8">
          <Sort />
        </div>

        <Filter />
      </div>
      <div className="lg:hidden">
        <FilterDrawer />
      </div>
      <div className="ml-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mx-4 my-4 gap-4">
          <div>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setPageNumber={setPageNumber}
            />
          </div>

          <div className="flex gap-5">
            <AddBookModal />

            <RecommendationDrawer />
          </div>
        </div>
        <div>
          <div className="flex justify-center lg:justify-start items-center flex-wrap gap-5">
            {data.map((book) => {
              return <BookCard key={book._id} book={book} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
