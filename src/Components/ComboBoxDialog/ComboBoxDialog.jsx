/* eslint-disable react/prop-types */
import { useContext } from "react";
import { PointContext } from "../../state/PointContext";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import toast from "react-hot-toast";
import { toHumanString } from "human-readable-numbers";

const ComboBoxDialog = ({
  point,
  selectedCombo,
  setDialogOpen,
  setProfitPerHour,
  setUser,
  fetchComboData,
}) => {
  const { setPoint } = useContext(PointContext);

  const handleSubmitCombo = async () => {
    // validate level and point
    if (point < selectedCombo.point) {
      toast.error("Your point is not enough to learn this new skill. Please earn more points and try again.")
      return false;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/combo/mint-combo`, {
        id: selectedCombo._id,
      });

      const { data } = response;

      if (data?.user) {
        setUser(data?.user);
      }

      setPoint((prev) => prev - selectedCombo.point);
      setProfitPerHour((prev) => prev + selectedCombo.profitPerHour);

      toast.success("Successfully Learnt.");

      // await fetchDailyMatchs()
      await fetchComboData();
    } catch (e) {
      console.log("app@mintCombo", e.message);
    } finally {
      setDialogOpen("");
    }
    return false;
  };

  return (
    <div className="bottom-sheet-scroll">
      <div className="upgrade-buy">
        <div className="upgrade-buy-image ceo">
          <div className="upgrade-image" style={{ width: "50%" }}>
            <picture className="is-rounded">
              <source
                srcSet={
                  selectedCombo?.img
                    ? selectedCombo?.img
                    : "/images/skills/no-image.png"
                }
                type="image/png"
                alt="ceo"
              />
              <img
                className="img-responsive w-2/3"
                src={selectedCombo?.img}
                alt="ceo"
              />
            </picture>
          </div>
        </div>
        <div className="upgrade-buy-title ceo">{selectedCombo.name}</div>
        <div className="bs-content-description no-gap ceo">
          {selectedCombo.desc}
        </div>
        <ul className="upgrade-buy-stats">
          <li>
            <p>Passive Income</p>
            <div className="upgrade-buy-stats-info">
              <div className="price">
                <div className="price-image">
                  <img
                    className="coin img-responsive is-18"
                    src="/images/coin.png"
                  />
                </div>
                <div className="price-value">
                  +{toHumanString(selectedCombo.profitPerHour)}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div className="upgrade-buy-info">
          <div className="price">
            <div className="price-image">
              <img
                className="coin img-responsive is-28"
                src="/images/coin.png"
              />
            </div>
            <div className="price-value">
              {toHumanString(selectedCombo.point)}
            </div>
          </div>
        </div>
        <button
          className="bottom-sheet-button button button-primary button-large is-sticky"
          onClick={handleSubmitCombo}
        >
          <span>Learn This New Skill</span>
          <img className="coin img-responsive is-20" src="/images/books.png" />
        </button>
      </div>
    </div>
  );
};

export default ComboBoxDialog;
