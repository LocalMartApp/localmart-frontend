import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.scss';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';
import ProfileImage from '../../../assets/images/profile-image.svg';
import BusinessImage from '../../../assets/images/business-publish-image.svg';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {

  const navigate = useNavigate()

  return (
    <div className="Notifications">
      <div className="my-profile-inner-section bg-ProfileScreensBg">
        <div className="top-similar-header-section-profile-screens mb-30p">
          <div className="container">
            <div className="top-similar-header-section-profile-inner flex items-center gap-10 justify-between">
              <div className="left-profilescreens-heading">
                <h4 className='text-xl text-Black font-medium'>My Account</h4>
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
          <div className=" profile-section-navigation-details-card bg-white py-8 px-8 rounded-20p similar-profile-sidebar-outer">
              <div className="grid grid-cols-12 gap-9 profile-sidebar-main-grid">
                <div className="col-span-3 left-sidebar-section-proile border-r border-BorderColor border-opacity-40">
                    <ProfileSideBar/>
                </div>
                <div className="col-span-9 right-profile-content-section">
                    <div className="profile-main-details-heading-part">
                      <div className="left-main-prof-det-head">
                        <h4 className='text-Black font-medium text-lg'>All Notifications</h4>
                      </div>
                    </div>
                    <div className="profile-details-main-cards-section flex flex-col gap-y-6 mt-4">
                      <div className="profile-card flex items-center gap-x-10 justify-between px-5 py-4 border border-ProfileCardBorder rounded-[15px]">
                        <div className="left-image-name-section-profile flex items-center gap-6">
                          <div className="profile-image">
                            <img src={BusinessImage} className='rounded-full min-w-20 max-w-20' alt="" />
                          </div>
                          <div className="profile-details-prof">
                            <h6 className='text-Black font-medium text-lg'>Your Business Published - Sri Megha Restaurant</h6>
                            <p className='text-LightText text-sm'>your business regarding a restaurant has been published successfully in our Localmart by our reviewer click on view button to view the published view</p>
                          </div>
                        </div>
                        <div className="right-phone-number-prof-section">
                          <button type='button' className='bg-Secondary rounded-full px-6 py-2'>
                            <p className='text-white font-medium'>View</p>
                          </button>
                        </div>
                      </div>
                      <div className="profile-card flex items-center gap-x-10 justify-between px-5 py-4 border border-ProfileCardBorder rounded-[15px]">
                        <div className="left-image-name-section-profile flex items-center gap-6">
                          <div className="profile-image">
                            <img src={ProfileImage} className='rounded-full min-w-20 max-w-20' alt="" />
                          </div>
                          <div className="profile-details-prof">
                            <h6 className='text-Black font-medium text-lg'>Your Account Created Successfully</h6>
                            <p className='text-LightText text-sm'>your account has been created successfully with local mart</p>
                          </div>
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

Notifications.propTypes = {};

Notifications.defaultProps = {};

export default Notifications;
