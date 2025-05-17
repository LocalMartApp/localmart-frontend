import axios from 'axios';
import React, { useState , useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { config } from '../../env-services';

const MarqueeSlider = () => {

    const [scrollAdds , setScrolAdds] = useState([]);


    useEffect(() => {
      getAllScrollingAdds()
    }, [])

    const getAllScrollingAdds = async () => {
        await axios.get(config.api + `admin/advertisements/scrolling?page=1&limit=20`)
        .then((response) => {
            console.log(response , "Scrolling advertsiement resposne")
            setScrolAdds(response?.data?.data)
        })
    }



    const marqueeSlider = [
        {
            name: 'Visit Restaurants for best offers today in your location'
        },
        {
            name: 'Best Deals on Shopping - Visit Online Shopping'
        },
        {
            name: 'Visit Restaurants for best offers today in your location'
        },
        {
            name: 'Best Deals on Shopping - Visit Online Shopping'
        },
        {
            name: 'Visit Restaurants for best offers today in your location'
        },
        {
            name: 'Best Deals on Shopping - Visit Online Shopping'
        },
        {
            name: 'Visit Restaurants for best offers today in your location'
        },
      ]

  return (
    <div className="main-marquee-header-sec">
        <div className="inner-header-marquee-section bg-Secondary py-3">
            <Marquee
              gradient={false}
              gradientColor={'#181818'}
              gradientWidth={200}
              pauseOnHover
            >
              {scrollAdds && scrollAdds.length > 0 ?  scrollAdds.map((scrolls , index) => {
                return (
                  <div className="content-marquee" key={index}>
                    <div className='marquee-item-name-section flex items-center'>
                        <div className="dot-section-marquee mx-6">
                            <h4 className='text-white text-xl'>•</h4>
                        </div>
                        <button className='text-white font-medium' onClick={() => window.open(scrolls?.advertisementLink , '_blank')}>{scrolls?.message}</button>
                    </div>
                  </div>
                )
              }) : 
               marqueeSlider.map((items , index) => {
                return (
                  <div className="content-marquee" key={index}>
                    <div className='marquee-item-name-section flex items-center'>
                        <div className="dot-section-marquee mx-6">
                            <h4 className='text-white text-xl'>•</h4>
                        </div>
                        <h4 className='text-white font-medium'>{items.name}</h4>
                    </div>
                  </div>
                )
              })
              }
            </Marquee>
        </div>
    </div>
  )
}

export default MarqueeSlider