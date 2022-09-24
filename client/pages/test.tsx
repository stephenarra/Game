import { useState } from "react";
import Image from "next/future/image";

import GifSearch from "components/GifSearch";

const Home = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center w-full">
        {!!selected && (
          <Image
            src={selected.url}
            width={selected.width}
            height={selected.height}
            alt=""
          />
        )}
      </div>
      <div className="w-full max-w-md">
        <GifSearch
          onClick={(d) => {
            setSelected(d.images.original);
          }}
        />
      </div>
    </div>
  );
};

{
  /* <Image
src={selected}
width="0"
height="0"
sizes="100vw"
className="w-full h-auto m-h-full"
alt=""
/> */
}

export default Home;
