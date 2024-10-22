import React from 'react';
import { getExchangeIcon } from '../../Pages/Exchange';
import { Link } from 'react-router-dom';

const ExchangeDialog = ({ exchange }) => {
    return (
        <div className="bottom-sheet-scroll"><div className="bs-passive"><div className="bs-passive-inner"><div className="bs-passive-exchange"><div className="exchange-image is-crypto_com">
            {getExchangeIcon(exchange)}
        </div></div><p>You've signed a contract with {exchange.name}</p></div><Link className="bottom-sheet-button button button-primary button-large" to={`/`}><span>Good luck!</span></Link></div></div>
    )
}

export default ExchangeDialog