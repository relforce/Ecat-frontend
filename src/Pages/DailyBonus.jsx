/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import AppBar from "../Components/AppBar";
import { PointContext } from "../state/PointContext";
import { BACKEND_URL, DAILY_REWARD_LIST } from "../constants";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

let daysCheck = 0;
let leaves = [];
let animationNumber = 0;

function DailyBonus() {
  const { setPoint, setUser } = useContext(PointContext);

  const [isDialogOpen, setDialogOpen] = useState("");
  const [days, setDays] = useState(0);
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const canvasRef = useRef();

  useEffect(() => {
    const fetchDailyReward = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/task/daily-task`);
        const { data } = response;
        const { days, available, point } = data;

        setAvailable(available);
        setDays(days);
        if (point != undefined) {
          setPoint(point);
        }
      } catch (e) {
        console.log("apop@fetchDailyReward", e.message);
      } finally {
        setLoading(false);
      }
      return false;
    };

    fetchDailyReward();
  }, []);

  useEffect(() => {
    if (days) {
      daysCheck = setInterval(async () => {
        setDays(days);
        console.log("testdays", days);
        return false;
      }, 1000);
    }
    return () => {
      clearInterval(daysCheck);
    };
  }, [days]);

  const animateLeaves = () => {
    if (!canvasRef.current) {
      return false;
    }

    const Fe = 20;
    const image = document.getElementById("leaf");

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const v = {
      x_start_from: -20,
      x_start_to: window.innerWidth + 20,
      y_start_from: -20,
      y_start_to: 0,
      x_end_from: -20,
      x_end_to: window.innerWidth + 20,
      y_end_from: window.innerHeight - 64,
      y_end_to: window.innerHeight,
      count: 200,
      delay: 5,
      timeout_fly: 1e3,
      direction_y: "from_bottom",
      random_end_x: true,
    };

    const d = (v, g) => (
      (v = Math.ceil(v)),
      (g = Math.floor(g)),
      Math.floor(Math.random() * (g - v + 1)) + v
    );
    setTimeout(() => {
      const g = Math.min(200, v.count);
      for (let y = 0; y < g; y++)
        setTimeout(() => {
          var R;
          const b = d(v.x_start_from, v.x_start_to),
            // S = v.random_end_x ? d(v.x_end_from, v.x_end_to) : b,
            S = v.random_end_x
              ? d(
                  canvasRef.current.width / 2 - 20,
                  canvasRef.current.width / 2 + 20
                )
              : b,
            w =
              v.direction_y === "from_bottom"
                ? ((R = canvasRef.current) == null ? void 0 : R.height) || 0
                : d(v.y_start_from, v.y_start_to),
            I =
              v.direction_y === "from_bottom"
                ? w - d(v.y_end_from, v.y_end_to)
                : w + d(v.y_end_from, v.y_end_to),
            T = 1,
            F = Math.random() * 0.5,
            P = S - b,
            _ = I - w,
            J = F - T;
          leaves.push({
            x_start: b,
            y_start: w,
            dx: P,
            dy: _,
            opacity_start: T,
            d_opacity: J,
            date: Date.now(),
            id: y,
            timeout_fly: (v.timeout_fly ?? 1e3) / 3,
          }),
            setTimeout(() => {
              leaves.shift();
            }, (v.timeout_fly ?? 1e3) / 3);
        }, v.delay * y);
      setTimeout(() => {
        animate();
      }, 50);
    }, 50);

    const animate = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      const now = Date.now();
      leaves.forEach((coin, index) => {
        const time = now - coin.date;
        if (time > coin.timeout_fly) return;
        const w = time / coin.timeout_fly,
          I = coin.x_start + coin.dx * w - Fe / 2,
          T = coin.y_start + coin.dy * w - Fe / 2,
          F = coin.opacity_start + coin.d_opacity * w;
        (ctx.globalAlpha = F),
          ctx.drawImage(image, I, T, Fe, Fe),
          (ctx.globalAlpha = 1);
      });

      if (leaves.length <= 0) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        cancelAnimationFrame(animationNumber);
        return false;
      }

      animationNumber = requestAnimationFrame(animate);
    };
  };

  const handleClaim = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/task/claim-daily`);
      const { data } = response;
      const { days, available, user, status } = data;
      console.log("days", days);
      setAvailable(available);
      setDays(days);
      setDialogOpen(false);

      if (status == "success") {
        setUser(user);
        setPoint(user?.point);
        setDays(days);
        toast.success("Successfully Claimed");
        animateLeaves();
      } else {
        toast.error("Claim Failed.");
      }
    } catch (e) {
      console.log("apop@fetchDailyReward", e.message);
      toast.error("Claim Failed.");
    }
    return false;
  };

  return (
    <div>
      <div className="page">
        <main className="main">
          <div className="inner boost relative">
            <div className="flex flex-row justify-center items-center">
              <img
                src="/images/prev.svg"
                className="cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}
              />
              <h1 className="flex-1 text-center text-white text-3xl my-4">
                Daily Bonuses
              </h1>
            </div>
            <div className="flex justify-center items-center">
              <img src="/images/icons/daily-bonus.png" width="35%" />
            </div>
            <p className="text-center px-[10%] !my-6 mx-auto">
              Get coins for logging into the app every day. The more days you
              log in, the more rewards you earn.
            </p>
            <ul className="bs-content-daily mb-10">
              {!loading ? (
                Array(20)
                  .fill(1)
                  .map((value, index) => (
                    <li
                      className={`${
                        days > index
                          ? "!bg-[#004917]"
                          : days == index && available == true
                          ? "is-current"
                          : "is-disabled"
                      } v-popper--has-tooltip`}
                      key={`daily-reward-${index}`}
                    >
                      <span>Day {index + 1}</span>
                      <div className="bs-content-daily-coin">
                        <img
                          className="coin img-responsive"
                          src="/images/coin.png"
                        />
                      </div>
                      <p>{DAILY_REWARD_LIST[index]}</p>
                    </li>
                  ))
              ) : (
                <Spinner />
              )}
            </ul>
          </div>
          <div className="sticky w-full bottom-24">
            <button
              className="button button-primary button-large mx-auto w-[90%]"
              disabled={available == true ? false : true}
              onClick={handleClaim}
            >
              Claim
            </button>
          </div>
        </main>
        <AppBar />
        <img id="leaf" src="/images/coin.png" className="hidden" />
        <div className="coin-animation-container" style={{ display: "flex" }}>
          <canvas width={355} height={572} ref={canvasRef} />
        </div>
        <div
          className="bottom-sheet"
          style={{ display: isDialogOpen ? "flex" : `none` }}
        >
          <div
            className="bottom-sheet-bg"
            style={{ touchAction: "none", userSelect: "none" }}
          />
          <div className="bottom-sheet-inner"></div>
        </div>
        <div className="modal" style={{ display: "none" }}>
          <div
            className="modal-bg"
            style={{ touchAction: "none", userSelect: "none" }}
          />
          <div className="modal-inner">
            <div className="modal-close">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  style={{ enableBackground: "new 0 0 32 32" }}
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M16 3a13 13 0 0 0-7.2 2.2C6.6 6.6 5 8.6 4 11s-1.2 5-.7 7.5 1.7 4.8 3.6 6.7c1.8 1.8 4.1 3.1 6.7 3.6 2.4.5 5 .2 7.4-.8a13 13 0 0 0 5.8-4.8c1.4-2.1 2.2-4.7 2.2-7.2 0-3.4-1.4-6.8-3.8-9.2C22.8 4.4 19.4 3 16 3zm4.7 16.3c.1.1.2.2.2.3.1.1.1.3.1.4s0 .3-.1.4c-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1.1-.3.1-.4.1s-.3 0-.4-.1c-.1-.1-.2-.1-.3-.2L16 17.4l-3.3 3.3c-.1.1-.2.2-.3.2s-.3.1-.4.1-.3 0-.4-.1-.2-.1-.3-.2c-.1-.1-.2-.2-.2-.3-.1-.1-.1-.3-.1-.4s0-.3.1-.4c.1-.1.1-.2.2-.3l3.3-3.3-3.3-3.3c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7c.2-.2.4-.3.7-.3s.5.1.7.3l3.3 3.3 3.3-3.3c.1-.1.2-.2.3-.2.1-.1.3-.1.4-.1s.3 0 .4.1c.1.1.2.1.3.2.1.1.2.2.2.3s.1.3.1.4 0 .3-.1.4-.1.2-.2.3L17.4 16l3.3 3.3z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="modal-scroll" />
          </div>
        </div>
        <div id="ton-connect-widget" />
      </div>
    </div>
  );
}

export default DailyBonus;
