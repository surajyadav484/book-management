import { useSearchParams } from "react-router-dom";

export const useGetSelectedFiltersAndSort = () => {
  const [searchParams] = useSearchParams();

  const selectedGenre = searchParams.getAll("genre");

  const selectedAuthors = searchParams.getAll("author");

  const selectedRatings = searchParams.getAll("ratings");

  const selectedSort = searchParams.get("sort");

  return { selectedGenre, selectedAuthors, selectedRatings, selectedSort };
};
