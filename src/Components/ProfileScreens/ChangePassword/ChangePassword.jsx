import React from 'react';
import PropTypes from 'prop-types';
import './ChangePassword.scss';
import { useNavigate } from 'react-router-dom';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';

const ChangePassword = () => {

  const navigate = useNavigate()


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
                          <h4 className='text-Black font-medium text-lg'>Change Credentials</h4>
                          <p className='opacity-50'>You can change mobile number , email & password</p>
                        </div>
                        <div className="mybusiness-cards-section mt-6">
                         
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
