import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddBookMutation } from "../../redux/slices/book";

export function AddBookModal() {
  const [addBook, { isLoading }] = useAddBookMutation();
  const btnRef = useRef(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      rating: "",
      published_date: "",
      published_url: "",
      cover_photo_url: "",
      description: "",
    },
    mode: "onChange",
    criteriaMode: "all",
    reValidateMode: "onChange",
    resolver: async (data) => {
      const errors = {};
      if (!data.title) {
        errors.title = {
          type: "required",
          message: "Title is required",
        };
      }
      if (!data.author) {
        errors.author = {
          type: "required",
          message: "Author is required",
        };
      }
      if (!data.genre) {
        errors.genre = {
          type: "required",
          message: "Genre is required",
        };
      }
      if (!data.rating) {
        errors.rating = {
          type: "required",
          message: "Genre is required",
        };
      }
      if (!data.published_date) {
        errors.published_date = {
          type: "required",
          message: "Published Date is required",
        };
      }
      if (!data.published_url) {
        errors.published_url = {
          type: "required",
          message: "Published URL is required",
        };
      }
      if (!data.cover_photo_url) {
        errors.cover_photo_url = {
          type: "required",
          message: "Cover Photo URL is required",
        };
      }
      return { values: data, errors };
    },
  });

  const onSubmit = async (data) => {
    try {
      await addBook(data).unwrap();
      toast.success("Book added successfully");
      reset();
      btnRef.current.click();
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Controller
                name="title"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <div className="col-span-3">
                    <Input {...field} id="title" placeholder="Book Title" />
                    {errors.title && (
                      <p className="text-red-500 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author">Author</Label>
              <Controller
                name="author"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <div className="col-span-3">
                    <Input {...field} id="author" placeholder="Author Name" />
                    {errors.author && (
                      <p className="text-red-500 text-sm">
                        {errors.author.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="genre">Genre</Label>
              <Controller
                name="genre"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <div className="col-span-3">
                    <Input {...field} id="genre" placeholder="Genre" />
                    {errors.genre && (
                      <p className="text-red-500 text-sm">
                        {errors.genre.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating">Rating</Label>
              <Controller
                name="rating"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <div className="col-span-3">
                    <Input
                      {...field}
                      id="rating"
                      type="number"
                      placeholder="Rating"
                    />
                    {errors.rating && (
                      <p className="text-red-500 text-sm">
                        {errors.rating.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="published_date">Published Date</Label>
              <Controller
                name="published_date"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <div className="col-span-3">
                    <Input
                      {...field}
                      id="published_date"
                      type="date"
                      placeholder="Published Date"
                    />
                    {errors.published_date && (
                      <p className="text-red-500 text-sm">
                        {errors.published_date.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="published_url">Published URL</Label>
              <Controller
                name="published_url"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <div className="col-span-3">
                    <Input
                      {...field}
                      id="published_url"
                      placeholder="Published URL"
                    />
                    {errors.published_url && (
                      <p className="text-red-500 text-sm">
                        {errors.published_url.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cover_photo_url">Cover Photo URL</Label>
              <Controller
                name="cover_photo_url"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <div className="col-span-3">
                    <Input
                      {...field}
                      id="cover_photo_url"
                      placeholder="Cover Photo URL"
                    />
                    {errors.cover_photo_url && (
                      <p className="text-red-500 text-sm">
                        {errors.cover_photo_url.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Controller
                name="description"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="description"
                    placeholder="Description"
                    className="col-span-3"
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="button" variant="outline" ref={btnRef}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button type="submit" disabled={isLoading}>
                Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
