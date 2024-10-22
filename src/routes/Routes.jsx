/* eslint-disable react-refresh/only-export-components */
import Home from '../Pages/Home';
import League from '../Pages/League';
import Settings from '../Pages/Settings';
import Exchange from '../Pages/Exchange';
import Boost from '../Pages/Boost';
import { createBrowserRouter } from 'react-router-dom';
import Mine from '../Pages/Mine';
import Earn from '../Pages/Earn';
import AirDrop from '../Pages/AirDrop';
import Friends from '../Pages/Friends';
import Skin from '../Pages/Skin';
import Skills from '../Pages/Skills';
import DailyBonus from '../Pages/DailyBonus';
import HighestDailyEarnings from '../Pages/HghestDailyEarnings';

export default createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/league",
    element: <League/>,
  },
  {
    path: "/settings/exchange",
    element: <Exchange/>,
  },
  {
    path: "/settings",
    element: <Settings/>,
  },
  {
    path: "/boost",
    element: <Boost/>,
  },
  {
    path: "/mine",
    element: <Mine/>,
  },
  {
    path: "/earn",
    element: <Earn/>,
  },
  {
    path: "/airdrop",
    element: <AirDrop/>,
  },
  {
    path: "friends",
    element: <Friends/>,
  },
  {
    path: "skin",
    element: <Skin/>,
  },
  {
    path: "skills",
    element: <Skills/>,
  },
  {
    path: "highest-daily-earnings",
    element: <HighestDailyEarnings/>,
  },
  {
    path: "daily-bonus",
    element: <DailyBonus/>,
  },
]);