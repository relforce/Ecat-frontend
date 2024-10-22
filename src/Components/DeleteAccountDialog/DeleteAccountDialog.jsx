/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../../constants";

const DeleteAccountDialog = ({ setDialogOpen }) => {
  const handleCheck = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/delete-account`,
        {}
      );

      toast.success("Successfully deleted user account.");
    } catch (e) {
      toast.error("Delete account failed.");
      console.log("app@handleDeleteAccount", e.message);
    } finally {
      setDialogOpen(false);
      navigate("/");
    }
    return false;
  };

  return (
    <div className="bottom-sheet-scroll">
      <div className="bs-content">
        <div className="bs-content-title !text-3xl my-8 text-red-600">
          All your data will be lost.
        </div>
        <div className="bs-content-description">
          Are you sure you want to delete your account? This action is
          irreversible. All your account information and points will be
          permanently deleted.
        </div>
        <button
          className="bottom-sheet-button button button-primary button-large"
          onClick={handleCheck}
        >
          <span>Confirm</span>
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountDialog;
