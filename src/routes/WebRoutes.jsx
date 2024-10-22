/* eslint-disable react-refresh/only-export-components */
import * as reactRouterDom from 'react-router-dom';
import WebHome from '../Pages/WebHome';
import WebWalletConnect from '../Pages/WebWalletConnect';
import Proivders from '../state/WalletProvider';

export default reactRouterDom.createBrowserRouter([
  {
    path: "/",
    element: <WebHome />,
  },
  {
    path: "/wallet-connect/:tg_id",
    element: <Proivders><WebWalletConnect /></Proivders>,
  }
]);