import React from 'react';
import PropTypes from 'prop-types';
import './ProfileSideBar.scss';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay , Navigation , Pagination } from 'swiper/modules';

import "swiper/css";
import { useAuth } from '../../utils/AuthContext';


const ProfileSideBar = () => {


  const {authToken , logout} = useAuth()
  
  const navigationLinks = [
    {
      title: 'My Profile',
      link: '/profile/my-profile',
      button: false,
    },
    {
      title: 'Notifications',
      link: '/coming-soon',
      button: false,
    },
    {
      title: 'Addresses',
      link: '/profile/my-addresses',
      button: false,
    },
    {
      title: 'My Favorites',
      link: '/profile/my-favourites',
      button: false,
    },
    {
      title: 'My Businesses',
      link: '/profile/my-businesess',
      button: false,
    },
    {
      title: 'My Transactions',
      link: '/coming-soon',
      button: false,
    },
    {
      title: 'Change Password',
      link: '/coming-soon',
      button: false,
    },
    {
      title: 'Feedback',
      link: '/coming-soon',
      button: false,
    },
    // {
    //   title: 'Help',
    //   link: '/help',
    //   button: false,
    // },
    {
      title: 'Log Out',
      link: '/',
      button: true,
      onclick: logout
    },
  ]

  return (
    <div className="ProfileSideBar">
      <div className="inner-sidebar-section">
        <div className="sidebar-navigation-part">
          <nav>
            <ul className='flex flex-col gap-4'>
              {navigationLinks.map((items , index) => {
                return (
                  <li className="single-navigator-sidebar" key={index}>
                    <NavLink className='py-2 px-4 duration-300 hover:text-Primary text-Black' to={items.link} onClick={items.onclick}>{items.title}</NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="side-bar-nav-part-after-991">
          <div className="inner-after-991-part-sidebar relative">
            <button type="button" className='menu-button-prev absolute -left-3  top-1 z-10'><i className="ri-arrow-left-s-line text-Black text-2xl"></i></button>
            <button type="button" className='menu-button-next absolute -right-3 top-1 z-10'><i className="ri-arrow-right-s-line text-Black text-2xl"></i></button>
            <Swiper 
              className="mySwiper"
              grabCursor={true}
              centeredSlides={false}
              pagination={true}
              slidesPerView={6}
              speed={600}
              loop={true}
              initialSlide={2}
              spaceBetween={20}
              preventClicks={false}
              navigation={{
                clickable: true,
                nextEl: '.menu-button-next',
                prevEl: '.menu-button-prev',
              }}
              breakpoints={{
                2000: {
                    slidesPerView: 6,
                    
                },
                1700 : {
                    slidesPerView: 5
                },
                1200: {
                    slidesPerView: 5
                },
                992: {
                    slidesPerView: 4
                },
                674: {
                    slidesPerView: 4
                },
                375: {
                    slidesPerView: 2,
                },
                75: {
                    slidesPerView: 1
                }
            }}
            modules={[ Navigation , Pagination]}
          >
              {navigationLinks.map((items , index) => {
                  return (
                      <SwiperSlide key={index}>
                        <li className="single-navigator-sidebar" key={index}>
                          <NavLink className='py-2 px-4 duration-300 hover:text-Primary text-Black' to={items.link}  onClick={items.onclick}>{items.title}</NavLink>
                        </li>
                      </SwiperSlide>
                  )
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileSideBar.propTypes = {};

ProfileSideBar.defaultProps = {};

export default ProfileSideBar;
