import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay , Navigation , Pagination } from 'swiper/modules';

import "swiper/css";
import sliderImage1 from '../../assets/images/slider-image-1.jpg';
import sliderImage2 from '../../assets/images/slider-image-2.jpg';
import sliderImage3 from '../../assets/images/slider-image-3.jpg';


const AdSlider = () => {

    const adSlides = [
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
    <div className="ad-slider-main-section-home">
        <div className="explore-cities-bottom-slider-section">
            <Swiper 
                className="mySwiper"
                grabCursor={true}
                centeredSlides={true}
                pagination={true}
                slidesPerView={2}
                speed={600}
                loop={true}
                initialSlide={2}
                spaceBetween={20}
                preventClicks={true}
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
                modules={[ Autoplay , Navigation , Pagination]}
            >
                {adSlides.map((items , index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="single-ad-slides-section-">
                                <div className="slideimage-section-home-sec-1 relative overflow-hidden rounded-[20px]">
                                    <img src={items.image} className='h-full min-h-[300px] max-h-[300px] object-cover' alt="" />
                                    <div className="innner-ad-itemsr-sec absolute bottom-6 left-6 w-full">
                                        <div className="ad-slider-sec mb-2">
                                            <h4 className='text-white font-bold text-[28px] italic'>{items.heading}</h4>
                                        </div>
                                        <div className="ad-deal-button"><button type="button" className='text-white bg-Primary text-lg py-2 px-6 rounded-lg font-semibold'>Check Deals</button></div>
                                    </div>
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

export default AdSlider