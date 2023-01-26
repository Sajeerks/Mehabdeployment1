import React, { Fragment } from 'react'
import LamaDAshList from './LamaDAshList'
import { Routes, Route, Link   ,Outlet} from 'react-router-dom';
import LamaHomeDash from './LamaHomeDash';
import NavbarLama from './NavbarLama';
import Tablelama from './Tablelama';

const DashBoardMainLama = () => {
  return (
    <Fragment>
      <NavbarLama/>

      <Outlet/>

     
      </Fragment>
  )
}

export default DashBoardMainLama