import { debounce } from "lodash";
import React, { Dispatch, FC, SetStateAction } from "react";

interface Props {
  setSearchParams: Dispatch<SetStateAction<string | null>>;
  subject?: string;
  type: "text" | "number";
}

const SearchBar: FC<Props> = ({ setSearchParams, subject = "ID", type }) => {
  const maxCount: number = 15000;

  // update value and search
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (Number.parseInt((event.target as HTMLInputElement).value) > maxCount)
      return;
    setSearchParams((event.target as HTMLInputElement).value);
  };

  const debouncedOnChange = debounce(onChange, 500);

  // prevent keys
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (
      type === "number" &&
      event.key !== "Backspace" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      !/[0-9]/.test(event.key)
    ) {
      event.preventDefault();
    }
  };

  // ID check
  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (type === "text") return;
    if (Number((event.target as HTMLInputElement).value) > maxCount) {
      (event.target as HTMLInputElement).value = maxCount.toString();
    }
  };

  return (
    <input
      className={`h-[40px] w-[200px] mx-auto text-sm px-4 border border-black/50 rounded-lg 
      focus:!outline-none focus:bg-gray-100 bg-transparent`}
      type="search"
      id="search"
      name="search"
      placeholder={`Search ${subject}`}
      onChange={(e) => debouncedOnChange(e)}
      onInput={(e) => onInput(e)}
      onKeyDown={(e) => onKeyDown(e)}
      onWheel={(e) => (e.target as HTMLInputElement).blur()}
    />
  );
};

export default SearchBar;
