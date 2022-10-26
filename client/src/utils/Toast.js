// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function toastError(toast, error) {
  toast.error(error, {
    position: "top-center",
    autoClose: 2000,
  });
}

function toastSuccess(toast, successMessage) {
  toast.success(successMessage, {
    position: "top-center",
    autoClose: 2000,
  });
}

module.exports = { toastError, toastSuccess };
