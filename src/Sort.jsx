import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "react-router-dom";

export default function Sort() {
  const sort = [
    {
      value: "publishedDateAsc",
      label: "Published Date Ascending",
    },
    {
      value: "publishedDateDesc",
      label: "Published Date Descending",
    },
    {
      value: "ratingAsc",
      label: "Rating Ascending",
    },
    {
      value: "ratingDesc",
      label: "Rating Descending",
    },
  ];

  const params = new URLSearchParams();
  const [searchParams, setSearchParams] = useSearchParams(params);
  const selectedSort = searchParams.get("sort");

  const handleChange = (value) => {
    console.log("🚀 ~ handleChange ~ value:", value);
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <h2 className="mb-5 font-semibold">Sort By</h2>
      <RadioGroup onValueChange={handleChange} value={selectedSort}>
        {sort.map((obj) => (
          <div className="flex items-center space-x-2" key={obj.value}>
            <RadioGroupItem value={obj.value} id={obj.value} />
            <label htmlFor={obj.value}>{obj.label}</label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
