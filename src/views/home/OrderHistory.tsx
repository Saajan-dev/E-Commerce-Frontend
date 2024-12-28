import React, { useEffect, useState } from "react";
import { getErrorMessage } from "../../utils/helpers";
import { getAllOrderProduct } from "../../services/CartService";
import { toastMessage } from "../../components/ToastMessage";

const OrderHistory = () => {
  const [orderData, setorderData] = useState<any[]>([]);

  const statusColors: any = {
    ordered: "bg-blue-500",
    processing: "bg-yellow-500",
    shipped: "bg-orange-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = async () => {
    try {
      const response = await getAllOrderProduct();
      const { status, data, message } = response?.data;
      if (status) {
        setorderData(data);
        toastMessage("success", message);
      } else {
        toastMessage("error", message);
      }
    } catch (error) {
      getErrorMessage(error);
    }
  };
  return (
    <div className="container mx-auto py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>

      <div className="space-y-6">
        {[...orderData].map((order) => (
          <div
            key={order.product_id}
            className="flex flex-col lg:flex-row bg-white rounded-md shadow-md p-6"
          >
            {/* Product Image */}
            <div className="w-full lg:w-1/4 flex items-center justify-center mb-4 lg:mb-0">
              <img
                src={order.image_url[0]}
                alt={order.product_name}
                className="w-48 h-48 object-cover rounded-md"
              />
            </div>

            <div className="flex-1 lg:px-6">
              <h2 className="text-lg font-bold text-gray-800">
                {order.product_name}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {order.description[0]}
              </p>
              <div className="mt-4">
                <p className="text-sm">
                  Order Date:{" "}
                  <span className="font-medium">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm">
                  Total Price:{" "}
                  <span className="font-medium text-green-600">
                    ₹{order.total_price.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm">
                  Quantity:{" "}
                  <span className="font-medium">{order.order_count}</span>
                </p>
              </div>
            </div>

            <div className="flex-1 lg:w-1/3">
              <div className="flex items-center justify-between mt-6 lg:mt-0">
                <p className="text-sm font-medium">Order Status:</p>
                <span
                  className={`px-3 py-1 text-sm text-white rounded-full ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mt-4 flex items-center space-x-4">
                {["ordered", "processing", "shipped", "delivered"].map(
                  (status, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                          statusColors[status]
                        } ${status === order.status ? "" : "opacity-50"}`}
                      >
                        {index + 1}
                      </div>
                      {index < 3 && (
                        <div
                          className={`flex-1 h-1 ${
                            index + 1 <=
                            [
                              "ordered",
                              "processing",
                              "shipped",
                              "delivered",
                            ].indexOf(order.status)
                              ? statusColors[status]
                              : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
