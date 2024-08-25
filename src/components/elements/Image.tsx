type ImageProps = {
  src: string;
  alt: string;
  rotation?: Rotation;
  size?: "sm" | "md";
};

type Rotation = 1 | 2 | 3 | 4 | 5 | 6;

const Image = ({ src, alt, rotation = 2, size = "md" }: ImageProps) => {
  const getRotation = (amount: Rotation) => {
    switch (amount) {
      case 1:
        return "rotate-6";
      case 2:
        return "rotate-2";
      case 3:
        return "rotate-3";
      case 4:
        return "-rotate-6";
      case 5:
        return "-rotate-2";
      case 6:
        return "-rotate-3";
    }
  };

  const polaroidSize =
    size === "sm"
      ? ["p-2 rounded-sm", "h-1", "rounded-sm mb-2", "h-4", "&h=200&w=200"]
      : ["p-4 rounded-md", "h-2", "rounded-sm mb-2", "h-8", "&h=400&w=400"];

  return (
    <div
      className={`bg-white ${polaroidSize[0]} shadow-lg border border-gray-300 transform ${getRotation(rotation)}`}
    >
      <div className={polaroidSize[1]}></div>
      <img
        className={`w-full aspect-square object-cover ${polaroidSize[2]}`}
        src={`https://marienvanoverbeek.imgix.net/${src}?fit=crop${polaroidSize[4]}`}
        alt={alt}
      />
      <div className={polaroidSize[3]}></div>
    </div>
  );
};

export default Image;
