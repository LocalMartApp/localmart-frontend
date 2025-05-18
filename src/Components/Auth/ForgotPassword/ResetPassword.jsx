import React , {useState , useEffect} from 'react';
import { Formik ,Form , Field } from 'formik';
import '../UserRegister/UserRegister.scss';
import toast from 'react-hot-toast';
import axios from 'axios';
import { config } from '../../../env-services';
import Modal from 'react-modal';
import Loader from '../../../utils/Loader/Loader';
import { resetPasswordSchema } from '../../../utils/Validation';
import BigCheck from '../../../assets/images/big-check.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {

    const navigate = useNavigate()

    const [modalIsOpen ,  setModalIsOpen] = useState(false);
    const [passwordHandle , setPasswordHandle] = useState(false);
    const [confirmPasswordHandle , setConfirmPasswordHandle] = useState(false);
    const [isSubmitted , setIsSubmitted] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    const urlToken = query.get('token');

    // console.log('Token:', urlToken);

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

    const resetPassValues = {
        password: '',
        confirmPassword: ''
    }

    const handleResetPassword = async(values) => {    
        const obj = {
            token: urlToken,
            newPassword: values.password,
            confirmPassword: values.confirmPassword
        }
        setModalIsOpen(true)
      try {
        await axios.post(`${config.api}auth/reset-password` , obj)
        .then((response) => {
            console.log(response , "reset-response")
          if(response?.data?.success == true) {
                setIsSubmitted(true)
                setModalIsOpen(false)
                toast.success('Password Changed Succesfully');
          }
        })
        .catch((err) => {
          setModalIsOpen(false)
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
                        {isSubmitted ? 
                            <div className="otp-section-forgot text-center bg-white p-8 rounded-3xl">
                                <div className="top-email-sent-image">
                                    <img src={BigCheck} className='w-24 h-24 mx-auto' alt="" />
                                </div>
                                <div className="bottom-emailsent-content mt-5">
                                    <h4 className='text-center font-medium text-2xl text-black'>Password Changed Successfully</h4>
                                    <p className='opacity-60 text-center text-black mt-2'>Your password has been changed successfully , <br /> now you can login with new password</p>
                                </div>
                                <button type="button" onClick={() => navigate('/login')} className=' mt-5 text-center bg-Secondary px-6 py-2 rounded-full text-white'>Login Now</button>
                            </div> 
                            : 
                            <div className="left-login-page-image-section bg-white rounded-2xl overflow-hidden">
                                <div className="top-forgot-heading-sec px-6 py-4 border-b border-opacity-20 border-Black">
                                    <h2 className='text-2xl font-medium'>Reset Your Password</h2>
                                    <p className='text-sm opacity-50 mt-2'>Create new password to login to your account</p>
                                </div>
                                <div className="form-section p-6">
                                    <div className="inner-forgot-password-form">
                                        <Formik
                                            validationSchema={resetPasswordSchema}
                                            initialValues={resetPassValues}
                                            onSubmit={(values) => handleResetPassword(values)}
                                        >
                                            {({  errors, touched , handleSubmit}) => (
                                            <Form>
                                                <div className="inner-reset-section-form flex flex-col gap-4">
                                                    <div className="form-inputsec relative">
                                                        <Field type={passwordHandle ? 'text' : 'password'} name="password" placeholder='Enter Password*'
                                                            className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-6 pr-5 rounded-xl bg-white w-full text-Black  ${errors.password && touched.password ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                        />                                
                                                        <button type="button" className="email-input-icon password-login-icon owa absolute right-4 top-1/2" onClick={() => setPasswordHandle(!passwordHandle)}>
                                                            <i className={`${passwordHandle ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl text-LightText`}></i>
                                                        </button>
                                                    </div>
                                                    <div className="form-inputsec relative">
                                                        <Field type={confirmPasswordHandle ? 'text' : 'password'} name="confirmPassword" placeholder='confirm Password*'
                                                            className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-6 pr-5 rounded-xl bg-white w-full text-Black  ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                        />                                
                                                        <button type="button" className="email-input-icon password-login-icon owa absolute right-4 top-1/2" onClick={() => setConfirmPasswordHandle(!confirmPasswordHandle)}>
                                                            <i className={`${confirmPasswordHandle ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl text-LightText`}></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="bottom-form-submitter  overflow-hidden relative group mt-5">
                                                    <button type='submit' onClick={handleSubmit} className='w-full py-3 px-4 rounded-xl text-white font-semibold text-lg h-full bg-Primary disabled:bg-opacity-35 '>Submit</button>
                                                </div>
                                            </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword