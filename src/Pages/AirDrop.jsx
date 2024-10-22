/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { PointContext } from "../state/PointContext";
import { Link } from "react-router-dom";
import AppBar from "../Components/AppBar";
import WalletConnectDialog from "../Components/WalletConnectDialog/WalletConnectDialog";
import Proivders from "../state/WalletProvider";
import { BACKEND_URL, AIRDROP_TASK_NAME } from "../constants";
import axios from "axios";
import toast from "react-hot-toast";

let walletCheckInterval = 0;
let leaves = [];
let animationNumber = 0;
function AirDrop() {
  const { user, setUser, point, setPoint } = useContext(PointContext);
  const [isDialogOpen, setDialogOpen] = useState("");
  const [claimAmount, setClaimAmount] = useState(0);
  const [claimLoading, setClaimLoading] = useState(false);
  const canvasRef = useRef();
  const checkTask = () => {
    const task = user.tasks?.find((value) => value.name == AIRDROP_TASK_NAME);
    return !!task && user?.wallet_address;
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

  const onClaim = async (_claimAmount) => {
    console.log("claimloading", claimLoading);
    setClaimLoading(true);
    try {
      if (_claimAmount <= user?.point) {
        const response = await axios.post(
          `${BACKEND_URL}/api/airdrop/onclaim`,
          {
            _claimAmount,
          }
        );
        const { data } = response;
        if (data?.signed) {
          toast.success("Successfully Claimed!");
          animateLeaves();
          // setClaimable(claimable - _claimAmount);
          setPoint(point - _claimAmount);
        } else {
          toast.error("Claim Failed");
        }
      } else {
        toast.error("You can't claim more than your point.");
      }
    } catch (e) {
      console.log("app@fetchDaily", e.message);
      alert(e.message);
      return false;
    } finally {
      setClaimLoading(false);
    }
  };

  const checkWallet = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/airdrop/check-wallet`
      );
      const { data } = response;
      if (data?.user && data?.user?.wallet_address) {
        setUser(data?.user);
      }
    } catch (e) {
      console.log("app@fetchDaily", e.message);
      return false;
    }
    return false;
  };

  useEffect(() => {
    if (isDialogOpen) {
      walletCheckInterval = setInterval(async () => {
        if (user?.wallet_address) {
          clearInterval(walletCheckInterval);
        }
        await checkWallet();
        return false;
      }, 1000);
    }
    return () => {
      clearInterval(walletCheckInterval);
    };
  }, [isDialogOpen]);

  return (
    <Proivders>
      <div className="page">
        <main className="main">
          <div className="inner airdrop">
            <div className="airdrop-top">
              <div
                className="airdrop-top-image"
                style={{ transform: "translateZ(0px)", opacity: 1 }}
              >
                <div className="icon">
                  <img
                    src="/images/airdrop/airdrop.png"
                    className="max-w-[170px] my-4"
                  />
                </div>
              </div>
              <div
                className="airdrop-top-title"
                style={{ transform: "translateZ(0px)", opacity: 1 }}
              >
                Airdrop tasks
              </div>
              <div
                className="friends-description"
                style={{ transform: "translateZ(0px)", opacity: 1 }}
              >
                The $ECAT listing is on its way. It will be the world’s first
                tap-to-earn token on the Solana blockchain. To participate in
                the airdrop, make sure to add your Solana wallet address to the
                app (we recommend using the Phantom wallet).
              </div>
            </div>
            <div className="section-title">Tasks list</div>
            <div
              className="airdrop-item is-connect_ton_wallet"
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              <div className="airdrop-item-image">
                <div
                  className="airdrop-image"
                  style={{ transform: "scale(1) translateZ(0px)", opacity: 1 }}
                >
                  <picture>
                    <source
                      srcSet="/images/airdrop/airdrop-wallet.png"
                      type="image/png"
                      alt="airdrop_connect_ton_wallet"
                    />
                    <img
                      className="img-responsive"
                      src="/images/airdrop/airdrop-wallet.png"
                      alt="airdrop_connect_ton_wallet"
                    />
                  </picture>
                </div>
              </div>
              <div className="airdrop-item-content">
                <div className="airdrop-item-content-top">
                  {checkTask()
                    ? `Change  your wallet`
                    : `Connect your Solana wallet`}
                </div>
              </div>
              <div className="airdrop-item-icon">
                {checkTask() ? (
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
            {checkTask() && (
              <div>
                You connected with{" "}
                <span className="text-teal-400">{`${user?.wallet_address?.slice(
                  0,
                  4
                )}...${user?.wallet_address?.slice(-6)}`}</span>
              </div>
            )}

            {user?.wallet_address && user?.point > 1500 ? (
              <div className="claimSec">
                <div style={{ border: "none", width: "50%" }}>
                  <input
                    type="number"
                    min="100000"
                    placeholder="Min 100000 ECAT"
                    className="inputField"
                    onChange={(e) => setClaimAmount(e.target.value)}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>You can claim</span>
                  <div>
                    <span>{point}</span>
                    <span>ECAT</span>
                  </div>
                </div>
                <button
                  className="airdrop-item is-connect_ton_wallet"
                  onClick={() => {
                    if(claimLoading == false){
                      onClaim(claimAmount) 
                     }
                    }
                  }
                  disabled={claimLoading ? true : false}
                >
                  <div className="airdrop-item-image">
                    <div
                      className="airdrop-image"
                      style={{
                        transform: "scale(1) translateZ(0px)",
                        opacity: 1,
                      }}
                    >
                      <picture>
                        <source
                          srcSet="/images/icons/logo.png"
                          type="image/png"
                          alt="claimecat"
                        />
                        <img
                          className="img-responsive"
                          src="/images/icons/logo.png"
                          alt="claimecat"
                        />
                      </picture>
                    </div>
                  </div>
                  <div className="airdrop-item-content">
                    {claimLoading? <div className="airdrop-item-content-top">Processing...</div> : <div className="airdrop-item-content-top">Claim</div>}
                  </div>
                </button>
              </div>
            ) : (
              <></>
            )}
            {/* {!data?.status ? <Spinner /> : <div><span>{data?.status}</span></div>} */}
            <div className="section-title mt-10">Create Phantom Wallet</div>
            <Link
              className="airdrop-item !bg-[#AB9FF2]"
              to={`https://phantom.app/download`}
              target="_blank"
            >
              <div className="airdrop-item-image">
                <div
                  className="airdrop-image"
                  style={{ transform: "scale(1) translateZ(0px)", opacity: 1 }}
                >
                  <picture>
                    <source
                      srcSet="/images/icons/phantom.png"
                      type="image/png"
                      alt="airdrop_connect_ton_wallet"
                    />
                    <img
                      className="img-responsive"
                      src="/images/icons/phantom.png"
                      alt="airdrop_connect_ton_wallet"
                    />
                  </picture>
                </div>
              </div>
              <div className="airdrop-item-content">
                <div className="airdrop-item-content-top">
                  Create Phantom Wallet
                </div>
              </div>
              <div className="airdrop-item-icon">
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
              </div>
            </Link>
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
          <div className="bottom-sheet-inner !border-2 !border-cyan-500">
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
            <div className="bottom-sheet-scroll">
              {isDialogOpen && (
                <WalletConnectDialog
                  user={user}
                  setDialogOpen={setDialogOpen}
                />
              )}
            </div>
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
    </Proivders>
  );
}

export default AirDrop;
