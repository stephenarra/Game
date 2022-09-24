import { useState } from "react";
import Image from "next/future/image";

import GifSearch from "components/GifSearch";

const Home = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full h-full max-w-md">
        {!!selected && (
          <Image
            src={selected}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto m-h-full"
            alt=""
          />
        )}
        {!!selected && selected}
        <GifSearch
          onClick={(d) => {
            setSelected(d.images.original.url);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
