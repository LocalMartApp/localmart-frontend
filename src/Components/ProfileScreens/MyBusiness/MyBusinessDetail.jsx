import React , {useState , useEffect}from "react";
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import SingleSearchImage1 from '../../../assets/images/restaurant-pics-search-1.jpg';
import SingleSearchImage2 from '../../../assets/images/restaurant-pics-search-2.jpg';
import SingleSearchImage3 from '../../../assets/images/restaurant-pics-search-3.jpg';
import BusinessOwner from '../../../assets/images/business-owner-pic.jpg';
import GmailIcon from '../../../assets/images/gmail-icon.svg';
import VegIcon from '../../../assets/images/veg-icon.svg';
import NonVegIcon from '../../../assets/images/non-veg-icon.svg';
import './MyBusiness.scss'

import Modal from "react-modal";
import Loader from "../../../utils/Loader/Loader";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay , Navigation , Pagination} from 'swiper/modules';
import EmptyImage from '../../../assets/images/empty-image-bg.jpg';

import "swiper/css";
import "swiper/css/effect-coverflow";


// Sharing-images
import FacebookShare from '../../../assets/images/facebook-share.svg';
import InstagramShare from '../../../assets/images/instagram-share.svg';
import WhatsappShare from '../../../assets/images/whatsapp-share.svg';
import TelegramShare from '../../../assets/images/telegram-share.svg';
import axios from "axios";
import { config } from "../../../env-services";



const MyBusinessDetail = () => {




  const {id} = useParams();
  
    // console.log(id , "receivd if")


  const location = useLocation();

  const receivedData = location.state?.items || '';

  const [rating  , setRating] = useState();
  const [shareModalOpen , setShareModalOpen] = useState(false);


    const [userToken , setUserToken] = useState('');
    const [allBusinesses , setAllBusinesses] = useState([]);
    const [singleBusiness , setSingleBusiness] = useState('');
    const [modalIsOpen ,  setModalIsOpen] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        await getUserDetails();
      };
      fetchData();
    }, []);
  
        
      const getUserDetails = async () => {
        const response = localStorage.getItem("authToken");
        if (!response) return;
  
        const userParse = JSON.parse(response);
        setUserToken(userParse);
        getBusinessData(userParse)
      };
  


  // console.log("singleBusiness" , singleBusiness)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      borderRadius: 18,
      paddingLeft: 40
    },
};

  const customStyles2 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      borderRadius: 18,
      paddingLeft: 20,
    },
  };


  const amenities = [
    {
      icon: 'ri-wifi-line',
      title: 'Free Wifi'
    },
    {
      icon: 'ri-snowflake-line',
      title: 'Air Conditioning'
    },
    {
      icon: 'ri-parking-box-line',
      title: 'Free Parking'
    },
  ]



  
  const getBusinessData = async(token) => {
    setModalIsOpen(true)
    if (!token) return; 
    try {
      await axios.get(`${config.api}business/${id}` , {
        headers: {
            "Authorization": "Bearer " +  token ,
            "content-type": "application/json"
        }
    })
    .then(response => {
      console.log(response)
      setModalIsOpen(false)
      setSingleBusiness(response?.data?.data)
    })
    .catch((err) => {
      setModalIsOpen(false)
      console.log(err)
    })
    }catch (error) {
      setModalIsOpen(false)
      console.log(error)
    }
  }


  // const businessPhotos = [
  //   {
  //     image: singleBusiness?.mediaFiles ? singleBusiness?.mediaFiles[0]?.fileUrl : EmptyImage
  //   },
  //   {
  //     image: singleBusiness?.mediaFiles ? singleBusiness?.mediaFiles[1]?.fileUrl : EmptyImage
  //   },
  //   {
  //     image: singleBusiness?.mediaFiles ? singleBusiness?.mediaFiles[0]?.fileUrl : EmptyImage
  //   },
  //   {
  //     image: singleBusiness?.mediaFiles ? singleBusiness?.mediaFiles[1]?.fileUrl : EmptyImage
  //   },
  //   {
  //     image: singleBusiness?.mediaFiles ? singleBusiness?.mediaFiles[0]?.fileUrl : EmptyImage
  //   },
  //   {
  //     image: singleBusiness?.mediaFiles ? singleBusiness?.mediaFiles[1]?.fileUrl : EmptyImage
  //   },
  //   {
  //     image: singleBusiness?.mediaFiles ? singleBusiness?.mediaFiles[0]?.fileUrl : EmptyImage
  //   },
  //   {
  //     image: singleBusiness?.mediaFiles ? singleBusiness?.mediaFiles[1]?.fileUrl : EmptyImage
  //   },

  // ]

  const foodItems = [
    {
      title: 'Mixed Vegetable Biryani',
      veg: true,
      pirce: '₹200.00'
    },
    {
      title: 'Chicken Biryani',
      veg: false,
      pirce: '350.00'
    },
    {
      title: 'Schezwan Fried Rice',
      veg: false,
      pirce: '₹460.00'
    },
    {
      title: 'Paneer Biryani',
      veg: true,
      pirce: '₹200.00'
    },
  ]



  const long = singleBusiness?.location?.coordinates[0];
  const lat = singleBusiness?.location?.coordinates[1]


  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, "_blank");
  }
      

  const productLink = ``;
  const handleCopyToClipboard = () => {
    setShareModalOpen(false)
    navigator.clipboard.writeText(productLink).then(() => {
      toast.success("Link copied!");
    });
  };
  

    const emptyImageLoop = [
      {
        image: EmptyImage
      },
      {
        image: EmptyImage
      },
      {
        image: EmptyImage
      },
      {
        image: EmptyImage
      },
    ]

  return (
    <div className='main-search-info-section'>
      <Modal
          isOpen={shareModalOpen}
          style={customStyles2}
          contentLabel="Example Modal"
      >
        <div className="share-modal-inner">
          <div className="top-share-modal-closer flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-Black">Share this place</h2>
            <button type="button" onClick={() => setShareModalOpen(false)}><i className="bi bi-x-lg text-2xl"></i></button>
          </div>
          <div className="inner-content-share">
            <div className="share-copy-link-bar flex items-center justify-between gap-4 bg-LightGrayBg rounded-xl px-5 py-3">
              <div className="left-copy-link-bar">
                  <h2 className="text-Secondary text-xl font-semibold mb-2">Copy Link</h2>
                  <p className="text-sm opacity-50 font-light">https://admin-stage.localmart.app/business</p>
              </div>
              <div className="right-copy-link-button">
                <button type="button" onClick={handleCopyToClipboard} className="w-10 h-10 rounded-full  bg-white flex items-center justify-center"><i className="ri-link text-2xl text-Secondary"></i></button>
              </div>
            </div>
            <div className="bottom-social-options flex items-center justify-center gap-10 mt-8">
              <div className="single-social-option">
                <button type="button" className="w-10 h-10">
                  <img src={FacebookShare} className="w-full h-full" alt="" />
                </button>
              </div>
              <div className="single-social-option">
                <button type="button" className="w-10 h-10">
                  <img src={WhatsappShare} className="w-full h-full" alt="" />
                </button>
              </div>
              <div className="single-social-option">
                <button type="button" className="w-10 h-10">
                  <img src={TelegramShare} className="w-full h-full" alt="" />
                </button>
              </div>
              <div className="single-social-option">
                <button type="button" className="w-10 h-10">
                  <img src={InstagramShare} className="w-full h-full" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
      >
          <Loader/>
      </Modal>
        <section className="search-info-page-section-1 pt-10 pb-6">
          <div className="inner-search-info-section-1 breadcrumb-section-search">
            <div className="container">
              <div className="breadcrum-inner-section">
                <ul className='flex items-center gap-x-2'>
                  <li><NavLink className={`text-Black `} to={'/'}>{singleBusiness?.city?.name}</NavLink></li>
                  <li><i className="ri-arrow-right-s-line"></i></li>
                  <li><p className={`text-Black `}>{singleBusiness?.name}</p></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="business-status-displayer-band mb-8">
          <div className="container">
            {singleBusiness?.status == 'in_review' ? 
            <div className="inner-business-displayer-band bg-orange-100 bg-opacity-50 px-6 py-3 rounded-xl">
              <div className="displayer-card-status flex items-center gap-4">
                <div className="left-logo-section">
                  <i className="bi bi-clock-history text-4xl text-orange-500"></i>
                </div>
                <div className="right-text-status">
                  <h4 className="text-2xl font-medium text-orange-500">Business is In-Review</h4>
                  <p className="opacity-60">Your business has been sent to our reviewer. Please be patient while the review is in progress. We will notify you once it is published</p>
                </div>
              </div>
            </div> :
            singleBusiness?.status == 'published' ? 
            <div className="inner-business-displayer-band bg-green-100 bg-opacity-50 px-6 py-3 rounded-xl">
              <div className="displayer-card-status flex items-center gap-4">
                <div className="left-logo-section">
                  <i className="bi bi-check-circle text-4xl text-green-500"></i>
                </div>
                <div className="right-text-status">
                  <h4 className="text-2xl font-medium text-green-500">Business Published </h4>
                  <p className="opacity-60">Your business has been published successfully. Now you can search this place through our localsearch</p>
                </div>
              </div>
            </div> : 
            <div className="inner-business-displayer-band bg-red-100 bg-opacity-50 px-6 py-3 rounded-xl">
              <div className="displayer-card-status flex items-center gap-4">
                <div className="left-logo-section">
                  <i className="bi bi-ban text-4xl text-red-500"></i>
                </div>
                <div className="right-text-status">
                  <h4 className="text-2xl font-medium text-red-500">Business Rejected </h4>
                  <p className="opacity-60">Your business has been Rejected by our Reviewer , Please contact us for more help</p>
                </div>
              </div>
            </div> 
            }
          </div>
        </div>
        <section className="search-info-page-section-2">
            <div className="inner-search-info-section-2">
              <div className="container">
                  <div className="top-searched-detail-rating-favorite-sec flex flex-wrap gap-y-6 items-center justify-between gap-x-5">
                    <div className="left-title-rating-search ">
                      <h4 className='text-2xl font-medium text-Black'>{singleBusiness?.name}</h4>
                      <div className="location-rating-seperate-search flex items-center gap-x-5 mt-3 flex-wrap gap-y-3">
                        <button type='button' className="business-recommended-section flex items-center gap-10p opacity-60">
                          <i className="ri-map-pin-line text-Black"></i>
                          <p className='text-sm text-LightText'>{singleBusiness?.state?.name} - {singleBusiness?.city?.name}</p>
                        </button>
                        <div className="seperator-div h-5 w-[1px] bg-Black"></div>
                        <div className="rating-review-search-text flex items-center gap-x-2">
                          <i className='ri-star-fill text-StarGold'></i>
                          <p>1407+ Ratings</p>
                        </div>
                      </div>
                    </div>
                    <div className="right-title-rating-favorite-section hidden">
                      <div className="rating-section-searched flex items-center gap-x-6 flex-wrap gap-y-3">
                        <div className="click-rate-text flex items-center gap-x-2">
                          <p>Click to Rate</p>
                          <Rating style={{ maxWidth: 130 }} items={5} value={rating} onChange={setRating}/>
                        </div>
                        <button type='button' className="click-rate-text flex items-center gap-x-2">
                          <i className='ri-heart-3-line text-xl text-red-500'></i>
                          <p>Add to favorites</p>
                        </button>
                      </div>
                    </div>
                  </div>
                <div className="photos-section-searched my-5 ">
                  {/* <div className=" grid-cols-12 gap-5 hidden">
                    <div className="col-span-6">
                      <div className="big-image-section-searched searched-image-sections h-full max-h-[360px]">
                        <img
                          src={singleBusiness?.mediaFiles[0]?.fileUrl}
                          className="h-full w-full rounded-xl object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="med-image-section-searched searched-image-sections h-full max-h-[360px]">
                        <img
                          src={singleBusiness?.mediaFiles[1]?.fileUrl}
                          className="h-full w-full object-cover rounded-xl"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-span-2 h-full max-h-[360px] flex flex-col justify-between">
                      <div className="med-image-section-searched searched-image-sections h-[48%] ">
                        <img
                          src={singleBusiness?.mediaFiles[0]?.fileUrl}
                          className="h-full w-full object-cover  rounded-xl"
                          alt=""
                        />
                      </div>
                      <div className="med-image-section-searched searched-image-sections h-[48%] ">
                        <img
                          src={singleBusiness?.mediaFiles[1]?.fileUrl}
                          className="h-full w-full object-cover  rounded-xl"
                          alt=""
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="searched-business-photos rounded-xl overflow-hidden relative">
                    <Swiper 
                        className="mySwiper"
                        grabCursor={true}
                        centeredSlides={true}
                        pagination={true}
                        slidesPerView={1}
                        speed={600}
                        loop={true}
                        initialSlide={2}
                        spaceBetween={20}
                        preventClicks={true}
                        navigation={{
                          clickable: true,
                          nextEl: '.right-side-business-photo-slide-btn',
                          prevEl: '.left-side-business-photo-slide-btn',
                      }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false
                        }}
                        modules={[ Autoplay , Navigation , Pagination]}
                    >
                                    {singleBusiness?.mediaFiles && singleBusiness?.mediaFiles.length > 0 ?  singleBusiness?.mediaFiles.map((items, index) => {
                                      return (
                                        <SwiperSlide key={index}>
                                          <div className="big-image-section-searched searched-image-sections h-[500px]">
                                            <img
                                              src={items?.fileUrl}
                                              className="h-[500px] object-cover flex"
                                              alt=""
                                            />
                                          </div>
                                        </SwiperSlide>
                                      )
                                    }) : 
                                    emptyImageLoop.map((items , index) => {
                                      return (
                                        <SwiperSlide key={index}>
                                          <div className="big-image-section-searched searched-image-sections h-[500px]">
                                            <img
                                              src={items.image}
                                              className="h-[500px] object-cover flex"
                                              alt=""
                                            />
                                          </div>
                                        </SwiperSlide>
                                      )
                                    })
                                    }

                    </Swiper>
                    <button type="button" className='left-side-business-photo-slide-btn similar-business-media-slide-btns w-10 h-10 bg-white shadow-2xl z-[999] rounded-full flex items-center justify-center absolute left-4 top-1/2'>
                      <i className="bi bi-chevron-left text-2xl"></i>
                    </button>
                    <button type="button" className='right-side-business-photo-slide-btn similar-business-media-slide-btns w-10 h-10 bg-white shadow-2xl z-[999] rounded-full flex items-center justify-center absolute right-4 top-1/2'>
                      <i className="bi bi-chevron-right text-2xl"></i>
                    </button>
                  </div>
                </div>
                  <div className="about-business-section pb-12">
                    <div className="inner-about-business-grid-section">
                      <div className="grid grid-cols-12 gap-x-5 search-details-main-section-grid">
                        <div className="col-span-8 about-para-rating-items-section">
                          <div className="inner-about-rating-section flex flex-col gap-y-10">
                            <div className="top-about-para-section-searched">
                              <h4 className='text-20 font-medium text-Black mb-1'>About This Place</h4>
                              <p className={` opacity-70 ${singleBusiness?.about ? 'text-Black' : 'text-red-400'}`}>{singleBusiness?.about ? singleBusiness?.about : 'Not Provided'}</p>
                            </div>
                            <div className="amenities-section-searched">
                                <h4 className='text-20 font-medium text-Black mb-3'>Amenities</h4>
                                <div className="amenities-mapped-section flex items-center gap-x-30p flex-wrap gap-y-4">
                                  {singleBusiness?.amenities && singleBusiness?.amenities.length ? singleBusiness?.amenities.map((items , index) => {
                                  return (
                                    <div className="single-amenities-searched" key={index}>
                                      <div className="inner-single-amenities flex items-center gap-x-3">
                                        <div className="left-amanitie-icon px-6 py-3  rounded-full flex items-center justify-center bg-AmenitiesLightGray">
                                         <p className='text-Black '>{items.name}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                  }) : null}
                                </div>
                            </div>
                            <div className="food-items-section-searched hidden">
                                <div className="food-items-slider">
                                  <div className="food-items-section flex justify-between gap-10 items-center mb-3">
                                      <div className="food-items-heading">
                                        <h4 className='text-20 font-medium text-Black'>Food Items</h4>
                                      </div>
                                      <div className="food-items-sliding-buttons  items-center gap-7 hidden">
                                          <button type="button" className='food-items-button-prev w-8 h-8 rounded-full bg-Secondary bg-opacity-10 '><i className="ri-arrow-left-s-line text-Secondary text-2xl"></i></button>
                                          <button type="button" className='food-items-button-next w-8 h-8 rounded-full bg-Secondary bg-opacity-10'><i className="ri-arrow-right-s-line text-Secondary text-2xl"></i></button>
                                      </div>
                                  </div>
                                  <div className="food-items-bottom-slider-section hidden">
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
                                              nextEl: '.food-items-button-next',
                                              prevEl: '.food-items-button-prev',
                                          }}
                                          autoplay={{
                                              delay: 2500,
                                              disableOnInteraction: false
                                          }}
                                          modules={[ Autoplay , Navigation]}
                                      >
                                          {foodItems.map((items , index) => {
                                              return (
                                                  <SwiperSlide key={index}>
                                                      <div className="single-food-item-searched bg-AddressCard rounded-lg p-3">
                                                        <div className="top-veg-nonveg-part flex items-center gap-x-2">
                                                            <img src={items.veg ? VegIcon : NonVegIcon} className='w-[14px] h-[14px]' alt="" />
                                                            <p className='text-Black'>{items.title}</p>
                                                        </div>  
                                                        <div className="bottom-price-section mt-3">
                                                          <h4 className='text-Black font-medium'>{items.pirce} / <span className='text-sm opacity-50'>person</span></h4>
                                                        </div>
                                                      </div>
                                                  </SwiperSlide>
                                              )
                                          })}
                                      </Swiper>
                                  </div>
                                  <div className="food-items-bottom-slider-section  grid grid-cols-3 gap-4">
                                      {foodItems.map((items , index) => {
                                          return (
                                              <div className="single-food-item-searched bg-AddressCard rounded-lg p-3" key={index}>
                                                <div className="top-veg-nonveg-part flex items-center gap-x-2">
                                                    <img src={items.veg ? VegIcon : NonVegIcon} className='w-[14px] h-[14px]' alt="" />
                                                    <p className='text-Black'>{items.title}</p>
                                                </div>  
                                                <div className="bottom-price-section mt-3">
                                                  <h4 className='text-Black font-medium'>{items.pirce} / <span className='text-sm opacity-50'>person</span></h4>
                                                </div>
                                              </div>
                                          )
                                      })}
                                  </div>                                    
                                </div>
                            </div>
                            <div className="rating-section-searched">
                              <div className="rating-searched-section flex justify-between gap-10 items-center mb-4">
                                  <div className="rating-searched-heading">
                                    <h4 className='text-20 font-medium text-Black'>All Reviews & Ratings <span className="font-light opacity-60">(43)</span></h4>
                                  </div>
                              </div>
                              <div className="rating-searched-bottom-slider-section grid grid-cols-12 gap-5">
                                {foodItems.map((items , index) => {
                                    return (
                                      <div className="single-rating-profile col-span-6 border-Black border-opacity-20 border rounded-2xl p-5" key={index}>
                                        <div className="right-text-rating-profile mb-2">
                                          <div className="five-stars-section flex items-center gap-x-1">
                                            <i className='ri-star-fill text-lg text-StarGold'></i>
                                            <i className='ri-star-fill text-lg text-StarGold'></i>
                                            <i className='ri-star-fill text-lg text-StarGold'></i>
                                            <i className='ri-star-fill text-lg text-StarGold'></i>
                                            <i className='ri-star-fill text-lg text-StarGold'></i>
                                          </div>
                                          <h4 className='font-medium text-Black text-xl'>SM. Srinivas Kiran</h4>
                                        </div>
                                        <p className="text-Black font-light opacity-60">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer</p>
                                        <p className="text-sm font-medium mt-2 opacity-50">Posted on : 25 Mar 2025</p>
                                      </div>
                                    )
                                })}
                              </div>   
                            </div>
                          </div>
                        </div>
                        <div className="col-span-4 business-contact-details-right">
                          <div className="inner-business-contact-details-right bg-white border border-BorderColor  border-opacity-30 rounded-2xl shadow-xl px-5 py-6 sticky top-10">
                              <div className="top-contact-number-section pb-[18px] border-b border-BorderColor border-opacity-50">
                                <div className="contatc-info-head mb-3">
                                  <h2 className='text-20 font-medium text-Black'>Contact Information</h2>
                                </div>
                                <button type='button' className="number-info-section flex items-center gap-x-3 text-left">
                                  <i className='ri-phone-fill text-Secondary'></i>
                                  <p className='font-medium text-Secondary'>{singleBusiness?.mobileNumber}</p>
                                </button>
                              </div>
                              <div className="address-info-section py-5 border-b border-BorderColor border-opacity-50">
                                <h4 className='text-lg font-medium text-Black mb-2'>Address</h4>
                                <p className='text-Black opacity-40'>{singleBusiness?.completeAddress}</p>
                                <div className="directions-copy-address-btns flex items-center gap-x-5 justify-between mt-4">
                                  <button  type='button' onClick={openGoogleMaps} className="direcions-btn flex items-center gap-x-3 text-left">
                                    <i className='ri-corner-up-right-line text-lg text-Secondary'></i>
                                    <p className='font-medium text-Secondary'>Get Directions</p>
                                  </button>
                                  <button type='button' className="direcions-btn flex items-center gap-x-3 text-left">
                                    <i className='ri-file-copy-line text-lg text-Secondary'></i>
                                    <p className='font-medium text-Secondary'>Copy Address</p>
                                  </button>
                                </div>
                              </div>
                              <div className="opens-share-place-section flex flex-col gap-y-4 py-5 ">
                                  <div className="opens-outer-sec flex items-center gap-x-3 text-left">
                                    <i className='ri-timer-line text-lg text-Secondary'></i>
                                    <p className='font-medium text-Black'><span className='text-Green'>{singleBusiness?.workingHours}</span></p>
                                  </div>
                                  <button type='button' onClick={() => setShareModalOpen(true)} className="share-place-btn flex items-center gap-x-3 text-left">
                                    <i className='ri-share-fill text-lg text-Secondary'></i>
                                    <p className='font-medium text-Secondary'>Share this place</p>
                                  </button>
                              </div>
                              <div className="click-rate-right-column-sec pt-5 hidden">
                                <div className="click-rate-text flex items-center justify-between gap-x-2">
                                  <p>Rate this place</p>
                                  <Rating style={{ maxWidth: 130 }} items={5} value={rating} onChange={setRating}/>
                                </div>
                              </div>
                          </div>
                          <div className="share-section-popup">
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </section>
    </div>
  );
};

export default MyBusinessDetail;
