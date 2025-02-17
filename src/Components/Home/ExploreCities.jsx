import React from 'react'

import MumbaiCity from '../../assets/images/mumbai-city.png';
import VizagCity from '../../assets/images/vizag-city.png';
import DelhiCity from '../../assets/images/delhi-city.png';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay , Navigation } from 'swiper/modules';

import "swiper/css";


const ExploreCities = () => {

    const popularServices = [
        {
            image: MumbaiCity,
            title: 'Mumbai',
            desc: 'Discover hidden gems & iconic destinations. Start journey today!',
        },
        {
            image: VizagCity,
            title: 'Visakhapatnam',
            desc: 'Discover hidden gems & iconic destinations. Start journey today!',
        },
        {
            image: DelhiCity,
            title: 'Delhi',
            desc: 'Discover hidden gems & iconic destinations. Start journey today!',
        },
        {
            image: MumbaiCity,
            title: 'Mumbai',
            desc: 'Discover hidden gems & iconic destinations. Start journey today!',
        },
        {
            image: VizagCity,
            title: 'Visakhapatnam',
            desc: 'Discover hidden gems & iconic destinations. Start journey today!',
        },
        {
            image: DelhiCity,
            title: 'Delhi',
            desc: 'Discover hidden gems & iconic destinations. Start journey today!',
        },
    ]
    

  return (
    <div className="explore-cities-home-section-1">
        <div className="explore-slide-heading-section flex justify-between gap-10 items-center mb-10">
            <div className="left-explore-serv-heading">
                <h2 className='text-30 text-white font-medium'>Explore Top Cities</h2>
            </div>
            <div className="explore-serv-right-sliding-buttons flex items-center gap-7">
                <button type="button" className='explore-cities-button-prev w-10 h-10 rounded-lg border-white border'><i className="ri-arrow-left-s-line text-white text-2xl"></i></button>
                <button type="button" className='explore-cities-button-next w-10 h-10 rounded-lg bg-white'><i className="ri-arrow-right-s-line text-Black text-2xl"></i></button>
            </div>
        </div>
        <div className="explore-cities-bottom-slider-section">
            <Swiper 
                className="mySwiper"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                speed={600}
                loop={true}
                initialSlide={2}
                spaceBetween={20}
                preventClicks={true}
                navigation={{
                    clickable: true,
                    nextEl: '.explore-cities-button-next',
                    prevEl: '.explore-cities-button-prev',
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    2000: {
                        slidesPerView: 3,
                        
                    },
                    1700 : {
                        slidesPerView: 3
                    },
                    1200: {
                        slidesPerView: 3
                    },
                    992: {
                        slidesPerView: 2
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
                modules={[ Autoplay , Navigation]}
            >
                {popularServices.map((items , index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="single-explore-cities-card bg-white rounded-20p relative p-5">
                                <div className="image-text-section-explore-cities flex items-center gap-4">
                                    <div className="left-image-explore-city">
                                        <img src={items.image} className='rounded-full min-w-[100px] h-[100px]' alt="" />
                                    </div>
                                    <div className="right-text-explore">
                                        <h4 className='text-xl font-medium'>{items.title}</h4>
                                        <p className='text-LightText w-11/12'>{items.desc}</p>
                                    </div>
                                </div>
                                <div className="absolute-arrow-explore-section absolute right-2 top-2">
                                    <button type='button' className='w-10 h-10 rounded-full bg-Primary'><i className="bi bi-arrow-right text-white text-xl"></i></button>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    </div>
  )
}

export default ExploreCities