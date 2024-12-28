import { MdKeyboardArrowRight } from "react-icons/md";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductList = ({ productLists }: any) => {
  const navigate = useNavigate();

  const handleView = (id: string) => {
    navigate(`/home-page/productDetails/${id}`);
  };
  return (
    <div className="max-w-[1280px] mx-auto mt-4 px-4">
      <div className="flex items-center justify-between w-full pb-2 border-b border-gray-300">
        <h1 className="text-lg md:text-xl font-medium">Products</h1>
        <button
          type="button"
          onClick={() => navigate("/home-page/products")}
          className="text-2xl text-gray-500 cursor-pointer hover:text-gray-800"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 p-4 w-full">
        {productLists.length > 0 &&
          [...productLists].slice(0, 4).map((product: any) => {
            const fullProduct = {
              ...product,
              onView: handleView,
            };
            return <ProductCard key={product.product_id} {...fullProduct} />;
          })}
      </div>
    </div>
  );
};

export default ProductList;
