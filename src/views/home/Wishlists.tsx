import { useEffect, useState } from "react";
import WishlistsCard from "../../components/WishlistsCard";
import {
  getAllWishListsData,
  removeWishlistService,
} from "../../services/ProductService";
import { getErrorMessage } from "../../utils/helpers";
import { toastMessage } from "../../components/ToastMessage";
import Loader from "../../components/loader";
import noDataImage from "../../assets/images/png/noData.png";

const Wishlists = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [wishlistsData, setWishlistsData] = useState<any[]>([]);
  const [pagination] = useState({
    page: 1,
    size: 10,
  });

  useEffect(() => {
    handleWishlists();
  }, []);

  const handleWishlists = async () => {
    setisLoading(true);
    try {
      const response = await getAllWishListsData(
        pagination?.page,
        pagination?.size
      );
      const { data, status, message } = response?.data;
      if (status) {
        setWishlistsData([...data?.list]);
        toastMessage("success", message);
      } else {
        toastMessage("error", message);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleRemoveWishlist = async (
    wishlist_id: string,
    product_id: string,
    is_wishlist: boolean
  ) => {
    setisLoading(true);
    try {
      const response = await removeWishlistService(
        product_id,
        wishlist_id,
        !is_wishlist
      );
      const { message, status } = response?.data;
      if (status) {
        setWishlistsData((data) =>
          data?.filter((product) => product?.product_id !== product_id)
        );
        toastMessage("success", message);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[87vh] my-5">
        <div className="max-w-[1280px] mx-auto">
          <div
            className={`${
              wishlistsData?.length < 1 && "flex items-center justify-center"
            }`}
          >
            {wishlistsData?.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                {[...wishlistsData]?.map((item, index) => (
                  <WishlistsCard
                    key={index}
                    product={item}
                    onLike={handleRemoveWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-[50%]">
                <img src={noDataImage} alt="No data Image" loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoading && <Loader isVisible={isLoading} />}
    </>
  );
};

export default Wishlists;
