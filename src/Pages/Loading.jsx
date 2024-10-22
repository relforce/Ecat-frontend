import {} from "react";
import { TG_CHANNEL, X_CHANNEL_LINK } from "../constants";

const Loading = () => {
  return (
    <div className="page">
      <div className="main">
        <div className="loading-progress" style={{ width: "77.5%" }} />
        <div className="loading-launch">
          <div className="flex flex-col justify-center items-center z-50">
            <img src="/images/icons/logo.png" width="100px" />
            <h1 className="loading-title">Fight Your Way Up</h1>
            <p className="loading-subtitle">From a Baby to a Billionaire</p>
          </div>
          <div className="loading-launch-image">
            <picture>
              <source srcSet="/images/loading/base.png" type="image/webp" />
              <img src="/images/loading/base.png" alt="Loading screen" />
            </picture>
          </div>
          <div className="loading-launch-progress">
            <div className="icon">
              <img src="/images/loading-icon.svg" />
            </div>
            <div className="loading-launch-progress-text">Loading</div>
          </div>
          <div className="loading-launch-bottom">
            <div className="loading-launch-social">
              <span>Socials</span>
              <ul>
                <li>
                  <a
                    className="icon is-telegram"
                    target="_blank"
                    href={TG_CHANNEL}
                  >
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.6132 4.873C27.6132 4.873 30.2032 3.863 29.9866 6.31567C29.9152 7.32567 29.2679 10.861 28.7639 14.6843L27.0372 26.011C27.0372 26.011 26.8932 27.6703 25.5979 27.959C24.3032 28.247 22.3606 26.949 22.0006 26.6603C21.7126 26.4437 16.6046 23.197 14.8059 21.6103C14.3019 21.177 13.7259 20.3117 14.8779 19.3017L22.4319 12.087C23.2952 11.2217 24.1586 9.20167 20.5612 11.6543L10.4879 18.5077C10.4879 18.5077 9.33655 19.2297 7.17855 18.5803L2.50122 17.137C2.50122 17.137 0.774553 16.055 3.72455 14.973C10.9199 11.5823 19.7699 8.11967 27.6119 4.873H27.6132Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="icon is-x"
                    target="_blank"
                    href={X_CHANNEL_LINK}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M15.8.9h3.1l-6.7 7.7L20 19.1h-6.2L9 12.7 3.5 19H.4l7.2-8.2L0 .9h6.3l4.4 5.8L15.8.9zm-1.1 16.3h1.7L5.4 2.7H3.6l11.1 14.5z"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-sheet" style={{ display: "none" }}>
        <div
          className="bottom-sheet-bg"
          style={{ touchAction: "none", userSelect: "none" }}
        />
        <div className="bottom-sheet-inner">
          <div className="bottom-sheet-close">
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
          <div className="bottom-sheet-scroll" />
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
};

export default Loading;
