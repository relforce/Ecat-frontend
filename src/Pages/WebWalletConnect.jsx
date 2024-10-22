/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router";
import { BACKEND_URL } from "../constants";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const WebWalletConnect = () => {
  const wallet = useWallet();

  const { tg_id } = useParams();

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/web/connect-wallet`,
          {
            account: wallet.publicKey.toBase58(),
            tg_id: tg_id,
          }
        );
        const { data } = response;
        if (data?.status == "success") {
          toast.success("Wallet successfully connected!");
        } else {
          toast.error(data?.message);
        }
      } catch (e) {
        console.log("apop@connectWallet", e.message);
        toast.error(e?.response?.data?.message ?? e.message);
      }
      return false;
    };

    if (wallet.connected) {
      connectWallet();
    }
  }, [wallet.connected]);

  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-y-8 text-center mx-4">
      <h1 className="text-2xl">Welcome to ECAT GAME Dashbord</h1>
      <p className="font-bold">
        Connect your wallet and sign the message to submit your Solana address
        to the ECAT GAME application.
      </p>
      <WalletMultiButton
        className=""
        style={{ background: "#FBD914", borderRadius: "1rem" }}
        children={
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
        }
      />
      {wallet.connected && (
        <Link
          className="text-lg font-bold rounded-md bg-[#FFD300] px-4 py-3 text-black"
          to={"https://t.me/local_game_test_bot"}
        >
          Back to Game
        </Link>
      )}
    </div>
  );
};

export default WebWalletConnect;
