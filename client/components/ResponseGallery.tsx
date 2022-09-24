import { Gallery } from "react-grid-gallery";
import { Image } from "game-types/Game";

interface Props {
  responses: { [key: string]: Image };
  onClick?: (id: string, image: Image) => void;
}

const ResponseGallery = ({ responses, onClick }: Props) => (
  <Gallery
    enableImageSelection={false}
    images={Object.keys(responses)
      .map((id: string) => ({ resId: id, ...responses[id] }))
      .map((img) => ({
        id: img.resId,
        src: img.url,
        width: img.width,
        height: img.height,
      }))}
    onClick={(i, img) => {
      if (onClick) {
        onClick(img.id, responses[img.id]);
      }
    }}
  />
);

export default ResponseGallery;
