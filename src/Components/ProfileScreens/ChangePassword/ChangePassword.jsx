import './ChangePassword.scss';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';
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



const ChangePassword = () => {

  const navigate = useNavigate();



  const baseValues = {
      email : '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }


  return (
    <div className="ChangePassword">
        <div className="my-profile-inner-section bg-ProfileScreensBg">
          <div className="top-similar-header-section-profile-screens mb-30p">
            <div className="container">
              <div className="top-similar-header-section-profile-inner flex items-center gap-10 justify-between">
                <div className="left-profilescreens-heading">
                  <h4 className='text-xl text-Black font-medium'>Change Password</h4>
                </div>
                <div className="right-add-business-button">
                  <button type="button" onClick={() => navigate('/business/add-business')}>
                    <div className="list-business-btn-inner flex items-center gap-3">
                      <div className="left-icon-list-business">
                        <i className="ri-shake-hands-line text-Secondary text-2xl"></i>
                      </div>
                      <div className="right-list-business-text">
                        <p className='text-Secondary text-xl font-medium'>List Your Businesses</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className=" favorite-section-navigation-details-card bg-white py-8 px-8 rounded-20p similar-profile-sidebar-outer">
                <div className="grid grid-cols-12 gap-9 profile-sidebar-main-grid">
                  <div className="col-span-3 left-sidebar-section-proile border-r border-BorderColor border-opacity-40">
                      <ProfileSideBar/>
                  </div>
                  <div className="col-span-9 right-business-content-section">
                      <div className="business-main-details-heading-part h-full">
                        <div className="left-main-prof-det-head">
                          <h4 className='text-Black font-medium text-lg'>Change Password</h4>
                          <p className='opacity-50'>You can change your password by entering old password</p>
                        </div>
                        <div className="mybusiness-cards-section mt-6">
                         <div className="inner-forgot-password-form">
                              <Formik
                                  validationSchema={LoginValidation}
                                  initialValues={baseValues}
                                  onSubmit={(values) => handleForgotEmail(values)}
                              >
                                  {({  errors, touched , handleSubmit}) => (
                                  <Form>
                                      <div className="grid grid-cols-12 gap-5 change-password-setion-inner-grid">
                                        <div className="form-inputsec relative col-span-6">
                                            <Field type="email" name="email" placeholder='Enter email address*'
                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-6 pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                            />                                
                                        </div>
                                        <div className="form-inputsec relative col-span-6">
                                            <Field type="password" name="currentPassword" placeholder='Enter current password*'
                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-6 pr-5 rounded-xl bg-white w-full text-Black  ${errors.currentPassword && touched.currentPassword ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                            />                                
                                        </div>
                                        <div className="form-inputsec relative col-span-6">
                                            <Field type="password" name="newPassword" placeholder='Enter new password*'
                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-6 pr-5 rounded-xl bg-white w-full text-Black  ${errors.newPassword && touched.newPassword ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                            />                                
                                        </div>
                                        <div className="form-inputsec relative col-span-6">
                                            <Field type="password" name="confirmPassword" placeholder='Enter confrim password*'
                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-6 pr-5 rounded-xl bg-white w-full text-Black  ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                            />                                
                                        </div>
                                        <div className="bottom-form-submitter overflow-hidden relative group col-span-6 ">
                                            <button type='submit' onClick={handleSubmit} className='w-full py-3 px-4 rounded-xl text-white font-semibold text-lg h-full bg-Primary disabled:bg-opacity-35 '>Save Password</button>
                                        </div>
                                      </div>                                     
                                  </Form>
                                  )}
                              </Formik>
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

ChangePassword.propTypes = {};

ChangePassword.defaultProps = {};

export default ChangePassword;
