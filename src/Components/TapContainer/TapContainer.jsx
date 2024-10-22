/* eslint-disable no-unused-vars */
import React from 'react';
import { TapButton } from '../TapButton/TapButton';
import { LEVEL_DATA } from '../../constants';
import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const TapContainer = ({ energy, setEnergy, user, pointPerClick, cipherMode, energyLimit, setCipherText, setCipherMode, skin }) => {

  return (
    <div className="user-tap has-gap" style={{ transform: 'scale(1) translateZ(0px)', opacity: 1 }}>
      <TapButton
        canIClickPlease={true}
        sleep={false}
        funMode={false}
        clickValue={pointPerClick}
        cooldown={0}
        handleClick={() => {/*nothing*/ }}
        setEnergy={setEnergy}
        energy={energy}
        user={user}
        energyLimit={energyLimit}
        cipherMode={cipherMode}
        setCipherText={setCipherText}
        setCipherMode={setCipherMode}
        skin={skin}
      />
      <div className="user-tap-animate"></div>
      {/* <div className="user-tap-row">
        <div className="user-tap-energy">
          <div className="icon">
            <img
              src="/images/energy-icon.svg"
              alt="Boost" />
          </div>
          <p>{energy} / {energyLimit}</p>
        </div><Link to="/boost" className="user-tap-boost" style={{paddingLeft: '36px'}}><img
          src="/images/rocket-icon.svg" style={{width: '30px'}}
          alt="Boost" />
          <p>Boost</p>
        </Link>
      </div> */}
    </div>
  )
}


export default TapContainer;