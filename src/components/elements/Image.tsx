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
      ? ["p-2 rounded-sm", "rounded-sm mb-2", "h-4"]
      : ["p-4 rounded-md", "rounded-md mb-4", "h-8"];

  return (
    <div
      className={`bg-white ${polaroidSize[0]} shadow-lg border border-gray-300 transform ${getRotation(rotation)}`}
    >
      <img
        className={`w-full object-cover ${polaroidSize[1]}`}
        src={`https://marienvanoverbeek.imgix.net/${src}?fit=crop&h=400&w=400`}
        alt={alt}
      />
      <div className={polaroidSize[2]}></div>
    </div>
  );
};

export default Image;
