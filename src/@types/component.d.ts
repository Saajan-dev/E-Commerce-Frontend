export type LoaderProps = {
  isVisible: boolean;
};

export type ProductCardProps = {
  image_url: string[];
  name: string;
  price: string;
  strike_price: string;
  total_product_count: string;
  description?: string;
  is_whislist: boolean;
  onLike: () => void;
  onView: () => void;
  onAddToCart: () => void;
};
