/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { PointContext } from "../state/PointContext";
import AppBar from "../Components/AppBar";
import DailyRewardDialog from "../Components/DailyRewardDialog/DailyRewardDialog";
import axios from "axios";
import {
  BACKEND_URL,
  EXCHANGE_TASK_NAME,
  INVITE_TASK_NAME,
  TG_CHANNEL_TASK_NAME,
  BLUM_CHANNEL_TASK_NAME,
  X_CHANNEL_TASK_NAME,
  YOUTUBE_CHANNEL,
  YOUTUBE_CHANNEL_TASK_NAME,
  NEW_YOUTUBE_CHANNEL,
  NEW_YOUTUBE_TASK_NAME,
} from "../constants";
import TGChannelDialog from "../Components/TGChannelDialog/TGChannelDialog";
import BlumChannelDialog from "../Components/BlumChannelDialog/BlumChannelDialog";
import ExchangeTaskDialog from "../Components/ExchangeTaskDialog/ExchangeTaskDialog";
import InviteTaskDialog from "../Components/InviteTaskDialog/InviteTaskDialog";
import XChannelDialog from "../Components/XChannelDialog/XChannelDialog";
import YoutubeChannelDialog from "../Components/YoutubeChannelDialog/YoutubeChannelDialog";
import NewYoutubeChannelDialog from "../Components/NewYoutubeChannelDialog/NewYoutubeChannelDialog";
import { useNavigate } from "react-router-dom";

let leaves = [];
let animationNumber = 0;

function Earn() {
  const { user, fullEnergy, setFullEnergy, setEnergy, setPoint, setUser } =
    useContext(PointContext);

  const [isDialogOpen, setDialogOpen] = useState("");
  const [days, setDays] = useState(0);
  const [available, setAvailable] = useState(true);

  const navigate = useNavigate();

  const canvasRef = useRef();

  const checkTask = (name) => {
    console.log(user);
    return user?.tasks?.find((task) => task.name == name) ? true : false;
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
      }
      return false;
    };

    fetchDailyReward();
  }, []);

  return (
    <div className="page">
      <main className="main">
        <div className="inner earn">
          <div className="earn-top">
            <div
              className="earn-top-image"
              style={{ transform: "translateZ(0px)", opacity: 1 }}
            >
              <div className="icon">
                <svg
                  width={275}
                  height={275}
                  viewBox="0 0 275 275"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_f_1464_6497)">
                    <circle
                      cx="137.529"
                      cy="137.471"
                      r="72.4143"
                      fill="#FFD337"
                    />
                  </g>
                  <circle
                    cx={137}
                    cy={138}
                    r="63.4286"
                    fill="white"
                    fillOpacity="0.05"
                  />
                  <circle
                    cx={137}
                    cy={138}
                    r={74}
                    fill="white"
                    fillOpacity="0.05"
                  />
                  <defs>
                    <filter
                      id="filter0_f_1464_6497"
                      x="0.0999756"
                      y="0.0428467"
                      width="274.857"
                      height="274.857"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity={0} result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feGaussianBlur
                        stdDeviation="32.5071"
                        result="effect1_foregroundBlur_1464_6497"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <img className="img-responsive" src="/images/coin.png" />
            </div>
            <div
              className="earn-top-title"
              style={{ transform: "translateZ(0px)", opacity: 1 }}
            >
              Earn more coins
            </div>
          </div>
          <div className="section-title">Daily tasks</div>
          <div className="earn-column">
            <div
              className="earn-item is-completed"
              onClick={() => {
                navigate("/daily-bonus");
              }}
            >
              <div className="earn-item-image">
                <div
                  className="earn-image"
                  style={{
                    transform: "scale(1) translateZ(0px)",
                    opacity: 1,
                  }}
                >
                  <picture>
                    <source
                      srcSet="/images/earn/calendar.png"
                      type="image/png"
                      alt="streak_days"
                    />
                    <img
                      className="img-responsive"
                      src="/images/earn/calendar.png"
                      alt="streak_days"
                    />
                  </picture>
                </div>
              </div>
              <div className="earn-item-content">
                <div className="earn-item-content-top">Daily Rewards</div>
                <div className="earn-item-content-bottom">
                  <div className="price">
                    <div className="price-image">
                      <img
                        className="coin img-responsive is-20"
                        src="/images/coin.png"
                      />
                    </div>
                    <div className="price-value">Up to 10'000</div>
                  </div>
                </div>
              </div>
              <div className="earn-item-icon">
                {days && !available ? (
                  <div className="earn-item-icon-success">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{ enableBackground: "new 0 0 24 24" }}
                        xmlSpace="preserve"
                      >
                        <path
                          d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div
              className="earn-item"
              onClick={() => {
                setDialogOpen("new-youtube-channel");
              }}
            >
              <div className="earn-item-image">
                <div
                  className="earn-image"
                  style={{
                    transform: "scale(1) translateZ(0px)",
                    opacity: 1,
                  }}
                >
                  <picture>
                    <source
                      srcSet="/images/earn/youtube.png"
                      type="image/png"
                      alt="subscribe_youtube_channel"
                    />
                    <img
                      className="img-responsive"
                      src="/images/earn/youtube.png"
                      alt="subscribe_youtube_channel"
                    />
                  </picture>
                </div>
              </div>
              <div className="earn-item-content">
                <div className="earn-item-content-top">Breaking News</div>
                <div className="earn-item-content-bottom">
                  <div className="price">
                    <div className="price-image">
                      <img
                        className="coin img-responsive is-20"
                        src="/images/coin.png"
                      />
                    </div>
                    <div className="price-value">+10'000</div>
                  </div>
                </div>
              </div>
              <div className="earn-item-icon">
                {checkTask(NEW_YOUTUBE_TASK_NAME) ? (
                  <div className="earn-item-icon-success">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{ enableBackground: "new 0 0 24 24" }}
                        xmlSpace="preserve"
                      >
                        <path
                          d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="section-title">Tasks list</div>
          <div className="earn-column">
            <div
              className="earn-item"
              onClick={() => {
                setDialogOpen("tg-channel");
              }}
            >
              <div className="earn-item-image">
                <div
                  className="earn-image"
                  style={{
                    transform: "scale(1) translateZ(0px)",
                    opacity: 1,
                  }}
                >
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
              <div className="earn-item-content">
                <div className="earn-item-content-top">Join our TG channel</div>
                <div className="earn-item-content-bottom">
                  <div className="price">
                    <div className="price-image">
                      <img
                        className="coin img-responsive is-20"
                        src="/images/coin.png"
                      />
                    </div>
                    <div className="price-value">+5'000</div>
                  </div>
                </div>
              </div>
              <div className="earn-item-icon">
                {checkTask(TG_CHANNEL_TASK_NAME) ? (
                  <div className="earn-item-icon-success">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{ enableBackground: "new 0 0 24 24" }}
                        xmlSpace="preserve"
                      >
                        <path
                          d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div
              className="earn-item"
              onClick={() => {
                setDialogOpen("blum-channel");
              }}
            >
              <div className="earn-item-image">
                <div
                  className="earn-image"
                  style={{
                    transform: "scale(1) translateZ(0px)",
                    opacity: 1,
                  }}
                >
                  <picture>
                    <source
                      srcSet="/images/earn/blum.png"
                      type="image/png"
                      alt="subscribe_blum_channel"
                    />
                    <img
                      className="img-responsive"
                      src="/images/earn/blum.png"
                      alt="subscribe_blum_channel"
                    />
                  </picture>
                </div>
              </div>
              <div className="earn-item-content">
                <div className="earn-item-content-top">
                  Play Blum and Earn +10,000
                </div>
                <div className="earn-item-content-bottom">
                  <div className="price">
                    <div className="price-image">
                      <img
                        className="coin img-responsive is-20"
                        src="/images/coin.png"
                      />
                    </div>
                    <div className="price-value">+10'000</div>
                  </div>
                </div>
              </div>
              <div className="earn-item-icon">
                {checkTask(BLUM_CHANNEL_TASK_NAME) ? (
                  <div className="earn-item-icon-success">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{ enableBackground: "new 0 0 24 24" }}
                        xmlSpace="preserve"
                      >
                        <path
                          d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div
              className="earn-item"
              onClick={() => {
                setDialogOpen("x-channel");
              }}
            >
              <div className="earn-item-image">
                <div
                  className="earn-image"
                  style={{
                    transform: "scale(1) translateZ(0px)",
                    opacity: 1,
                  }}
                >
                  <img className="img-responsive" src="/images/earn/x.png" />
                </div>
              </div>
              <div className="earn-item-content">
                <div className="earn-item-content-top">
                  Follow our X account
                </div>
                <div className="earn-item-content-bottom">
                  <div className="price">
                    <div className="price-image">
                      <img
                        className="coin img-responsive is-20"
                        src="/images/coin.png"
                      />
                    </div>
                    <div className="price-value">+5'000</div>
                  </div>
                </div>
              </div>
              <div className="earn-item-icon">
                {checkTask(X_CHANNEL_TASK_NAME) ? (
                  <div className="earn-item-icon-success">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{ enableBackground: "new 0 0 24 24" }}
                        xmlSpace="preserve"
                      >
                        <path
                          d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div
              className="earn-item"
              onClick={() => {
                setDialogOpen("youtube-channel");
              }}
            >
              <div className="earn-item-image">
                <div
                  className="earn-image"
                  style={{
                    transform: "scale(1) translateZ(0px)",
                    opacity: 1,
                  }}
                >
                  <picture>
                    <source
                      srcSet="/images/earn/youtube.png"
                      type="image/png"
                      alt="subscribe_youtube_channel"
                    />
                    <img
                      className="img-responsive"
                      src="/images/earn/youtube.png"
                      alt="subscribe_youtube_channel"
                    />
                  </picture>
                </div>
              </div>
              <div className="earn-item-content">
                <div className="earn-item-content-top">
                  Join our Youtube account
                </div>
                <div className="earn-item-content-bottom">
                  <div className="price">
                    <div className="price-image">
                      <img
                        className="coin img-responsive is-20"
                        src="/images/coin.png"
                      />
                    </div>
                    <div className="price-value">+10'000</div>
                  </div>
                </div>
              </div>
              <div className="earn-item-icon">
                {checkTask(YOUTUBE_CHANNEL_TASK_NAME) ? (
                  <div className="earn-item-icon-success">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{ enableBackground: "new 0 0 24 24" }}
                        xmlSpace="preserve"
                      >
                        <path
                          d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="earn-column">
              <div
                className="earn-item"
                onClick={() => {
                  setDialogOpen("invite-task");
                }}
              >
                <div className="earn-item-image">
                  <div
                    className="earn-image"
                    style={{
                      transform: "scale(1) translateZ(0px)",
                      opacity: 1,
                    }}
                  >
                    <picture>
                      <source
                        srcSet="/images/icons/friend.png"
                        type="image/webp"
                        alt="invite_friends"
                      />
                      <img
                        className="img-responsive"
                        src="/images/earn/friend.png.png"
                        alt="invite_friends"
                      />
                    </picture>
                  </div>
                </div>
                <div className="earn-item-content">
                  <div className="earn-item-content-top">Invite 3 friends</div>
                  <div className="earn-item-content-bottom">
                    <div className="price">
                      <div className="price-image">
                        <img
                          className="coin img-responsive is-20"
                          src="/images/coin.png"
                        />
                      </div>
                      <div className="price-value">+25'000</div>
                    </div>
                  </div>
                </div>
                <div className="earn-item-icon">
                  {checkTask(INVITE_TASK_NAME) ? (
                    <div className="earn-item-icon-success">
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          style={{ enableBackground: "new 0 0 24 24" }}
                          xmlSpace="preserve"
                        >
                          <path
                            d="M9 19.9c-.3 0-.6-.1-.8-.3L3 14.3c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0L9 17.2 20.2 6c.4-.4 1.2-.4 1.6 0 .4.4.4 1.2 0 1.6l-12 12c-.2.2-.5.3-.8.3z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        xmlSpace="preserve"
                      >
                        <path
                          d="M9 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1.2 0-1.6l6.7-6.7-6.7-6.7c-.4-.4-.4-1.2 0-1.6s1.2-.4 1.6 0l7.5 7.5c.4.4.4 1.2 0 1.6l-7.5 7.5c-.2.2-.5.3-.8.3z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
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
              setDialogOpen("");
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
          {isDialogOpen === "youtube-channel" && (
            <YoutubeChannelDialog
              setPoint={setPoint}
              setUser={setUser}
              url={YOUTUBE_CHANNEL}
              setDialogOpen={setDialogOpen}
              animateLeaves={animateLeaves}
            />
          )}
          {isDialogOpen === "new-youtube-channel" && (
            <NewYoutubeChannelDialog
              setPoint={setPoint}
              setUser={setUser}
              url={NEW_YOUTUBE_CHANNEL}
              setDialogOpen={setDialogOpen}
              animateLeaves={animateLeaves}
            />
          )}
          {isDialogOpen === "daily-reward" && (
            <DailyRewardDialog
              setDialogOpen={setDialogOpen}
              available={available}
              setAvailable={setAvailable}
              days={days}
              setDays={setDays}
              setPoint={setPoint}
              setUser={setUser}
              animateLeaves={animateLeaves}
            />
          )}
          {isDialogOpen === "tg-channel" && (
            <TGChannelDialog
              setPoint={setPoint}
              setUser={setUser}
              setDialogOpen={setDialogOpen}
              animateLeaves={animateLeaves}
            />
          )}
          {isDialogOpen === "blum-channel" && (
            <BlumChannelDialog
              setPoint={setPoint}
              setUser={setUser}
              setDialogOpen={setDialogOpen}
              animateLeaves={animateLeaves}
            />
          )}
          {isDialogOpen === "x-channel" && (
            <XChannelDialog
              setPoint={setPoint}
              setUser={setUser}
              setDialogOpen={setDialogOpen}
              animateLeaves={animateLeaves}
            />
          )}
          {isDialogOpen === "exchange-task" && (
            <ExchangeTaskDialog
              setDialogOpen={setDialogOpen}
              setPoint={setPoint}
              setUser={setUser}
              animateLeaves={animateLeaves}
            />
          )}
          {isDialogOpen === "invite-task" && (
            <InviteTaskDialog
              setDialogOpen={setDialogOpen}
              setPoint={setPoint}
              setUser={setUser}
              animateLeaves={animateLeaves}
            />
          )}
        </div>
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
  );
}

export default Earn;
