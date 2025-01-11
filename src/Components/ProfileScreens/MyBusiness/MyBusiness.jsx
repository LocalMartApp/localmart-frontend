import React from 'react';
import PropTypes from 'prop-types';
import './MyBusiness.scss';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';
import BusinessImage from '../../../assets/images/business-card-image-1.jpg';
import BusinessAddIcon from '../../../assets/images/business-add-icon.svg';


const MyBusiness = () => {
  return (
    <div className="MyBusiness">
      <div className="my-profile-inner-section bg-ProfileScreensBg">
          <div className="top-similar-header-section-profile-screens mb-30p">
            <div className="container">
              <div className="top-similar-header-section-profile-inner flex items-center gap-10 justify-between">
                <div className="left-profilescreens-heading">
                  <h4 className='text-xl text-Black font-medium'>My Account</h4>
                </div>
                <div className="right-add-business-button">
                  <button type="button">
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
            <div className=" favorite-section-navigation-details-card bg-white py-8 px-8 rounded-20p">
                <div className="grid grid-cols-12 gap-9">
                  <div className="col-span-3 left-sidebar-section-proile border-r border-BorderColor border-opacity-40">
                      <ProfileSideBar/>
                  </div>
                  <div className="col-span-9 right-business-content-section">
                      <div className="business-main-details-heading-part">
                        <div className="left-main-prof-det-head">
                          <h4 className='text-Black font-medium text-lg'>Your Businesses</h4>
                        </div>
                        <div className="mybusiness-cards-section mt-6">
                          <div className="mybusiness-cards-grid-section grid grid-cols-3 gap-5">
                            <button type='button' className="text-left single-mybusiness-card shadow-lg rounded-[15px] group border-BorderColor overflow-hidden border relative">
                              <div className="top-image-mybusiness-section max-h-[220px] h-full overflow-hidden">
                                <img src={BusinessImage } className='w-full h-full group-hover:scale-110 duration-300 object-cover' alt="" />
                              </div>
                              <div className="inner-bottom-mybusiness-section px-5 pt-5 pb-4">
                                <h6 className='text-Black font-medium text-xl'>Sri Megha Restaurant</h6>
                                <div className="business-card-recommend-address-section flex flex-col gap-y-1 mt-2">
                                  <div className="business-recommended-section flex items-center gap-10p opacity-60">
                                    <i className="ri-thumb-up-fill text-LightText"></i>
                                    <p className='text-sm text-LightText'>Highly Recommended</p>
                                  </div>
                                  <button type='button' className="business-recommended-section flex items-center gap-10p  justify-center w-fit">
                                    <i className="ri-line-chart-line text-Black"></i>
                                    <p className='text-sm text-LightText opacity-60'>135 People Recently Searched</p>
                                  </button>
                                </div>
                                <div className="number-button mt-5">
                                    <button type="button" className='flex items-center gap-2 group'>
                                      <div className="left-call-icon">
                                        <i className="ri-phone-fill text-Green text-lg duration-300 "></i>
                                      </div>
                                      <div className="right-call-text">
                                        <p className='text-Green font-medium duration-300'>+91 954 845 2546</p>
                                      </div>
                                    </button>
                                  </div>
                              </div>
                              <div className="rating-section-favourite flex items-center gap-2 bg-white px-2 py-1 rounded-md absolute top-5 right-5">
                                  <div className="star">
                                    <i className="ri-star-fill text-[#FFA600]"></i>
                                  </div>
                                  <div className="rating-text">
                                    <p className='text-Black font-medium'>4.1</p>
                                  </div>
                              </div>
                            </button>
                            <button type='button' className="single-mybusiness-card empty-mybusiness-cardbtn shadow-lg rounded-[15px] border border-dashed border-BorderColor group overflow-hidden relative flex items-center justify-center">
                                <div className="inner-empty-business-card flex flex-col gap-5 items-center">
                                    <div className="top-icon-add-business-icon">
                                      <img src={BusinessAddIcon} className='w-8 h-8 duration-500 group-hover:rotate-90' alt="" />
                                    </div>
                                    <div className="bottom-add-business-text">
                                      <p className='text-[20px] font-medium text-Secondary text-center'>List Your Businesses <br /> Now</p>
                                    </div>
                                </div>
                            </button>
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

MyBusiness.propTypes = {};

MyBusiness.defaultProps = {};

export default MyBusiness;
