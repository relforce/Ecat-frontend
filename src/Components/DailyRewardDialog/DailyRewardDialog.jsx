/* eslint-disable react/prop-types */
import axios from "axios";
import { BACKEND_URL, DAILY_REWARD_LIST } from "../../constants";

const DailyRewardDialog = ({
  setDialogOpen,
  days,
  setDays,
  setPoint,
  setAvailable,
  setUser,
}) => {
  const handleClaim = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/task/claim-daily`);
      const { data } = response;
      const { days, available, user, status } = data;

      setAvailable(available);
      setDays(days);
      setDialogOpen(false);

      if (status == "success") {
        setUser(user);
        setPoint(user?.point);
      }
    } catch (e) {
      console.log("apop@fetchDailyReward", e.message);
    }
    return false;
  };

  return (
    <div className="bottom-sheet-scroll">
      <div className="bs-content">
        <div className="bs-content-image is-boost">
          <div className="earn-image">
            <picture>
              <source
                srcSet="/images/earn/calendar-large.png"
                type="image/png"
                alt="streak_days"
              />
              <img
                className="img-responsive"
                src="/images/earn/calendar-large.png"
                alt="streak_days"
              />
            </picture>
          </div>
        </div>
        <div className="bs-content-title">Daily reward</div>
        <div className="bs-content-description">
          Accrue coins for logging into the game daily without skipping
        </div>
        <ul className="bs-content-daily">
          {Array(10)
            .fill(1)
            .map((value, index) => (
              <li
                className={`${
                  days > index ? "is-current" : "is-disabled"
                } v-popper--has-tooltip`}
                key={`daily-reward-${index}`}
              >
                <span>Day {index + 1}</span>
                <div className="bs-content-daily-coin">
                  <img className="coin img-responsive" src="/images/coin.png" />
                </div>
                <p>{DAILY_REWARD_LIST[index]}</p>
              </li>
            ))}
        </ul>
        <button
          className="bottom-sheet-button button button-primary button-large is-sticky"
          onClick={handleClaim}
        >
          <span>Claim</span>
        </button>
      </div>
    </div>
  );
};

export default DailyRewardDialog;
