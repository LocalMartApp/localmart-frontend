import React , {useState} from 'react';
import PropTypes from 'prop-types';
import './UserEmailLogin.scss';
import { Formik , Form , Field } from 'formik';
import { userLoginEmailValidation } from '../../../utils/Validation';

import EmailLogo from '../../../assets/images/email-icon.svg';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import toast from 'react-hot-toast';
import axios from 'axios';
import { config } from '../../../env-services';
import Modal from 'react-modal';
import Loader from '../../../utils/Loader/Loader';
import { useAuth } from '../../../utils/AuthContext';





const UserEmailLogin = () => {


    const navigate = useNavigate();

    
    const { login } = useAuth();

    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [passwordHandle , setPasswordHandle] = useState(false);
    const [modalIsOpen ,  setModalIsOpen] = useState(false);
    
    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          borderRadius: 18,
          paddingLeft: 40
        },
    };


    const handleCaptchaChange = (value) => {
      if (value) {
        // console.log(value)
          setCaptchaVerified(true);
      } else {
          setCaptchaVerified(false);
      }
    };

  
    const userLoginEmailValues = {
      email: '',
      password: '',
    }
  
    const handleUserEmailLogin = async(values) => {
      const obj = {
        email: values.email,
        password: values.password
      }
      setModalIsOpen(true)
      try {
        await axios.post(`${config.api}auth/authenticate` , obj)
        .then((response) => {
          if(response) {
              setModalIsOpen(false)
              toast.success('Logged in Successfully');
              console.log(response , 'userreg-res');
              login(response?.data?.data?.token)
              navigate('/profile/my-profile')
          }
        })
        .catch((err) => {
          setModalIsOpen(false)
          toast.error(err?.message);
          toast.error(err?.response?.data?.message);
          console.log(err , 'error')
        });
      } catch (error) {
        setModalIsOpen(false)
        console.log(error)
      }
    }

  return (
    <div className="UserEmailLogin">
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <Loader/>
        </Modal>
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
                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2 w-[50px] ">
                                <img src={EmailLogo} className='max-w-[22px] mx-auto' alt="" />
                            </div>
                        </div>
                        <div className="password-forgot-password-section my-5">
                          <div className="form-inputsec relative">
                              <Field type={passwordHandle ? 'text' : 'password'} name="password" placeholder='Enter Password*'
                                  className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-20 pr-5 rounded-xl bg-white w-full text-Black  ${errors.password && touched.password ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                              />                                
                              <div className="email-input-icon w-[50px] text-center pr-4 border-r border-r-BorderColor absolute left-4 top-1/2">
                                <i className="ri-lock-password-line text-2xl opacity-70 text-Black"></i>
                              </div>
                              <button type="button" className="email-input-icon password-login-icon owa absolute right-4 top-1/2" onClick={() => setPasswordHandle(!passwordHandle)}>
                                <i className={`${passwordHandle ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl text-LightText`}></i>
                              </button>
                          </div>
                          <div className="forgot-password-button mt-3">
                            <button type="button" className='text-sm text-Secondary text-medium'>Forgot Passowrd ?</button>
                          </div>
                        </div>
                        <div className="flex flex-col mt-5 gap-y-5">
                          <div className="recaptcha-section ">
                            <ReCAPTCHA
                                sitekey="6LeQ-7cqAAAAANpdsCQ1MFxudbS4-gS7sBVw8vIT"
                                onChange={handleCaptchaChange}
                            />
                          </div>
                          <div className="bottom-form-submitter  overflow-hidden relative group ">
                            <button type='submit' disabled={!captchaVerified} onClick={handleSubmit} className='w-full py-3 px-4 rounded-xl text-white font-semibold text-lg h-full bg-Primary disabled:bg-opacity-35 '>Login</button>
                          </div>
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
