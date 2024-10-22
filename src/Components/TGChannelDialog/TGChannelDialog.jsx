/* eslint-disable react/prop-types */
import { useContext } from "react";
import { BACKEND_URL, TG_CHANNEL } from "../../constants";
import axios from "axios";
import { PointContext } from "../../state/PointContext";
import toast from "react-hot-toast";

const TGChannelDialog = ({ setDialogOpen, animateLeaves }) => {
  const { setUser, setPoint } = useContext(PointContext);

  const handleCheck = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/task/tg-subscribed`
      );
      setUser(response?.data?.user);
      setPoint(response?.data?.user?.point);
      toast.success("Successfully verified.");
      animateLeaves();
    } catch (e) {
      toast.error("TG Channel not joined.");
      console.log("app@tgchannel", e.message);
    } finally {
      setDialogOpen(false);
    }
  };

  return (
    <div className="bottom-sheet-scroll">
      <div className="bs-content">
        <div className="bs-content-image">
          <div className="earn-image is-coin-star">
            <picture>
              <source
                srcSet="/images/earn/telegram.png"
                type="image/png"
                alt="subscribe_telegram_channel"
              />
              <img
                className="img-responsive"
                src="/images/earn/telegram.png"
                alt="subscribe_telegram_channel"
              />
            </picture>
          </div>
        </div>
        <div className="bs-content-title">Join our TG channel</div>
        <div className="bs-content-description" />
        <div className="bs-content-description">
          <a
            href={TG_CHANNEL}
            rel="noopener noreferrer"
            target="_blank"
            className="button button-primary !bg-[#FFD600] !text-black button-small"
          >
            Join
          </a>
        </div>

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
          onClick={handleCheck}
        >
          Check
        </button>
      </div>
    </div>
  );
};

export default TGChannelDialog;
