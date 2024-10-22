/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import TapContainer from "../Components/TapContainer/TapContainer";
import { UserBalance } from "../Components/UserBalance.jsx/UserBalance";
import AppBar from "../Components/AppBar";
import { PointContext } from "../state/PointContext";
import BoostDialog from "../Components/BoostDialog/BoostDialog";
import { BACKEND_URL, COMBO_TYPES, LEVEL_DATA, TOP_LEVEL } from "../constants";
import { getExchangeIcon } from "./Exchange";
import { Link, useNavigate } from "react-router-dom";
import InitialDialog from "../Components/InitialDialog/InitialDialog";
import InfiniteLooper from "../Components/InfiniteLoop/InfiniteLoop";
import moment from "moment";
import axios from "axios";
import { toHumanString } from "human-readable-numbers";
import toast from "react-hot-toast";

let comboInterval = 0;
let cipherInterval = 0;
let leaves = [];
let animationNumber = 0;

function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef();
  const {
    point,
    energy,
    setEnergy,
    setPoint,
    user,
    pointPerClick,
    level,
    initialized,
    setInitialized,
    energyLimit,
    setEnergyLimit,
    username,
    profitPerHour,
    dailyCombo,
    bonus,
    dailyCipher,
    dailyReward,
    skin,
    lottery,
  } = useContext(PointContext);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [timeComboLeft, setTimeComboLeft] = useState(0);
  const [timeCipherLeft, setTimeCipherLeft] = useState(0);
  const [timeRewardLeft, setTimeRewardLeft] = useState(0);

  const [cipherMode, setCipherMode] = useState(false);
  const [cipherText, setCipherText] = useState("");
  const [days, setDays] = useState(0);

  useEffect(() => {
    const fetchDailyReward = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/task/daily-task`);
        const { data } = response;
        const { days, point } = data;

        setDays(days);
        if (point != undefined) {
          setPoint(point);
        }
      } catch (e) {
        console.log("apop@fetchDailyReward", e.message);
        return false;
      }
    };

    fetchDailyReward();

    if (initialized) {
      setTimeout(() => {
        setInitialized(false);
      }, 3000);
    }

    const levelUpdated = localStorage.getItem('levelUpdated');
    if (+levelUpdated) {
      toast.success("Congratulate! Your level has gone up!");
      animateLeaves();
      localStorage.setItem('levelUpdated', 0);
    }
  }, []);

  // 7755576161:AAEGldY9XMVAu_IMF2gJ_0QVcYVYhYtxk0s
  const getSkills = () => {
    // return user ? user?.combos?.filter(value => value.type == COMBO_TYPES.SKILL)?.length : 0;
    return user ? user?.combos?.length : 0;
  };

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

  const getLevelPercentage = () => {
    return (
      ((user.point - LEVEL_DATA[user.level].point) * 100) /
      ((LEVEL_DATA[user.level + 1].point ?? LEVEL_DATA[TOP_LEVEL].point) -
        LEVEL_DATA[user.level].point)
    );
  };

  return (
    <div>
      <div className="page">
        <main className="main is-prevent-touch">
          <header className="header">
            <div className="flex flex-row justify-between items-center w-full">
              {/*todo: temporarily locked due to error */}

              <Link
                className="flex flex-row justify-center items-center gap-3"
                to={`/league`}
              >
                {/* <Link className='flex flex-row justify-center items-center gap-3' to={`/#`}> */}
                <img
                  className="w-10 h-10 rounded-lg border-2 border-[#FFD300]"
                  src={`/images/hamsters/${user.level}.png`}
                ></img>
                <p className="text-sm">
                  {user.username}
                  {` `}({LEVEL_DATA[user.level].name})
                </p>
              </Link>
              <div className="flex flex-row justify-center items-center gap-3">
                <Link
                  className="rounded-full px-4 py-2 bg-gradient-to-r from-[#FFD300] to-[#F6E8A7] text-xs text-black font-bold"
                  target="_blank"
                  to={"https://dapp.eloncat.net/"}
                >
                  Buy $ECAT
                </Link>
                <Link to={`/settings`}>
                  <img src="/images/settings.svg" />
                </Link>
              </div>
            </div>
          </header>
          <div className="header-row">
            <div className="flex flex-row bg-gradient-to-t from-[#101010] to-[#191919] w-full rounded-2xl">
              {/*todo temporarily locked */}
              <Link
                className="flex justify-center items-center flex-1 p-3"
                to={`/highest-daily-earnings`}
              >
                <img src="/images/icons/medal.png" width="50px" />
                <div className="flex flex-col justify-center items-start">
                  <p className="text-[8px] text-white">
                    Highest Daily Earnings
                  </p>
                  <p className="text-gray-500 text-[10px]">
                    {toHumanString(user.highest_earning)}
                  </p>
                </div>
              </Link>
              <img src="/images/header/divider.svg" />
              <Link
                className="flex justify-center items-center flex-1 p-3"
                to={`/daily-bonus`}
              >
                <img src="/images/header/tokens-icon.png" width="35%" />
                <div className="flex flex-col justify-center items-start pl-2">
                  <p className="text-[8px] text-white">Daily Bonuses</p>
                  <p className="text-gray-500 text-[10px]">{days}</p>
                </div>
              </Link>
              <img src="/images/header/divider.svg" />
              <Link
                className="flex justify-center items-center flex-1 p-3"
                to={`/skills`}
              >
                <img src="/images/header/skills.png" width="45%" />
                <div className="flex flex-col justify-center items-start pl-2">
                  <p className="text-[8px] text-white">Skills Learned</p>
                  <p className="text-gray-500 text-[10px]">{getSkills()}</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="content is-main has-glow">
            <UserBalance point={point} pointPerClick={pointPerClick} />
            {cipherMode && (
              <div className="daily-combo is-morse">
                <div className="daily-combo-progress">
                  <div className="daily-combo-progress-title">Daily cipher</div>
                  <div className="daily-combo-progress-center">
                    <div className="daily-cipher-code">{cipherText}</div>
                  </div>
                  <div className="daily-combo-progress-button">
                    <button className="button button-gradient">
                      <div className="price">
                        <div className="price-image">
                          <img
                            className="coin img-responsive is-20"
                            src="/images/coin.png"
                          />
                        </div>
                        <div className="price-value">+1,000,000</div>
                      </div>
                    </button>
                  </div>
                  {/**/}
                </div>
              </div>
            )}
            <div className="main-box flex flex-col justify-between items-center w-full mt-[-40px] pt-8 rounded-xl">
              <TapContainer
                energy={energy}
                setEnergy={setEnergy}
                user={user}
                pointPerClick={pointPerClick}
                energyLimit={energyLimit}
                setEnergyLimit={setEnergyLimit}
                cipherMode={cipherMode}
                setCipherText={setCipherText}
                setCipherMode={setCipherMode}
                skin={skin}
              />
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-col justify-center items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-lg border-2 border-[#FFD300]"
                    src={`/images/hamsters/${user.level}.png`}
                  ></img>
                  <p className="text-xs">{LEVEL_DATA[user.level].name}</p>
                </div>
                <div className="flex flex-col justify-center items-end flex-1 mx-3">
                  <p className="text-xl">
                    {user.level}/{TOP_LEVEL}
                  </p>
                  <div
                    className="w-full flex items-center rounded-full border-[#FFD300] border h-5 relative"
                    style={{
                      boxShadow:
                        "rgba(250, 184, 34, 0.6) 0px -1px 4px, rgba(250, 184, 34, 0.6) 0px 1px 4px",
                    }}
                  >
                    <p className="absolute t-0 l-0 w-full text-gray-600 text-center text-xs">
                      Until Next Level
                    </p>
                    <div
                      className={`bg-[#FFD300] rounded-full h-4`}
                      style={{ width: getLevelPercentage().toString() + "%" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-lg border-2 border-[#FFD300] brightness-50"
                    src={`/images/hamsters/${user.level + 1}.png`}
                  ></img>
                  {LEVEL_DATA[user.level + 1] && (
                    <p className="text-xs">{LEVEL_DATA[user.level + 1].name}</p>
                  )}
                </div>
              </div>
              <div className="user-tap-row mt-4 w-full !mb-0">
                <div className="user-tap-energy">
                  <div className="icon">
                    <img src="/images/energy-icon.svg" alt="Boost" />
                  </div>
                  <p>
                    {energy} / {toHumanString(energyLimit)}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center passive-box">
                  <p className="!text-md text-center">Passive Income</p>
                  <div className="flex justify-center items-center gap-1">
                    <div className="price">
                      <div className="price-image">
                        <img
                          className="coin img-responsive is-18"
                          src="data:image/webp;base64,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"
                        />
                      </div>
                    </div>
                    <div className="price-value text-lg font-bold">
                      {toHumanString(profitPerHour)}
                    </div>
                    <div className="icon icon-info">
                      <svg
                        width="17"
                        height="18"
                        viewBox="0 0 17 18"
                        fill="none"
                        onClick={() => {
                          setDialogOpen(true);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.5 0.570312C6.83277 0.570313 5.20298 1.06471 3.81672 1.99097C2.43047 2.91724 1.35001 4.23377 0.711988 5.7741C0.073965 7.31442 -0.092971 9.00935 0.23229 10.6446C0.557552 12.2797 1.3604 13.7818 2.53931 14.9607C3.71823 16.1396 5.22025 16.9425 6.85545 17.2677C8.49065 17.593 10.1856 17.426 11.7259 16.788C13.2662 16.15 14.5828 15.0695 15.509 13.6833C16.4353 12.297 16.9297 10.6672 16.9297 9C16.9273 6.76503 16.0384 4.62228 14.4581 3.04192C12.8777 1.46156 10.735 0.572673 8.5 0.570312ZM8.17579 4.46094C8.36816 4.46094 8.55621 4.51798 8.71616 4.62486C8.87612 4.73174 9.00078 4.88364 9.0744 5.06137C9.14802 5.2391 9.16728 5.43467 9.12975 5.62335C9.09222 5.81203 8.99959 5.98534 8.86356 6.12137C8.72753 6.25739 8.55422 6.35003 8.36554 6.38756C8.17686 6.42509 7.9813 6.40583 7.80357 6.33221C7.62584 6.25859 7.47393 6.13392 7.36705 5.97397C7.26017 5.81402 7.20313 5.62597 7.20313 5.43359C7.20313 5.17563 7.3056 4.92823 7.48801 4.74582C7.67042 4.56341 7.91782 4.46094 8.17579 4.46094ZM9.14844 13.5391C8.80449 13.5391 8.47462 13.4024 8.23141 13.1592C7.9882 12.916 7.85157 12.5861 7.85157 12.2422V9C7.67959 9 7.51466 8.93168 7.39305 8.81008C7.27145 8.68847 7.20313 8.52354 7.20313 8.35156C7.20313 8.17959 7.27145 8.01465 7.39305 7.89305C7.51466 7.77144 7.67959 7.70312 7.85157 7.70312C8.19552 7.70312 8.52538 7.83976 8.76859 8.08297C9.01181 8.32618 9.14844 8.65605 9.14844 9V12.2422C9.32042 12.2422 9.48535 12.3105 9.60696 12.4321C9.72856 12.5537 9.79688 12.7186 9.79688 12.8906C9.79688 13.0626 9.72856 13.2275 9.60696 13.3491C9.48535 13.4707 9.32042 13.5391 9.14844 13.5391Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <Link
                  to="/boost"
                  className="user-tap-boost"
                  style={{ paddingLeft: "36px" }}
                >
                  <img
                    src="/images/rocket-icon.svg"
                    style={{ width: "30px" }}
                    alt="Boost"
                  />
                  <p className="underline">Boost</p>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <AppBar />
        <img id="leaf" src="/images/coin.png" className="hidden" />
        <div className="coin-animation-container" style={{ display: "flex" }}>
          <canvas width={355} height={572} ref={canvasRef} />
        </div>
        <div
          className="bottom-sheet"
          style={{ display: isDialogOpen ? "flex" : "none" }}
        >
          <div
            className="bottom-sheet-bg"
            style={{ touchAction: "none", userSelect: "none" }}
          />
          <div className="bottom-sheet-inner">
            <div
              className="bottom-sheet-close"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
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
            <BoostDialog setDialogOpen={setDialogOpen} />
          </div>
        </div>

        <div
          className="bottom-sheet"
          style={{
            display: initialized && user.exchange && bonus ? "flex" : "none",
          }}
        >
          <div
            className="bottom-sheet-bg"
            style={{ touchAction: "none", userSelect: "none" }}
          />
          <div className="bottom-sheet-inner">
            <div
              className="bottom-sheet-close"
              onClick={() => {
                setDialogOpen(false);
                setInitialized(false);
              }}
            >
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
            <InitialDialog
              user={user}
              bonus={bonus}
              setDialogOpen={setDialogOpen}
              setInitialized={setInitialized}
            />
          </div>
        </div>

        <div className="modal" style={{ display: "none" }}>
          <div
            className="modal-bg"
            style={{ touchAction: "none", userSelect: "none" }}
          ></div>
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
                  ></path>
                </svg>
              </div>
            </div>
            <div className="modal-scroll"></div>
          </div>
        </div>
        <div id="ton-connect-widget"></div>
      </div>
    </div>
  );
}

export const sweepNan = (value) => {
  return isNaN(value) ? "-" : value;
};

export default Home;
