import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState, ComponentProps } from "react";
import { useElementSize } from "usehooks-ts";
import cx from "classnames";

// todo: move to api?
const API_KEY = "zi2N0oFUhUygLk2deyMRhn25zgYwQ0hA";
const gf = new GiphyFetch(API_KEY);

type GridProps = ComponentProps<typeof Grid>;
interface SearchProps {
  onClick: GridProps["onGifClick"];
  placeholder?: string;
  className?: string;
}

const Search = ({ onClick, placeholder = "", className = "" }: SearchProps) => {
  const [search, setSearch] = useState("");

  const fetchGifs = async (offset: number) => {
    const result = await gf.search(search, { offset, limit: 20 });
    return result;
  };

  const [ref, { width }] = useElementSize();

  return (
    <div
      ref={ref}
      className={cx("flex flex-col h-full overflow-auto", className)}
    >
      <input
        type="text"
        className="block w-full my-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-1 overflow-auto">
        <Grid
          key={search}
          onGifClick={onClick}
          fetchGifs={fetchGifs}
          width={width}
          columns={3}
          gutter={6}
          noLink={true}
          hideAttribution={true}
        />
      </div>
    </div>
  );
};
export default Search;
