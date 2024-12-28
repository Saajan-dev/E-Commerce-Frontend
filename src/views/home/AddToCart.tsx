import { useEffect, useState } from "react";
import AddToCartCard from "../../components/AddToCartCard";
import { getErrorMessage } from "../../utils/helpers";
import {
  addProductToCart,
  getAllCartData,
  orderProduct,
  removeCartData,
} from "../../services/CartService";
import { toastMessage } from "../../components/ToastMessage";
import Loader from "../../components/loader";
import noCartDataImage from "../../assets/images/png/noCart.png";
import CustomModal from "../../components/CustomModal";
import orderedSuccessfull from "../../assets/images/jpg/order-confirmed.jpg";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const navigate = useNavigate();
  const [cartData, setcartData] = useState<any[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isOrdered, setisOrdered] = useState<boolean>(false);

  useEffect(() => {
    handleGetCartData();
  }, []);

  const handleGetCartData = async () => {
    try {
      const response = await getAllCartData();
      const { status, data, message } = response?.data;
      if (status) {
        setcartData([...data?.list]);
      } else {
        toastMessage("error", message);
      }
    } catch (error) {
      getErrorMessage(error);
    }
  };

  const getTotalPrice = () => {
    return [...cartData].reduce((current, prev) => {
      return (
        parseInt(current) +
        parseInt(prev?.products?.price) *
          parseInt(prev?.products?.quantity_count)
      );
    }, 0);
  };

  const getSubTotalPrice = () => {
    return [...cartData].reduce(
      (current, prev) =>
        parseInt(current) +
        parseInt(prev?.products?.strike_price) *
          parseInt(prev?.products?.quantity_count),
      0
    );
  };

  const getTotalQuantity = () => {
    return [...cartData].reduce((current, prev) => {
      return parseInt(current) + parseInt(prev?.products?.quantity_count);
    }, 0);
  };

  const handleDecrement = async (
    cart_id: string,
    is_cart: boolean,
    quantity: number
  ) => {
    const decrement = [...cartData]?.map((item) => {
      return item?.add_to_cart_id === cart_id && item?.quantity_count > 1
        ? {
            ...item,
            quantity_count: item.quantity_count - 1,
            products: {
              ...item?.products,
              quantity_count: item?.products?.quantity_count - 1,
              total_product_count: item?.products?.total_product_count + 1,
            },
          }
        : item;
    });
    try {
      let reqData = {
        is_cart,
        quantity,
        cart_id,
        actionType: "decrement",
      };
      const response = await addProductToCart(reqData);
      const { status, message } = response?.data;
      if (status) {
        setcartData(decrement);
      } else {
        toastMessage("error", message);
      }
    } catch (error) {
      getErrorMessage(error);
    }
  };

  const handleIncrement = async (
    cart_id: string,
    totalCount: number,
    is_cart: boolean,
    quantity: number
  ) => {
    const increment = [...cartData]?.map((item) => {
      return item?.add_to_cart_id === cart_id &&
        item?.quantity_count < totalCount
        ? {
            ...item,
            quantity_count: item.quantity_count + 1,
            products: {
              ...item?.products,
              quantity_count: item?.products?.quantity_count + 1,
              total_product_count: item?.products?.total_product_count - 1,
            },
          }
        : item;
    });
    try {
      let reqData = {
        is_cart,
        quantity,
        cart_id,
        actionType: "increment",
      };
      const response = await addProductToCart(reqData);
      const { status, message } = response?.data;
      if (status) {
        setcartData(increment);
      } else {
        toastMessage("error", message);
      }
    } catch (error) {
      getErrorMessage(error);
    }
  };

  const handleRemove = async (cart_id: string, quantity_count: number) => {
    setisLoading(true);
    try {
      const response = await removeCartData(cart_id, quantity_count);
      const { status, message, data } = response?.data;
      if (status) {
        console.log(data);
        setcartData((prev) =>
          prev?.filter((product) => product?.add_to_cart_id !== cart_id)
        );
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

  const handlePay = async () => {
    setisLoading(true);
    setisOrdered(true);
    const getItems = [...cartData].map((product) => {
      return {
        product_id: product?.products?.product_id,
        order_count: product?.products?.quantity_count,
      };
    });

    const reqData = {
      order_data: getItems,
      total_price: getTotalPrice(),
      status: "ordered",
    };
    try {
      const response = await orderProduct(reqData);
      const { status, message } = response?.data;
      if (status) {
        setcartData([]);
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
      <div className="container mx-auto py-8 min-h-[87vh]">
        {[...cartData].length > 0 ? (
          <>
            <h4 className="text-lg font-bold border-b pb-2">
              Shopping Cart ({cartData?.length})
            </h4>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                {cartData?.length > 0 &&
                  [...cartData].map((item, index) => (
                    <AddToCartCard
                      key={index}
                      item={item}
                      handleDecrement={handleDecrement}
                      handleRemove={handleRemove}
                      handleIncrement={handleIncrement}
                    />
                  ))}
              </div>

              <div className="w-full max-h-max lg:w-1/3 bg-gray-100 p-6 rounded-md shadow-md">
                <h4 className="text-lg font-bold mb-4">Price Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <p>Subtotal</p>
                    <p>₹{getSubTotalPrice()?.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <p>You Saved</p>
                    <p>
                      - ₹
                      {(getSubTotalPrice() - getTotalPrice()).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <p>Total Items</p>
                    <p>{getTotalQuantity()}</p>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <p>Shipping Fee</p>
                    <p>{getTotalPrice() > 1500 ? "Free" : "₹100"}</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <p>Total Cost</p>
                    <p>
                      ₹
                      {(getTotalPrice() < 1500
                        ? getTotalPrice() + 100
                        : getTotalPrice()
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handlePay}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <img
              src={noCartDataImage}
              className="w-[40%] "
              alt="No Cart Data"
            />
          </div>
        )}
      </div>
      {isLoading && <Loader isVisible={isLoading} />}
      {isOrdered && (
        <CustomModal
          title="Order Placed Successfully"
          isOpen={isOrdered}
          renderContent={() => (
            <div className="w-full flex justify-center">
              <img
                src={orderedSuccessfull}
                className="w-[60%]"
                alt="Order successfull"
              />
            </div>
          )}
          onPressNegativeBtn={() => (
            setisOrdered(false), navigate("/home-page")
          )}
        />
      )}
    </>
  );
};

export default AddToCart;
