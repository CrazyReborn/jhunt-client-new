import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ApplicationsLogo } from '../images/description_black_24dp.svg';
import { ReactComponent as LogoutLogo } from '../images/logout_black_24dp.svg';
import { ReactComponent as MenuLogo } from '../images/bars-solid.svg';
import { ReactComponent as CloseLogo } from '../images/close_black_24dp.svg';
import '../styles/Navbar.css';
import NewApplicationForm from './Applications/NewApplicationForm';

// eslint-disable-next-line react/prop-types
export default function Navbar({ rerender, setRerender }) {
  const [creatingNew, setCreatingNew] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <nav className="desktop-nav">
        <button type="button" className="btn-action" onClick={() => setCreatingNew(true)}>Add New Application</button>
        <ul>
          <li>
            <NavLink to="/dashboard/applications">
              <ApplicationsLogo fill="white" />
              Applications
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout">
              <LogoutLogo fill="white" />
              Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
      <MenuLogo className={`mobile-bars ${openMenu ? 'opened' : ''}`} onClick={() => setOpenMenu(true)} />
      <nav className={`mobile-nav ${openMenu ? 'opened' : null}`}>
        {openMenu
          && (
            <>
              <CloseLogo className="mobile-menu-close" onClick={() => setOpenMenu(false)} />
              <button type="button" className="btn-action" onClick={() => { setOpenMenu(false); setCreatingNew(true); }}>Add New Application</button>
              <ul>
                <li>
                  <NavLink onClick={() => setOpenMenu(false)} to="/dashboard/applications">
                    <ApplicationsLogo fill="blue" />
                    Applications
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setOpenMenu(false)} to="/logout">
                    <LogoutLogo fill="blue" />
                    Log Out
                  </NavLink>
                </li>
              </ul>
            </>
          )}
      </nav>
      <NewApplicationForm
        creatingNew={creatingNew}
        setCreatingNew={setCreatingNew}
        rerender={rerender}
        setRerender={setRerender}
      />
    </>
  );
}
