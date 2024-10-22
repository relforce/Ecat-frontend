/* eslint-disable react/display-name */
import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import appRouter from './routes/Routes.jsx'
import { PointContextProvider } from './state/PointContext.jsx';
import { Toaster } from 'react-hot-toast';
import { isTMA } from '@telegram-apps/sdk';
import WebRoutes from './routes/WebRoutes.jsx';
import './App.css'

export default () => {

    const [isTGApp, setIsTGApp] = useState(false);

    useEffect(() => {
        const checkTGApp = async () => {
            const isTGApp = await isTMA();
            setIsTGApp(isTGApp);
        }
        checkTGApp();
    }, [])
    
    return (
        isTGApp ?
            <PointContextProvider>
                <div>
                    <RouterProvider router={appRouter} />
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                        toastOptions={{
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff'
                            },
                        }}
                    />
                </div>
            </PointContextProvider>
            : <div>
                <RouterProvider router={WebRoutes} />
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff'
                        },
                    }}
                />
            </div>
    )
}