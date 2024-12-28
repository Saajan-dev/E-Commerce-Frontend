import { useEffect, useState } from "react";
import CustomCarousel from "../../components/CustomCarousel";
import { carouselData } from "../../utils/constants";
import CategoryLists from "./CategoryLists";
import ProductList from "./ProductList";
import { getAllCategoryLists } from "../../services/CategoryService";
import { getErrorMessage } from "../../utils/helpers";
import Loader from "../../components/loader";
import { getAllProductLists } from "../../services/ProductService";

const HomePage = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [pagination] = useState({
    page: 1,
    size: 10,
  });

  useEffect(() => {
    getCategoryData();
    getAllProductList();
  }, []);

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
      <CustomCarousel carouselData={carouselData} />
      <div className="max-w-[1280px] mx-auto mt-2">
        <CategoryLists categoryLists={categoryData} />
        <ProductList productLists={productData} />
      </div>
      {isLoading && <Loader isVisible={isLoading} />}
    </>
  );
};

export default HomePage;
