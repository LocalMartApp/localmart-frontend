import React, { useState } from 'react'
import { Formik , Form , Field } from 'formik';
import { LoginNumberValidation } from '../../utils/Validation';
// import OtpInput from 'react-otp-input';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from 'react-router-dom';


const NumberLogin = () => {

    const navigate = useNavigate()

    const [otpValue , setOtpValue] = useState('');
    const [otpVisible , setOtpVisible] = useState(false)

    const loginNumberValue = {
        number: ''
    }

    
  function numbersOnly(e) {
    var key = e.key;
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      e.preventDefault();
    }
    else {
      console.log("You pressed a key: " + key);
    }
}



    const handleNumberLogin = (values) => {
        console.log('values-Number' , values.number );
        setOtpVisible(true)
    }

    const renderButton = (buttonProps) => {
        return <button {...buttonProps} className={`duration-500 ${buttonProps.disabled == true ? 'opacity-25' : 'opacity-100 text-Secondary font-semibold'}`}>Resend OTP</button>;
    };


  return (
    <div className="login-form-number-login-main-section">
        <div className="login-modal-form-section">
            {otpVisible ? 
                <div className="login-form-otp-section mt-5">
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
                </div> : 
                <Formik
                    validationSchema={LoginNumberValidation}
                    initialValues={loginNumberValue}
                    onSubmit={(values) => handleNumberLogin(values)}
                >
                    {({  errors, touched , handleSubmit}) => (
                    <Form>
                        <div className="form-inputsec relative">
                            <Field type="tel" name="number" placeholder='Enter Mobile Number*' onKeyPress={(e) => numbersOnly(e)} maxLength={10}
                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-20 pr-5 rounded-xl bg-white w-full text-Black  ${errors.number && touched.number ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                            />
                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2">
                                <p className='text-Black text-xl font-medium'>+91</p>
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

export default NumberLogin