import React , { useState } from 'react';
import { Formik , Form , Field } from 'formik';
import { LoginValidation } from '../../utils/Validation';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from 'react-router-dom';

import EmailLogo from '../../assets/images/email-icon.svg';
import toast from 'react-hot-toast';
import Loader from '../../utils/Loader/Loader';
import axios from 'axios';
import { config } from '../../env-services';
import Modal from 'react-modal';




const MailLogin = () => {

    const navigate = useNavigate();

    const [otpValue , setOtpValue] = useState('');
    const [otpVisible , setOtpVisible] = useState(false);
    const [modalIsOpen ,  setModalIsOpen] = useState(false);
    const [readEmail , setReadEmail] = useState("")


    const loginEmailValue = {
        email: ''
    }

    const handleEmailLogin = async(values) => {
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
                navigate('/business/add-business' , { state: { readEmail , token } })
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



    const renderButton = (buttonProps) => {
        return <button {...buttonProps} className={`duration-500 ${buttonProps.disabled == true ? 'opacity-25' : 'opacity-100 text-Secondary font-semibold'}`}>Resend OTP</button>;
    };

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


  

  return (
    <div className="login-modal-form-section">
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <Loader/>
        </Modal>
        <div className="otp-mail-login-section">
            {otpVisible ? 
                <div className="login-form-otp-section mt-5">
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
                    <div className="inner-otp-section-outer mt-4">
                        <div className="otp-top-lable mb-2">
                            <p className='text-medium text-Black'>Enter OTP</p>
                        </div>
                        <OTPInput value={otpValue} onChange={setOtpValue} autoFocus OTPLength={6} otpType="number" className={'otpinputs-outer'} disabled={false} />
                        <ResendOTP onResendClick={handleResendOtp} renderButton={renderButton} />
                    </div>
                    <div className="tp-submission-button">
                        <button type="button" onClick={otpVerifier} className='mt-5  overflow-hidden relative group bg-Primary rounded-xl w-full py-3 px-4 text-white font-semibold text-lg'>Verify OTP</button>
                    </div>
                </div> : 
                <Formik
                    validationSchema={LoginValidation}
                    initialValues={loginEmailValue}
                    onSubmit={(values) => handleEmailLogin(values)}
                >
                    {({  errors, touched , handleSubmit}) => (
                    <Form>
                        <div className="form-inputsec relative">
                            <Field type="email" name="email" placeholder='Enter Email Address*'
                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-20 pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                            />
                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2">
                                <img src={EmailLogo} className='max-w-[26px]' alt="" />
                            </div>
                        </div>
                        <div className="bottom-form-submitter mt-5  overflow-hidden relative group bg-Primary rounded-xl">
                            <button type='button' onClick={handleSubmit} className='w-full py-3 px-4 text-white font-semibold text-lg '>Login with OTP</button>
                        </div>
                    </Form>
                    )}
                </Formik>
            }
        </div>
    </div>
  )
}

export default MailLogin