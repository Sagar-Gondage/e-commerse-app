// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function toastError(toast, error) {
  toast.error(error, {
    position: "top-center",
    autoClose: 2000,
  });
}

export default toastError;
