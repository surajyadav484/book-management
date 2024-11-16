import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import {
  useGetAllAuthorsQuery,
  useGetAllGenreQuery,
} from "../redux/slices/book";

const Filter = () => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-semibold">Filter By</h2>
      <div>
        Genre
        <GenreFilter />
      </div>
      <div>
        Author
        <AuthorFilter />
      </div>
      <div>
        Rating
        <RatingFilter />
      </div>
    </div>
  );
};

export default Filter;

export const GenreFilter = () => {
  const params = new URLSearchParams();
  const [searchParams, setSearchParams] = useSearchParams(params);
  const selectedGenre = searchParams
    .getAll("genre")
    ?.map((genre) => ({ value: genre, label: genre }));
  const { data: genre } = useGetAllGenreQuery();
  const genreOptions = genre?.map((genre) => ({
    value: genre,
    label: genre,
  }));
  const handleChange = (selectedOption) => {
    const genre = selectedOption.map((option) => option.value);
    searchParams.delete("genre");
    if (genre.length) {
      genre.forEach((genre) => searchParams.append("genre", genre));
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Select
        value={selectedGenre}
        options={genreOptions || []}
        onChange={handleChange}
        isMulti
      />
    </div>
  );
};

export const AuthorFilter = () => {
  const params = new URLSearchParams();
  const [searchParams, setSearchParams] = useSearchParams(params);
  const selectedAuthors = searchParams
    .getAll("author")
    ?.map((author) => ({ value: author, label: author }));
  const { data: authors } = useGetAllAuthorsQuery();
  const authorOptions = authors?.map((author) => ({
    value: author,
    label: author,
  }));
  const handleChange = (selectedOption) => {
    const authors = selectedOption.map((option) => option.value);
    searchParams.delete("author");
    if (authors.length) {
      authors.forEach((author) => searchParams.append("author", author));
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Select
        value={selectedAuthors}
        options={authorOptions || []}
        onChange={handleChange}
        isMulti
      />
    </div>
  );
};

export const RatingFilter = () => {
  const ratings = ["1", "2", "3", "4", "5"];

  const params = new URLSearchParams();
  const [searchParams, setSearchParams] = useSearchParams(params);
  const selectedRatings = searchParams.getAll("ratings");

  const handleCheckedChange = (checked, rating) => {
    if (checked) {
      searchParams.append("ratings", rating);
    } else {
      const updatedValue = selectedRatings?.filter((value) => value !== rating);
      searchParams.delete("ratings");
      if (updatedValue?.length) {
        updatedValue?.forEach((rating) =>
          searchParams.append("ratings", rating)
        );
      }
    }

    setSearchParams(searchParams);
  };

  return (
    <div>
      {ratings.map((rating) => (
        <div
          key={rating}
          className="flex justify-start items-center gap-3 mb-2"
        >
          <Checkbox
            id={rating}
            checked={selectedRatings.includes(rating)}
            onCheckedChange={(checked) => {
              handleCheckedChange(checked, rating);
            }}
          />
          <label
            htmlFor={rating}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {rating}
          </label>
        </div>
      ))}
    </div>
  );
};
