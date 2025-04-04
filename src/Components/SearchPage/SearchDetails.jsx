import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import SingleSearchImage1 from "../../assets/images/restaurant-pics-search-1.jpg";
import SingleSearchImage2 from "../../assets/images/restaurant-pics-search-2.jpg";
import SingleSearchImage3 from "../../assets/images/restaurant-pics-search-3.jpg";
import BusinessOwner from "../../assets/images/business-owner-pic.jpg";
import GmailIcon from "../../assets/images/gmail-icon.svg";
import VegIcon from "../../assets/images/veg-icon.svg";
import NonVegIcon from "../../assets/images/non-veg-icon.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Modal from "react-modal";
import Loader from "../../utils/Loader/Loader";
import toast from "react-hot-toast";

import "swiper/css";
import "swiper/css/effect-coverflow";
import axios from "axios";
import { config } from "../../env-services";
// Sharing-images
import FacebookShare from "../../assets/images/facebook-share.svg";
import InstagramShare from "../../assets/images/instagram-share.svg";
import WhatsappShare from "../../assets/images/whatsapp-share.svg";
import TelegramShare from "../../assets/images/telegram-share.svg";
import { useAuth } from "../../utils/AuthContext";
import EmptyImage from '../../assets/images/empty-image-bg.jpg';

const SearchDetails = () => {


  const { id } = useParams();
  const {authToken} = useAuth()

  // console.log("id", id);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);

  const [userToken, setUserToken] = useState("");
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [singleBusiness, setSingleBusiness] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userRating, setUserRating] = useState();
  const [reviewComments , setReviewComments] = useState(false);
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    getBusinessData();
  }, []);

  const getBusinessData = async () => {
    setModalIsOpen(true);
    try {
      await axios
        .get(`${config.api}business/${id}`, {
          headers: {
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
            "content-type": "application/json"
          }
        })
        .then((response) => {
          console.log(response);
          setModalIsOpen(false);
          setSingleBusiness(response?.data?.data);
        })
        .catch((err) => {
          setModalIsOpen(false);
          console.log(err);
        });
    } catch (error) {
      setModalIsOpen(false);
      console.log(error);
    }
  };

  // console.log(singleBusiness)
  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      borderRadius: 18,
      paddingLeft: 40,
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


  const productLink = `https://www.localmart.app/search/complete-details/${id}`;
  const handleCopyToClipboard = () => {
    setShareModalOpen(false);
    navigator.clipboard.writeText(productLink).then(() => {
      toast.success("Link copied!");
    });
  };


  const foodItems = [
    {
      title: "Mixed Vegetable Biryani",
      veg: true,
      pirce: "₹200.00",
    },
    {
      title: "Chicken Biryani",
      veg: false,
      pirce: "350.00",
    },
    {
      title: "Schezwan Fried Rice",
      veg: false,
      pirce: "₹460.00",
    },
    {
      title: "Paneer Biryani",
      veg: true,
      pirce: "₹200.00",
    },
    {
      title: "Butter Chicken",
      veg: false,
      pirce: "₹450.00",
    },
    {
      title: "Chicken Biryani",
      veg: false,
      pirce: "350.00",
    },
    {
      title: "Schezwan Fried Rice",
      veg: false,
      pirce: "₹460.00",
    },
    {
      title: "Paneer Biryani",
      veg: true,
      pirce: "₹200.00",
    },
  ];


  const long = singleBusiness?.location?.coordinates[0];
  const lat = singleBusiness?.location?.coordinates[1];

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, "_blank");
  };




  const handleAddReview = async() => {
    const obj = {
      businessId: id,
      rating: userRating,
      comment: reviewComments
    }
    setLoading(true)
    try {
      await axios.post(`${config.api}reviews` , obj , {
        headers: {
          "Authorization": "Bearer " +  authToken ,
          "content-type": "application/json"
        }
      })
      .then((response) => {
        if(response) {
            console.log(response)
            setLoading(false)
            setRatingModal(false)
            getBusinessData()
            toast.success('Review Added Successfully');
        }
      })
      .catch((err) => {
        setLoading(false)
        setRatingModal(false)
        toast.error(err?.message);
        toast.error(err?.response?.data?.message);
        console.log(err , 'error')
      });
    } catch (error) {
      setLoading(false)
      setRatingModal(false)
      console.log(error)
    }
  }


  const handleAddFavorite = async() => {
    const obj = {
      businessId: id,
    }
    setModalIsOpen(true)
    try {
      await axios.post(`${config.api}favorites` , obj , {
        headers: {
          "Authorization": "Bearer " +  authToken ,
          "content-type": "application/json"
        }
      })
      .then((response) => {
        if(response?.data?.success == true) {
            console.log(response)
            setModalIsOpen(false)
            getBusinessData()
            toast.success('Added to favorites');
        }
      })
      .catch((err) => {
        setModalIsOpen(false)
        toast.error(err?.message);
        toast.error(err?.response?.data?.message);
        console.log(err , 'error')
      });
    } catch (error) {
      setRatingModal(false)
      console.log(error)
    }
  }


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


  const formatDate = (isoString) => {
    return new Date(isoString)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
};



const shareLink = (platform) => {
  const url = `https://www.localmart.app/search/complete-details/${id}`;
  const encodedUrl = encodeURIComponent(url);

  let shareUrl = "";

  switch (platform) {
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodedUrl}`;
      break;
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${encodedUrl}`;
      break;
    case "instagram":
      shareUrl = `https://www.instagram.com/?url=${encodedUrl}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    default:
      alert("Invalid platform");
      return;
  }

  window.open(shareUrl, "_blank");
};

  return (
    <div className="main-search-info-section">
    <Modal
      isOpen={ratingModal}
      style={customStyles2}
      contentLabel="Rating Modal"
    >
      <div className="share-modal-inner">
        <div className="top-share-modal-closer flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-Black">Rate this place</h2>
          <button type="button" onClick={() => setRatingModal(false)}>
            <i className="bi bi-x-lg text-2xl"></i>
          </button>
        </div>
        <div className="inner-rating-section-modal-content">
          <div className="click-rate-text flex items-center gap-x-2">
            <p className="text-lg ">Click to Rate</p>
            <Rating
              style={{ maxWidth: 150 }}
              items={5}
              value={userRating}
              onChange={setUserRating}
            />
          </div>
          <div className="form-inputsec mt-6">
            <div className="label-section mb-1">
              <p className='text-BusinessFormLabel'>Add Your Comments</p>
            </div>
            <textarea as="textarea" name="aboutBusiness" placeholder='Enter comments about this place' onKeyUp={(e) => setReviewComments(e.target.value)}
                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 h-32 resize-none rounded-lg bg-white w-full text-Black   border-opacity-100  bg-opacity-10 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black`} 
            />                                
          </div>
          <div className="grid grid-cols-12 gap-5 mt-5">
            <div className="left-cancel-button col-span-6">
              <button type="button"  className="py-3 rounded-xl text-center w-full bg-gray-200 text-Black font-semibold" onClick={() => setRatingModal(false)}>Cancel</button>
            </div>
            <div className="right-add-review-button col-span-6">
            {loading ?   
              <button type="button" disabled={true} className="py-3 rounded-xl text-center w-full bg-Primary bg-opacity-50 text-white font-semibold">Submitting....</button> :
              <button type="button" className="py-3 rounded-xl text-center w-full bg-Primary text-white font-semibold" onClick={handleAddReview}>Submit</button>
              }
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <Modal
      isOpen={shareModalOpen}
      style={customStyles2}
      contentLabel="Example Modal"
    >
      <div className="share-modal-inner">
        <div className="top-share-modal-closer flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-Black">Share this place</h2>
          <button type="button" onClick={() => setShareModalOpen(false)}>
            <i className="bi bi-x-lg text-2xl"></i>
          </button>
        </div>
        <div className="inner-content-share">
          <div className="share-copy-link-bar flex items-center justify-between gap-4 bg-LightGrayBg rounded-xl px-5 py-3">
            <div className="left-copy-link-bar">
              <h2 className="text-Secondary text-xl font-semibold mb-2">
                Copy Link
              </h2>
              <p className="text-sm opacity-50 font-light">
                https://www.localmart.app/search/complete-details/{id}
              </p>
            </div>
            <div className="right-copy-link-button">
              <button
                type="button"
                onClick={handleCopyToClipboard}
                className="w-10 h-10 rounded-full  bg-white flex items-center justify-center"
              >
                <i className="ri-link text-2xl text-Secondary"></i>
              </button>
            </div>
          </div>
          <div className="bottom-social-options flex items-center justify-center gap-10 mt-8">
            <div className="single-social-option">
              <button type="button" className="w-10 h-10" onClick={() => shareLink('facebook')}>
                <img src={FacebookShare} className="w-full h-full" alt="" />
              </button>
            </div>
            <div className="single-social-option">
              <button type="button" className="w-10 h-10" onClick={() => shareLink('whatsapp')}>
                <img src={WhatsappShare} className="w-full h-full" alt="" />
              </button>
            </div>
            <div className="single-social-option">
              <button type="button" className="w-10 h-10" onClick={() => shareLink('telegram')}>
                <img src={TelegramShare} className="w-full h-full" alt="" />
              </button>
            </div>
            <div className="single-social-option">
              <button type="button" className="w-10 h-10" onClick={() => shareLink('instagram')}>
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
      <Loader />
    </Modal>
    <section className="search-info-page-section-1 py-10">
      <div className="inner-search-info-section-1 breadcrumb-section-search">
        <div className="container">
          <div className="breadcrum-inner-section">
            <ul className="flex items-center gap-x-2">
              <li>
                <NavLink className={`text-Black `} to={"/"}>
                  {singleBusiness?.city?.name}
                </NavLink>
              </li>
              {/* <li><i className="ri-arrow-right-s-line"></i></li>
                <li><p className={`text-Black `}>Restaurants in Mumbai</p></li>
                <li><i className="ri-arrow-right-s-line"></i></li>
                <li><p className={`text-Black `}>150+ Listings</p></li> */}
              <li>
                <i className="ri-arrow-right-s-line"></i>
              </li>
              <li>
                <p className={`text-Black `}>{singleBusiness?.name}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="search-info-page-section-2">
      <div className="inner-search-info-section-2">
        <div className="container">
          <div className="top-searched-detail-rating-favorite-sec flex flex-wrap gap-y-6 items-center justify-between gap-x-5">
            <div className="left-title-rating-search ">
              <h4 className="text-2xl font-medium text-Black">
                {singleBusiness?.name}
              </h4>
              <div className="location-rating-seperate-search flex items-center gap-x-5 mt-3 flex-wrap gap-y-3">
                <button
                  type="button"
                  className="business-recommended-section flex items-center gap-10p opacity-60"
                >
                  <i className="ri-map-pin-line text-Black"></i>
                  <p className="text-sm text-LightText">
                    {singleBusiness?.state?.name} -{" "}
                    {singleBusiness?.city?.name}
                  </p>
                </button>
                <div className="seperator-div h-5 w-[1px] bg-Black"></div>
                <div className="rating-review-search-text flex items-center gap-x-2">
                  <i className="ri-star-fill text-StarGold"></i>
                  <p>{singleBusiness?.averageRating} Ratings</p>
                </div>
              </div>
            </div>
            <div className="right-title-rating-favorite-section">
              <div className="rating-section-searched flex items-center gap-x-6 flex-wrap gap-y-3">
                <div className="click-rate-text flex items-center gap-x-2">
                  <p>{authToken ? 'Click to Rate' : 'Login To Rate This Place'}</p>
                  <Rating
                    style={{ maxWidth: 130 }}
                    items={5}
                    value={userRating}
                    onChange={() => setRatingModal(true)}
                    isDisabled={!authToken}
                  />
                </div>
                {singleBusiness?.isFavorite ? 
                    <button type="button" className="click-rate-text flex items-center gap-x-2" disabled={!authToken}>
                      <i className="ri-heart-3-fill text-xl text-red-500"></i>
                      <p>{authToken ? 'Remove From favourite' : 'Login to Access Favorites'}</p>
                    </button> :
                    <button type="button" className="click-rate-text flex items-center gap-x-2" onClick={handleAddFavorite} disabled={!authToken}>
                    <i className="ri-heart-3-line text-xl text-red-500"></i>
                    <p>{authToken ? 'Add to favorites' : 'Login to Access Favorites'}</p>
                  </button>
                }
              </div>
            </div>
          </div>
       <div className="py-5">
          <div className="searched-business-photos rounded-xl overflow-hidden relative">
            <Swiper
              className="mySwiper"
              grabCursor={true}
              draggable={false}
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
                nextEl: ".right-side-business-photo-slide-btn",
                prevEl: ".left-side-business-photo-slide-btn",
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Navigation, Pagination]}
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
            <button
              type="button"
              className="left-side-business-photo-slide-btn similar-business-media-slide-btns w-10 h-10 bg-white shadow-2xl z-[999] rounded-full flex items-center justify-center absolute left-4 top-1/2"
            >
              <i className="bi bi-chevron-left text-2xl"></i>
            </button>
            <button
              type="button"
              className="right-side-business-photo-slide-btn similar-business-media-slide-btns w-10 h-10 bg-white shadow-2xl z-[999] rounded-full flex items-center justify-center absolute right-4 top-1/2"
            >
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
                      <h4 className="text-20 font-medium text-Black mb-1">
                        About This Place
                      </h4>
                      <p className={`opacity-70 ${singleBusiness?.about ? 'text-Black' : 'text-red-500'}`}>
                        {singleBusiness?.about ? singleBusiness?.about : 'About this place is not Available right now '}
                      </p>
                    </div>
                    <div className="amenities-section-searched">
                      <h4 className="text-20 font-medium text-Black mb-3">
                        Amenities
                      </h4>
                      <div className="amenities-mapped-section flex items-center gap-x-30p flex-wrap gap-y-4">
                        {singleBusiness?.amenities &&
                        singleBusiness?.amenities.length
                          ? singleBusiness?.amenities.map((items, index) => {
                              return (
                                <div
                                  className="single-amenities-searched"
                                  key={index}
                                >
                                  <div className="inner-single-amenities flex items-center gap-x-3">
                                    <div className="left-amanitie-icon px-6 py-3  rounded-full flex items-center justify-center bg-AmenitiesLightGray">
                                      <p className="text-Black ">
                                        {items.name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>

                    <div className="rating-section-searched">
                      <div className="rating-searched-section flex justify-between gap-10 items-center mb-4">
                        <div className="rating-searched-heading">
                          <h4 className="text-20 font-medium text-Black">
                            Ratings
                          </h4>
                          <p className="text-sm text-Black opacity-50">
                            Total 305 People Rated this place
                          </p>
                        </div>
                      </div>
                      <div className="rating-searched-bottom-slider-section grid grid-cols-12 gap-5">
                        {singleBusiness?.reviews && singleBusiness?.reviews?.length > 0 ?  singleBusiness?.reviews?.map((items , index) => {
                            return (
                              <div className="single-rating-profile col-span-6 border-Black border-opacity-20 border rounded-2xl p-5" key={index}>
                              <div className="right-text-rating-profile mb-2">
                                <div className="five-stars-section flex items-center gap-x-1">
                                  {[...Array(items.rating)].map((rates , rateIndex) => {
                                    return (
                                      <i className='ri-star-fill text-lg text-StarGold' key={rateIndex}></i>
                                    )
                                  })}
                                </div>
                                <h4 className='font-medium text-Black text-xl'>{items?.userName}</h4>
                              </div>
                              <p className="text-Black font-light opacity-60">{items?.comment ? items?.comment : 'Comments not added by user'}</p>
                              <p className="text-sm font-medium mt-2 opacity-50">Posted on : {formatDate(items?.createdAt)}</p>
                          </div>
                            )
                        }) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 business-contact-details-right">
                  <div className="inner-business-contact-details-right bg-white border border-BorderColor  border-opacity-30 rounded-2xl shadow-xl px-5 py-6 sticky top-10">
                    <div className="top-contact-number-section pb-[18px] border-b border-BorderColor border-opacity-50">
                      <div className="contatc-info-head mb-3">
                        <h2 className="text-20 font-medium text-Black">
                          Contact Information
                        </h2>
                      </div>
                      <button
                        type="button"
                        className="number-info-section flex items-center gap-x-3 text-left"
                      >
                        <i className="ri-phone-fill text-Secondary"></i>
                        <p className="font-medium text-Secondary">
                          {singleBusiness?.mobileNumber}
                        </p>
                      </button>
                    </div>
                    <div className="address-info-section py-5 border-b border-BorderColor border-opacity-50">
                      <h4 className="text-lg font-medium text-Black mb-2">
                        Address
                      </h4>
                      <p className="text-Black opacity-40">
                        {singleBusiness?.completeAddress}
                      </p>
                      <div className="directions-copy-address-btns flex items-center gap-x-5 justify-between mt-4">
                        <button
                          type="button"
                          onClick={openGoogleMaps}
                          className="direcions-btn flex items-center gap-x-3 text-left"
                        >
                          <i className="ri-corner-up-right-line text-lg text-Secondary"></i>
                          <p className="font-medium text-Secondary">
                            Get Directions
                          </p>
                        </button>
                        <button
                          type="button"
                          className="direcions-btn flex items-center gap-x-3 text-left"
                        >
                          <i className="ri-file-copy-line text-lg text-Secondary"></i>
                          <p className="font-medium text-Secondary">
                            Copy Address
                          </p>
                        </button>
                      </div>
                    </div>
                    <div className="opens-share-place-section flex flex-col gap-y-4 py-5 border-b border-opacity-50 border-BorderColor">
                      <div className="opens-outer-sec flex items-center gap-x-3 text-left">
                        <i className="ri-timer-line text-lg text-Secondary"></i>
                        <p className="font-medium text-Black">
                          <span className="text-Green">
                            {singleBusiness?.workingHours}
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShareModalOpen(true)}
                        className="share-place-btn w-fit flex items-center gap-x-3 text-left"
                      >
                        <i className="ri-share-fill text-lg text-Secondary"></i>
                        <p className="font-medium text-Secondary">
                          Share this place
                        </p>
                      </button>
                    </div>
                    <div className="click-rate-right-column-sec pt-5">
                      <div className="click-rate-text flex items-center justify-between gap-x-2">
                        <p>Rate this place</p>
                        <Rating
                          style={{ maxWidth: 130 }}
                          items={5}
                          value={userRating}
                          onChange={() => setRatingModal(true)}
                        />
                      </div>
                    </div>
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

export default SearchDetails;
