import { Gallery } from "react-grid-gallery";
import { Image } from "game-types/Game";
import { shuffle } from "lodash";

type Responses = { [key: string]: Image };
interface Props {
  responses: Responses;
  onClick?: (id: string, image: Image) => void;
}

export const getImages = (responses: Responses) =>
  shuffle(
    Object.keys(responses)
      .map((id: string) => ({ resId: id, ...responses[id] }))
      .map((img) => ({
        id: img.resId,
        src: img.url,
        width: img.width,
        height: img.height,
      }))
  );

const ResponseGallery = ({ responses, onClick }: Props) => (
  <Gallery
    enableImageSelection={false}
    images={getImages(responses)}
    onClick={(i, img) => {
      if (onClick) {
        onClick(img.id, responses[img.id]);
      }
    }}
  />
);

export default ResponseGallery;
