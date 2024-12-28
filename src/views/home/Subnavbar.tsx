import { TbSearch } from "react-icons/tb";
import { categoryLists } from "../../utils/constants";

const Subnavbar = () => {
  return (
    <div className="bg-gray-800 h-14 text-white">
      <div className="w-full max-w-[1280px] mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex overflow-x-auto space-x-3 scrollbar-hide">
          {[...categoryLists]?.map((item) => (
            <button
              key={item?.category_id}
              type="button"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white whitespace-nowrap"
            >
              {item?.name}
            </button>
          ))}
        </div>

        <div className="w-[40%] max-w-[300px] hidden sm:flex">
          <div className="bg-gray-600 py-1 px-2 rounded-md flex items-center text-sm border-2 border-transparent focus-within:border-gray-400 w-full">
            <TbSearch className="text-gray-300" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none bg-transparent px-2 text-white placeholder-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subnavbar;
