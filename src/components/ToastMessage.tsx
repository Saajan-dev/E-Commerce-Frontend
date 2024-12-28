import toast from "react-hot-toast";

export const toastMessage = (type: string, message: string, options = {}) => {
  switch (type) {
    case "success":
      toast.success(message, {
        duration: 4000,
        style: {
          border: "1px solid #4caf50",
        },
        icon: "✅",
        iconTheme: {
          primary: "#4caf50",
          secondary: "#FFF",
        },
        ...options,
      });
      break;

    case "error":
      toast.error(message, {
        duration: 4000,
        style: {
          border: "1px solid #f44336",
        },
        icon: "❌",
        iconTheme: {
          primary: "#f44336",
          secondary: "#FFF",
        },
        ...options,
      });
      break;

    case "info":
      toast(message, {
        duration: 4000,
        style: {
          border: "1px solid #2196f3",
        },
        iconTheme: {
          primary: "#2196f3",
          secondary: "#FFF",
        },
        ...options,
      });
      break;

    default:
      toast(message, { ...options });
      break;
  }
};
