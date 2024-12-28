import logo from "../../assets/images/png/Amazon-Logo-White.png";

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <img src={logo} className="h-12" alt="Flowbite Logo" />
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <button type="button" className="hover:underline me-4 md:me-6">
                About
              </button>
            </li>
            <li>
              <button type="button" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </button>
            </li>
            <li>
              <button type="button" className="hover:underline me-4 md:me-6">
                Licensing
              </button>
            </li>
            <li>
              <button type="button" className="hover:underline me-4 md:me-6">
                Contact
              </button>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <button className="hover:underline">Amazon™</button>. All
          Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
