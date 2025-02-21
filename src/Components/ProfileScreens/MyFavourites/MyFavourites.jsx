import React from 'react';
import PropTypes from 'prop-types';
import './MyFavourites.scss';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';
import RestaurantImage from '../../../assets/images/business-card-image-1.jpg';
import { useNavigate } from 'react-router-dom';

const MyFavourites = () =>{

  const navigate = useNavigate()

  return  (
    <div className="MyFavourites">
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
            <div className=" favorite-section-navigation-details-card bg-white py-8 px-8 rounded-20p similar-profile-sidebar-outer">
                <div className="grid grid-cols-12 gap-9 profile-sidebar-main-grid">
                  <div className="col-span-3 left-sidebar-section-proile border-r border-BorderColor border-opacity-40">
                      <ProfileSideBar/>
                  </div>
                  <div className="col-span-9 right-favorite-content-section">
                      <div className="favorite-main-details-heading-part">
                        <div className="left-main-prof-det-head">
                          <h4 className='text-Black font-medium text-lg'>Favourites</h4>
                        </div>
                      </div>
                      <div className="favorite-details-main-cards-section flex flex-col gap-y-6 mt-4">
                        <div className="favorite-card shadow-lg border border-ProfileCardBorder relative rounded-[15px] overflow-hidden grid grid-cols-12">
                          <div className="favorite-image col-span-2">
                            <img src={RestaurantImage} className='w-full object-cover h-full' alt="" />
                          </div>
                          <div className="favorite-details-prof col-span-10 px-6 py-5">
                            <div className="inner-right-side-content-favorite-card">
                              <h6 className='text-Black font-medium text-xl'>Sri Megha Restaurant</h6>
                              <div className="business-card-recommend-address-section flex flex-col gap-y-1 mt-2">
                                <div className="business-recommended-section flex items-center gap-10p opacity-60">
                                  <i className="ri-thumb-up-fill text-LightText"></i>
                                  <p className='text-sm text-LightText'>Highly Recommended</p>
                                </div>
                                <button type='button' className="business-recommended-section flex items-center gap-10p opacity-60 justify-center w-fit">
                                  <i className="ri-map-pin-line text-Black"></i>
                                  <p className='text-sm text-LightText'>{'Rajahmundry - Kotipalli'}</p>
                                </button>
                              </div>
                              <div className="bottom-favourites-btn-section flex items-center gap-5 mt-6">
                                <div className="number-button">
                                  <button type="button" className='flex items-center gap-2 px-5 py-[6px] rounded-full bg-Green group border-Green border hover:bg-transparent duration-300'>
                                    <div className="left-call-icon">
                                      <i className="ri-phone-fill text-white text-lg duration-300 group-hover:text-Green"></i>
                                    </div>
                                    <div className="right-call-text">
                                      <p className='text-white font-medium duration-300 group-hover:text-Green'>+91 954 845 2546</p>
                                    </div>
                                  </button>
                                </div>
                                <div className="whatsapp-button">
                                  <button type="button" className='flex items-center gap-2 px-5 py-[6px] rounded-full hover:bg-Green group bg-transparent border-Green border duration-300'>
                                      <div className="left-call-icon">
                                        <i className="ri-whatsapp-fill text-lg text-Green duration-300 group-hover:text-white "></i>
                                      </div>
                                      <div className="right-call-text">
                                        <p className=' font-medium text-Green duration-300 group-hover:text-white'>+91 954 845 2546</p>
                                      </div>
                                    </button>
                                </div>
                              </div>
                              <div className="top-absolute-rating-favorite-btn absolute right-4 top-4">
                                <div className="inner-absolute-favourite-btns flex items-center gap-4">
                                  <div className="rating-section-favourite flex items-center gap-2 bg-Green px-2 py-1 rounded-md">
                                    <div className="star">
                                      <i className="ri-star-fill text-white"></i>
                                    </div>
                                    <div className="rating-text">
                                      <p className='text-white font-medium'>4.1</p>
                                    </div>
                                  </div>
                                  <div className="favourite-label-sec flex items-center gap-2 rounded-full border border-BorderColor px-4 py-1">
                                    <div className="heart">
                                      <i className="ri-heart-fill text-red-500"></i>
                                    </div>
                                    <div className="favorite-label-text">
                                      <p className='text-LightText font-medium'>Favourites</p>
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
            </div>
          </div>
        </div>
    </div>
  );
}

MyFavourites.propTypes = {};

MyFavourites.defaultProps = {};

export default MyFavourites;
