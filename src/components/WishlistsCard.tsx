import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { TiStar } from "react-icons/ti";

const WishlistsCard = ({ product, onLike }: any) => {
  return (
    <div className="rounded-lg border border-gray-300 p-4 shadow-md flex bg-gray-200 gap-6 hover:shadow-lg transition-all">
      <div className="flex-none w-40 h-40 rounded-lg overflow-hidden border">
        <img
          className="w-full h-full object-cover"
          src={product?.products?.image_url[0]}
          alt={product?.products?.name}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 truncate max-w-[344px]">
            {product?.products?.name}
          </h3>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-gray-200 hover:bg-gray-100 transition"
            aria-label="Wishlist"
            onClick={() =>
              onLike(
                product?.wishlist_id,
                product?.product_id,
                product?.products?.is_whislist
              )
            }
          >
            {product?.products?.is_whislist ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FiHeart className="text-gray-500" />
            )}
          </button>
        </div>
        {product?.products?.discount && (
          <span className="mt-2 inline-block text-green-700 text-xs font-medium  rounded">
            {`Up to ${product?.products?.discount}% Off`}
          </span>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-green-600">
                ₹ {Number(product?.products?.price).toLocaleString("en-IN")}.00
              </span>
              <span className="text-sm line-through text-gray-500">
                ₹
                {Number(product?.products?.strike_price).toLocaleString(
                  "en-IN"
                )}
                .00
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {product?.products?.total_product_count > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <TiStar
              key={i}
              className={`h-4 w-4 ${
                i < 4 ? "text-orange-500" : "text-gray-300"
              }`}
            />
          ))}
          <p className="text-sm font-medium text-gray-600 ml-2">(455)</p>
        </div>
      </div>
    </div>
  );
};

export default WishlistsCard;
