/* eslint-disable no-unsafe-finally */
/* eslint-disable react/prop-types */
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import toast from "react-hot-toast";

const InviteTaskDialog = ({
  setDialogOpen,
  setPoint,
  setUser,
  animateLeaves,
}) => {
  const handleCheckInvite = async () => {
    // console.log('-----------')
    try {
      const response = await axios.post(`${BACKEND_URL}/api/task/invite-check`);
      if (response?.data?.status === "success") {
        setUser(response?.data?.user);
        setPoint(response?.data?.user?.point);
        toast.success("Congratulations!");
        animateLeaves();
      }
    } catch (e) {
      console.log("app@tgchannel", e.message);
    } finally {
      setDialogOpen("");
      return false;
    }
  };

  return (
    <div className="bottom-sheet-scroll">
      <div className="bs-content">
        <div className="bs-content-image">
          <div className="earn-image is-coin-star">
            <picture>
              <source
                srcSet="/images/earn/friend.png"
                type="image/png"
                alt="invite_friends"
              />
              <img
                className="img-responsive"
                src="/images/earn/friend.png"
                alt="invite_friends"
              />
            </picture>
          </div>
        </div>
        <div className="bs-content-title">Invite 3 friends</div>
        {/**/}
        {/**/}
        {/**/}
        <div className="bs-content-info">
          <div className="price">
            <div className="price-image">
              <img
                className="coin img-responsive is-28"
                src="/images/coin.png"
              />
            </div>
            <div className="price-value">+25,000</div>
          </div>
        </div>
        <div className="bs-content-description">
          <Link
            to={"/friends"}
            rel="noopener noreferrer"
            className="button button-primary !bg-[#FFD600] !text-black button-small mt-8"
          >
            Invite
          </Link>
        </div>
        <button
          className="bottom-sheet-button button button-primary button-large"
          onClick={handleCheckInvite}
        >
          <span>Check</span>
        </button>
      </div>
    </div>
  );
};

export default InviteTaskDialog;
