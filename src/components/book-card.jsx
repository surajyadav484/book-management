import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useReadBookMutation } from "../../redux/slices/book";

const BookCard = ({ book = {} }) => {
  const {
    title,
    author,
    description,
    rating,
    genre,
    cover_image_url,
    published_date,
  } = book;

  const [readBook, { isLoading }] = useReadBookMutation();

  const handleRead = async (book) => {
    try {
      await readBook({ book: book?._id }).unwrap();
      window.open(book?.published_url, "_blank");
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <img
          src={cover_image_url}
          alt="Book Cover"
          className="h-[350px] min-w-[320px]"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="flex justify-between">
          <span className="max-w-[85%] text-start">{title}</span>
          <Badge className="bg-gray-600">{rating}</Badge>
        </CardTitle>
        <CardDescription className="max-w-[320px] truncate mt-2 text-start">
          {description}
        </CardDescription>
        <div className="mt-2 text-start flex flex-col">
          <span className="text-xs font-semibold">Author: {author}</span>
          <span className="text-xs font-semibold">
            Published Date: {published_date}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="text-xs">
          {genre}
        </Button>
        <Button onClick={() => handleRead(book)} disabled={isLoading}>
          Read
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
