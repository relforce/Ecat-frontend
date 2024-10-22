import React from 'react';
import { BACKEND_URL, ENERGY_LIMIT_POINT, TURBO_INTERVAL } from '../../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EnergySpeedDialog = ({ point, setDialogOpen, setTurbo }) => {

    const navigate = useNavigate();

    const handleTurbo = async () => {

        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/turbo`);

            setTurbo(true)
            setTimeout(() => {
                setTurbo(false);
            }, TURBO_INTERVAL)

            navigate('/');
        }
        catch (e) {
            console.log('apop@setFullEnergy', e.message);
        }
        finally {
            setDialogOpen("");
        }
        return false;
    }

    return (
        <div className="bottom-sheet-scroll">
            <div className="bs-content">
                <div className="bs-content-image">
                    <img
                        className="is-coin-star"
                        src="/images/icons/boost-icon.png"
                        alt="BoostMaxTaps"
                    />
                </div>
                <div className="bs-content-title">Turbo</div>
                <div className="bs-content-description">
                    Increase the amount of energy 10x for 10 min.
                </div>
                <div className="bs-content-target">Available 1x Daily</div>
                <button
                    className="bottom-sheet-button button button-primary button-large"
                    onClick={handleTurbo}
                >
                    <span>Go ahead</span>
                </button>
            </div>
        </div>
    )
}

export default EnergySpeedDialog