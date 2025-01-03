import React from 'react';
import PropTypes from 'prop-types';
import './BusinessPage.scss';

// images-export
import InnovationImage from '../../assets/images/innovation-business.svg';
import Growth from '../../assets/images/mission-growth.svg';
import HaveBusiness from '../../assets/images/have-business.svg';
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
import BusinessPopServSlider from './BusinessPopServSlider';
import BusinessImage from '../../assets/images/business-card-image-1.jpg';


const BusinessPage = () => {


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
    <div className="BusinessPage">
      <div className="business-to-business-main-section pt-8">
        <div className="list-business-top-section">
          <div className="container">
            <div className="right-side-list-business-button flex items-center justify-end">
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
        <section className="business-page-section-1 pt-30p pb-70p">
          <div className="inner-business-page-section-1">
            <div className="container">
              <div className="business-section-1-grid">
                <div className="business-grid-items business-sec-1-item-1 rounded-20p bg-[#E0EFFF]">
                  <div className="inner-business-card-section flex flex-col h-full justify-between gap-6">
                    <div className="business-sec-1-cards-top-heading">
                      <h2 className='text-Black font-medium'>Making Innovation <br />That Drives Result</h2>
                    </div>
                    <div className="business-sec-1-center-image">
                      <img src={InnovationImage} alt="" />
                    </div>
                    <div className="bottom-business-card-button">
                      <button className='border-Secondary border text-white font-medium duration-300 hover:bg-transparent bg-Secondary hover:text-Secondary rounded-full'>Start Now</button>
                    </div>
                  </div>
                </div>
                <div className="business-grid-items business-sec-1-item-2 rounded-20p bg-[#FFEFEA]">
                  <div className="inner-business-card-section flex flex-col h-full justify-between gap-6">
                    <div className="business-sec-1-cards-top-heading">
                      <h2 className='text-Black font-medium'>Your Growth <br /> Our Mission</h2>
                    </div>
                    <div className="business-sec-1-center-image">
                      <img src={Growth} alt="" />
                    </div>
                    <div className="bottom-business-card-button">
                      <button className='border-Secondary border text-white font-medium duration-300 hover:bg-transparent bg-Secondary hover:text-Secondary rounded-full'>Start Now</button>
                    </div>
                  </div>
                </div>
                <div className="business-grid-items business-sec-1-item-3 rounded-20p bg-[#FFE9F3]">
                  <div className="inner-business-card-section flex flex-col  h-full justify-between gap-6">
                    <div className="business-sec-1-cards-top-heading">
                      <h2 className='text-Black font-medium'>Have a Business ?</h2>
                    </div>
                    <div className="business-sec-1-center-image">
                      <img src={HaveBusiness} alt="" />
                    </div>
                    <div className="bottom-business-card-button">
                      <button className='border-Secondary border text-white font-medium duration-300 hover:bg-transparent bg-Secondary hover:text-Secondary rounded-full'>List Business</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business-section-2">
          <div className="inner-business-section-2">
            <div className="container">
              <div className="main-categories-home-sec-5">
                  <div className="top-heading-part-categories flex justify-between gap-10 items-center mb-10">
                      <div className="left-categories-heading-home">
                          <h2 className='text-30 text-white font-medium'>Explore Wide Range Categories</h2>
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
        <section className="business-section-4 py-16">
          <div className="inner-business-section-4">
              <BusinessPopServSlider/>
          </div>
        </section>
        <section className="business-page-section-3">
          <div className="inner-business-page-section-3 bg-[#F1F1F1] py-16 hidden">
            <div className="container">
              <div className="business-section-3-heading-sec flex items-center justify-between gap-10">
                <div className="left-verified-sell-head">
                  <h4 className='text-3xl font-medium text-Black'> Verified Sellers in Rajahmundry</h4>
                </div>
                <div className="right-business-explore-sec">
                  <button type="button" className='flex items-center gap-3'>
                    <p className='text-Secondary font-medium'>Explore More</p>
                    <i className="bi bi-arrow-right text-Secondary text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="business-sec-3-main-cards-section pt-10">
                <div className="grid grid-cols-2">
                  <div className="single-business-sec-3-card flex  bg-white gap-5 rounded-xl overflow-hidden">
                    <div className="left-image-section-bus-sec-3">
                        <img src={BusinessImage} className='h-full max-h-[180px]' alt="" />
                    </div>
                    <div className="right-side-business-card-details">
                      <div className="business-card-title">
                        <h4>Sri Megha Restaurant</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

BusinessPage.propTypes = {};

BusinessPage.defaultProps = {};

export default BusinessPage;
