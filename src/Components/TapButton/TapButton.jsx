/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
import { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, easeIn, motion } from 'framer-motion'
import cn from 'classnames'

import './TapButton.css'
import { PointContext } from '../../state/PointContext'
import { BACKEND_URL, CIPHER_TABLE, MINUS_CLICK_INTERVAL, SKIN_DATA, SKINS } from '../../constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const numberAnimationDurationMs = 1000
const numberAnimationDurationSec = numberAnimationDurationMs / 1000

let lastSymbol = '-'

let minusClickInterval = 0;

const notCoinAppearence = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 0,
    },
    transition: {
        duration: 0.3,
        easeIn: true,
        scale: {
            type: 'spring',
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
        },
    },
}

const cooldownAppearence = {
    initial: {
        opacity: 0,
        scale: 0.7,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 0.5,
    },
    transition: {
        duration: 0.7,
    },
}

let cipherTimout = 0;

export const TapButton = ({
    canIClickPlease,
    sleep,
    funMode,
    clickValue,
    cooldown,
    handleClick,
    children,
    setEnergy,
    energy,
    user,
    cipherMode,
    setCipherText,
    setCipherMode,
    skin
}) => {

    const { setPoint, pointPerClick } = useContext(PointContext)
    const notCoinRef = useRef(null)
    const [buttonTransform, setButtonTransform] = useState({
        scale: 1,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
    })
    const [numbers, setNumbers] = useState([])

    const [minusClick, setMinusClick] = useState(0)

    const [lastTouch, setLastTouch] = useState(0);

    const [touchStart, setTouchStart] = useState(0);

    const [currentCipher, setCurrentCipher] = useState(['']);


    useEffect(() => {
        if (lastTouch < touchStart) {
            return false;
        }
        cipherTimout = setTimeout(async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/combo/daily-cipher`, {
                    cipher: currentCipher
                });

                const { data } = response;

                if (data.status === 'ok') {
                    // award the point
                    setPoint(prev => prev + data.point);
                    setCipherMode(false);
                } else {
                    setCurrentCipher(data?.cipher ?? ['']);
                }

                const cipherText = data?.cipher.map(value => {
                    for (let key in CIPHER_TABLE) {
                        if (CIPHER_TABLE[key] == value) {
                            return key;
                        }
                    }
                })
                setCipherText(cipherText)
            }
            catch (e) {
                console.log('apop@cipherTimout', e.message);
                setCurrentCipher(['']);
            }
            finally {
                
            }
            return false;
        }, 1500);
    }, [lastTouch])

    useEffect(() => {
        clearTimeout(cipherTimout);
    }, [touchStart])

    useEffect(() => {
        setInterval(() => {
            if (!minusClickInterval)
                minusClickInterval = setMinusClick(prev => Math.max(prev - 3, 0));
        }, MINUS_CLICK_INTERVAL)

        return () => {
            clearInterval(minusClickInterval);
        }
    }, [])

    const handleMouseClick = (event) => {

        // check if enough energy

        if (energy < pointPerClick) {
            return false;
        }

        if (mobileCheck()) {
            return false;
        }

        if (notCoinRef.current && energy > 0) {
            const rect = notCoinRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            const offsetX = event.clientX - centerX
            const offsetY = centerY - event.clientY

            const rotateXValue = offsetY * 0.1
            const rotateYValue = offsetX * 0.1

            setButtonTransform({
                scale: 1,
                translateZ: -5,
                rotateX: rotateXValue,
                rotateY: rotateYValue,
            })

            if (cipherMode) {
                console.log('touch started');

                const time = new Date().getTime();
                setTouchStart(time);
                return false;
            }

            const randomNumberBetweenTenAndMinusTen =
                Math.floor(Math.random() * 21) - 21

            const newNumber = {
                id: `${Date.now()}`,
                value: clickValue,
                x: event.pageX + randomNumberBetweenTenAndMinusTen,
                y: event.pageY - 250
            }

            setNumbers((prevNumbers) => [...prevNumbers, newNumber])

            // add minus click
            setMinusClick(prev => prev + 1)

            // add number to point
            setPoint(prev => prev + clickValue)

            // Remove the number after the animation duration
            setTimeout(() => {
                setNumbers((prevNumbers) =>
                    prevNumbers.filter((number) => number.id !== newNumber.id)
                )
            }, numberAnimationDurationMs)
        }

        setEnergy(prev => Math.max(prev - pointPerClick, 0))
    }

    const handleTouchStart = (event) => {
        handleClick()

        // check if enough energy

        if (energy < pointPerClick) {
            return false;
        }

        if (notCoinRef.current && energy > 0) {
            const touch = event.touches[0]
            const rect = notCoinRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            const offsetX = touch.clientX - centerX
            const offsetY = centerY - touch.clientY

            const rotateXValue = offsetY * 0.1
            const rotateYValue = offsetX * 0.1

            setButtonTransform({
                scale: 1,
                translateZ: -5,
                rotateX: rotateXValue,
                rotateY: rotateYValue,
            })

            if (cipherMode) {
                console.log('touch started');

                const time = new Date().getTime();
                setTouchStart(time);
                return false;
            }

            const randomNumberBetweenTenAndMinusTen =
                Math.floor(Math.random() * 21) - 21

            const newNumber = {
                id: `${Date.now()}`,
                value: clickValue,
                x: touch.pageX + randomNumberBetweenTenAndMinusTen,
                y: touch.pageY - 250
            }

            setNumbers((prevNumbers) => [...prevNumbers, newNumber])

            // add minus click
            setMinusClick(prev => prev + 1)

            // add number to point
            setPoint(prev => prev + clickValue)

            // Remove the number after the animation duration
            setTimeout(() => {
                setNumbers((prevNumbers) =>
                    prevNumbers.filter((number) => number.id !== newNumber.id)
                )
            }, numberAnimationDurationMs)
        }

        setEnergy(prev => Math.max(prev - pointPerClick, 0))
    }
    const handleTouchEnd = (event) => {
        if (cipherMode) {
            console.log('touch ended');

            setLastTouch(new Date().getTime());

            // 0: dot, 1: line
            let symbol = 0;
            // check the length of touch
            const length = new Date().getTime() - touchStart;

            if (length > 500) {
                symbol = 1
            }

            lastSymbol = symbol ? '---' : '-';

            setCurrentCipher(prev => {
                const _cipher = [...prev];
                _cipher[_cipher.length - 1] += symbol.toString();
                return _cipher;
            })

            const touch = event.changedTouches[0]

            const randomNumberBetweenTenAndMinusTen =
                Math.floor(Math.random() * 21) - 10

            const newNumber = {
                id: `${Date.now()}`,
                value: lastSymbol,
                x: touch.clientX + randomNumberBetweenTenAndMinusTen,
                y: touch.clientY - 235
            }

            setNumbers((prevNumbers) => [...prevNumbers, newNumber])

            // add minus click
            setMinusClick(prev => prev + 1)

            // add number to point
            setPoint(prev => prev + clickValue)

            // Remove the number after the animation duration
            setTimeout(() => {
                setNumbers((prevNumbers) =>
                    prevNumbers.filter((number) => number.id !== newNumber.id)
                )
            }, numberAnimationDurationMs)
        }

        setButtonTransform({
            scale: 1,
            translateZ: 0,
            rotateX: 0,
            rotateY: 0,
        })
    }

    return (
        <AnimatePresence mode="popLayout">
            {canIClickPlease ? (
                <motion.div className="root" key="1" {...notCoinAppearence}>
                    <div
                        className={cn("container", {
                            ["funMode"]: funMode,
                            ["sleep"]: sleep,
                        })}
                    >
                        {children}
                        <div
                            ref={notCoinRef}
                            className={cn("notcoin", "skin-default", {
                                ["sleep"]: sleep,
                            })}
                            onTouchStart={handleTouchStart}
                            onMouseUp={handleMouseClick}
                            onTouchEnd={handleTouchEnd}
                            style={{
                                transform: `
                                    scale(${buttonTransform.scale})
                                    translateZ(${buttonTransform.translateZ}px)
                                    rotateX(${buttonTransform.rotateX}deg)
                                    rotateY(${buttonTransform.rotateY}deg)
                                `,
                            }}
                        >
                            <button className={`tap-button ${cipherMode ? 'is-morse-mode' : ''}`} style={{ padding: '0px', background: 'none', border: 'none', outline: 'none' }}>
                                <div className="user-tap-button-inner">
                                    <div className="user-tap-button-circle">
                                        <picture className="is-hamster-image is-level-1" style={{ zIndex: 100 }}>
                                            {/* <source srcSet={skin == SKINS[0] ? `/images/hamsters/${user.level}.jpg` : SKIN_DATA[skin].url} type="image/jpg" /> */}
                                            {/* <source srcSet={skin == SKINS[0] ? `/images/tap-image.png` : SKIN_DATA[skin].url} type="image/jpg" /> */}
                                            <source srcSet={skin == SKINS[0] ? `/images/tap-images/${user.level}.png` : SKIN_DATA[skin].url} type="image/png" /><img
                                                className="img-responsive" src={skin == SKINS[0] ? `/images/tap-images/${user.level}.png` : SKIN_DATA[skin].url} alt="ECAT GAME" />
                                        </picture>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div>
                        <AnimatePresence>
                            {numbers.map((number) => {
                                return (
                                    <motion.div
                                        key={number.id}
                                        className="clickAmount"
                                        initial={{ opacity: 1, y: number.y, x: number.x }}
                                        animate={{ opacity: 0, y: number.y - 200 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: numberAnimationDurationSec }}
                                    >
                                        {number.value}
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                </motion.div>
            ) : (
                <motion.div className="root" key="2" {...cooldownAppearence}>
                    <div className="cooldownContainer">
                        <div className="cooldownNumber">
                            {cooldown || <small>nothing</small>}
                        </div>
                        <svg className="cooldown">
                            <circle
                                className="cooldownCircle"
                                r="140"
                                cx="150"
                                cy="150"
                            ></circle>
                        </svg>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}


const mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};