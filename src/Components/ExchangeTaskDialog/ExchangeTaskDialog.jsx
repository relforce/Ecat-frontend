/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL, GIVEAWAY_LINK } from "../../constants";
import toast from "react-hot-toast";

const ExchangeTaskDialog = ({
  setPoint,
  setUser,
  setDialogOpen,
  animateLeaves,
}) => {
  const [visited, setVisited] = useState(false);

  const handleChangeExchange = async () => {
    if (!visited) {
      toast.error("Please join our giveaway link.");
      return false;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/task/exchange-change`
      );
      if (response?.data?.status === "success") {
        setUser(response?.data?.user);
        setPoint(response?.data?.user?.point);
        toast.success("Successfully Joined!");
        animateLeaves();
      }
    } catch (e) {
      console.log("app@tgchannel", e.message);
    } finally {
      setDialogOpen(false);
    }
    return false;
  };

  return (
    <div className="bottom-sheet-scroll">
      <div className="bs-content">
        <div className="bs-content-image">
          <div className="earn-image is-coin-star">
            <img className="img-responsive" src="/images/earn/logo-large.png" />
          </div>
        </div>
        <div className="bs-content-title">Join our $100k Giveaway</div>
        <div className="bs-content-description" />
        {/**/}
        <div
          className="bs-content-description"
          // onClick={handleChoose}
        >
          <Link
            to={GIVEAWAY_LINK}
            target="_blank"
            className="button button-primary !bg-[#FFD600] !text-black button-small"
            onClick={() => {
              setVisited(true);
            }}
          >
            Join Here
          </Link>
        </div>
        {/**/}
        <div className="bs-content-info">
          <div className="price">
            <div className="price-image">
              <img
                className="coin img-responsive is-28"
                src="/images/coin.png"
              />
            </div>
            <div className="price-value">+5,000</div>
          </div>
        </div>
        <button
          rel="noopener noreferrer"
          className="button button-primary button-large mt-6"
          onClick={handleChangeExchange}
        >
          Check
        </button>
        {/**/}
      </div>
    </div>
  );
};

export default ExchangeTaskDialog;
