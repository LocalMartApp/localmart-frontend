import React, { useState } from 'react'
import EmailLogo from '../../../assets/images/email-icon.svg';
import { userRegEmailValidation } from '../../../utils/Validation';
import { Formik , Form , Field } from 'formik';
import OTPInput from 'otp-input-react';
import { ResendOTP } from "otp-input-react";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import axios from 'axios';
import { config } from '../../../env-services';
import Modal from 'react-modal';
import Loader from '../../../utils/Loader/Loader';



const UserEmailVerify = () => {

    const navigate = useNavigate()

    const [otpValue , setOtpValue] = useState('');
    const [otpVisible , setOtpVisible] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [readEmail , setReadEmail] = useState('');
    const [modalIsOpen ,  setModalIsOpen] = useState(false)


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
        console.log(value)
        setCaptchaVerified(true);
    } else {
        setCaptchaVerified(false);
    }
    };
    

    const userEmailRegValues = {
        email: '',
    }

    const handleEmailRegister = () => {
        setOtpVisible(true)
    }

    const renderButton = (buttonProps) => {
        return <button {...buttonProps} className={`duration-500 ${buttonProps.disabled == true ? 'opacity-25' : 'opacity-100 text-Secondary font-semibold'}`}>Resend OTP</button>;
    };




    const handleEmailSendOtp = async (values) => {
        setReadEmail(values.email)
        setModalIsOpen(true)
        try {
          await axios.post(`${config.api}auth/get-verification-otp` , values)
          .then((response) => {
            if(response) {
                setOtpVisible(true);
                toast.success('OTP Sent Successfully');
                console.log(response , 'userreg-res');
                setModalIsOpen(false)
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



      const otpVerifier = async() => {
        const obj = {
            email: readEmail,
            otp: otpValue
        }

        console.log("obj" , obj)

        setModalIsOpen(true)
        try {
            await axios.post(`${config.api}auth/verify-account` , obj)
            .then((response) => {
              if(response) {
                setModalIsOpen(false)
                toast.success('OTP Verified Successfully');
                const token = response?.data?.data?.token
                navigate('/register-details' , { state: { readEmail , token } })
                console.log(response)
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




      const handleResendOtp = async () => {
        const obj = {
            email: readEmail
        }
        setModalIsOpen(true)
        try {
          await axios.post(`${config.api}auth/get-verification-otp` , obj)
          .then((response) => {
            if(response) {
                toast.success('OTP Sent Successfully');
                console.log(response , 'userreg-res');
                setModalIsOpen(false)
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
    <div>
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <Loader/>
        </Modal>
       {otpVisible ? 
        <div className="emailregister-account-otp-section">
            <div className="login-form-otp-section flex flex-col gap-4">
                <div className="form-inputsec relative">
                    <input type="email" disabled={true} value={readEmail} name="email" className={`outline-none border-none bg-LightGrayBg py-4 pl-20 pr-5 rounded-xl w-full text-Black `} 
                    />                                
                    <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2">
                        <img src={EmailLogo} className='max-w-[22px]' alt="" />
                    </div>
                    <div className="right-side-edit-btn absolute right-4 top-1/2 email-input-icon">
                        <button type="button" onClick={() => setOtpVisible(false)}><i className="ri-edit-fill text-Secondary text-2xl"></i></button>
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
                </div>
            </div>   
        </div> : 
        <div className="email-register-account-form-section">
            <div className="email-register-form-inner">
                <Formik
                    validationSchema={userRegEmailValidation}
                    initialValues={userEmailRegValues}
                    onSubmit={(values) => handleEmailSendOtp(values)}
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
                        <div className="grid grid-cols-12 mt-5 gap-x-5">
                            <div className="recaptcha-section col-span-7">
                                <ReCAPTCHA
                                    sitekey="6LeQ-7cqAAAAANpdsCQ1MFxudbS4-gS7sBVw8vIT"
                                    onChange={handleCaptchaChange}
                                />
                            </div>
                            <div className="bottom-form-submitter col-span-5  overflow-hidden relative group ">
                                <button type="submit" disabled={!captchaVerified} onClick={handleSubmit} className='w-full py-3 px-4 rounded-xl text-white font-semibold text-lg h-full bg-Primary disabled:bg-opacity-35 '>Login</button>
                            </div>
                        </div>
                    </Form>
                    )}
                </Formik>
            </div>
        </div>
        }
    </div>
  )
}

export default UserEmailVerify