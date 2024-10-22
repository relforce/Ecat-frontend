/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-extra-boolean-cast */
import { useContext, useEffect, useState } from "react";
import AppBar from "../Components/AppBar";
import { PointContext } from "../state/PointContext";
import { BACKEND_URL, COMBO_SIDE } from "../constants";
import { Spinner } from "../Components/Spinner";
import axios from "axios";
import ComboBoxDialog from "../Components/ComboBoxDialog/ComboBoxDialog";
import { toHumanString } from "human-readable-numbers";
import { useNavigate } from "react-router-dom";

function Skills() {
  const { point, level, setProfitPerHour, setUser } = useContext(PointContext);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const [selectedCombo, setSelectedCombo] = useState({
    level: 0,
    point: 0,
  });

  const [comboData, setComboData] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchComboData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/combo/get/skill`);
      const { data } = response;
      const { combos, user } = data;
      console.log("testcombo", data);
      const combosData = combos.map((combo) => {
        const existingCombo = user.combos.find(
          (value) => value._id == combo._id
        );
        const currentLevel = existingCombo ? existingCombo.level : 0;
        console.log("debug->combo", combo);
        const { required } = combo.data;

        let requiredText = "";

        if (required?.combo) {
          const { id, level } = required?.combo;
          const existingCombo = user.combos.find((value) => value._id == id);
          if (!existingCombo || existingCombo.level < level) {
            requiredText = `${existingCombo.name} lvl ${level}`;
          }
        }

        if (!!required?.invites) {
          if (user.invites < +required?.invites) {
            requiredText = `Invite ${+required?.invites} Friend(s).`;
          }
        }

        if (!combo.data?.levels[currentLevel + 1]) {
          return {
            ...combo,
            level: currentLevel,
            profitPerHour: combo.data?.levels[currentLevel]?.profitPerHour,
            point: combo.data?.levels[currentLevel]?.point,
            completed: true,
            requiredText,
          };
        }

        return {
          ...combo,
          level: currentLevel + 1,
          profitPerHour: combo.data?.levels[currentLevel + 1]?.profitPerHour,
          point: combo.data?.levels[currentLevel + 1]?.point,
          requiredText,
        };
      });
      console.log("debug->combosData", combosData);
      setComboData(
        combosData.sort(
          (a, b) =>
            a.profitPerHour - b.profitPerHour ||
            (b.side === COMBO_SIDE.POSITIVE) - (a.side === COMBO_SIDE.POSITIVE)
        )
      );
    } catch (e) {
      console.log("apop@userRank", e.message);
    } finally {
      setLoading(false);
    }
    return false;
  };

  useEffect(() => {
    // fetch combo data from server
    fetchComboData();
  }, []);

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
                Learn new Skills
              </h1>
            </div>
            <div className="flex justify-center items-center">
              <img src="/images/icons/skills.png" width="65%" />
            </div>
            <p className="text-center px-[10%] !my-6">
              Learn new skills and expand your abilities to increase your
              earnings.
            </p>
            <div className="skills-list mb-60">
              {!loading ? (
                comboData.map((value, index) => (
                  <div
                    className={`upgrade-item p-2 w-1/3 ${
                      value?.completed ? "!bg-[#004917]" : ""
                    } ${!value?.requiredText ? "border border-[#0EEC53]" : ""}`}
                    key={`combo-list-${index}`}
                    onClick={() => {
                      if (value?.requiredText) {
                        return false;
                      }
                      setDialogOpen("combo-box");
                      setSelectedCombo(value);
                    }}
                  >
                    {value?.completed && (
                      <div className="icon absolute -right-1 -top-1">
                        <img src="/images/icons/success.svg" />
                      </div>
                    )}
                    {value?.requiredText && (
                      <div className="absolute w-[100%] h-[100%] bg-gray-900 bg-opacity-50 z-10 rounded-lg left-0 top-0">
                        <img
                          src="/images/icons/locked.png"
                          className="block mx-auto my-10"
                        ></img>
                      </div>
                    )}
                    <div className="skill-item-image">
                      <div className="upgrade-image">
                        <picture className="is-rounded">
                          <source
                            srcSet={
                              value.img
                                ? value.img
                                : "/images/skills/no-image.png"
                            }
                            type="image/webp"
                            alt="ceo"
                          />
                          <img
                            className="img-responsive w-full"
                            src="/images/upgrade/_ceo.png"
                            alt="ceo"
                          />
                        </picture>
                      </div>
                    </div>
                    <div className="upgrade-item-info">
                      <div className="upgrade-item-title text-lg z-20">
                        {value.name}
                      </div>
                      <div className="upgrade-item-profit py-8">
                        <p className="text-grey !text-sm">passive Income</p>
                        <div className="upgrade-buy-stats-info">
                          <div className="price">
                            <div className="price-image">
                              <img
                                className="coin img-responsive is-20"
                                src="/images/coin.png"
                              />
                            </div>
                            <div className="price-value !text-lg">
                              +{toHumanString(value.profitPerHour)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="upgrade-item-bottom">
                      <div className="upgrade-item-level !text-lg mr-3">
                        <span>lvl {value.level}</span>
                      </div>
                      <div className="upgrade-item-divider" />
                      <div className="upgrade-item-detail">
                        {!value?.requiredText ? (
                          <div className="price">
                            <div className="price-image">
                              <img
                                className="coin img-responsive w-10 h-10"
                                src="/images/coin.png"
                              />
                            </div>
                            <div className="price-value !text-lg">
                              {toHumanString(value.point)}
                            </div>
                          </div>
                        ) : (
                          <div className="price">
                            <p>{value?.requiredText}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </main>
        <AppBar />
        <div className="coin-animation-container" style={{ display: "none" }}>
          <canvas width={420} height={639} />
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
            <div className="bottom-sheet-scroll">
              {isDialogOpen && (
                <ComboBoxDialog
                  setDialogOpen={setDialogOpen}
                  selectedCombo={selectedCombo}
                  level={level}
                  point={point}
                  setProfitPerHour={setProfitPerHour}
                  fetchDailyMatchs={() => {}}
                  setUser={setUser}
                  fetchComboData={fetchComboData}
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
    </div>
  );
}

export default Skills;
