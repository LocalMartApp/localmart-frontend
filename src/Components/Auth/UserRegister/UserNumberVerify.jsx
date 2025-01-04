import React, { useState } from 'react'
import EmailLogo from '../../../assets/images/email-icon.svg';
import { userRegNumberValidation } from '../../../utils/Validation';
import { Formik , Form , Field } from 'formik';
import OTPInput from 'otp-input-react';
import { ResendOTP } from "otp-input-react";
import { useNavigate } from 'react-router-dom';



const UserNumberVerify = () => {


    const navigate = useNavigate()

    const [otpValue , setOtpValue] = useState('');
    const [otpVisible , setOtpVisible] = useState(false)

    const userNumberRegVlues = {
        mobileNumber: '',
    }

    const handleNumberRegister = () => {
        setOtpVisible(true)
    }

    const renderButton = (buttonProps) => {
        return <button {...buttonProps} className={`duration-500 ${buttonProps.disabled == true ? 'opacity-25' : 'opacity-100 text-Secondary font-semibold'}`}>Resend OTP</button>;
    };


  return (
    <div>
        {otpVisible ? 
            <div className="emailregister-account-otp-section">
                <div className="login-form-otp-section flex flex-col gap-4">
                    <div className="form-inputsec relative">
                        <input type="email" disabled={true} value={userNumberRegVlues.email} name="email" className={`outline-none border-none bg-LightGrayBg py-4 pl-20 pr-5 rounded-xl w-full text-Black `} />                                
                        <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2">
                            <p className='text-Black text-xl font-medium opacity-70'>+91</p>
                        </div>
                    </div>
                    <div className="inner-otp-section-outer">
                        <div className="otp-top-lable mb-2">
                            <p className='text-medium text-Black'>Enter OTP</p>
                        </div>
                        <OTPInput value={otpValue} onChange={setOtpValue} autoFocus OTPLength={6} otpType="number" className={'otpinputs-outer'} disabled={false} />
                        <ResendOTP onResendClick={() => console.log("Resend clicked")} renderButton={renderButton} />
                    </div>
                    <div className="tp-submission-button">
                        <button type="button" onClick={() => navigate('/profile/my-profile')} className='mt-5  overflow-hidden relative group bg-Primary rounded-xl w-full py-3 px-4 text-white font-semibold text-lg'>Verify OTP</button>
                    </div>
                </div>   
            </div> : 
            <div className="email-register-account-form-section">
                <div className="email-register-form-inner">
                    <Formik
                        validationSchema={userRegNumberValidation}
                        initialValues={userNumberRegVlues}
                        onSubmit={(values) => handleNumberRegister(values)}
                    >
                        {({  errors, touched , handleSubmit}) => (
                        <Form>
                            <div className="form-inputsec relative">
                                <Field type="number" name="mobileNumber" placeholder='Enter Mobile Number*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-20 pr-5 rounded-xl bg-white w-full text-Black  ${errors.mobileNumber && touched.mobileNumber ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                                <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2">
                                    <p className='text-Black text-xl font-medium opacity-70'>+91</p>
                                </div>
                            </div>
                            <div className="bottom-form-submitter mt-5  overflow-hidden relative group bg-Primary rounded-xl">
                                <button type='button' onClick={handleSubmit} className='w-full py-3 px-4 text-white font-semibold text-lg '>Send OTP</button>
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

export default UserNumberVerify