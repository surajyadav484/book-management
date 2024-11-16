import { useEffect, useState } from "react";

const useDebounce = (title, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(title);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(title);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [title, delay]);

  return debouncedValue;
};

export default useDebounce;
