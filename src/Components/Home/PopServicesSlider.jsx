import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow , Pagination , Autoplay , Navigation } from 'swiper/modules';

import "swiper/css";

import ServicesImage1 from '../../assets/images/popular-services-image-1.jpg';
import ServicesImage2 from '../../assets/images/popular-services-image-2.jpg';
import ServicesImage3 from '../../assets/images/popular-services-image-3.jpg';
import ServicesImage4 from '../../assets/images/popular-serviices-image-4.jpg';

const PopServicesSlider = () => {

    const popularServices = [
        {
            image: ServicesImage1,
            title: 'Hotels',
            tag: '20+ Collection'
        },
        {
            image: ServicesImage2,
            title: 'Repairs & Service',
            tag: '30+ Options'
        },
        {
            image: ServicesImage3,
            title: 'Shopping',
            tag: '100+ Categories'
        },
        {
            image: ServicesImage4,
            title: 'Doctors',
            tag: '100+ Options'
        },
        {
            image: ServicesImage1,
            title: 'Hotels',
            tag: '20+ Collection'
        },
        {
            image: ServicesImage2,
            title: 'Repairs & Service',
            tag: '30+ Options'
        },
        {
            image: ServicesImage3,
            title: 'Shopping',
            tag: '100+ Categories'
        },
        {
            image: ServicesImage4,
            title: 'Doctors',
            tag: '100+ Options'
        },
    ]

  return (
    <>
        <div className="inner-home-2-slider-sec bg-ThemeYellow py-10 px-12 -mt-[250px]">
            <div className="pop-slide-heading-section flex justify-between gap-10 items-center mb-10">
                <div className="left-pop-serv-heading">
                    <h2 className='text-30 text-Black font-medium'>Popular Services</h2>
                </div>
                <div className="pop-serv-right-sliding-buttons flex items-center gap-7">
                    <button type="button" className='popular-services-button-prev w-10 h-10 rounded-lg border-LightBlack border'><i className="ri-arrow-left-s-line text-Black text-2xl"></i></button>
                    <button type="button" className='popular-services-button-next w-10 h-10 rounded-lg bg-Black'><i className="ri-arrow-right-s-line text-white text-2xl"></i></button>
                </div>
            </div>
            <div className="pop-serv-bottom-slider">
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
                        nextEl: '.popular-services-button-next',
                        prevEl: '.popular-services-button-prev',
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                    modules={[ Autoplay , Navigation]}
                >
                    {popularServices.map((items , index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="single-pop-service-card" >
                                    <div className="image-section-pop-serv relative">
                                        <img src={items.image} alt="" />
                                        <div className="absolute bottom-0 left-0 w-full">
                                            <div className="bottom-service-card-section flex items-center justify-between bg-white py-3 px-4">
                                                <div className="left-title-service">
                                                    <h4 className='font-medium text-20 text-Black'>{items.title}</h4>
                                                    <p className='text-LightText font-medium'>{items.tag}</p>
                                                </div>
                                                <div className="right-service-arrow-sec">
                                                    <button type='button' className='w-10 h-10 rounded-full bg-Primary'><i className="bi bi-arrow-right text-white text-xl"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    </>
  )
}

export default PopServicesSlider