import React from 'react';
import './Home.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow , Pagination , Autoplay } from 'swiper/modules';


import "swiper/css";
import "swiper/css/effect-coverflow";

import sliderImage1 from '../../assets/images/slider-image-1.jpg';
import sliderImage2 from '../../assets/images/slider-image-2.jpg';
import sliderImage3 from '../../assets/images/slider-image-3.jpg';



const BannerSlider = () => {


      const slides = [
        {
          image: sliderImage1,
          heading: 'PACKERS & MOVERS',
        },
        {
          image: sliderImage2,
          heading: 'GADGETS & TECH',
        },
        {
          image: sliderImage3,
          heading: 'CITIES & TOURS',
        },
        {
          image: sliderImage1,
          heading: 'PACKERS & MOVERS',
        },
        {
          image: sliderImage2,
          heading: 'GADGETS & TECH',
        },
        {
          image: sliderImage3,
          heading: 'CITIES & TOURS',
        },
    
      ];
    


  return (
    <>
        <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="2"
            speed={600}
            loop={true}
            initialSlide={2}
            preventClicks={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 150,
                depth: 500,
                modifier: 1,
                slideShadows: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false
            }}
            pagination={{
                clickable: true,
            }}
            modules={[EffectCoverflow , Autoplay]}
            className="mySwiper"
            onClick={(swiper) => swiper.slideTo(swiper.clickedIndex)} 
            >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="single-banner-slides-section-1">
                        <div className="slideimage-section-home-sec-1 relative overflow-hidden rounded-[20px]">
                            <img src={slide?.image} className='h-full min-h-[382px] max-h-[382px] object-cover' alt="" />
                            <div className="innner-ad-slider-sec absolute bottom-6 left-6">
                                <div className="ad-slider-sec mb-2 w-3/4">
                                    <h4 className='text-white font-bold text-[28px] italic'>{slide.heading}</h4>
                                </div>
                                <div className="ad-deal-button"><button type="button" className='text-white bg-Primary text-lg py-2 px-6 rounded-lg font-semibold'>Check Deals</button></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </>
  )
}

export default BannerSlider