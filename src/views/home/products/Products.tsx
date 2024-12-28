import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { getAllProductLists } from "../../../services/ProductService";
import { getErrorMessage } from "../../../utils/helpers";
import { getAllCategoryLists } from "../../../services/CategoryService";
import Loader from "../../../components/loader";

const Products = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [pagination] = useState({
    page: 1,
    size: 10,
  });
  const [filteredProductLists, setFilteredProductLists] = useState<any[]>([]);

  useEffect(() => {
    getCategoryData();
    getAllProductList();
  }, []);

  useEffect(() => {
    setCategoryData([...categoryData]);
    setFilteredProductLists([...productData]);
  }, [productData]);

  const handleView = (id: string) => {
    navigate(`/home-page/productDetails/${id}`);
  };

  const handleCategoryFilter = (categoryName: string) => {
    if (categoryName === "All") {
      setFilteredProductLists([...productData]);
    } else {
      const filteredData = productData.filter(
        (item) =>
          item?.category?.name?.toLowerCase() === categoryName?.toLowerCase()
      );
      setFilteredProductLists(filteredData);
    }
  };

  const getCategoryData = async () => {
    setisLoading(true);
    try {
      const response = await getAllCategoryLists();
      const { data, status } = response?.data;
      if (status) {
        setCategoryData([...data]);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  const getAllProductList = async () => {
    setisLoading(true);
    try {
      const response = await getAllProductLists({
        page: pagination?.page,
        size: pagination?.size,
      });
      const { data, status } = response?.data;
      if (status) {
        setProductData([...data?.list]);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row items-start max-w-[90%] min-h-[87vh] my-5 mx-auto gap-5">
        <div className="border w-full lg:w-[20%] p-4 bg-white rounded-md">
          <h2 className="text-lg font-semibold mb-4">Category Lists</h2>
          <ul className="space-y-2">
            <button
              onClick={() => handleCategoryFilter("All")}
              className="block w-full text-start p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              All
            </button>
            {categoryData.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryFilter(category.name)}
                className="block w-full text-start p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                {category.name}
              </button>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full lg:w-[80%]">
          {filteredProductLists.length > 0 ? (
            filteredProductLists.map((product: any) => {
              const fullProduct = {
                ...product,
                onView: handleView,
              };
              return <ProductCard key={product.product_id} {...fullProduct} />;
            })
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )}
        </div>
      </div>

      {isLoading && <Loader isVisible={isLoading} />}
    </>
  );
};

export default Products;
