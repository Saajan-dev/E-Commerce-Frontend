import { PiCurrencyInrBold } from "react-icons/pi";

const ProductCard = ({
  product_id,
  image_url,
  name,
  price,
  strike_price,
  total_product_count = false,
  description = "Free shipping on all continental US orders.",
  onView,
}: any) => {
  return (
    <div className="group cursor-pointer flex flex-col md:flex-row bg-white rounded-md shadow-lg min:w-[570px]">
      <div className="flex-none w-full md:w-48 md:h-[16rem] relative">
        <img
          src={image_url[0]}
          alt={name}
          className="w-full h-full md:h-full object-cover  md:rounded-l-md group-hover:opacity-75 transition-all"
          loading="lazy"
        />
      </div>

      <div className="flex-auto px-6 py-3 bg-white">
        <div className="flex flex-wrap">
          <div className="flex items-start justify-between w-full">
            <h1 className="flex-auto font-semibold capitalize text-slate-900">
              {name}
            </h1>
            <div
              className={`flex-none text-sm font-medium ${
                total_product_count && Number(total_product_count) <= 5
                  ? "text-green-600"
                  : "text-red-500"
              } mt-2`}
            >
              {total_product_count && Number(total_product_count) <= 5
                ? "In stock"
                : "Out of stock"}
            </div>
          </div>

          <div className="w-full text-lg flex items-baseline gap-2 mt-2">
            {price && (
              <div className="line-through text-sm text-slate-500 flex items-center">
                <PiCurrencyInrBold className="line-through" />
                {Number(price).toLocaleString("en-IN")}.00
              </div>
            )}
            <div className="text-slate-500 font-semibold flex items-center">
              <PiCurrencyInrBold />
              {Number(strike_price).toLocaleString("en-IN")}.00
            </div>
          </div>
        </div>

        <div className="flex items-baseline mb-6 pb-6 border-b border-slate-200"></div>

        <div className="flex space-x-4 mb-5 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
              type="button"
              onClick={() => onView(product_id)}
            >
              View Product
            </button>
            {/* <button
              className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900"
              type="button"
              onClick={onAddToCart}
            >
              Add to cart
            </button> */}
          </div>

          {/* <button
            className={`flex-none flex items-center justify-center w-9 h-9 rounded-full  bg-violet-50`}
            type="button"
            aria-label="Like"
            onClick={onLike}
          >
            <span>
              {is_whislist ? (
                <FaHeart className="text-violet-600" />
              ) : (
                <FiHeart />
              )}
            </span>
          </button> */}
        </div>

        <p className="text-sm text-slate-700 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
