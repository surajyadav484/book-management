import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetBookRecommendationMutation } from "../../redux/slices/book";
import { useRef } from "react";
import BookCard from "./book-card";
import { toast } from "react-toastify";

export function RecommendationDrawer() {
  const [getBookRecommendation, { isError, isLoading, data }] =
    useGetBookRecommendationMutation();

  const inputRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const input = inputRef.current.value;
      if (input) {
        await getBookRecommendation({ userQuery: input }).unwrap();
      }
      inputRef.current.value = "";
    } catch (error) {
      toast.error(error?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Get Recommendation</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Recommendation</SheetTitle>
        </SheetHeader>
        <div className="flex">
          <Input
            type="text"
            placeholder="Eg: Suggest me best books based on my reading genre"
            ref={inputRef}
          />
          <Button disabled={isLoading} onClick={onSubmit}>
            Send
          </Button>
        </div>
        <div className="max-h-screen overflow-auto py-10">
          <div className="flex justify-center items-center flex-wrap gap-5 mb-20">
            {isLoading
              ? "Loading.."
              : data?.map((details) => (
                  <div key={details?.book?._id} className="max-w-[400px]">
                    <BookCard book={details?.book || details} />

                    <p className="mt-3">
                      <span className="font-semibold">Suggestion Reason: </span>
                      {details?.similarity}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
