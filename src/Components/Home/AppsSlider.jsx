import React from "react";
import BusinessApp from "../../assets/images/business-app.svg";
import LocalClassifieds from "../../assets/images/local-classifieds-app.svg";
import ShoppingApp from "../../assets/images/online-shopping-app.svg";
import FoodDelivery from "../../assets/images/food-delivery-app.svg";
import Jobs from '../../assets/images/local-jobs.svg';
import Matrimony from '../../assets/images/local-matrimony.svg';
import News from '../../assets/images/local-news.svg';
import Learning from '../../assets/images/local-learning.svg'



import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import { useNavigate } from "react-router-dom";

const AppsSlider = () => {
  const navigate = useNavigate();

  const appCards = [
    {
      icon: BusinessApp,
      heading: "Local Business",
      title: "Local Business",
      link: "/businesses",
    },
    {
      icon: LocalClassifieds,
      heading: "Classifieds",
      title: "Buy and Sell Products",
      link: "/coming-soon",
    },
    {
      icon: ShoppingApp,
      heading: "Online Shopping",
      title: "Wide Range Shopping",
      link: "/coming-soon",
    },
    {
      icon: FoodDelivery,
      heading: "Food Delivery",
      title: "Food at your Doorstep",
      link: "/coming-soon",
    },
    {
      icon: Jobs,
      heading: "Jobs",
      title: "Local Search",
      link: "/coming-soon",
    },
    {
      icon: Matrimony,
      heading: "Matrimony",
      title: "Buy and Sell Products",
      link: "/coming-soon",
    },
    {
      icon: News,
      heading: "News",
      title: "Wide Range Shopping",
      link: "/coming-soon",
    },
    {
      icon: Learning,
      heading: "Online Learning",
      title: "Food at your Doorstep",
      link: "/coming-soon",
    },
  ];

  return (
    <div className="main-aps-slider-section-home">
        <div className="relative hidden">
            {/* <div className="app-select-home-right-sliding-buttons flex items-center gap-7 ">
                <button type="button" className='apps-button-prev w-10 h-10 rounded-lg border-LightBlack border'><i className="ri-arrow-left-s-line text-Black text-2xl"></i></button>
                <button type="button" className='apps-button-next w-10 h-10 rounded-lg bg-Black'><i className="ri-arrow-right-s-line text-white text-2xl"></i></button>
            </div> */}
            <Swiper 
                className="mySwiper"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={4}
                speed={600}
                loop={true}
                initialSlide={2}
                spaceBetween={40}
                preventClicks={true}
                navigation={{
                    clickable: true,
                    nextEl: '.apps-button-next',
                    prevEl: '.apps-button-prev',
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    2000: {
                        slidesPerView: 4,
                        
                    },
                    1700 : {
                        slidesPerView: 4
                    },
                    1200: {
                        slidesPerView: 4
                    },
                    992: {
                        slidesPerView: 3
                    },
                    674: {
                        slidesPerView: 2
                    },
                    375: {
                        slidesPerView: 1,
                    },
                    75: {
                        slidesPerView: 1
                    }
                }}
                draggable={true}
                modules={[ Autoplay , Navigation]}
            >
                {appCards.map((items , index) => {
                    return (
                        <SwiperSlide>
                            <button type='button'  className="group text-left single-home-app-cards-sec-1 flex items-center gap-5 bg-white py-5 px-5 rounded-xl w-full" key={index}>
                                <div className="left-app-logo w-50p h-50p">
                                    <img src={items.icon} className='group-hover:scale-110 duration-300' alt="" />
                                </div>
                                <div className="right-app-heading-title-sec">
                                    <h2 className='text-Black text-xl'>{items.heading}</h2>
                                    {/* <p className='text-LightText text-sm'>{items.title}</p> */}
                                </div>
                            </button>
                        </SwiperSlide>
                    )
                })}
            </Swiper>     
        </div>  
        <div className="container localmart-business-app-container">
            <div className="grid grid-cols-4 px-6 gap-4 localmart-apps-section-banner">
                {appCards.map((items , index) => {
                    return (
                        <button type='button'  onClick={() => navigate(items.link)} className="group text-left single-home-app-cards-sec-1 flex items-center gap-5 bg-white py-5 px-5 rounded-xl w-full" key={index}>
                            <div className="left-app-logo w-50p h-50p">
                                <img src={items.icon} className='group-hover:scale-110 duration-300' alt="" />
                            </div>
                            <div className="right-app-heading-title-sec">
                                <h2 className='text-Black text-xl'>{items.heading}</h2>
                                {/* <p className='text-LightText text-sm'>{items.title}</p> */}
                            </div>
                        </button>
                    )
                })}
                
            </div>  
        </div>   
    </div>
  );
};

export default AppsSlider;
