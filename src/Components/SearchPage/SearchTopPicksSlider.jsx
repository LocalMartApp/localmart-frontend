import React from 'react'
import BusinessImage from '../../assets/images/business-card-image-1.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow , Pagination , Autoplay , Navigation } from 'swiper/modules';

import "swiper/css";

const SearchTopPicksSlider = () => {

    const topPicks = [
        {
            image: BusinessImage,
            title: 'Sri Megha Restaurant',
            location: 'Rajahmundry - Kothapilli',
            opens: 'Opens at 10:30 AM',
        },
        {
            image: BusinessImage,
            title: 'Kritunga Restaurant',
            location: 'Rajahmundry - LalaCheruvu',
            opens: 'Opens at 11:30 AM',
        },
        {
            image: BusinessImage,
            title: 'Paradise Biryani',
            location: 'Rajahmundry - Bus stand',
            opens: 'Opens at 09:00 AM',
        },
        {
            image: BusinessImage,
            title: 'Sri Megha Restaurant',
            location: 'Rajahmundry - Kothapilli',
            opens: 'Opens at 10:30 AM',
        },
        {
            image: BusinessImage,
            title: 'Sri Megha Restaurant',
            location: 'Rajahmundry - Kothapilli',
            opens: 'Opens at 10:30 AM',
        },
        {
            image: BusinessImage,
            title: 'Kritunga Restaurant',
            location: 'Rajahmundry - LalaCheruvu',
            opens: 'Opens at 11:30 AM',
        },
        {
            image: BusinessImage,
            title: 'Paradise Biryani',
            location: 'Rajahmundry - Bus stand',
            opens: 'Opens at 09:00 AM',
        },
        {
            image: BusinessImage,
            title: 'Sri Megha Restaurant',
            location: 'Rajahmundry - Kothapilli',
            opens: 'Opens at 10:30 AM',
        },

    ]
  return (
    <div className='search-top-picks-slider-main'>
        <div className="pop-slide-heading-section flex justify-between gap-10 items-center mb-5">
            <div className="left-pop-serv-heading">
                <h2 className=' text-Black text-lg font-medium'>Top Picks Today</h2>
            </div>
            <div className="pop-serv-right-sliding-buttons flex items-center gap-7">
                <button type="button" className='toppicks-search-button-prev w-8 h-8 rounded-lg border-LightBlack border'><i className="ri-arrow-left-s-line text-Black text-2xl"></i></button>
                <button type="button" className='toppicks-search-button-next w-8 h-8 rounded-lg bg-Black'><i className="ri-arrow-right-s-line text-white text-2xl"></i></button>
            </div>
        </div>
        <div className="pop-serv-bottom-slider rounded-xl overflow-hidden">
            <Swiper 
                className="mySwiper"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={4}
                speed={600}
                loop={true}
                spaceBetween={20}
                preventClicks={true}
                navigation={{
                    clickable: true,
                    nextEl: '.toppicks-search-button-next',
                    prevEl: '.toppicks-search-button-prev',
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
                modules={[ Autoplay , Navigation]}
            >
                {topPicks.map((items , index) => {
                    return (
                        <SwiperSlide key={index}>
                            <button type='button' className="text-left single-mybusiness-card shadow-lg rounded-[15px]  overflow-hidden bg-LightBlue relative">
                                <div className="top-image-mybusiness-section max-h-[220px] h-full overflow-hidden group">
                                    <img src={items.image } className='w-full h-full group-hover:scale-110 duration-300 object-cover' alt="" />
                                </div>
                                <div className="inner-bottom-mybusiness-section px-5 pt-5 pb-4">
                                    <h6 className='text-Black font-medium text-xl'>{items.title}</h6>
                                    <div className="business-card-recommend-address-section flex flex-col gap-y-1 mt-2">
                                        <div className="business-recommended-section flex items-center gap-10p opacity-60">
                                            <i className="ri-thumb-up-fill text-LightText"></i>
                                            <p className='text-sm text-LightText'>Highly Recommended</p>
                                        </div>
                                        <button type='button' className="business-recommended-section flex items-center gap-10p  justify-center w-fit">
                                            <i className="ri-time-line text-Black opacity-40"></i>
                                            <p className='text-sm text-Green '>{items.opens}</p>
                                        </button>
                                        <div className="business-recommended-section flex items-center gap-10p opacity-60">
                                            <i className="ri-map-pin-line text-LightText"></i>
                                            <p className='text-sm text-LightText'>{items.location}</p>
                                        </div>
                                    </div>
                                    <div className="number-button mt-5 flex items-center gap-x-4">
                                        <button type="button" className='flex items-center gap-2 duration-300 group bg-Primary rounded-full border-Primary border hover:bg-transparent h-9 px-5'>
                                            <p className='text-white font-medium duration-300 group-hover:text-Primary'>Send Enquiry</p>
                                        </button>
                                        <button className='h-9 w-9 rounded-full bg-Green flex items-center justify-center'>
                                            <i className="ri-phone-fill text-white text-lg duration-300 "></i>
                                        </button>
                                        <button className='h-9 w-9 rounded-full bg-Secondary flex items-center justify-center'>
                                            <i className="ri-direction-fill text-white text-lg duration-300 "></i>
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
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    </div>
  )
}

export default SearchTopPicksSlider