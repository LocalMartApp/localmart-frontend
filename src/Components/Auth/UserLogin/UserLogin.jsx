import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UserLogin.scss';
import UserEmailLogin from '../UserEmailLogin/UserEmailLogin';
import UserNumberLogin from '../UserNumberLogin/UserNumberLogin';
import LeftLoginImage from '../../../assets/images/user-login-left.jpg';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  
  const navigate = useNavigate()

  const [emailLogin , setEmailLogin] = useState(false);


  return (
    <div className="UserLogin">
        <div className="userlogin-main-section bg-ProfileScreensBg py-20">
          <div className="container">
            <div className="inner-user-login-grid-section-outer bg-white rounded-20p overflow-hidden">
              <div className="grid grid-cols-12">
                <div className="col-span-6">
                  <div className="left-user-login-image">
                    <img src={LeftLoginImage} alt="" />
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="right-side-user-login-form-section px-12 py-10">
                    <div className="top-login-heading-section mb-10">
                      <h2 className='text-2xl font-medium text-Black'>Log in to your account</h2>
                      <p className='text-Black opacity-50'>fill details and login to explore more on localmart</p>
                    </div>
                    <div className="conditional-loginform-section">
                      {emailLogin ? <UserEmailLogin/> : <UserNumberLogin/> }
                    </div>
                    <div className="bottom-other-login-option-section pt-6">
                      <div className="border-or-section relative my-5">
                          <div className="background-border-section bg-BorderColor w-full h-[1px]"></div>
                          <div className="or-middle-mover absolute -top-[15px] left-1/2">
                              <p className='bg-white text-Black py-1 px-3'>Or</p>
                          </div>
                      </div>
                      <div className="login-withnumber-section pt-3">
                         {emailLogin ?  <button type="button" className='flex items-center gap-3 justify-start w-full group' onClick={() => setEmailLogin(false)}>
                              <i className="ri-phone-fill text-Primary text-xl duration-500 group-hover:text-Secondary"></i>
                              <p className='text-Primary font-semibold text-xl duration-500 group-hover:text-Secondary'>Login With Mobile Number</p>
                          </button> :
                          <button type="button" className='flex items-center gap-3 justify-start w-full group' onClick={() => setEmailLogin(true)}>
                              <i className="bi bi-envelope-at-fill text-Primary text-xl duration-500 group-hover:text-Secondary"></i>
                              <p className='text-Primary font-semibold text-xl duration-500 group-hover:text-Secondary'>Login With Email Address</p>
                          </button> }
                      </div>
                      <div className="bottom-dont-havean-account mt-6">
                        <button type="button" className='text-Black' onClick={() => navigate('/register')}>
                          <p>Don’t Have an Account , Click here to <span className='text-Secondary font-medium'>Register</span></p>
                        </button>
                      </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

UserLogin.propTypes = {};

UserLogin.defaultProps = {};

export default UserLogin;
