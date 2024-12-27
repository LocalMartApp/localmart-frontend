import React from 'react';
import PropTypes from 'prop-types';
import BannerSlider from './BannerSlider';


// images-export
import BusinessApp from '../../assets/images/business-app.svg';
import LocalClassifieds from '../../assets/images/local-classifieds-app.svg';
import ShoppingApp from '../../assets/images/online-shopping-app.svg';
import FoodDelivery from '../../assets/images/food-delivery-app.svg';
import PopServicesSlider from './PopServicesSlider';
import RechargesBlocks from './RechargesBlocks';
import ExploreCities from './ExploreCities';
import AdSlider from './AdSlider';

import PgHostel from '../../assets/images/recharge-logos/pg-hostel.svg';
import Hospital from '../../assets/images/categories-logos/hospital.svg';
import HomeDecor from '../../assets/images/categories-logos/home-decors.svg';
import HotelRoom from '../../assets/images/categories-logos/hotels.svg';
import Restaurants from '../../assets/images/categories-logos/restuarants.svg';
import Courier from '../../assets/images/categories-logos/courier.svg';
import Gym from '../../assets/images/categories-logos/gym.svg';
import Dental from '../../assets/images/categories-logos/dental.svg';
import FunctionHall from '../../assets/images/categories-logos/function-hall.svg';
import Packers from '../../assets/images/categories-logos/packers-movers.svg';
import WeddingHall from '../../assets/images/categories-logos/wedding-halls.svg';
import PetShop from '../../assets/images/categories-logos/petshop.svg';




const Home = () => {

  const appCards = [
    {
      icon: BusinessApp,
      heading: 'Local Search',
      title : 'Local Search'
    },
    {
      icon: LocalClassifieds,
      heading: 'Local Classifieds',
      title : 'Buy and Sell Products'
    },
    {
      icon: ShoppingApp,
      heading: 'Online Shopping',
      title : 'Wide Range Shopping'
    },
    {
      icon: FoodDelivery,
      heading: 'Food Delivery',
      title : 'Food at your Doorstep'
    },
  ]

  const allCategories = [
    {
      icon: PgHostel,
      title: 'Hostels & PG’s'
    },
    {
      icon: Hospital,
      title: 'Hospitals'
    },
    {
      icon: HomeDecor,
      title: 'Home Decors'
    },
    {
      icon: HotelRoom,
      title: 'Hotels'
    },
    {
      icon: Restaurants,
      title: 'Restaurants'
    },
    {
      icon: Courier,
      title: 'Courier Service'
    },
    {
      icon: Gym,
      title: 'GYM’s'
    },
    {
      icon: Dental,
      title: 'Dental'
    },
    {
      icon: FunctionHall,
      title: 'Function Halls'
    },
    {
      icon: Packers,
      title: 'Packers & Movers'
    },
    {
      icon: WeddingHall,
      title: 'Wedding Halls'
    },
    {
      icon: PetShop,
      title: 'Pet Shops'
    },
  ]




  return (
    <div className="Home">
      <div className="main-home-section">
        <div className="inner-home-section">
          <section className="home-section-1">
            <div className="inner-home-section-1 bg-BlockBlack">
              <div className="container">
                <div className="top-slider-search-section">
                  <div className="grid grid-cols-2 gap-16">
                    <div className="left-home-section-1">
                      <div className="heading-section-1 flex flex-col gap-5">
                        <h1 className='text-white font-semibold text-50'>Find Everything <br /> You Need, Every Day!</h1>
                        <p className='text-white text-xl'>Looking for deals, services, or a place to <br /> buy and sell? We’ve got you covered.</p>
                      </div>
                      <div className="home-search-section-1 mt-14">
                        <div className="inner-seacrh-section grid grid-cols-12 bg-white rounded-full p-3 pl-5 justify-between">
                            <div className="col-span-5">
                                <div className="category-section flex items-center gap-4">
                                  <div className="left-category-logo-search">
                                    <i className="ri-file-list-3-line text-Primary text-2xl"></i>
                                  </div>
                                  <div className="right-category-dropdown-section">
                                      <button type='button'>
                                          <div className="top-section-category-select flex items-center gap-5">
                                            <p className='text-LightBlack text-sm'>Category</p>
                                            <i className="ri-arrow-down-s-line text-LightBlack"></i>
                                          </div>
                                          <div className="bottom-section-category-select">
                                            <p className='text-LightBlack text-lg'>Choose Category</p>
                                          </div>
                                      </button>
                                  </div>
                                </div>
                            </div>
                            <div className="col-span-4">
                              <div className="location-section flex items-center gap-4">
                                  <div className="left-location-logo-search">
                                    <i className="ri-map-pin-line text-Primary text-2xl"></i>
                                  </div>
                                  <div className="right-location-dropdown-section">
                                      <button type='button'>
                                          <div className="top-section-location-select flex items-center gap-5">
                                            <p className='text-LightBlack text-sm'>Location</p>
                                            <i className="ri-arrow-down-s-line text-LightBlack"></i>
                                          </div>
                                          <div className="bottom-section-location-select">
                                            <p className='text-LightBlack text-lg'>Select Location</p>
                                          </div>
                                      </button>
                                  </div>
                              </div>
                            </div>
                            <div className="col-span-3">
                                <div className="cate-loc-search-btn h-full w-full">
                                  <button type="button" className='bg-Primary duration-300 hover:scale-95 rounded-full h-full flex items-center w-full justify-center shadow-customized'>
                                    <p className='text-white text-xl font-medium'>Search</p>
                                  </button>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="right-home-section-1">
                      <BannerSlider/>
                    </div>
                  </div>
                </div>
                <div className="bottom-apps-home-section-1 mt-16">
                  <div className="grid grid-cols-4 gap-10">
                    {appCards.map((items , index) => {
                      return (
                        <button type='button' className="group text-left single-home-app-cards-sec-1 flex items-center gap-5 bg-white py-3 px-5 rounded-xl" key={index}>
                          <div className="left-app-logo w-50p h-50p">
                            <img src={items.icon} className='group-hover:scale-110 duration-300' alt="" />
                          </div>
                          <div className="right-app-heading-title-sec">
                            <h2 className='text-Black text-xl'>{items.heading}</h2>
                            <p className='text-LightText text-sm'>{items.title}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="inner-home-section-2">
              <div className="container">
                <PopServicesSlider/>
              </div>
            </div>
          </section>
          <section className="home-section-2">
            <div className="inner-home-section-2">
              <RechargesBlocks/>
            </div>              
          </section>
          <section className="home-section-3">
            <div className="inner-home-section-3">
              <div className="container">
                  <ExploreCities/>
              </div>
            </div>
          </section>
          <section className="home-section-4">
            <div className="inner-home-section-4">
              <AdSlider/> 
            </div>
          </section>
          <section className="home-setion-5">
            <div className="inner-home-section-5">
              <div className="container">
                  <div className="main-categories-home-sec-5">
                      <div className="top-heading-part-categories flex justify-between gap-10 items-center mb-10">
                          <div className="left-categories-heading-home">
                              <h2 className='text-30 text-white font-medium'>Explore Top Cities</h2>
                          </div>
                          <div className="explore-all-cates-button">
                              <button type="button" className='explore-cities-button-prev shadow-customized bg-white px-5 py-2 rounded-full flex items-center gap-10p border-LightBlack border-opacity-40 border'>
                                <i className="ri-menu-3-line text-Primary text-2xl"></i>
                                <p className='text-Primary text-lg font-medium'>Browse All</p>
                              </button>
                          </div>
                      </div>
                      <div className="bottom-all-categories-section">
                          <div className="grid grid-cols-6 gap-x-90p gap-y-60p">
                            {allCategories.map((items , index) => {
                              return (
                                <button type='button' key={index} className="single-recharge-component-home-sec-2 group flex flex-col justify-center items-center gap-3">
                                    <div className="top-image-blk bg-white w-100p h-100p flex items-center justify-center p-5 rounded-[15px]">
                                        <img src={items.icon} className='duration-500 group-hover:scale-125' alt="" />
                                    </div>
                                    <div className="bottom-text-blk">
                                        <p className='text-white text-center text-medium'>{items.title}</p>
                                    </div>
                                </button>
                              )
                            })}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
