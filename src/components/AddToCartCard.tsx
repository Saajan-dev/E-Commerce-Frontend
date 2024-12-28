import { BsInfoCircleFill } from "react-icons/bs";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddToCartCard = ({
  item,
  handleDecrement,
  handleIncrement,
  handleRemove,
}: any) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-100 rounded-md shadow-md cursor-pointer">
      <div
        className="w-full sm:w-36 sm:h-36 bg-white border rounded-md flex items-center justify-center cursor-pointer"
        onClick={() => console.log(`View product ${item?.products?.name}`)}
      >
        <img
          src={item?.products?.image_url[0]}
          alt={item?.products?.name}
          className="object-cover w-full h-full rounded-md"
        />
      </div>

      <div className="flex-1">
        <button
          type="button"
          className="text-lg font-semibold truncate"
          onClick={() =>
            navigate(`/home-page/productDetails/${item?.product_id}`)
          }
        >
          {item?.products?.name}
        </button>
        <p className="text-blue-600 font-bold mt-2">
          ₹{item?.products?.price.toLocaleString()}.00
          <span className="line-through text-gray-400 ml-2">
            ₹{item?.products?.strike_price.toLocaleString()}.00
          </span>
          <span className="text-green-600 ml-2">
            Save ₹
            {(
              item?.products?.strike_price - item?.products?.price
            ).toLocaleString()}
            .00
          </span>
        </p>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {item?.products?.description[0]}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <button
            className="w-8 h-8 border rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300"
            onClick={() =>
              handleDecrement(
                item?.add_to_cart_id,
                item?.products?.is_cart,
                item?.products?.quantity_count
              )
            }
          >
            -
          </button>
          <input
            type="text"
            value={item?.products?.quantity_count}
            readOnly
            className="w-12 text-center outline-none border rounded-md bg-white disabled:"
          />
          <button
            className="w-8 h-8 border rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300"
            onClick={() =>
              handleIncrement(
                item?.add_to_cart_id,
                item?.products?.total_product_count,
                item?.products?.is_cart,
                item?.products?.quantity_count
              )
            }
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-500 font-medium bg-green-100 border border-green-300 rounded-md px-2 py-1 mt-2 inline-flex items-center gap-2">
          <BsInfoCircleFill className="text-green-500" />
          {`Only ${item?.products?.total_product_count} products left.`}
        </span>
      </div>

      <div className="self-start lg:self-center">
        <button
          className="text-red-500 text-2xl"
          onClick={() =>
            handleRemove(item?.add_to_cart_id, item?.products?.quantity_count)
          }
        >
          <FaTimesCircle />
        </button>
      </div>
    </div>
  );
};

export default AddToCartCard;

// import { FaTimesCircle } from "react-icons/fa";

// const AddToCartCard = ({
//   item,
//   handleDecrement,
//   handleIncrement,
//   handleRemove,
// }: any) => {
//   return (
//     <div className="flex gap-4 p-4 bg-gray-100 rounded-md shadow-md">
//       <div
//         className="w-36 h-36 bg-white border rounded-md flex items-center justify-center cursor-pointer"
//         onClick={() => console.log(`View product ${item.productname}`)}
//       >
//         <img
//           src={item?.products?.image_url[0]}
//           alt={item?.products?.name}
//           className="object-cover w-full h-full"
//         />
//       </div>

//       <div className="flex-1">
//         <p className="text-lg font-semibold">{item?.products?.name}</p>
//         {/* <p className="text-gray-500 text-sm">{item.productCode}</p> */}
//         <p className="text-blue-600 font-bold">
//           ₹{item?.products?.price.toLocaleString()}.00
//           <span className="line-through text-gray-400 ml-2">
//             ₹{item?.products?.strike_price.toLocaleString()}.00
//           </span>
//           <span className="text-green-600 ml-2">
//             Save ₹{(item?.products?.strike_price - item.price).toLocaleString()}
//             .00
//           </span>
//         </p>
//         <p className="text-gray-500 text-sm">
//           {item?.products?.description[0]}
//         </p>

//         <div className="mt-4 flex items-center gap-2">
//           <button
//             className="w-8 h-8 border rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300"
//             onClick={() => handleDecrement(item?.product_id)}
//           >
//             -
//           </button>
//           <input
//             type="text"
//             value={item?.products?.quantity_count}
//             readOnly
//             className="w-12 text-center border rounded-md"
//           />
//           <button
//             className="w-8 h-8 border rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300"
//             onClick={() => handleIncrement(item?.product_id)}
//           >
//             +
//           </button>
//         </div>
//       </div>

//       <button
//         className="text-red-500 text-2xl"
//         onClick={() => handleRemove(item?.product_id)}
//       >
//         <FaTimesCircle />
//       </button>
//     </div>
//   );
// };

// export default AddToCartCard;
