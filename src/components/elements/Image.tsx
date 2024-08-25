type ImageProps = {
  src: string;
  alt: string;
};

const Image = ({ src, alt }: ImageProps) => {
  return <img src={`/assets/${src}`} alt={alt} />;
};

export default Image;
