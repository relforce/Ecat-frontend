import React from 'react';
import { getExchangeIcon } from '../../Pages/Exchange';

const InitialDialog = ({ user, bonus, setDialogOpen, setInitialized }) => {
    return (
        <div className="bottom-sheet-scroll">
            <div className="bs-passive">
                <div className="upgrade-buy-title ceo text-center">Passive Income Earned</div>
                <div className="bs-passive-inner !py-6">
                    <div className='flex flex-row justify-between items-center gap-2'>
                        <img className='w-16 h-16' src="/images/coin.png" />
                        <p className='text-white text-3xl pl-1'>{new Intl.NumberFormat().format(bonus)}</p>
                    </div>
                </div>
                <p className="text-sm text-center my-4">Congratulations</p>
                <p className="text-sm text-center my-4">
                    This is the passive income generated since your last login.
                </p>
                <button
                    className="bottom-sheet-button button button-primary button-large"
                    onClick={() => {
                        setInitialized(false);
                        setDialogOpen(false);
                    }}
                >
                    <span>Tap To Earn More</span>
                    {/* <div className="icon icon-heart">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlSpace="preserve"
                            style={{ enableBackground: "new 0 0 24 24" }}
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M22.5 8.8c0 6.6-9.7 11.9-10.1 12.1-.2.1-.3.1-.4.1s-.2 0-.4-.1c-.4-.2-10.1-5.5-10.1-12.1 0-1.5.6-3 1.7-4.1S5.8 3 7.3 3c1.9 0 3.6.8 4.7 2.2C13.1 3.8 14.8 3 16.7 3c1.5 0 3 .6 4.1 1.7 1.1 1.1 1.7 2.6 1.7 4.1z"
                                fill="currentColor"
                            />
                        </svg>
                    </div> */}
                </button>
            </div>
        </div>
    )
}

export default InitialDialog