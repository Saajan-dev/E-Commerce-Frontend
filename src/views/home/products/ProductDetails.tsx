import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createWishlistService,
  getProductByID,
} from "../../../services/ProductService";
import { getErrorMessage } from "../../../utils/helpers";
import Loader from "../../../components/loader";
import { toastMessage } from "../../../components/ToastMessage";
import { addProductToCart } from "../../../services/CartService";
import { IoBagCheck } from "react-icons/io5";

const ProductDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const productID = pathname?.split("/")[3];

  const [imageURL, setImageURL] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>({});
  const [pagination] = useState({
    page: 1,
    size: 10,
  });

  useEffect(() => {
    getAllProductList();
  }, []);

  const getAllProductList = async () => {
    setisLoading(true);
    try {
      const response = await getProductByID({
        page: pagination?.page,
        size: pagination?.size,
        productID,
      });
      const { data, status } = response?.data;
      if (status) {
        setProductData({ ...data });
        setImageURL(data?.image_url[0]);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleWishlists = async (product_id: string, is_whislist: boolean) => {
    setisLoading(true);
    try {
      const response = await createWishlistService(product_id, !is_whislist);
      const { message, status } = response?.data;
      if (status) {
        setProductData((data: any) => ({ ...data, is_whislist: !is_whislist }));
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

  const handleAddToCart = async (
    product_id: string,
    is_cart: boolean,
    quantity: number
  ) => {
    setisLoading(true);
    try {
      let reqData = {
        is_cart: !is_cart,
        quantity,
        product_id,
      };
      const response = await addProductToCart(reqData);
      const { status, data, message } = response?.data;
      if (status) {
        setProductData((prev: any) => ({
          ...prev,
          is_cart: data?.products?.is_cart,
        }));
        navigate("/home-page/addtocart");
      } else {
        toastMessage("error", message);
      }
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      {productData && productData?.image_url?.length > 0 && (
        <div className="flex flex-col lg:flex-row items-start gap-6 max-w-7xl mx-auto p-4">
          <div className="flex flex-col gap-3 w-full lg:w-[70%] mx-auto p-4">
            <div className="rounded-lg overflow-hidden border shadow-md w-full h-[550px]">
              <img
                src={imageURL}
                alt="Main Product"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[...productData?.image_url].map((item: any, index: number) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    onClick={() => setImageURL(item)}
                    src={item}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-[155.73px] h-[155.73px] object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[50%] rounded-lg p-6 border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold mb-4">
                {productData?.name} ({productData?.total_product_count})
              </h1>

              <button
                className={`flex-none flex items-center justify-center w-9 h-9 rounded-full  bg-violet-50`}
                type="button"
                aria-label="Like"
                onClick={() =>
                  handleWishlists(
                    productData?.product_id,
                    productData?.is_whislist
                  )
                }
              >
                <span>
                  {productData?.is_whislist ? (
                    <FaHeart className="text-violet-600" />
                  ) : (
                    <FiHeart />
                  )}
                </span>
              </button>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-green-600">
                ₹ {Number(productData?.price).toLocaleString("en-IN")}.00
              </span>
              <span className="text-lg line-through text-gray-500 ml-4">
                ₹ {Number(productData?.strike_price).toLocaleString("en-IN")}.00
              </span>
              <span className="text-sm text-green-500 ml-4">
                {productData?.discount}% OFF
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded">
                <span className="text-sm font-bold">3.9</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27l5.18 3.05-1.64-7.03L20.82 9h-7.08L12 2 9.26 9H2.18l5.46 4.29-1.64 7.03L12 17.27z"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                3,309 ratings and 337 reviews
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Available Offers:</h2>
              <ul className="list-disc list-inside text-gray-700 text-md space-y-2">
                <li>
                  5% Unlimited Cashback on{" "}
                  <span className="text-blue-500 font-medium cursor-pointer">
                    Flipkart Axis Bank Credit Card
                  </span>
                </li>
                <li>12% off up to ₹1,000 on HDFC Bank Credit Card EMI</li>
                <li>Special Price Get at flat ₹699</li>
                {productData?.description.length > 0 &&
                  productData?.description.map((item: any, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
              <p className="text-blue-600 text-sm hover:underline cursor-pointer">
                +6 more offers
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Delivery</h2>
              <p className="text-sm text-gray-500 mt-2">
                Delivery by Dec 29, Free ₹40
              </p>
            </div>

            <div className="flex gap-4 items-center justify-center">
              {productData?.is_cart ? (
                <span className="text-xs text-gray-500 font-medium bg-green-100 border border-green-300 rounded-md px-6 py-2 mt-2 inline-flex items-center gap-2 cursor-pointer">
                  <IoBagCheck className="text-green-500 text-[20px]" />
                  Product added in cart.
                </span>
              ) : (
                <button
                  className="flex-1 bg-violet-500 text-white py-3 rounded-md hover:bg-violet-600 transition"
                  onClick={() =>
                    handleAddToCart(
                      productData?.product_id,
                      productData?.is_cart,
                      productData?.quantity_count
                    )
                  }
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isLoading && <Loader isVisible={isLoading} />}
    </>
  );
};

export default ProductDetails;
