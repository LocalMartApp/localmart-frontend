import React , {useState} from 'react';
import PropTypes from 'prop-types';
import './UserEmailLogin.scss';
import { Formik , Form , Field } from 'formik';
import { userLoginEmailValidation } from '../../../utils/Validation';

import EmailLogo from '../../../assets/images/email-icon.svg';
import { useNavigate } from 'react-router-dom';


const UserEmailLogin = () => {


    const navigate = useNavigate()

    const [passwordHandle , setPasswordHandle] = useState(false)
  
    const userLoginEmailValues = {
      email: '',
      password: '',
    }
  
    const handleUserEmailLogin = () => {
        navigate('/profile/my-profile')
    }

  return (
    <div className="UserEmailLogin">
        <div className="right-side-user-login-form-section">
            <div className="user-login-in-form-section">
                <Formik
                    validationSchema={userLoginEmailValidation}
                    initialValues={userLoginEmailValues}
                    onSubmit={(values) => handleUserEmailLogin(values)}
                >
                    {({  errors, touched , handleSubmit}) => (
                    <Form>
                        <div className="form-inputsec relative">
                            <Field type="email" name="email" placeholder='Enter Email Address*'
                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-20 pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                            />                                
                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2">
                                <img src={EmailLogo} className='max-w-[22px]' alt="" />
                            </div>
                        </div>
                        <div className="password-forgot-password-section my-5">
                          <div className="form-inputsec relative">
                              <Field type={passwordHandle ? 'text' : 'password'} name="password" placeholder='Enter Password*'
                                  className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-20 pr-5 rounded-xl bg-white w-full text-Black  ${errors.password && touched.password ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                              />                                
                              <div className="email-input-icon w-[50px] text-center pr-4 border-r border-r-BorderColor absolute left-4 top-1/2">
                                <i class="ri-lock-password-line text-2xl opacity-70 text-Black"></i>
                              </div>
                              <button type="button" className="email-input-icon password-login-icon owa absolute right-4 top-1/2" onClick={() => setPasswordHandle(!passwordHandle)}>
                                <i className={`${passwordHandle ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl text-LightText`}></i>
                              </button>
                          </div>
                          <div className="forgot-password-button mt-3">
                            <button type="button" className='text-sm text-Secondary text-medium'>Forgot Passowrd ?</button>
                          </div>
                        </div>
                        <div className="bottom-form-submitter mt-5  overflow-hidden relative group bg-Primary rounded-xl">
                            <button type='button' onClick={handleSubmit} className='w-full py-3 px-4 text-white font-semibold text-lg '>Login</button>
                        </div>
                    </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
  );
}

UserEmailLogin.propTypes = {};

UserEmailLogin.defaultProps = {};

export default UserEmailLogin;
