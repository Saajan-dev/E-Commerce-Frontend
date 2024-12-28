import { MdKeyboardArrowRight } from "react-icons/md";
import CategoryCard from "../../components/CategoryCard";

const CategoryLists = ({ categoryLists }: any) => {
  return (
    <div className="max-w-[1280px] mx-auto mt-4 px-4">
      <div className="flex items-center justify-between w-full pb-2 border-b border-gray-300">
        <h1 className="text-lg md:text-xl font-medium">Categories</h1>
        <span className="text-2xl text-gray-500 cursor-pointer hover:text-gray-800">
          <MdKeyboardArrowRight />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4">
        {[...categoryLists].map((item, index) => (
          <CategoryCard
            key={index}
            image={item?.image_url}
            name={item?.name}
            bgcolor={item?.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryLists;
