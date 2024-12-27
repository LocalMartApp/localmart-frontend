import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import Logo from '../../assets/images/logo-svg.svg';
import LanSvg from '../../assets/images/language-svg.svg'

const Header = () => {
  return (
    <div className="Header">
      <div className="main-header-section">
        <header>
          <div className="inner-header-section bg-white py-5">
            <div className="container">
              <div className="grid grid-cols-12 items-center">
                <div className="header-left-logo-section col-span-2 text-left">
                     <div className="logo-inner-section">
                      <img src={Logo} className='max-h-[50px] w-auto' alt="" />
                     </div>
                </div>
                <div className="header-search-section col-span-5">
                     
                </div>
                <div className="header-buttons-sections col-span-5">
                  <div className="flex items-center gap-8 justify-end">
                    <div className="notification-header-button">
                      <button type='button' className='rounded-full bg-none w-10 h-10 flex items-center justify-center'>
                        <i className="bi bi-bell text-xl text-Primary"></i>
                      </button>
                    </div>
                    <div className="language-selection-header">
                      <button type="button" className='flex items-center gap-1 h-10 px-3 rounded-full'>
                        <img src={LanSvg} className='max-w-[18px] min-w-[18px]' alt="" />
                        <p className='text-Black'>EN</p>
                        <i className="bi bi-chevron-down duration-300"></i>
                      </button>
                    </div>
                    <div className="advertise-button-header">
                      <button type="button" className='flex items-center gap-3'>
                      <i className="ri-megaphone-line text-Black"></i>
                        <p className='text-Black text-lg font-medium'>Advertise</p>
                      </button>
                    </div>
                    <div className="login-button-header">
                      <button type="button" className='bg-Primary h-10 px-3 overflow-hidden rounded-full flex items-center gap-2 min-w-[190px] justify-center'>
                        <i className="ri-login-circle-fill text-white text-lg"></i>
                        <p className='text-white font-medium text-lg'>Login | Signup</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
