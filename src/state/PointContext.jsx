/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { BACKEND_URL, ENERGY_INTERVAL, ENERGY_SPEED, EXCHANGES, IS_PRODUCTION, LEVEL_DATA } from "../constants";
import axios from "axios";

// retrieve data from telegram user
import { retrieveLaunchParams, initViewport } from '@telegram-apps/sdk';
import Loading from "../Pages/Loading";

if (IS_PRODUCTION) {
    try {
        const { initDataRaw } = retrieveLaunchParams();

        console.log(initDataRaw);

        axios.defaults.headers.Authorization = `tma ${initDataRaw}`;
    }
    catch (e) {
        console.log(e.message);
    }
} else {

    axios.defaults.headers.Authorization = `tma user=%7B%22id%22%3A5070935566%2C%22first_name%22%3A%22Crypto%22%2C%22last_name%22%3A%22Gig%22%2C%22username%22%3A%22crypos0319%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5685883691974505385&chat_type=private&auth_date=1721573593&hash=2deeed63ff5c53699feaafaa02eb5b0b3dcca9376d0bdaac560f52e22cbaa9d2`;
}

export const PointContext = createContext({

})

let energyFillInterval = 0;
let pointPerHourInterval = 0;
let lastUpdatedTime = 0;

export const PointContextProvider = ({ children }) => {

    const [energy, setEnergy] = useState(0);
    const [user, setUser] = useState({
        username: 'cryptogig',
        point: 2000,
        level: 1,
        exchange: EXCHANGES.BINANCE,
        energyLimit: 1500,
        fullEnergy: 6,
        dailyBonus: 100,
        profitPerHour: 100,
        pointPerClick: 1
    });

    const [level, setLevel] = useState(1);

    const [pointPerClick, setPointPerClick] = useState(1);

    const [point, setPoint] = useState(0);

    const [exchange, setExchange] = useState(EXCHANGES.BINANCE);

    // fake: default true
    const [initialized, setInitialized] = useState(true);

    const [fullEnergy, setFullEnergy] = useState(0);

    const [energyLimit, setEnergyLimit] = useState(0);

    const [profitPerHour, setProfitPerHour] = useState(0);

    const [username, setUserName] = useState('unknown');

    const [dailyCombo, setDailyCombo] = useState({});

    const [dailyCipher, setDailyCipher] = useState({});

    const [dailyReward, setDailyReward] = useState('');

    const [tasks, setTasks] = useState({});

    const [bonus, setBonus] = useState(0);

    const [skin, setSkin] = useState("Default");

    const [multiTapLevel, setMultiTapLevel] = useState(1);

    const [energyLimitLevel, setEnergyLimitLevel] = useState(1);

    const [turbo, setTurbo] = useState(false);

    const [loading, setLoading] = useState(true);

    const [lottery, setLottery] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const startParam = getQueryVariable('tgWebAppStartParam');

                const response = await axios.post(`${BACKEND_URL}/api/auth`, {
                    startParam: IS_PRODUCTION ? startParam : 'kentId5070935566'
                });
                const { data } = response;
                setUser(data.user)
                
                let { level, exchange, profitPerHour, point, fullEnergy, energyLimit, username, bonus, tasks, skin, pointPerClick, energyLimitLevel, multiTapLevel, referral } = data.user;

                // set energy of user
                const lastEnergyData = localStorage.getItem('app@user_energy');
                // initialize the app data

                setLevel(level);
                setBonus(bonus);
                setPoint(point + bonus);
                setExchange(exchange);
                setFullEnergy(fullEnergy);
                setEnergyLimit(Math.max(energyLimit, LEVEL_DATA[level].energy));

                if (lastEnergyData) {
                    const { energy, time } = JSON.parse(lastEnergyData);
                    const currentTime = new Date().getTime();
                    const estimatedEnergy = Math.floor(energy + pointPerClick * (currentTime - +time) / 1000)

                    setEnergy(Math.min(estimatedEnergy, energyLimit))
                } else {
                    setEnergy(Math.max(energyLimit, LEVEL_DATA[level].energy))
                }

                setProfitPerHour(profitPerHour);
                setUserName(username);
                setTasks(tasks)
                setSkin(skin)
                setPointPerClick(pointPerClick)

                setEnergyLimitLevel(energyLimitLevel);
                setMultiTapLevel(multiTapLevel)

                const newEnergyLimit = Math.max(energyLimit, LEVEL_DATA[level].energy);

                if (!energyFillInterval) {
                    energyFillInterval = setInterval(() => { setEnergy(_energy => _energy + ENERGY_SPEED <= newEnergyLimit ? _energy + ENERGY_SPEED : newEnergyLimit) }, ENERGY_INTERVAL)
                    console.log(energyFillInterval)
                }

                // add point per hour logic
                if (!pointPerHourInterval) {
                    const profitPerTIme = profitPerHour > 3600 ? Math.floor(profitPerHour / 3600) : 1;
                    const profitFillTime = profitPerHour > 3600 ? 1000 : Math.ceil(3600 / profitPerHour) * 1000
                    if (profitPerHour)
                        pointPerHourInterval = setInterval(() => { setPoint(_point => _point + profitPerTIme) }, profitFillTime);
                }

            }
            catch (e) {
                console.log('app@autherror', e.message)
            }
            finally {
                setLoading(false);
                const [response, ] = initViewport();
                const viewport = await response;
                viewport.expand();

            }
        }

        const updateUser = async (userData) => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/user/update`, { ...userData });
                const { data } = response;
                return data.user;
            }
            catch (e) {
                console.log('app@updateUser', e.message)
                return {};
            }
        }

        const fetchDaily = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/combo/get/dailycombo`);
                const { data } = response;
                return { ...data };
            }
            catch (e) {
                console.log('app@fetchDaily', e.message)
                return false;
            }
            finally {
            }
        }

        // const lastSyncAt = localStorage.getItem("app@sync_at");
        // const localUserData = localStorage.getItem("app@user_info");
        // if (localUserData) {
        //     const userData = JSON.parse(localUserData);

        //     if (+lastSyncAt <= +userData.updated_at) {
        //         updateUser({ ...userData })
        //             .then(() => {
        //                 fetchUserData();
        //                 lastUpdatedTime = new Date().getTime();
        //                 localStorage.setItem('app@sync_at', lastUpdatedTime)
        //             })
        //     } else {
        //         fetchUserData();
        //     }
        // } else {
        //     fetchUserData();
        // }

        fetchUserData();

        //set daily reward, combo data
        fetchDaily()
            .then(({ combo, cipher, dailyReward }) => {
                setDailyCombo(combo);
                setDailyCipher(cipher);
                setDailyReward(dailyReward)
            })

        const fetchLottery = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/user/get-lottery`);
                const { data } = response;
                if (data?.lottery) {
                    setLottery(data?.lottery)
                }
            }
            catch (e) {
                console.log('app@fetchLottery', e.message)
                return false;
            }
        }

        fetchLottery();

        return async () => {
            clearInterval(energyFillInterval);
            energyFillInterval = 0;

            // todo; save data in local storage energy!!
            const saveData = { exchange, profitPerHour, point, fullEnergy, energyLimit, username, skin, energyLimitLevel, multiTapLevel };
            localStorage.setItem("app@userdata", JSON.stringify(saveData));

            await axios.post(`${BACKEND_URL}/api/update`, { point });

            lastUpdatedTime = new Date().getTime();
        }

    }, [])


    useEffect(() => {

        const updateUser = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/user/update`, { point });
                const { data } = response;

                localStorage.setItem('levelUpdated', data?.levelUpdated ? 1 : 0);
                
                return data.user;
            }
            catch (e) {
                console.log('app@updateUser', e.message)
                return {};
            }
        }

        const currentTime = new Date().getTime();

        // check if synced before 5s
        if (currentTime - lastUpdatedTime > 5000 && !loading) {
            updateUser()
                .then((_user) => {
                    if (_user) {
                        setUser(_user)
                        let { level, exchange, profitPerHour, point, fullEnergy, energyLimit, username, bonus, tasks, skin, pointPerClick, energyLimitLevel, multiTapLevel } = _user;

                        // initialize the app data

                        setLevel(level);
                        setBonus(bonus);
                        setPoint(point + bonus);
                        setExchange(exchange);
                        setFullEnergy(fullEnergy);
                        setEnergyLimit(Math.max(energyLimit, LEVEL_DATA[level].energy));
                        // setEnergy(Math.max(energyLimit, LEVEL_DATA[level].energy))
                        setProfitPerHour(profitPerHour);
                        setUserName(username);
                        setTasks(tasks)
                        setSkin(skin)
                        setPointPerClick(pointPerClick);

                        setEnergyLimitLevel(energyLimitLevel);
                        setMultiTapLevel(multiTapLevel)
                    }

                    lastUpdatedTime = new Date().getTime();
                    localStorage.setItem('app@sync_at', lastUpdatedTime)
                })
        } else {
            let userData = { exchange, profitPerHour, point, fullEnergy, energyLimit, level, pointPerClick, energyLimitLevel, multiTapLevel };
            userData.updated_at = new Date().getTime();

            if (user?.tg_id) {
                localStorage.setItem('app@user_info', JSON.stringify(userData))
            }
        }

        // updateUserInterval = setInterval(updateUser, UPDATE_USER_INTERVAL)

    }, [level, exchange, profitPerHour, point, fullEnergy, energyLimit, pointPerClick])

    useEffect(() => {
        if (user?.tg_id && energy) {
            const time = new Date().getTime();
            const storeObject = JSON.stringify({ energy, time });
            localStorage.setItem('app@user_energy', storeObject)
        }
    }, [energy])

    useEffect(() => {
        const speed = turbo ? ENERGY_SPEED * 10 : ENERGY_SPEED;

        clearInterval(energyFillInterval);
        energyFillInterval = setInterval(() => { setEnergy(_energy => _energy + speed <= energyLimit ? _energy + speed : energyLimit) }, ENERGY_INTERVAL)

    }, [turbo, energyLimit])

    // useEffect(() => {

    //     let { level, exchange, profitPerHour } = user;

    //     // const prevData = localStorage.getItem("app@data");
    //     // if (prevData) {
    //     //     const data = JSON.parse(prevData);
    //     //     if (data.user) {
    //     //         setUser({ point: data.point, exchange: data.exchange, energy: data.energy });
    //     //         setPoint(data.point);
    //     //         setExchange(data.exchange);
    //     //     }
    //     // }

    //     // initialize the app data

    //     setLevel(level);
    //     setPoint(user.point);
    //     setPointPerClick(LEVEL_DATA[level].pointPerClick);
    //     setExchange(exchange);
    //     setFullEnergy(user.fullEnergy);
    //     setEnergyLimit(Math.max(user.energyLimit, LEVEL_DATA[level].energy));
    //     setEnergy(Math.max(user.energyLimit, LEVEL_DATA[level].energy))
    //     setProfitPerHour(profitPerHour);

    //     const newEnergyLimit = Math.max(user.energyLimit, LEVEL_DATA[level].energy);

    //     if (!energyFillInterval) {
    //         energyFillInterval = setInterval(() => { setEnergy(_energy => _energy + ENERGY_SPEED <= newEnergyLimit ? _energy + ENERGY_SPEED : newEnergyLimit) }, ENERGY_INTERVAL)
    //         console.log(energyFillInterval)
    //     }

    //     return () => {
    //         clearInterval(energyFillInterval);
    //         energyFillInterval = 0;

    //         // todo; save data in local storage energy!!
    //         // const saveData = { energy, point, exchange, fullEnergy };
    //         // localStorage.setItem("app@data", JSON.stringify(saveData));
    //     }
    // }, [])

    return <PointContext.Provider value={{
        point,
        setPoint,
        level,
        setLevel,
        energy,
        setEnergy,
        user,
        pointPerClick,
        setPointPerClick,
        exchange,
        setExchange,
        initialized,
        setInitialized,
        fullEnergy,
        setFullEnergy,
        energyLimit,
        setEnergyLimit,
        profitPerHour,
        setProfitPerHour,
        username,
        dailyCombo,
        setDailyCombo,
        dailyCipher,
        setDailyCipher,
        bonus,
        setTasks,
        tasks,
        setUser,
        dailyReward,
        setDailyReward,
        skin,
        setSkin,
        energyLimitLevel,
        setEnergyLimitLevel,
        multiTapLevel,
        setMultiTapLevel,
        setTurbo,
        lottery,
        setLottery
    }}>
        {!loading ? children : <Loading />}
    </PointContext.Provider>
}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}