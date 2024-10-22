/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react'
import { PointContext } from '../state/PointContext'
import AppBar from '../Components/AppBar';
import axios from 'axios';
import { BACKEND_URL, IS_PRODUCTION } from '../constants';
import toast from 'react-hot-toast';
import { getExchangeIcon } from './Exchange';
import { initUtils } from '@telegram-apps/sdk';

function Friends() {
    const { user } = useContext(PointContext);

    const [friends, setFriends] = useState([]);

    const [bonusShow, setBonusShow] = useState(false);

    const fetchFriends = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/get/friends`);
            const { data } = response;
            const { friends } = data;

            setFriends(friends);
        }
        catch (e) {
            console.log('apop@userRank', e.message);
        }
        return false;
    }

    useEffect(() => {

        fetchFriends();
    }, [])

    const handleCopyToClipboard = () => {
        if (!user?.tg_id) {
            return false;
        }

        var copyText = `t.me/local_game_test_bot/local_game_test?startapp=kentId${user?.tg_id}`;

        navigator.clipboard.writeText(copyText);
        toast.success('Text copied!')
    }

    const forwardInviteLink = async () => {

        const utils = IS_PRODUCTION ? initUtils() : { openTelegramLink: () => { } };

        utils.openTelegramLink(
            `/share/url?text=Play%20ECAT%20PLAY%20TO%20EARN%20with%20me%20%F0%9F%95%B9%20%0A%0AFight%20your%20way%20up%20from%20a%20Baby%20to%20a%20Billionaire%20and%20get%20a%20token%20airdrop%21%20%0A%0A%F0%9F%8E%81%20%2B5k%20Coins%20as%20a%20first-time%20gift%20%0A%F0%9F%92%B8%20%2B20k%20Coins%20if%20you%20have%20Telegram%20Premium%0A%0A&url=https://t.me/local_game_test_bot/ecatgame?startapp=kentId${user?.tg_id}`
        );
    }

    return (
        <div className="page">
            <main className="main">
                <div className="inner friends">
                    <div
                        className="friends-button"
                        style={{ transform: "translateZ(0px)", opacity: 1 }}
                    >
                        <div className="friends-button-inner">
                            <button className="button button-primary button-default is-invite pulse" onClick={forwardInviteLink}>
                                <span>Invite a friend</span>
                                <div className="icon is-24">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12 7.1c.8 0 1.6.2 2.3.7.7.5 1.2 1.1 1.5 1.9.3.8.4 1.6.2 2.4-.2.8-.6 1.5-1.1 2.1-.6.6-1.3 1-2.1 1.1-.8.2-1.6.1-2.4-.2-.8-.3-1.4-.8-1.9-1.5s-.7-1.5-.7-2.3c0-1.1.4-2.1 1.2-2.9.9-.8 1.9-1.3 3-1.3zM16.5 6H18v1.5c0 .2.1.4.2.5.1.1.3.2.5.2s.4-.1.5-.2c.1-.1.2-.3.2-.5V6H21c.2 0 .4-.1.5-.2.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.1-.1-.3-.2-.5-.2h-1.5V3c0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.5-.2s-.4.1-.5.2c-.2.1-.3.3-.3.5v1.5h-1.5c-.2 0-.4.1-.5.2-.1.1-.2.3-.2.5s.1.4.2.5c.1.2.3.3.5.3zm4.3 3.8c-.2 0-.4.1-.5.3-.1.2-.2.4-.1.6.1.5.1.9.1 1.4 0 2-.7 4-2.1 5.5-.5-.8-1.2-1.5-2-2-.1 0-.2-.1-.2-.1-.1 0-.2 0-.2.1-1 .9-2.3 1.4-3.7 1.4s-2.6-.5-3.7-1.4c-.1-.1-.1-.1-.2-.1s-.2 0-.2.1c-.8.5-1.5 1.2-2 2-1.1-1.2-1.7-2.7-2-4.2-.2-1.6 0-3.2.6-4.6.7-1.4 1.7-2.7 3-3.5C8.9 4.4 10.5 4 12.1 4c.5 0 .9 0 1.4.1.2 0 .4 0 .6-.1.2-.1.3-.3.3-.5s0-.4-.1-.6c-.1-.2-.3-.3-.5-.3-2-.3-4.1 0-6 .9s-3.5 2.2-4.5 4-1.3 3.9-1 6c.3 2 1.3 3.9 2.7 5.4 1.5 1.5 3.3 2.4 5.4 2.7 2 .3 4.1 0 6-1 1.8-.9 3.3-2.5 4.2-4.3.9-1.8 1.2-3.9.9-6 0-.2-.1-.4-.3-.5-.1 0-.3-.1-.4 0z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </button>
                            <button className="button button-copy is-copy button-primary button-default" onClick={handleCopyToClipboard}>
                                <div className="icon is-32">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                        <path
                                            d="M23 27.8H5c-.4 0-.8-.3-.8-.8V9c0-.4.3-.8.8-.8h18c.4 0 .8.3.8.8v18c0 .4-.4.8-.8.8zM5.8 26.3h16.5V9.8H5.8v16.5z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M27 23.8c-.4 0-.8-.3-.8-.8V5.8H9c-.4 0-.8-.4-.8-.8s.4-.7.8-.7h18c.4 0 .8.3.8.8v18c0 .3-.4.7-.8.7z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div
                        className="friends-title"
                        style={{ transform: "translateZ(0px)", opacity: 1 }}
                    >
                        Invite friends!
                    </div>
                    <div
                        className="friends-description"
                        style={{ transform: "translateZ(0px)", opacity: 1 }}
                    >
                        You and your friend will receive bonuses
                    </div>
                    <ul className="friends-invite">
                        <li>
                            <div className="friends-invite-image">
                                <img
                                    className="img-responsive"
                                    src="images/icons/friend.png"
                                    style={{
                                        transform: "scale(1) translateZ(0px)",
                                        opacity: 1,
                                    }}
                                />
                            </div>
                            <div className="friends-invite-info">
                                <div className="friends-invite-info-title">
                                    Invite a friend
                                </div>
                                <div className="friends-invite-info-item">
                                    <div className="price">
                                        <div className="price-image">
                                            <img
                                                className="coin img-responsive is-20"
                                                src="images/coin.png"
                                            />
                                        </div>
                                        <div className="price-value text-yellow">+5,000</div>
                                    </div>
                                    &nbsp;<span>for you and your friend</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="friends-invite-image">
                                <img
                                    className="img-responsive"
                                    src="images/icons/friend.png"
                                    style={{
                                        transform: "scale(1) translateZ(0px)",
                                        opacity: 1,
                                    }}
                                />
                                <img
                                    className="absolute bottom-0 right-0 img-responsive"
                                    src="images/earn/tg-small.png"
                                    style={{
                                        transform: "scale(1) translateZ(0px)",
                                        opacity: 1,
                                    }}
                                />
                            </div>
                            <div className="friends-invite-info">
                                <div className="friends-invite-info-title">
                                    Invite a friend with Telegram Premium
                                </div>
                                <div className="friends-invite-info-item">
                                    <div className="price">
                                        <div className="price-image">
                                            <img
                                                className="coin img-responsive is-20"
                                                src="images/coin.png"
                                            />
                                        </div>
                                        <div className="price-value text-yellow">+25,000</div>
                                    </div>
                                    &nbsp;<span>for you and your friend</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="friends-more-bonuses" style={{}} onClick={() => { setBonusShow(prev => !prev) }}>
                        <p>More bonuses</p>
                    </div>
                    <div className="friends-bonuses" style={{ display: bonusShow ? "block" : "none" }}>
                        <p>Bonus for leveling up</p>
                        <div className="friends-bonuses-header">
                            <span>Level</span>
                            <span>For friend</span>
                            <span>Premium</span>
                        </div>
                        <ul className="friends-bonuses-list">
                            <li>
                                <div>
                                    <div
                                        className="friends-bonuses-image"
                                        style={{
                                            backgroundImage: 'url("/images/league/2.png")',
                                        }}
                                    />
                                    <p>ChildCat</p>
                                </div>
                                <div>
                                    <div className="price">
                                        <div className="price-image">
                                            <img
                                                className="coin img-responsive is-20"
                                                src="images/coin.png"
                                            />
                                        </div>
                                        <div className="price-value text-yellow">+5,000</div>
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
                                        <div className="price-value text-yellow">+10,000</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div
                                        className="friends-bonuses-image"
                                        style={{
                                            backgroundImage: 'url("/images/league/3.png")',
                                        }}
                                    />
                                    <p>BoyCat</p>
                                </div>
                                <div>
                                    <div className="price">
                                        <div className="price-image">
                                            <img
                                                className="coin img-responsive is-20"
                                                src="images/coin.png"
                                            />
                                        </div>
                                        <div className="price-value text-yellow">+6,000</div>
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
                                        <div className="price-value text-yellow">+20,000</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div
                                        className="friends-bonuses-image"
                                        style={{
                                            backgroundImage:
                                                'url("/images/league/4.png")',
                                        }}
                                    />
                                    <p>MoonCat</p>
                                </div>
                                <div>
                                    <div className="price">
                                        <div className="price-image">
                                            <img
                                                className="coin img-responsive is-20"
                                                src="images/coin.png"
                                            />
                                        </div>
                                        <div className="price-value text-yellow">+7,000</div>
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
                                        <div className="price-value text-yellow">+30,000</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div
                                        className="friends-bonuses-image"
                                        style={{
                                            backgroundImage:
                                                'url("/images/league/5.png")',
                                        }}
                                    />
                                    <p>Explorer</p>
                                </div>
                                <div>
                                    <div className="price">
                                        <div className="price-image">
                                            <img
                                                className="coin img-responsive is-20"
                                                src="images/coin.png"
                                            />
                                        </div>
                                        <div className="price-value text-yellow">+8,000</div>
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
                                        <div className="price-value text-yellow">+40,000</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div
                                        className="friends-bonuses-image"
                                        style={{
                                            backgroundImage: 'url("/images/league/6.png")',
                                        }}
                                    />
                                    <p>Millionaire</p>
                                </div>
                                <div>
                                    <div className="price">
                                        <div className="price-image">
                                            <img
                                                className="coin img-responsive is-20"
                                                src="images/coin.png"
                                            />
                                        </div>
                                        <div className="price-value text-yellow">+9,000</div>
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
                                        <div className="price-value text-yellow">+50,000</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <div
                                        className="friends-bonuses-image"
                                        style={{
                                            backgroundImage: 'url("/images/league/7.png")',
                                        }}
                                    />
                                    <p>Billionaire</p>
                                </div>
                                <div>
                                    <div className="price">
                                        <div className="price-image">
                                            <img
                                                className="coin img-responsive is-20"
                                                src="images/coin.png"
                                            />
                                        </div>
                                        <div className="price-value text-yellow">+10,000</div>
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
                                        <div className="price-value text-yellow">+60,000</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="friends-wrap">
                        <div className="section-title">
                            <span>List of your friends </span>
                            <button className="button" onClick={fetchFriends}>
                                <div className="icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        viewBox="0 0 800 800"
                                    >
                                        <path
                                            d="M400 733.3c-82.1 0-161.1-30.1-222.2-84.9l-.1-.1-44.3-40V700c0 18.4-14.9 33.3-33.3 33.3S66.7 718.4 66.7 700V533.5c0-1.3.1-2.5.2-3.8.3-2.6.8-5.1 1.7-7.4v-.1c1.2-3.4 3-6.7 5.4-9.7l.1-.1.1-.1c.4-.5.9-1 1.3-1.5 3.2-3.5 7-6.1 11.1-7.9 3.8-1.7 7.9-2.7 12.3-2.8h167.9c18.4 0 33.3 14.9 33.3 33.3s-14.9 33.3-33.3 33.3h-80l35.6 32.1c48.9 43.8 112 67.9 177.7 67.9 147 0 266.7-119.6 266.7-266.7 0-18.4 14.9-33.3 33.3-33.3s33.3 14.9 33.3 33.3c0 45-8.8 88.6-26.2 129.8-16.8 39.7-40.8 75.3-71.4 105.9-30.6 30.6-66.2 54.6-105.9 71.4-41.3 17.4-84.9 26.2-129.9 26.2zm-300-300c-18.4 0-33.3-14.9-33.3-33.3 0-45 8.8-88.6 26.2-129.8 16.8-39.7 40.8-75.3 71.4-105.9 30.6-30.6 66.2-54.6 105.9-71.4C311.4 75.5 355 66.7 400 66.7c82.1 0 161.1 30.1 222.2 84.9l.1.1 44.3 40V100c0-18.4 14.9-33.3 33.3-33.3s33.3 14.9 33.3 33.3v166.5c0 1.2-.1 2.5-.2 3.7-.3 2.7-.9 5.2-1.7 7.6v.2c-1.2 3.4-3 6.6-5.3 9.5v.1l-.1.1c-.4.5-.9 1-1.3 1.5-3.2 3.5-6.9 6.1-11 7.9-4 1.8-8.5 2.8-13.1 2.9H533.3c-18.4 0-33.3-14.9-33.3-33.3s14.9-33.3 33.3-33.3h80l-35.6-32.1c-48.9-43.8-112-67.9-177.7-67.9C253 133.3 133.3 253 133.3 400c0 18.4-14.9 33.3-33.3 33.3z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>

                            </button>
                        </div>


                        {friends?.length ? friends.map((user, index) => (
                            <div className="league-user" key={`friend-users-${index}`}>
                                <div className="league-user-avatar">
                                    <div className="user-avatar">
                                        <picture><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTP///////////////////////////////////////48EzvsAAAALdFJOUwDMFbBPL5m/ZniGseNS7gAABBFJREFUaN7tWM9v0zAUDlkyut28tMnaU6YCYzs1FUM7dhrTYKcUJvHjtG4TXMk2OJcBQ9y6CcSODCHBn4kd24ndxPbLkLiQ79Kqjr88v/f8vfdqWTVq1Kihgn2WeIdh6cpOFJSvSNhGGH5cXHBHZGXRtH8epWgX3mSP6MrEQPCOPobulVpGqA0eQBxjeaGRLcSQE2C8kReeZAv6M9zkjy1OOcE+5yuvtQRD9pRP99u7Dz9ssa8RW1oAEYxp4BPyPfgZil5oQQhSB9wacav9geAGCIFHXnk3yfyGvNP8EHqCpfSZPv7mCPsxA7GhC/DBDDfAHiEJxKvUhJ6WoMENeIqmsMZN0OeBSx7BL3NQATgwbkJXdcCWN4UrIYDcww3jXSBhmIiZL5swb/KhZc2lLtwoI8CW2cn0JSsios+VICDMnlGRuj0WzCJwdGb7Zk0clLqQudENQbqKFAiBwjyvItgDEiypCFpAgisVQRtYWlT700AC4CgJ0ABEMKsmgHnxhprgCEQwVBPAwrChJmiCCM7VBLA4MjV8GwnxO6CfnQoEi2JG/2D3ywMR0Df3xIQKWdGsQrDHv9B9s/+QYBWpCbAzjHAjHYEXg9OonMDcpTWQnsAo65mYYHFOBB2YASbjnJD2QnmaCBdkAmoTMX4LBd4/k2vkdcQIJkvLEIIjYxIa4AFimOHw8e3NCmfolvU11ib8DNMVJW338h7VGAe7pJ6XGaasL47isG5Js6NuEsXeEP/27DRXSSSkOaggnKRxGReFvgUqCMHXMOUkT7+IQOVBCgId3BrMEY50ig4gD/ng111jEboC5GLJfsvmIZOyITSlQVCSrU5kIhDCvU8nnmOaia/ozLOKDKOfK+eq+4uNn3jkbMey2hgIgjgblS8sayXzST7ExHofrOWjcounVzpMd2FOTO/gNvK2rjhB+0GUHiuLRKjNA3IH75CPOU4wJlrXz00ItJlILiupbxNiEiWICRepam6S3TL1XWiyWV8gCFOxO5EeUd/GMROG76Rb6pGi1mb994CrZks3uvv8PXhKdy7JtPhowKSiyaWhpxPlIz7xNAunI/mxrKtuNrOzKyiqdJP67HShRpW9XBf2CiOIT8/Q1lW2Vq6tqQkrF2ICDVJPL+gq00QokB3MkGAa95tQUmZ1PQZ+UygqG2aLPLFp8MmV07VqQ1+SBRyu9+uS3OM4jHTDr9OU5o2FwhCGHTvUdkkDqTo0C3KPfdyoMLO1C7/41Wa2oCj35rlNqrBpzq5Um9ukmS14iZFUm9ucRNcfBYDJsasj2If0+5/U+09gs7Ny+O4A/0BQMfixZf0NQwe8HzMUu0u0HlpV8HyqOfQ+Vv6He0eg8L6EVnXYu58PMMnx/cut62yvUaNGjf8PfwAoSwbZp4082gAAAABJRU5ErkJggg==" />
                                        </picture>
                                    </div>
                                </div>
                                <div className="league-user-info">
                                    <div className="league-user-info-top">
                                        <div className="exchange-image is-binance">{getExchangeIcon(user.exchange)}</div>
                                        <p>{user.username}</p>
                                    </div>
                                    <div className="price">
                                        <div className="price-image"><img className="coin img-responsive is-20" src='images/coin.png' />
                                        </div>
                                        <div className="price-value">{user.point}</div>
                                    </div>
                                </div>
                                <div className="league-user-position">{index + 1}</div>
                            </div>
                        )) : <div className="friends-no">
                            <p>You haven't invited anyone yet</p>
                        </div>}
                    </div>
                </div>
            </main>
            <AppBar />
            <div className="coin-animation-container" style={{ display: "none" }}>
                <canvas width={355} height={572} />
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
    )
}

export default Friends
