import React , { useState } from 'react';

import { Formik , Form , Field } from 'formik';
import { LoginNumberValidation, LoginValidation } from '../../utils/Validation';

import Logo from '../../assets/images/logo-svg.svg';
import EmailLogo from '../../assets/images/email-icon.svg';
import NumberLogin from './NumberLogin';
import MailLogin from './MailLogin';



const LoginModal = ({ isOpen, closeModal }) => {

    // if (!isOpen) return null;

    const [mailLogin , setMailLogin] = useState(false)


  return (
    <div className={`main-login-modal-section fixed left-0 w-full duration-500 h-full z-[99999999] ${isOpen ? 'top-0 visible' : '-top-full invisible'}`}>
        <div className="inner-login-modal-section relative h-full">
            <div className="inner-modal-relative-section absolute top-1/2 left-1/2 w-full bg-white p-8 rounded-20p">
                <div className="login-modal-top-section w-fit">
                    <img src={Logo} className='min-h-50p max-h-50p' alt="" />
                </div>
                <div className="right-closer-button absolute top-5 right-5">
                    <button type="button" onClick={closeModal}><i className="ri-close-large-line text-2xl text-LightText"></i></button>
                </div>
                <div className="modal-login-welcome-text-sec flex items-center gap-5 justify-between mt-8 mb-6">
                    <h2 className='text-2xl font-medium'>Welcome</h2>
                    <p className='text-LightText'>Login for a seamless experience</p>
                </div>
                {mailLogin ? 
                    <div className="main-login-form-with-bottom-other-log-section">
                        <NumberLogin/>
                        <div className="bottom-other-login-option-section pt-6">
                            <div className="border-or-section relative my-5">
                                <div className="background-border-section bg-BorderColor w-full h-[1px]"></div>
                                <div className="or-middle-mover absolute -top-[15px] left-1/2">
                                    <p className='bg-white text-Black py-1 px-3'>Or</p>
                                </div>
                            </div>
                            <div className="login-withnumber-section pt-3">
                                <button type="button" className='flex items-center gap-3 justify-center w-full group' onClick={() => setMailLogin(false)}>
                                    <i className="bi bi-envelope-at-fill text-Primary text-xl duration-500 group-hover:text-Secondary"></i>
                                    <p className='text-Primary font-semibold text-xl duration-500 group-hover:text-Secondary'>Login With Email ID</p>
                                </button>
                            </div>
                        </div>
                    </div> : 
                    <div className="main-login-form-with-bottom-other-log-section">
                        <MailLogin/>
                        <div className="bottom-other-login-option-section pt-6">
                            <div className="border-or-section relative my-5">
                                <div className="background-border-section bg-BorderColor w-full h-[1px]"></div>
                                <div className="or-middle-mover absolute -top-[15px] left-1/2">
                                    <p className='bg-white text-Black py-1 px-3'>Or</p>
                                </div>
                            </div>
                            <div className="login-withnumber-section pt-3">
                                <button type="button" className='flex items-center gap-3 justify-center w-full group' onClick={() => setMailLogin(true)}>
                                    <i className="ri-phone-fill text-Primary text-xl duration-500 group-hover:text-Secondary"></i>
                                    <p className='text-Primary font-semibold text-xl duration-500 group-hover:text-Secondary'>Login With Mobile Number</p>
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default LoginModal