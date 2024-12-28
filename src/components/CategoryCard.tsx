interface cardProps {
  image: string;
  name: string;
  bgcolor?: string;
}

const CategoryCard = ({ image, name, bgcolor }: cardProps) => {
  return (
    <button
      type="button"
      className="p-4 bg-white my-3 mx-3 border-transparent rounded-lg w-full"
      style={{
        boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div
        className=" border-transparent rounded-lg flex items-center justify-center p-4"
        style={{
          backgroundColor: bgcolor || "#ffe2d5",
        }}
      >
        <img src={image} alt={name} className="w-24 h-24 object-contain" />
      </div>
      <p className="mt-3 text-base font-medium text-center">{name}</p>
    </button>
  );
};

export default CategoryCard;
