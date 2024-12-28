const CustomModal = ({
  title,
  onPressNegativeBtn,
  isOpen = false,
  renderContent,
}: any) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
        <div className="bg-white w-[35%] p-6 rounded-lg shadow-lg">
          <div className=" border-b pb-3">
            <h2 className="text-lg font-medium uppercase text-green-500 text-center">
              {title}
            </h2>
          </div>
          <div className="my-4 max-h-[70vh]">{renderContent()}</div>
          <button
            className="transition-all text-white py-1 px-6 md:py-3 md:px-5 w-[50%] mx-auto flex items-center justify-center gap-2 bg-red-600 rounded-md hover:bg-red-700"
            onClick={onPressNegativeBtn}
          >
            Go to Hompage
          </button>
        </div>
      </div>
    )
  );
};

export default CustomModal;
