import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const USER_ID = import.meta.env.VITE_USER_ID;

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-management-server-1-r07t.onrender.com",
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (params) => {
        const {
          pageNumber = 1,
          pageSize = 20,
          title,
          filters = {},
          sort,
        } = params || {};
        let queryString = `books?pageNumber=${pageNumber}&pageSize=${pageSize}`;

        if (title) {
          queryString += `&title=${encodeURIComponent(title)}`;
        }
        const filterKeys = Object.keys(filters);
        if (filterKeys.length > 0) {
          filterKeys.forEach((key) => {
            if (Array.isArray(filters[key])) {
              filters[key].forEach((value) => {
                queryString += `&${key}[]=${encodeURIComponent(value)}`;
              });
            }
          });
        }
        if (sort) {
          queryString += `&sort=${encodeURIComponent(sort)}`;
        }

        return queryString;
      },
      providesTags: ["Book"],
    }),
    getAllAuthors: builder.query({
      query: () => "authors",
    }),
    getAllGenre: builder.query({
      query: () => "genre",
    }),
    getBookRecommendation: builder.mutation({
      query: (queryString, userId = USER_ID) => ({
        url: `/recommendation/${userId}`,
        method: "POST",
        body: queryString,
      }),
    }),
    readBook: builder.mutation({
      query: (body) => ({
        url: `/reading-history`,
        method: "POST",
        body: { ...body, user: USER_ID },
      }),
    }),
    addBook: builder.mutation({
      query: (body) => ({
        url: `/books`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetAllAuthorsQuery,
  useGetAllGenreQuery,
  useGetBookRecommendationMutation,
  useReadBookMutation,
  useAddBookMutation,
} = bookApi;
