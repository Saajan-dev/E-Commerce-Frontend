import Slide1 from "../assets/images/jpg/slide1.jpg";
import Slide2 from "../assets/images/jpg/slide2.jpeg";
import Slide3 from "../assets/images/jpg/slide3.jpeg";
import Slide4 from "../assets/images/jpg/slide4.jpg";

export const navItems = [
  {
    id: 1,
    label: "Home",
    navLink: "/home-page",
  },
  {
    id: 2,
    label: "Products",
    navLink: "/home-page/products",
  },
];

export const carouselData = [
  {
    id: 1,
    label: "Electronics",
    image_url: Slide1,
  },
  {
    id: 2,
    label: "Fashion",
    image_url: Slide2,
  },
  {
    id: 3,
    label: "Home Appliances",
    image_url: Slide3,
  },
  {
    id: 4,
    label: "Books",
    image_url: Slide4,
  },
];

export const categoryLists = [
  {
    category_id: 1,
    name: "Fashion Categories",
    bgColor: "#dfe3e7",
    image: "https://techzaa.in/larkon/admin/assets/images/product/p-1.png",
    category_products_list: [
      { category_product_id: 11, category_product_name: "Cooker" },
      { category_product_id: 12, category_product_name: "Microwave" },
      { category_product_id: 13, category_product_name: "Blender" },
      { category_product_id: 14, category_product_name: "Toaster" },
      { category_product_id: 15, category_product_name: "Vacuum Cleaner" },
    ],
  },
  {
    category_id: 2,
    name: "Electronics Headphone",
    image: "https://techzaa.in/larkon/admin/assets/images/product/p-6.png",
    category_products_list: [
      { category_product_id: 21, category_product_name: "Laptop" },
      { category_product_id: 22, category_product_name: "Smartphone" },
      { category_product_id: 23, category_product_name: "Tablet" },
      { category_product_id: 24, category_product_name: "Smartwatch" },
      { category_product_id: 25, category_product_name: "Camera" },
    ],
  },
  {
    category_id: 3,
    name: "Foot Wares",
    bgColor: "#fef1d6",
    image: "https://techzaa.in/larkon/admin/assets/images/product/p-7.png",
    category_products_list: [
      { category_product_id: 31, category_product_name: "T-shirt" },
      { category_product_id: 32, category_product_name: "Jeans" },
      { category_product_id: 33, category_product_name: "Shoes" },
      { category_product_id: 34, category_product_name: "Jacket" },
      { category_product_id: 35, category_product_name: "Hat" },
    ],
  },
  {
    category_id: 4,
    name: "Eye Ware & Sunglass",
    bgColor: "#dcf4f3",
    image: "https://techzaa.in/larkon/admin/assets/images/product/p-9.png",
    category_products_list: [
      { category_product_id: 41, category_product_name: "Fiction" },
      { category_product_id: 42, category_product_name: "Non-fiction" },
      { category_product_id: 43, category_product_name: "Mystery" },
      { category_product_id: 44, category_product_name: "Biography" },
      { category_product_id: 45, category_product_name: "Science" },
    ],
  },
];

export const productLists = [
  {
    name: "Mobile",
    image_url: "https://picsum.photos/id/10/200/300.jpg",
    products: [
      {
        product_id: "89deceb7-9ae3-4c67-83e1-8863cc6e088b",
        category_id: "30f19289-3830-469d-9724-50a9ba2268a1",
        name: "Oneplus Mobile",
        image_url: [
          "https://picsum.photos/id/1/200/300.jpg",
          "https://picsum.photos/id/2/200/300.jpg",
          "https://picsum.photos/id/3/200/300.jpg",
        ],
        description: [
          "High-performance mobile with sleek design.",
          "Features a powerful processor and great battery life.",
          "Ideal for multitasking and gaming enthusiasts.",
        ],
        price: 350,
        strike_price: 400,
        discount: 10,
        is_whislist: false,
        total_product_count: 100,
        quantity_count: 1,
        is_cart: false,
        created_at: "2024-12-26T14:49:20.328Z",
        updated_at: "2024-12-26T14:49:20.328Z",
      },
      {
        product_id: "b48c69ff-8e49-41d9-9c60-88b953607f21",
        category_id: "30f19289-3830-469d-9724-50a9ba2268a1",
        name: "Samsung Galaxy S23",
        image_url: [
          "https://picsum.photos/id/4/200/300.jpg",
          "https://picsum.photos/id/5/200/300.jpg",
          "https://picsum.photos/id/6/200/300.jpg",
        ],
        description: [
          "Flagship smartphone with top-tier features.",
          "Dynamic AMOLED display with vibrant colors.",
          "Triple-camera setup for professional photography.",
        ],
        price: 500,
        strike_price: 600,
        discount: 15,
        is_whislist: true,
        total_product_count: 150,
        quantity_count: 1,
        is_cart: true,
        created_at: "2024-12-26T14:50:00.328Z",
        updated_at: "2024-12-26T14:50:00.328Z",
      },
      {
        product_id: "60f7e738-5f74-4c6d-833e-09817c44f69b",
        category_id: "30f19289-3830-469d-9724-50a9ba2268a1",
        name: "Apple iPhone 15",
        image_url: [
          "https://picsum.photos/id/7/200/300.jpg",
          "https://picsum.photos/id/8/200/300.jpg",
          "https://picsum.photos/id/9/200/300.jpg",
        ],
        description: [
          "Premium smartphone with the A15 Bionic chip.",
          "Immersive Super Retina XDR display.",
          "Advanced camera system with cinematic video recording.",
        ],
        price: 1000,
        strike_price: 1200,
        discount: 20,
        is_whislist: false,
        total_product_count: 200,
        quantity_count: 1,
        is_cart: false,
        created_at: "2024-12-26T14:51:30.328Z",
        updated_at: "2024-12-26T14:51:30.328Z",
      },
      {
        product_id: "71d2c659-a3d4-4938-890f-1122cf5c7cb1",
        category_id: "30f19289-3830-469d-9724-50a9ba2268a1",
        name: "Xiaomi Redmi Note 12",
        image_url: [
          "https://picsum.photos/id/11/200/300.jpg",
          "https://picsum.photos/id/12/200/300.jpg",
          "https://picsum.photos/id/13/200/300.jpg",
        ],
        description: [
          "Affordable smartphone with premium features.",
          "Large display with vibrant visuals.",
          "Massive battery for long-lasting performance.",
        ],
        price: 250,
        strike_price: 300,
        discount: 15,
        is_whislist: true,
        total_product_count: 120,
        quantity_count: 1,
        is_cart: false,
        created_at: "2024-12-26T14:52:00.328Z",
        updated_at: "2024-12-26T14:52:00.328Z",
      },
      {
        product_id: "45f9c6b3-4c6e-4d3a-882e-27d3c6eb5c17",
        category_id: "30f19289-3830-469d-9724-50a9ba2268a1",
        name: "Google Pixel 7",
        image_url: [
          "https://picsum.photos/id/14/200/300.jpg",
          "https://picsum.photos/id/15/200/300.jpg",
          "https://picsum.photos/id/16/200/300.jpg",
        ],
        description: [
          "Minimalistic design with the latest Android features.",
          "Exceptional camera quality for photography enthusiasts.",
          "Smooth and efficient performance with Tensor chip.",
        ],
        price: 600,
        strike_price: 700,
        discount: 14,
        is_whislist: false,
        total_product_count: 180,
        quantity_count: 1,
        is_cart: false,
        created_at: "2024-12-26T14:53:30.328Z",
        updated_at: "2024-12-26T14:53:30.328Z",
      },
    ],
  },
  {
    name: "Laptops",
    image_url: "https://picsum.photos/id/20/200/300.jpg",
    products: [
      {
        product_id: "abc1",
        category_id: "laptops-1",
        name: "MacBook Pro 14",
        image_url: [
          "https://picsum.photos/id/21/200/300.jpg",
          "https://picsum.photos/id/22/200/300.jpg",
          "https://picsum.photos/id/23/200/300.jpg",
        ],
        description: [
          "M1 Pro chip for advanced performance.",
          "Retina display with vibrant color.",
        ],
        price: 1500,
        strike_price: 1700,
        discount: 12,
        is_whislist: false,
        total_product_count: 180,
      },
      // Add 4 similar products
    ],
  },
  {
    name: "Wearables",
    image_url: "https://picsum.photos/id/30/200/300.jpg",
    products: [
      {
        product_id: "abc1",
        category_id: "wearable-1",
        name: "Apple Watch Series 8",
        image_url: ["https://picsum.photos/id/31/200/300.jpg"],
        description: [
          "The ultimate health companion.",
          "Features blood oxygen monitoring.",
        ],
        price: 400,
        strike_price: 450,
        discount: 10,
        is_whislist: false,
        total_product_count: 180,
      },
      // Add 4 similar products
    ],
  },
  {
    name: "Accessories",
    image_url: "https://picsum.photos/id/40/200/300.jpg",
    products: [
      {
        product_id: "acc1",
        category_id: "accessory-1",
        name: "AirPods Pro",
        image_url: ["https://picsum.photos/id/41/200/300.jpg"],
        description: [
          "Noise-canceling wireless earbuds.",
          "Sweat and water-resistant.",
        ],
        price: 250,
        strike_price: 300,
        total_product_count: 180,
        discount: 17,
        is_whislist: false,
      },
      // Add 4 similar products
    ],
  },
];
