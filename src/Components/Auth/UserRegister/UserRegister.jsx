import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UserRegister.scss';
import LeftRegisterImage from '../../../assets/images/register-left-image.jpg';
import UserEmailVerify from './UserEmailVerify';
import UserNumberVerify from './UserNumberVerify';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

  const navigate = useNavigate()

  const [emailReg , setEmailReg] = useState(false);

  return (
    <div className="UserRegister">
        <div className="userlogin-main-section bg-ProfileScreensBg py-20">
          <div className="container">
            <div className="inner-user-register-grid-section-outer bg-white rounded-20p overflow-hidden">
              <div className="grid grid-cols-12 user-register-main-form-image-grid">
                <div className="col-span-6 left-user-basic-reg-image">
                  <div className="left-user-register-image h-full">
                    <img src={LeftRegisterImage} className='h-full object-cover' alt="" />
                  </div>
                </div>
                <div className="col-span-6 right-user-basic-reg-form">
                  <div className="right-side-user-register-form-section px-12 py-10">
                    <div className="top-register-heading-section mb-10">
                      <h2 className='text-2xl font-medium text-Black'>Regitser your account</h2>
                      <p className='text-Black opacity-50'>fill details and Register to explore more on localmart</p>
                    </div>
                    <div className="conditional-registerform-section">
                      {emailReg ? <UserEmailVerify/> : <UserNumberVerify/> }
                    </div>
                    <div className="bottom-other-register-option-section pt-6">
                      <div className="border-or-section relative my-5">
                          <div className="background-border-section bg-BorderColor w-full h-[1px]"></div>
                          <div className="or-middle-mover absolute -top-[15px] left-1/2">
                              <p className='bg-white text-Black py-1 px-3'>Or</p>
                          </div>
                      </div>
                      <div className="register-withnumber-section pt-3">
                         {emailReg ?  <button type="button" className='flex items-center gap-3 justify-start w-full group' onClick={() => setEmailReg(false)}>
                              <i className="ri-phone-fill text-Primary text-xl duration-500 group-hover:text-Secondary"></i>
                              <p className='text-Primary font-semibold text-xl duration-500 group-hover:text-Secondary'>Register With Mobile Number</p>
                          </button> :
                          <button type="button" className='flex items-center gap-3 justify-start w-full group' onClick={() => setEmailReg(true)}>
                              <i className="bi bi-envelope-at-fill text-Primary text-xl duration-500 group-hover:text-Secondary"></i>
                              <p className='text-Primary font-semibold text-xl duration-500 group-hover:text-Secondary'>Register With Email Address</p>
                          </button> }
                      </div>
                      <div className="bottom-dont-havean-account mt-6">
                        <button type="button" className='text-Black' onClick={() => navigate('/login')}>
                          <p>Already Have an Account , Click here to <span className='text-Secondary font-medium'>Login</span></p>
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

UserRegister.propTypes = {};

UserRegister.defaultProps = {};

export default UserRegister;
