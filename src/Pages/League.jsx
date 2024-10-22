import { useContext, useEffect, useState } from 'react'
import AppBar from '../Components/AppBar'
import { PointContext } from '../state/PointContext'
import { BACKEND_URL, LEVEL_DATA, LEVELS, TOP_LEVEL } from '../constants';
import axios from 'axios';
import { Spinner } from '../Components/Spinner';


function League() {

    const { user } = useContext(PointContext)
    const { level, point } = user;
    const [currentLevel, setCurrentLevel] = useState(level)
    const [userRank, setUserRank] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRank = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/user/get/all`);
                const { data } = response;
                const { users } = data;

                const userRankData = [];
                LEVELS.map((value, index) => {
                    const levelUsers = users.filter(_user => _user.level == value).sort((a, b) => b.point > a.point ? 1 : -1);
                    userRankData[index] = levelUsers;
                });
                console.log(userRankData);
                setUserRank(userRankData);
            }
            catch (e) {
                console.log('apop@userRank', e.message);
            }
            finally {
                setLoading(false);
            }
            return false;
        }

        fetchUserRank();
    }, [])
    return (
        <div>
            <div className="page">
                <main className="main">
                    <div className="inner league">
                        <div className={`swiper swiper-fade swiper-initialized swiper-horizontal swiper-ios swiper-watch-progress league-slider is-${LEVEL_DATA[currentLevel].name}`}>
                            <div className="swiper-wrapper" style={{ transitionDuration: '100ms', transitionDelay: '100ms' }}>
                                <div key={`league-list-${currentLevel}`} className={`swiper-slide league-slide is-${LEVEL_DATA[currentLevel].name} swiper-slide-visible swiper-slide-fully-visible swiper-slide-active`} style={{ width: `100%`, transitionDuration: '0ms', opacity: 1 }}>
                                    <div className="league-item">
                                        <div className={`league-item-image is-${LEVEL_DATA[currentLevel].name}`}>
                                            <picture className={`is-hamster-image is-level-${currentLevel}`}>
                                                <source srcSet={`/images/hamsters/${currentLevel}.png`} type="image/png" />
                                                <source srcSet={`/images/hamsters/${currentLevel}.webp`} type="image/webp" /><img className="img-responsive" src={`/images/hamsters/${currentLevel}.png`} alt="ECAT GAME" />
                                            </picture>
                                        </div>
                                    </div>
                                    <div className="league-data">
                                        <div className="league-data-name">{LEVEL_DATA[currentLevel].name}</div>
                                    </div>
                                    <div className="league-numbers"><span>{`from ${LEVEL_DATA[currentLevel].point}`}</span></div>
                                    {currentLevel == level && <div className="flex flex-row justify-between items-center mt-3" >
                                        <span className='font-bold'>{LEVEL_DATA[currentLevel].point}</span>
                                        <span className='font-bold'>{LEVEL_DATA[currentLevel + 1]?.point ?? ' - '}</span>
                                    </div>}
                                    <div className="league-progress-outer !mt-0" >
                                        {currentLevel == level ? <div className="league-progress-outer">
                                            <div className="league-progress">
                                                <div className="league-progress-bar" style={{ width: `${(point - LEVEL_DATA[level].point) / (LEVEL_DATA[level + 1].point - LEVEL_DATA[level].point) * 100}%` }} />
                                            </div>
                                        </div> : <></>}
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-button-prev" onClick={() => { setCurrentLevel(prev => Math.min(Math.max(prev - 1, 1), TOP_LEVEL)) }} />
                            <div className="swiper-button-next" onClick={() => { setCurrentLevel(prev => Math.min(Math.max(prev + 1, 1), TOP_LEVEL)) }} />
                        </div>
                        <h1 className='text-center text-2xl mb-4'>Global Ranking</h1>
                        {!isLoading ? <div className={`league-users is-${LEVEL_DATA[currentLevel].name}`}>
                            {userRank[currentLevel - 1]?.map((_user, index) => (
                                _user._id != user._id ? <div className={`league-user bg-[#15140C] !rounded-full`} key={`level-users-${index}`}>
                                    <div className="league-user-avatar">
                                        <div className="user-avatar">
                                            <picture><img src="/images/earn/ecat.png" />
                                            </picture>
                                        </div>
                                    </div>
                                    <div className="league-user-info">
                                        <div className="league-user-info-top">
                                            <p>{_user.username}</p>
                                        </div>
                                        <div className="price">
                                            <div className="price-image"><img className="coin img-responsive is-20" src="/images/coin.png" />
                                            </div>
                                            <div className="price-value">{_user.point}</div>
                                        </div>
                                    </div>
                                    <div className="league-user-position">{index + 1}</div>
                                </div> : <></>
                            ))}
                            {currentLevel == level && <div className="league-user is-my">
                                <div className="league-user-avatar">
                                    <div className="user-avatar">
                                        <picture>
                                            <source srcSet="/images/earn/ecat.png" type="image/webp" />
                                            <img src="/images/earn/ecat.png" />
                                        </picture>
                                    </div>
                                </div>
                                <div className="league-user-info">
                                    <div className="league-user-info-top">
                                        <p>{user.username}</p>
                                    </div>
                                    <div className="price">
                                        <div className="price-image"><img className="coin img-responsive is-20" src="/images/coin.png" />
                                        </div>
                                        <div className="price-value">{point}</div>
                                    </div>
                                </div>
                                <div className="league-user-position">{userRank[user.level - 1]?.map(value => value._id)?.indexOf(user._id) + 1}</div>
                            </div>}
                        </div> : <div className='w-full flex justify-center items-center'><Spinner /></div>}
                    </div>
                </main>
                <AppBar />
                <div className="coin-animation-container" style={{ display: 'none' }}><canvas width={340} height={639} />
                </div>
                <div className="bottom-sheet" style={{ display: 'none' }}>
                    <div className="bottom-sheet-bg" style={{ touchAction: 'none', userSelect: 'none' }} />
                    <div className="bottom-sheet-inner">
                        <div className="bottom-sheet-close">
                            <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" style={{ enableBackground: 'new 0 0 32 32' }} viewBox="0 0 32 32">
                                <path d="M16 3a13 13 0 0 0-7.2 2.2C6.6 6.6 5 8.6 4 11s-1.2 5-.7 7.5 1.7 4.8 3.6 6.7c1.8 1.8 4.1 3.1 6.7 3.6 2.4.5 5 .2 7.4-.8a13 13 0 0 0 5.8-4.8c1.4-2.1 2.2-4.7 2.2-7.2 0-3.4-1.4-6.8-3.8-9.2C22.8 4.4 19.4 3 16 3zm4.7 16.3c.1.1.2.2.2.3.1.1.1.3.1.4s0 .3-.1.4c-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1.1-.3.1-.4.1s-.3 0-.4-.1c-.1-.1-.2-.1-.3-.2L16 17.4l-3.3 3.3c-.1.1-.2.2-.3.2s-.3.1-.4.1-.3 0-.4-.1-.2-.1-.3-.2c-.1-.1-.2-.2-.2-.3-.1-.1-.1-.3-.1-.4s0-.3.1-.4c.1-.1.1-.2.2-.3l3.3-3.3-3.3-3.3c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7c.2-.2.4-.3.7-.3s.5.1.7.3l3.3 3.3 3.3-3.3c.1-.1.2-.2.3-.2.1-.1.3-.1.4-.1s.3 0 .4.1c.1.1.2.1.3.2.1.1.2.2.2.3s.1.3.1.4 0 .3-.1.4-.1.2-.2.3L17.4 16l3.3 3.3z" fill="currentColor" />
                            </svg></div>
                        </div>
                        <div className="bottom-sheet-scroll" />
                    </div>
                </div>
                <div className="modal" style={{ display: 'none' }}>
                    <div className="modal-bg" style={{ touchAction: 'none', userSelect: 'none' }} />
                    <div className="modal-inner">
                        <div className="modal-close">
                            <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" style={{ enableBackground: 'new 0 0 32 32' }} viewBox="0 0 32 32">
                                <path d="M16 3a13 13 0 0 0-7.2 2.2C6.6 6.6 5 8.6 4 11s-1.2 5-.7 7.5 1.7 4.8 3.6 6.7c1.8 1.8 4.1 3.1 6.7 3.6 2.4.5 5 .2 7.4-.8a13 13 0 0 0 5.8-4.8c1.4-2.1 2.2-4.7 2.2-7.2 0-3.4-1.4-6.8-3.8-9.2C22.8 4.4 19.4 3 16 3zm4.7 16.3c.1.1.2.2.2.3.1.1.1.3.1.4s0 .3-.1.4c-.1.1-.1.2-.2.3-.1.1-.2.2-.3.2-.1.1-.3.1-.4.1s-.3 0-.4-.1c-.1-.1-.2-.1-.3-.2L16 17.4l-3.3 3.3c-.1.1-.2.2-.3.2s-.3.1-.4.1-.3 0-.4-.1-.2-.1-.3-.2c-.1-.1-.2-.2-.2-.3-.1-.1-.1-.3-.1-.4s0-.3.1-.4c.1-.1.1-.2.2-.3l3.3-3.3-3.3-3.3c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7c.2-.2.4-.3.7-.3s.5.1.7.3l3.3 3.3 3.3-3.3c.1-.1.2-.2.3-.2.1-.1.3-.1.4-.1s.3 0 .4.1c.1.1.2.1.3.2.1.1.2.2.2.3s.1.3.1.4 0 .3-.1.4-.1.2-.2.3L17.4 16l3.3 3.3z" fill="currentColor" />
                            </svg></div>
                        </div>
                        <div className="modal-scroll" />
                    </div>
                </div>
                <div id="ton-connect-widget" />
            </div>
        </div>
    )
}

export default League
