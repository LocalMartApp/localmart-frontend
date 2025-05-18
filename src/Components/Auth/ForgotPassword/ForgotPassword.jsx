import React , {useState} from 'react';
import { Formik , Form , Field } from 'formik';
import { LoginValidation, userLoginEmailValidation } from '../../../utils/Validation';


import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import toast from 'react-hot-toast';
import axios from 'axios';
import { config } from '../../../env-services';
import Modal from 'react-modal';
import Loader from '../../../utils/Loader/Loader';
import { useAuth } from '../../../utils/AuthContext';
import OTPInput , { ResendOTP } from 'otp-input-react';
import '../UserRegister/UserRegister.scss';
import EmailSentIcon from '../../../assets/images/email-sent.svg';


const ForgotPassword = () => {

     const navigate = useNavigate();


    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [otpTab , setOtpTab] = useState(false);
    const [otpValue , setOtpValue] = useState('');
    const [modalIsOpen ,  setModalIsOpen] = useState(false);
    const [readMail , setReadMail] = useState();
    
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
          setCaptchaVerified(true);
      } else {
          setCaptchaVerified(false);
      }
    };


    const forgotPassValues = {
        email : ''
    }

    const handleForgotEmail = async(values) => {
      const obj = {
        email: values.email,
      }
      setModalIsOpen(true)
      try {
        await axios.post(`${config.api}auth/forgot-password` , obj)
        .then((response) => {
            console.log(response , "reset-response")
          if(response?.data?.success == true) {
            setOtpTab(true)
              setModalIsOpen(false)
              toast.success('Link Sent to Email');
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
    <div className='forgot-password-main'>
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <Loader/>
        </Modal>
        <div className="userlogin-main-section bg-ProfileScreensBg py-20">
            <div className="container">
                <div className="inner-user-login-grid-section-outer w-full max-w-[600px] mx-auto">
                    <div className="left-login-page-image-section bg-white rounded-2xl overflow-hidden">
                        {otpTab ? 
                            null  :
                        <div className="top-forgot-heading-sec px-6 py-4 border-b border-opacity-20 border-Black">
                            <h2 className='text-2xl font-medium'>Forgot Password</h2>
                            <p className='text-sm opacity-50 mt-2'>Password Reset Link Will be sent to your email if your account is registered with localmart</p>
                        </div>
                        }
                            <div className="form-section p-6">
                                {otpTab ? 
                                    <div className="otp-section-forgot text-center">
                                        {/* <div className="top-forgot-disabled-email">
                                            <div className="form-inputsec relative mb-6">
                                                <input type="email" disabled={true} value={readMail} name="email" className={`outline-none border-none bg-LightGrayBg py-4 pl-6 pr-5 rounded-xl w-full text-Black `} 
                                                />                                
                                                <div className="right-side-edit-btn absolute right-4 top-1/2 email-input-icon">
                                                    <button type="button" onClick={() => setOtpTab(false)}><i className="ri-edit-fill text-Secondary text-2xl"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inner-otp-section-outer">
                                            <div className="otp-top-lable mb-2">
                                                <p className='text-medium text-Black'>Enter OTP</p>
                                            </div>
                                            <OTPInput value={otpValue} onChange={setOtpValue} autoFocus OTPLength={6} otpType="number" className={'otpinputs-outer'} disabled={false} />
                                            <ResendOTP onResendClick={handleResendOtp} renderButton={renderButton} />
                                        </div>
                                        <div className="tp-submission-button">
                                            <button type="button" onClick={otpVerifier} className='mt-5  overflow-hidden relative group bg-Primary rounded-xl w-full py-3 px-4 text-white font-semibold text-lg'>Verify OTP</button>
                                        </div> */}

                                        <div className="top-email-sent-image">
                                            <img src={EmailSentIcon} className='w-24 h-24 mx-auto' alt="" />
                                        </div>
                                        <div className="bottom-emailsent-content mt-5">
                                            <h4 className='text-center font-medium text-2xl text-black'>Reset Link Sent Successfully</h4>
                                            <p className='opacity-60 text-center text-black mt-2'>A password reset link has been sent to your email address. <br /> Please check your inbox to reset your password.</p>
                                        </div>
                                        <button type="button" onClick={() => navigate('/')} className=' mt-5 text-center bg-Secondary px-6 py-2 rounded-full text-white'>Go to home</button>

                                    </div> 
                                    : 
                                    <div className="inner-forgot-password-form">
                                        <Formik
                                            validationSchema={LoginValidation}
                                            initialValues={forgotPassValues}
                                            onSubmit={(values) => handleForgotEmail(values)}
                                        >
                                            {({  errors, touched , handleSubmit}) => (
                                            <Form>
                                                <div className="form-inputsec relative">
                                                    <Field type="email" name="email" placeholder='Enter Email Address*'
                                                        className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-6 pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                    />                                
                                                </div>
                                                <div className="flex flex-col mt-5 gap-y-5">
                                                    <div className="recaptcha-section ">
                                                        <ReCAPTCHA
                                                            sitekey="6LeQ-7cqAAAAANpdsCQ1MFxudbS4-gS7sBVw8vIT"
                                                            onChange={handleCaptchaChange}
                                                        />
                                                    </div>
                                                    <div className="bottom-form-submitter  overflow-hidden relative group ">
                                                        <button type='submit' disabled={!captchaVerified} onClick={handleSubmit} className='w-full py-3 px-4 rounded-xl text-white font-semibold text-lg h-full bg-Primary disabled:bg-opacity-35 '>Send Link</button>
                                                    </div>
                                                </div>
                                            </Form>
                                            )}
                                        </Formik>
                                    </div>
                                }
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword