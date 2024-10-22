import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL, FRONTEND_DOMAIN } from "../../constants";
import { Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletConnectDialog = ({ user, setDialogOpen }) => {
  const handleCheck = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/airdrop/connect-wallet`,
        {}
      );
      const { data } = response;
      if (data?.status == "success") {
        toast.success("Wallet successfully connected!");
      } else {
        toast.error(data?.message);
      }
    } catch (e) {
      console.log("apop@connectWallet", e.message);
      // toast.error(e?.response?.data?.message ?? e.message);
    } finally {
      setDialogOpen(false);
    }
    return false;
  };

  return (
    <div className="bottom-sheet-scroll">
      <div className="bs-content">
        <div className="bs-content-image">
          <div className="airdrop-image">
            <picture>
              <source
                srcSet="/images/airdrop/airdrop-wallet.png"
                type="image/webp"
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
        <div className="bs-content-title !text-4xl">
          Connect your Solana wallet
        </div>
        <div className="bs-content-description">
          Connect your crypto wallet. If you don’t have one, create one in your
          Telegram account.
        </div>
        <div className="connect-ton-wallet">
          <Link
            className="bg-[#fbd914] flex flex-row justify-center items-center font-bold gap-2 px-6 py-3 m-auto text-black !rounded-xl"
            to={`https://phantom.app/ul/browse/https%3A%2F%2F${FRONTEND_DOMAIN}%2Fwallet-connect%2F${user?.tg_id}?ref=https%3A%2F%2F${FRONTEND_DOMAIN}`}
            target="_blank"
          >
            <div className="icon">
              <img src="/images/icons/wallet.svg" />
            </div>
            <span>Connect your Solana Wallet</span>
          </Link>
          {/* <WalletMultiButton
            className=""
            style={{ background: "#FBD914", borderRadius: "1rem" }}
          >
            <div className="flex flex-row justify-center items-center !text-sm gap-2 text-black !rounded-2xl">
              <div className="icon">
                <img src="/images/icons/wallet.svg" />
              </div>
              <span>
                {wallet.connected
                  ? `${wallet.publicKey
                      .toBase58()
                      .slice(0, 4)}...${wallet.publicKey.toBase58().slice(-6)}`
                  : `Connect your Solana wallet`}
              </span>
            </div>
          </WalletMultiButton> */}
        </div>
        <button
          className="bottom-sheet-button button button-primary button-large"
          onClick={handleCheck}
        >
          <span>Check</span>
        </button>
      </div>
    </div>
  );
};

export default WalletConnectDialog;
