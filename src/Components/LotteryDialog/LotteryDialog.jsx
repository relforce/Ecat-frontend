import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import toast from "react-hot-toast";
import { Spinner } from "../Spinner";

const LotteryDialog = ({ setUser, setDialogOpen }) => {
  const navigate = useNavigate();

  const [previousWinnerShow, setPreviousWinnerShow] = useState(false);
  const [lottery, setLottery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paticipated, setPaticipated] = useState(false);
  console.log("paticipated", paticipated);

  const fetchParticipant = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/participat-lottery`
      );
      const { data } = response;
      console.log("testdata", data);
      if (data?.status == "error") {
        setPaticipated(true);
      }
    } catch (e) {
      console.log("app@fetchLottery", e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipant();
  }, []);

  useEffect(() => {
    const fetchLottery = async () => {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/user/get-lottery-winners`
        );
        const { data } = response;
        if (data?.lottery) {
          setLottery(data?.lottery);
        }
      } catch (e) {
        console.log("app@fetchLottery", e.message);
        return false;
      } finally {
        setLoading(false);
      }
    };

    fetchLottery();
  }, []);

  const handleParticipate = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/participat-lottery`,
        {}
      );

      const {data} = response;
      console.log("data", data);
      toast.success(data?.message);
    } catch (e) {
      toast.error("Participate in Lottery Failed.");
      console.log("lottery-error", e.message);
    } finally {
      setDialogOpen(false);
      navigate("/mine");
    }
    return false;
  };

  return (
    <div className="bottom-sheet-scroll">
      <div className="bs-content">
        <div className="bs-content-image is-boost !w-full">
          <img src="/images/icons/lottery-lg.png" />
        </div>
        <div className="boost-profit-target">
          <span>
            One lucky winner will win 1,000,000 coins daily. Make sure to
            participate!
          </span>
        </div>
        {!paticipated ? (
          <button
            className="bottom-sheet-button button button-primary button-large"
            onClick={handleParticipate}
          >
            <span>Try Your Luck</span>
            <img
              className="coin img-responsive is-28"
              src="/images/icons/heart.svg"
            />
          </button>
        ) : (
          <div><span style={{color: '#37f137', fontSize: '22px'}}>You already joined. Please relax and waiting for the lucky winner to be drawn</span></div>
        )}
        <button
          className="text-[#FFD300] underline mt-6"
          onClick={() => setPreviousWinnerShow((prev) => !prev)}
        >
          Previous Winners
        </button>
        <div
          className="friends-bonuses w-full"
          style={{ display: previousWinnerShow ? "block" : "none" }}
        >
          <ul className="friends-bonuses-list">
            {!loading ? (
              lottery.map((lot, index) => (
                <li
                  className="w-full flex justify-between items-center"
                  key={`lottery-list-${index}`}
                >
                  <div>
                    <div
                      className="friends-bonuses-image"
                      style={{
                        backgroundImage: 'url("/images/earn/ecat.png")',
                      }}
                    />
                    <p>{lot.winner}</p>
                  </div>
                  <div>
                    <div className="price">
                      <div className="price-value text-xs">{lot.day}</div>
                    </div>
                  </div>
                  <div>
                    <div className="price">
                      <div className="price-image">
                        <img
                          className="coin img-responsive is-20"
                          src="images/coin.png"
                        />
                      </div>
                      <div className="price-value text-yellow">+1M</div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <Spinner />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LotteryDialog;
