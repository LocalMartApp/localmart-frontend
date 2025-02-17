import React , {useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import BannerSlider from './BannerSlider';
import { useNavigate } from 'react-router-dom';

// images-export
import PopServicesSlider from './PopServicesSlider';
import RechargesBlocks from './RechargesBlocks';
import ExploreCities from './ExploreCities';
import AdSlider from './AdSlider';

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
import LanSvg from '../../assets/images/language-svg.svg';
import Logo from '../../assets/images/favicon-svg.svg';
import LoginModal from './LoginModal';
import BrowseAllCategories from './BrowseAllCategories';
import Select from 'react-select';
import Modal from 'react-modal';
import LoadingImage from '../../assets/images/loader-test.gif';
import './Home.scss';
import AppsSlider from './AppsSlider';




const Home = () => {

  const navigate = useNavigate();

  const [headerBar , setHeaderBar] = useState(false);
  const [language , setLanguage] = useState(false);
  const [languageSelector , setLanguageSelector] = useState('EN');
  const [categorySelect , setCategorySelect] = useState();
  const [citySelect ,  setCitySelect] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCategoryOpen , setAllCategoryOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchSuggest , setSearchSuggest] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  
  

  const placeholders = [
    'Search for anything?',
    'Search for restaurants',
    'Search for people',
    'Search for products'
  ];





  useEffect(() => {

    setTimeout(() => {
      // openModal()
    }, 2000)

    const getUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const city = await getCityFromCoordinates(latitude, longitude);
            const matchedCity = cityOptions.find(
              (option) => option.value.toLowerCase() === city.toLowerCase()
            );
            if (matchedCity) {
              setCitySelect(matchedCity);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    getUserLocation();

    return () => clearInterval(interval);

  }, []);


  const openLoaderModal = () => {
    setIsOpen(true);
  }

  const closeLoaderModal = () => {
    setIsOpen(false)
  }


  const getCityFromCoordinates = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.state;
      return city;
    } catch (error) {
      console.error("Error fetching city from coordinates:", error);
      return null;
    }
  };

  const handleSearchNav = () => {
    openLoaderModal();
    setTimeout(() => {
      navigate('/search')
    } , 3000)
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openBrowseCategory = () => setAllCategoryOpen(true)

  const closeBrowseCategory = () =>  setAllCategoryOpen(false)


  

  const handleLanguageSelect = () => {
    setLanguage(!language)
  }


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };


  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 600) {
      setHeaderBar(true)
    }
    if(window.pageYOffset <= 500) {
      setHeaderBar(false)
    }
  });


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

  const cityOptions = [
      { value: 'Rajahmundry', label: 'Rajahmundry' },
      { value: 'Kakinada', label: 'Kakinada' },
      { value: 'Bheemavaram', label: 'Bheemavaram' },
      { value: 'Banglore', label: 'Banglore' },
      { value: 'Palakollu', label: 'Palakollu' },
      { value: 'Amalapuram', label: 'Amalapuram' },
      { value: 'Samalkot', label: 'Samalkot' },
      { value: 'Peddapuram', label: 'Peddapuram' },
      { value: 'Pithapuram', label: 'Pithapuram' },
      { value: 'Vizag', label: 'Vizag' },
      { value: 'Vizayawada', label: 'Vizayawada' },
      { value: 'Tuni', label: 'Tuni' },
  ]

  const categoryOptions = [
    { value: 'Restaurants', label: 'Restaurants' },
    { value: 'Hostels & PG’s', label: 'Hostels & PG’s' },
    { value: 'Wedding Halls', label: 'Wedding Halls' },
    { value: 'Packers & Movers', label: 'Packers & Movers' },
    { value: 'Dental Hospitals', label: 'Dental Hospitals' },
    { value: 'Hospitals', label: 'Hospitals' },
    { value: 'Gyms', label: 'Gyms' },
    { value: 'Courier Services', label: 'Courier Services' },
    { value: 'Hotel Rooms', label: 'Hotel Rooms' },
    { value: 'Home Decors', label: 'Home Decors' },
  ]

  


  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      borderRadius: 20
    },
  };





  return (
    <div className="Home relative">
      <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
          
      >
        <img src={LoadingImage} className='w-full h-full max-w-[500px] max-h-[500px] mx-auto' alt="" />
        {/* <button type="button" className='text-Black font-medium text-lg' onClick={closeLoaderModal}>Close MODAL</button> */}
      </Modal>
      <div className="main-home-section">
        <div className="home-login-main-top-modal-section">
          <LoginModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
        <div className={`top-fixed-header-section hidden fixed left-0 w-full z-[99] shadow-customized duration-500 ${headerBar ? '-top-0 opacity-100 hidden' : '-top-full opacity-0'}`}>
          <div className="inner-header-section bg-white py-5">
            <div className="container">
              <div className="grid grid-cols-12 items-center">
                <div className="header-left-logo-section  text-left">
                  <div className="logo-inner-section">
                    <img src={Logo} className='max-h-[50px] w-auto' alt="" />
                  </div>
                </div>
                <div className="header-search-section col-span-6">
                  <div className="inner-seacrh-section grid grid-cols-12  bg-white border-BorderColor border  rounded-full py-1 pr-1 pl-4 justify-between">
                      <div className="col-span-5">
                          <div className="category-section flex items-center gap-2">
                            <div className="left-category-logo-search w-[10%]">
                              <i className=" ri-map-pin-line text-Primary text-xl"></i>
                            </div>
                            <div className="right-category-dropdown-section w-[80%]">
                                {/* <button type='button'>
                                    <div className="top-section-category-select flex items-center gap-3">
                                      <p className='text-LightBlack text-sm'>Category</p>
                                      <i className="ri-arrow-down-s-line text-LightBlack"></i>
                                    </div>
                                </button> */}
                                <Select options={cityOptions} 
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
                                    value={citySelect}
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
                                {/* <button type='button'>
                                    <div className="top-section-location-select flex items-center gap-3">
                                      <p className='text-LightBlack text-sm'>Location</p>
                                      <i className="ri-arrow-down-s-line text-LightBlack"></i>
                                    </div>
                                </button> */}
                                 <Select options={categoryOptions} 
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
                                          // borderColor: state.isFocused ? 'grey' : 'red',
                                          boxShadow: state.isFocused ? 'none' : 'none',
                                        }), 
                                      }}
                                      value={categorySelect}
                                    onChange={(option) => setCategorySelect(option)}
                                />
                            </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                          <div className="cate-loc-search-btn h-full w-full">
                            <button type="button" onClick={handleSearchNav} className='bg-Primary duration-300 h-full hover:scale-95 rounded-full py-1 flex items-center w-full justify-center shadow-customized'>
                              <i className="text-white text-lg ri-search-line"></i>
                            </button>
                          </div>
                      </div>
                  </div>
                </div>
                <div className="header-buttons-sections col-span-5">
                  <div className="flex items-center gap-8 justify-end">
                    <div className="notification-header-button rounded-full">
                      <button type='button' className=' bg-none w-10 h-10 flex items-center justify-center'>
                        <i className="bi bi-bell text-xl text-Primary"></i>
                      </button>
                    </div>
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
                      <button type="button" className='flex items-center gap-3'>
                      <i className="ri-megaphone-line text-Black"></i>
                        <p className='text-Black text-lg font-medium'>Advertise</p>
                      </button>
                    </div>
                    <div className="login-button-header">
                      <button type="button" onClick={() => navigate('/login')} className='bg-Primary h-10 px-3 overflow-hidden rounded-full flex items-center gap-2 min-w-[190px] justify-center'>
                        <i className="ri-login-circle-fill text-white text-lg"></i>
                        <p className='text-white font-medium text-lg'>Login | Signup</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inner-home-section">
          <section className="home-section-1 relative">
            <div className="inner-home-section-1 bg-BlockBlack">
              <div className="container">
                <div className={`top-main-search-section-home duration-500 z-[9999] ${headerBar ? 'fixed top-0 w-full bg-BlockBlack left-0 py-6 px-[15px]' : ' pb-16'}`}>
                    <div className="inner-search-relative-section-home relative">
                    <div className="search-grid-section-home-main">
                      <div className="search-grid-container-main">
                        <div className="grid grid-cols-10 justify-center gap-x-6 top-search-section-grid-parent">
                          <div className="col-span-3">
                            <div className={`location-setting-section grid items-center grid-cols-6 gap-x-4 w-full bg-white rounded-full px-5 h-70p ${headerBar ? 'shadow-xl' : ''}`}>
                              <div className="icon-section">
                                <i className='ri-map-pin-fill text-2xl text-Secondary'></i>
                              </div>
                              <div className="country-selection col-span-5">
                                <Select options={cityOptions} 
                                  placeholder='Choose Location'
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
                                        fontSize: 18,
                                        minWidth: '100%',
                                        // borderColor: state.isFocused ? 'grey' : 'red',
                                        boxShadow: state.isFocused ? 'none' : 'none',
                                        
                                      }),
                                    }}
                                  value={citySelect}
                                  onChange={(option) => setCitySelect(option)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={`col-span-7 ${headerBar ? 'shadow-xl' : ''}`}>
                            <div className={`big-search-section duration-500 bg-white p-[6px] h-70p relative ${searchSuggest ? 'rounded-t-30p rounded-b-0' : 'rounded-40p'}`}>
                                <div className="grid grid-cols-10 h-full">
                                  <div className="col-span-8">
                                    <div className="main-search-input-section h-full relative">
                                      <input type="text" onFocus={() => setSearchSuggest(true)} placeholder={placeholders[currentIndex]} name="" id=""  className='text-xl text-Black h-full max-h-[58px] font-medium pl-9 pr-5 w-full bg-transparent focus:outline-none focus:border-none outline-none border-none'/>
                                      {searchSuggest ? <button type="button" onClick={() => setSearchSuggest(false)} className='absolute top-1/2 right-10 text-xl search-clear-icon'><i className="ri-close-large-fill text-red-400"></i></button> : null}
                                    </div>
                                  </div>
                                  <div className="col-span-2">
                                    <div className="cate-loc-search-btn h-full w-full">
                                      <button type="button"  onClick={handleSearchNav} className='bg-Primary duration-300 hover:scale-95 rounded-full h-full max-h-[58px] flex items-center w-full justify-center shadow-customized'>
                                        <p className='text-white  font-medium'>Search</p>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className={`absolute-searched-results-section bg-white rounded-b-30p absolute w-full h-[300px] border-t border-BorderColor left-0 z-[9999999] duration-500 ${searchSuggest ? 'opacity-100 visible translate-y-[5px]' : 'invisible opacity-0 translate-y-6'} ${headerBar ? 'border-[2px] border-t-[1px] border-BorderColor' : ''}`}>
                                    <div className="inner-searched-results-section">
                                      
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                </div>
                <section className="home-section-5-mobile-view ">
                  <div className="inner-home-section-5">
                    <div className="">
                        <div className="main-categories-home-sec-5">
                            <div className="top-heading-part-categories flex flex-wrap justify-between gap-x-10 items-center mb-10">
                                <div className="left-categories-heading-home">
                                    <h2 className='text-30 text-white font-medium'>Explore Wide Range Categories</h2>
                                </div>
                                <div className="explore-all-cates-button">
                                    <button type="button" onClick={openBrowseCategory} className='explore-cities-button-prev'>
                                      <p className='text-Secondary text-lg font-medium'>Browse All</p>
                                    </button>
                                </div>
                            </div>
                            <div className="bottom-all-categories-section">
                                <div className="grid grid-cols-4 gap-x-10p gap-y-60p home-categories-grid-section">
                                  {allCategories.map((items , index) => {
                                    return (
                                      <button type='button' key={index} className="single-recharge-component-home-sec-2 group flex flex-col justify-center items-center gap-2">
                                          <div className="top-image-blk  w-40p h-40p flex items-center justify-center">
                                              <img src={items.icon} className='duration-500 w-full group-hover:scale-125' alt="" />
                                          </div>
                                          <div className="bottom-text-blk">
                                              <p className='text-white text-center text-xs'>{items.title}</p>
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
                <div className="top-slider-search-section">
                  <div className="grid grid-cols-2 gap-x-16 items-center top-slider-grid-sec">
                    <div className="left-home-section-1">
                      <div className="heading-section-1 flex flex-col gap-5">
                        <h1 className='text-white font-semibold text-50'>Find Everything <br /> You Need, Every Day!</h1>
                        <p className='text-white text-xl'>Looking for deals, services, or a place to <br /> buy and sell? We’ve got you covered.</p>
                      </div>
                      {/* <div className={`home-search-section-1 mt-14 `}>
                        <div className="inner-seacrh-section grid grid-cols-12 bg-white rounded-full p-3 pl-5 justify-between">
                            <div className="col-span-5">
                                <div className="category-section flex items-center gap-2">
                                  <div className="left-category-logo-search w-[10%]">
                                    <i className="ri-map-pin-line text-Primary text-2xl"></i>
                                  </div>
                                  <div className="right-category-dropdown-section w-[80%]">
                                      <div>
                                          <Select options={cityOptions} 
                                              placeholder='Choose Location'
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
                                                    fontSize: 14,
                                                    // borderColor: state.isFocused ? 'grey' : 'red',
                                                    boxShadow: state.isFocused ? 'none' : 'none',
                                                  }),
                                                }}
                                              value={citySelect}
                                              onChange={(option) => setCitySelect(option)}
                                          />
                                      </div>
                                  </div>
                                </div>
                            </div>
                            <div className="col-span-5">
                                <div className="category-section flex items-center gap-2">
                                  <div className="left-category-logo-search w-[10%]">
                                    <i className="ri-file-list-3-line text-Primary text-2xl"></i>
                                  </div>
                                  <div className="right-category-dropdown-section w-[80%]">
                                      <div>
                                          <Select options={categoryOptions} 
                                              placeholder='Choose Category'
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
                                                     fontSize: 14,
                                                    boxShadow: state.isFocused ? 'none' : 'none',

                                                  }),
                                                }}
                                              value={categorySelect}
                                              onChange={(option) => setCategorySelect(option)}
                                          />
                                      </div>
                                  </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="cate-loc-search-btn h-full w-full">
                                  <button type="button"  onClick={handleSearchNav} className='bg-Primary duration-300 hover:scale-95 rounded-full h-full flex items-center w-full justify-center shadow-customized'>
                                    <p className='text-white  font-medium'>Search</p>
                                  </button>
                                </div>
                            </div>
                        </div>
                      </div> */}
                    </div>
                    <div className="right-home-section-1">
                      <BannerSlider/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-apps-home-section-1 mt-16">
                  <AppsSlider/>
                </div>
            </div>
            <div className="inner-home-section-2">
              <div className="container">
                <PopServicesSlider/>
              </div>
            </div>
          </section>
          <section className="home-section-2">
            <div className="inner-home-section-2">
              <RechargesBlocks/>
            </div>              
          </section>
          <section className="home-section-3">
            <div className="inner-home-section-3">
              <div className="container">
                  <ExploreCities/>
              </div>
            </div>
          </section>
          <section className="home-section-4">
            <div className="inner-home-section-4">
              <AdSlider/> 
            </div>
          </section>
          <section className="home-section-5">
            <div className="inner-home-section-5">
              <div className="container">
                  <div className="main-categories-home-sec-5">
                      <div className="top-heading-part-categories flex justify-between gap-10 items-center mb-10">
                          <div className="left-categories-heading-home">
                              <h2 className='text-30 text-white font-medium'>Explore Wide Range Categories</h2>
                          </div>
                          <div className="explore-all-cates-button">
                              <button type="button" onClick={openBrowseCategory} className='explore-cities-button-prev shadow-customized bg-white px-5 py-2 rounded-full flex items-center gap-10p border-LightBlack border-opacity-40 border'>
                                <i className="ri-menu-3-line text-Primary text-2xl"></i>
                                <p className='text-Primary text-lg font-medium'>Browse All</p>
                              </button>
                          </div>
                      </div>
                      <div className="bottom-all-categories-section">
                          <div className="grid grid-cols-6 gap-x-90p gap-y-60p home-categories-grid-section">
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
        </div>
      </div>
      <div className="browse-all-categories-fixed-section">
          <BrowseAllCategories isCategoryOpen={allCategoryOpen} closeCategory={closeBrowseCategory} />
      </div>
    </div>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
