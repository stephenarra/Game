import { useState, useEffect } from "react";

interface SlideshowProps {
  images: any[];
  delay?: number;
  onComplete?: () => void;
}

const useSlideShow = ({
  images,
  delay = 4000,
  onComplete = () => {},
}: SlideshowProps) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const newIndex = index + 1;
    setTimeout(() => {
      if (newIndex <= images.length - 1) {
        setIndex(newIndex);
      } else {
        setIsAnimating(false);
        onComplete();
      }
    }, delay);
  }, [index]); // eslint-disable-line

  console.log(isAnimating, index, images.length);

  return {
    isAnimating,
    image: images[index],
    reset: () => {
      setIndex(0);
    },
  };
};

export default useSlideShow;
