import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import Logo from '../../assets/images/logo-svg.svg';
import LanSvg from '../../assets/images/language-svg.svg'
import MarqueeSlider from './MarqueeSlider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useAuth } from '../../utils/AuthContext';

import ProfileDummyImg from '../../assets/images/profile-dummy-image.svg';
import axios from 'axios';
import { config } from '../../env-services';



const Header = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { authToken, logout , userData } = useAuth();

  // console.log(location)


  const [language , setLanguage] = useState(false);
  const [languageSelector , setLanguageSelector] = useState('EN');
  const [categorySelect , setCategorySelect] = useState();
  const [citySelect ,  setCitySelect] = useState();
  const [notificationToggle , setNotificationToggle] = useState(false);
  const [mobileMenu , setMobileMenu] = useState(false)

  const [userToken ,  setUserToken] = useState();
  // const [userData , setUserData] = useState("");


    // useEffect(() => {
    //   getUserDetails()
    // } , [])
    


  // const getUserDetails = async () => {
  //   const response = localStorage.getItem("authToken");
  //   if (!response) return;
  
  //   const userParse = JSON.parse(response);
  //   setUserToken(userParse);
  //   getPorfileData(userParse);
  // };


  const handleLanguageSelect = () => {
    setLanguage(!language)
  }





  const options = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]


  
//   const getPorfileData = async(token) => {
//     await axios.get(`${config.api}auth/user-details`, {
//       headers: {
//         Authorization: "Bearer " + token, 
//         "content-type": "application/json"
//       },
//     }).then((response) => {
//       setUserData(response?.data?.data)
//     }).catch((err) => {
//       // console.log(err)
//     })
// }



  return (
    <div className="Header">
      <div className="main-header-section">
        <header>
          <div className="inner-header-section bg-white py-5">
            <div className="container">
              <div className={`grid grid-cols-7 items-center`}>
                <div className="header-left-logo-section col-span-1 text-left">
                    <button className="logo-inner-section scale-100" onClick={() => navigate('/')}>
                      <img src={Logo} className='max-h-[50px] w-auto' alt="" />
                    </button>
                </div>
                <div className="header-search-section col-span-3 ">
                {location.pathname !== "/" && (
                  <div className="inner-seacrh-section hidden grid-cols-12  bg-white border-BorderColor border  rounded-full py-1 pr-1 pl-4 justify-between">
                      <div className="col-span-5">
                          <div className="category-section flex items-center gap-2">
                            <div className="left-category-logo-search w-[10%]">
                              <i className=" ri-map-pin-line text-Primary text-xl"></i>
                            </div>
                            <div className="right-category-dropdown-section w-[80%]">
                                <Select options={options} 
                                    placeholder='City'
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: 10,
                                          paddingLeft: 0,
                                          paddingTop: 4,
                                          paddingBottom: 4,
                                          borderWidth: 0,
                                          outlineWidth: 0,
                                          boxShadow: state.isFocused ? 'none' : 'none',

                                        }),
                                      }}
                                    onChange={(option) => setCitySelect(option)}
                                />
                            </div>
                          </div>
                      </div>
                      <div className="col-span-5">
                        <div className="location-section flex items-center gap-2">
                            <div className="left-location-logo-search w-[10%]">
                              <i className="ri-file-list-3-line text-Primary text-xl"></i>
                            </div>
                            <div className="right-location-dropdown-section w-[80%]">
                                  <Select options={options} 
                                    placeholder='Category'
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: 10,
                                          paddingLeft: 0,
                                          paddingTop: 4,
                                          paddingBottom: 4,
                                          borderWidth: 0,
                                          outlineWidth: 0,
                                          borderColor: '#fff',
                                          outlineColor: '#fff',
                                          boxShadow: state.isFocused ? 'none' : 'none',
                                        }),
                                      }}
                                    onChange={(option) => setCategorySelect(option)}
                                />
                            </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                          <div className="cate-loc-search-btn h-full w-full">
                            <button type="button" className='bg-Primary duration-300 h-full hover:scale-95 rounded-full py-1 flex items-center w-full justify-center shadow-customized'>
                              <i className="text-white text-lg ri-search-line"></i>
                            </button>
                          </div>
                      </div>
                  </div>
                )}
                </div>
                <div className={`header-buttons-sections col-span-3`}>
                  <div className="flex items-center gap-8 justify-end">
                    {location.pathname == "/" && (
                    <div className="notification-header-button rounded-full relative">
                      <button type='button' className=' bg-none w-10 h-10 flex items-center justify-center' onClick={() => setNotificationToggle(!notificationToggle)}>
                        <i className="bi bi-bell text-xl text-Primary"></i>
                      </button>
                      <div className={`notifications-main-absolute-section shadow-xl z-10 rounded-xl border border-BorderColor absolute p-5 bg-white top-[50px] right-0 w-[380px] duration-300 ${notificationToggle ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-6 opacity-0'}`}>
                        <div className="inner-notifications-section-flexer flex items-center flex-col gap-y-4">
                          <div className="inner-notifications-single flex gap-x-5">
                            <div className="left-notifi-title-head">
                              <h4 className='text-Black font-medium text-lg'>Profile Created</h4>
                              <p className='text-sm'>Your profile has been cretaed successfully</p>
                            </div>
                            <div className="right-notifi-time-stamp-sec">
                              <p className='text-xs text-Black opacity-50 italic'>30/01/2025</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                    <div className={`language-selection-header relative duration-300 ${language ? 'rounded-xl rounded-b-none ' : 'rounded-[20px]'}`}>
                      <button type="button" className='flex items-center gap-1 h-10 px-3 ' onClick={handleLanguageSelect}>
                        <img src={LanSvg} className='max-w-[18px] min-w-[18px]' alt="" />
                        <p className='text-Black'>{languageSelector}</p>
                        <i className={`bi bi-chevron-down duration-300 ${language ? 'rotate-180' : 'rotate-0'}`}></i>
                      </button>
                      <div className={`bottom-languages-button z-10 flex-col py-2 flex gap-2 absolute bg-white outline outline-BorderColor outline-1 w-full rounded-b-xl duration-500 ${language ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <button type="button" className='py-1 text-center ' onClick={() => {setLanguageSelector('EN') , handleLanguageSelect()}}>
                          <p className='text-Black text-center'>EN</p>
                        </button>
                        <button type="button" className='py-1 text-center ' onClick={() => {setLanguageSelector('TE') , handleLanguageSelect()}}>
                          <p className='text-Black text-center'>TE</p>
                        </button>
                        <button type="button" className='py-1 text-center ' onClick={() => {setLanguageSelector('HI') , handleLanguageSelect()}}>
                          <p className='text-Black text-center'>HI</p>
                        </button>
                      </div>
                    </div>
                    <div className="advertise-button-header">
                      <button type="button" className='flex items-center gap-3' onClick={() => navigate('/advertise')}>
                      <i className="ri-megaphone-line text-Black"></i>
                        <p className='text-Black text-lg font-medium'>Advertise</p>
                      </button>
                    </div>
                    {authToken ? 
                      <div className="profile-image-showing-button">
                        <button type="button" onClick={() => navigate('/profile/my-profile')}>
                          <img src={userData?.profilePicture ? userData?.profilePicture : ProfileDummyImg} className='w-10 h-10 rounded-full'/>
                        </button>
                      </div>
                    :  
                      <div className="login-button-header">
                        <button type="button" onClick={() => navigate('/login')} className='bg-Primary h-10 border-Primary border-2 px-3 overflow-hidden rounded-full flex items-center gap-2 min-w-[190px] justify-center duration-300 group hover:bg-transparent  '>
                          <i className="ri-login-circle-fill text-white text-lg duration-300 group-hover:text-Primary"></i>
                          <p className='text-white font-medium text-lg duration-300 group-hover:text-Primary'>Login | Signup</p>
                        </button>
                      </div>
                    }
                    
                  </div>
                </div>
                <div className="header-mobile-menu-section text-center">
                  <button type="button" className='duration-300' onClick={() => setMobileMenu(true)}>
                    <i className="text-3xl ri-menu-3-line "></i>
                  </button>
                </div>
                <div className={`fixed-mobile-menu-section fixed z-[999999] top-0 h-full w-9/12 bg-white duration-300 ${mobileMenu ? 'right-0' : '-right-full'}`}>
                    <div className="inner-fixed-mobile-menu-section px-4 py-6">
                      <div className="top-backsection-mobile-menu mb-5">
                        <button type="button" onClick={() => setMobileMenu(false)} className="w-8 h-8 rounded-full flex items-center justify-center">
                          <i className="bi bi-arrow-left text-2xl"></i>
                        </button>
                      </div>
                      <div className="innermobile-header-menu">
                        {authToken ? 
                            <div className="profile-image-showing-button flex items-center bg-LightBlue flex-wrap gap-3 mb-4  border rounded-xl border-BorderColor border-opacity-55 px-3 py-3">
                              <button type="button" onClick={() => {setMobileMenu(false) , navigate('/profile/my-profile')}}>
                                <img src={userData?.profilePicture ? userData?.profilePicture : ProfileDummyImg} className='w-[60px] h-[60px] min-w-[60px] rounded-full'/>
                              </button>
                              <div className="right-email-section">
                                <p className=' font-semibold'>{userData?.firstName + " " + userData?.lastName}</p>
                                <p className='text-sm opacity-50'>{userData?.email}</p>
                              </div>
                            </div>
                          :  
                          null                 
                          }
                        <ul>
                          <li>
                            <NavLink onClick={() => setMobileMenu(false)} to={'/advertise'} className={'py-4 px-4'}>Advertise</NavLink>
                          </li>
                          <li className='border-y border-BorderColor border-opacity-50'>
                            <NavLink onClick={() => setMobileMenu(false)} to={'/businesses'} className={'py-4 px-4'}>Business</NavLink>
                          </li>
                          {!authToken ?<li>
                            <NavLink onClick={() => setMobileMenu(false)} to={'/login'} className={'py-4 px-4'}>Login</NavLink>
                          </li> : <button type='button' onClick={() => {setMobileMenu(false) , logout() } } className={'py-4 px-4 text-red-400'}>Log Out</button> }
                        </ul>
                      </div>
                    </div>
                </div>
                <button onClick={() => setMobileMenu(false)} className={`fixed-mobile-overlay-section fixed z-[99999] top-0  h-full w-full bg-black bg-opacity-20 ${mobileMenu ? 'left-0' : '-left-full'}`}>

                </button>
              </div>
            </div>
          </div>
          <div className="header-scrolling-marquee-ad">
            <MarqueeSlider/>
          </div>
        </header>
      </div>
    </div>
  );
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
