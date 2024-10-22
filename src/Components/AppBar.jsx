import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getExchangeIcon } from "../Pages/Exchange";
import { PointContext } from "../state/PointContext";
import { EXCHANGES } from "../constants";

function AppBar() {
  const { exchange } = useContext(PointContext);
  const { pathname } = useLocation();

  return (
    <div className="app-bar z-40">
      <nav className="app-bar-nav">
        <Link
          to="/"
          className={`app-bar-item ${
            pathname == "/"
              ? "router-link-active router-link-exact-active"
              : "no-select"
          }`}
        >
          <div className="app-bar-item-image">
            <div className="exchange-image is-border-6">
              <img
                src={
                  pathname == "/"
                    ? "/images/appbar/logo.png"
                    : "/images/appbar/logo-gray.png"
                }
              />
            </div>
          </div>
          <p>Tap to Earn</p>
        </Link>
        <Link
          to="/mine"
          className={`app-bar-item ${
            pathname == "/mine"
              ? "router-link-active router-link-exact-active"
              : "no-select"
          }`}
        >
          <div className="app-bar-item-image">
            <div className="icon icon-mine">
              <img
                src={
                  pathname == "/mine"
                    ? "/images/appbar/skills-active.svg"
                    : "/images/appbar/skills.svg"
                }
              />
            </div>
          </div>
          <p>Lottery</p>
        </Link>
        <Link
          to="/friends"
          className={`app-bar-item ${
            pathname == "/friends"
              ? "router-link-active router-link-exact-active"
              : "no-select"
          }`}
        >
          <div className="app-bar-item-image">
            <div className="icon icon-friends">
              <img
                src={
                  pathname == "/friends"
                    ? "/images/appbar/friends-active.svg"
                    : "/images/appbar/friends.svg"
                }
              />
            </div>
          </div>
          <p>My Friends</p>
        </Link>
        <Link
          to="/earn"
          className={`app-bar-item ${
            pathname == "/earn"
              ? "router-link-active router-link-exact-active"
              : "no-select"
          }`}
        >
          <div className="app-bar-item-image">
            <div className="icon icon-earn">
              <img
                src={
                  pathname == "/earn"
                    ? "/images/appbar/earn-active.svg"
                    : "/images/appbar/earn.svg"
                }
              />
            </div>
          </div>
          <p>Earn</p>
        </Link>
        <Link
          to="/airdrop"
          className={`app-bar-item ${
            pathname == "/airdrop"
              ? "router-link-active router-link-exact-active"
              : "no-select"
          }`}
        >
          <div className="app-bar-item-image">
            <picture className="is-token">
              <source
                srcSet="/images/appbar/airdrop.png"
                type="image/svg"
                alt="ECAT GAME"
              />
              <img
                className="img-responsive"
                src={
                  pathname == "/airdrop" 
                  ? "/images/appbar/airdrop.png"
                  : "/images/appbar/airdrop-gray.png"
                }
                alt="ECAT GAME"
              />
            </picture>
          </div>
          <p>Airdrop</p>
        </Link>
      </nav>
    </div>
  );
}

export default AppBar;
