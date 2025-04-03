import React, { useState } from 'react'
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const Drafts = () => {



const useSearchStore = create(
  persist(
    (set, get) => ({
      filters: {
        searchKey: "",
        city: "",
        category: "",
      },
      results: [],
      loading: false,
      error: "",
      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),
      removeFilter: (key) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: "",
          },
        })),
      fetchSearchResults: async () => {
        const { filters } = get();

        const queryParams = new URLSearchParams(filters);

        set({ loading: true, error: "" });

        try {
          // const params = new URLSearchParams(filters);

          const response = await axios.get(
            `https://stage-api.localmart.app:8443/search/businesses?${queryParams}`
          );
          set({ results: response.data.data, loading: false });
        } catch (err) {
          set({
            error: err.message || "Failed to fetch search results",
            loading: false,
          });
        }
      },
      resetFilters: () =>
        set({ filters: { searchKey: "", city: "", category: "" } }),
    }),
    {
      name: "search-store",
      getStorage: () => localStorage,
    }
  )
);

    const allCategories = [
        {
            image: PgHostel,
            rightText: "Hostels & PG's"
        },
        {
            image: Hospital,
            rightText: "Hospitals"
        },

        {
            image: HomeDecor,
            rightText: "Home Decors"
        },
        {
            image: Packers,
            rightText: "Packers&Movers"
        },
        {
            image: HotelRoom,
            rightText: "Hotels"
        },
        {
            image: Restaurants,
            rightText: "Restaurants"
        },
        {
            image: Courier,
            rightText: "Couriers"
        },
        {
            image: Gym,
            rightText: "Gym"
        },
        {
            image: Dental,
            rightText: "Dental"
        },
        {
            image: FunctionHall,
            rightText: "Function Halls"
        },
        {
            image: WeddingHall,
            rightText: "Wedding Halls"
        },
        {
            image: PetShop,
            rightText: "Pet Shop"
        },
    ]




  return (
    <div>
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


        
    </div>
  )
}

// export default Drafts























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

const SearchDetails = () => {
  // const { id } = useParams();
  // console.log("id", id);

  useEffect(() => {
  //   let options = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: `${config.api}business/${id}`,
  //     headers: {},
  //   };

  //   axios
  //     .request(options)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  alert('hi')
  }, [id]);

  // const receivedData = location.state?.item || '';

  // console.log("singleBusiness" , singleBusiness)

  const [shareModalOpen, setShareModalOpen] = useState(false);

  const [userToken, setUserToken] = useState("");
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [singleBusiness, setSingleBusiness] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rating, setRating] = useState();

  useEffect(() => {
    getBusinessData();

    
    // const fetchLocation = async () => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       async (position) => {
    //         const { latitude, longitude } = position.coords;
    //         const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

    //         try {
    //           const response = await fetch(url);
    //           const data = await response.json();

    //           if (data.status === "OK") {
    //             const addressComponents = data.results[0]?.address_components || [];
    //             const cityComponent = addressComponents.find((component) =>
    //               component.types.includes("locality")
    //             );

    //             if (cityComponent) {
    //               const userCity = cityComponent.long_name;

    //               // Find the city in cityOptions
    //               const matchedCity = cityOptions.find(
    //                 (city) => city.label.toLowerCase() === userCity?.toLowerCase()
    //               );

    //               // Only set if user hasn't changed it manually
    //               if (matchedCity) {
    //                 setCitySelect(matchedCity);
    //                 setUserCity(matchedCity)
    //               }
    //             }
    //           }
    //         } catch (error) {
    //           console.error("Error fetching location:", error);
    //         }
    //       },
    //       (error) => {
    //         console.error("Error getting location:", error);
    //       },
    //       { enableHighAccuracy: true }
    //     );
    //   } else {
    //     console.error("Geolocation is not supported by this browser.");
    //   }
    // };


    // fetchLocation();

  }, []);

  
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
    } , 2000)
  }

  const handleAreaSearchChange = () => {
    const places = inputRef.current.getPlaces();
    if (places.length > 0) {
      const suggestions = places.map((place) => {
        let sublocality = "";
        let locality = "";

        place.address_components.forEach((component) => {
          if (component.types.includes("sublocality_level_1")) {
            sublocality = component.long_name;
          } else if (component.types.includes("locality")) {
            locality = component.long_name;
          }
        });

        return `${sublocality}, ${locality}`;
      });

      setAreaSuggestions(suggestions);
      console.log("Area Suggestions:", suggestions);
    }
  };

  const getUserDetails = async () => {
    const response = localStorage.getItem("authToken");
    if (!response) return;

    const userParse = JSON.parse(response);
    setUserToken(userParse);
    // getBusinessData(userParse)
  };

  // console.log("singleBusiness" , singleBusiness)

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

  const productLink = ``;
  const handleCopyToClipboard = () => {
    setShareModalOpen(false);
    navigator.clipboard.writeText(productLink).then(() => {
      toast.success("Link copied!");
    });
  };

  const amenities = [
    {
      icon: "ri-wifi-line",
      title: "Free Wifi",
    },
    {
      icon: "ri-snowflake-line",
      title: "Air Conditioning",
    },
    {
      icon: "ri-parking-box-line",
      title: "Free Parking",
    },
  ];

  const getBusinessData = async () => {
    setModalIsOpen(true);
    // if (!token) return;
    try {
      await axios
        .get(`${config.api}business/${id}`, {
          headers: {
            // "Authorization": "Bearer " +  token ,
            "content-type": "application/json",
          },
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

  const businessPhotos = [
    {
      image: singleBusiness?.mediaFiles[0]?.fileUrl,
    },
    {
      image: singleBusiness?.mediaFiles[1]?.fileUrl,
    },
    {
      image: singleBusiness?.mediaFiles[0]?.fileUrl,
    },
    {
      image: singleBusiness?.mediaFiles[1]?.fileUrl,
    },
    {
      image: singleBusiness?.mediaFiles[0]?.fileUrl,
    },
    {
      image: singleBusiness?.mediaFiles[1]?.fileUrl,
    },
    {
      image: singleBusiness?.mediaFiles[0]?.fileUrl,
    },
    {
      image: singleBusiness?.mediaFiles[1]?.fileUrl,
    },
  ];

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

  return (
    <div className="main-search-info-section">
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
                  https://admin-stage.localmart.app/business
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
                    <p>1407+ Ratings</p>
                  </div>
                </div>
              </div>
              <div className="right-title-rating-favorite-section">
                <div className="rating-section-searched flex items-center gap-x-6 flex-wrap gap-y-3">
                  <div className="click-rate-text flex items-center gap-x-2">
                    <p>Click to Rate</p>
                    <Rating
                      style={{ maxWidth: 130 }}
                      items={5}
                      value={rating}
                      onChange={setRating}
                    />
                  </div>
                  <button
                    type="button"
                    className="click-rate-text flex items-center gap-x-2"
                  >
                    <i className="ri-heart-3-line text-xl text-red-500"></i>
                    <p>Add to favorites</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="photos-section-searched my-5 ">
              <div className=" grid-cols-12 gap-5 hidden">
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
              </div>
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
                    nextEl: ".right-side-business-photo-slide-btn",
                    prevEl: ".left-side-business-photo-slide-btn",
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Navigation, Pagination]}
                >
                  {businessPhotos.map((items, index) => {
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
                    );
                  })}
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

              <div className="business-profile-section-searched flex items-center justify-between gap-10 mt-12 ">
                <div className="left-searched-business-profile  items-center gap-2 hidden">
                  <div className="left-image-business-pro">
                    <img
                      src={BusinessOwner}
                      className="max-w-[60px] max-h-[60px] rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="right-text-business-profile">
                    <h4 className="text-lg font-semibold text-Black">
                      SM. Srinivas Kiran
                    </h4>
                    <p className="text-sm font-medium text-Black opacity-50">
                      Manager at sri Megha restaurant
                    </p>
                  </div>
                </div>
                <div className="bottom-business-card-number-det  items-center gap-x-6 hidden">
                  <div className="send-enquiry-btn">
                    <button
                      type="button"
                      className="font-medium text-white bg-Primary rounded-full py-2 px-7"
                    >
                      Send Enquiry
                    </button>
                  </div>
                  <div className="number-business-btn">
                    <button
                      type="button"
                      className="font-medium text-white bg-Green rounded-full py-2 px-7"
                    >
                      Show Number
                    </button>
                  </div>
                  <div className="directions-button-search">
                    <button className="h-9 w-9 rounded-full bg-Secondary flex items-center justify-center">
                      <i className="ri-direction-fill text-white text-lg duration-300 "></i>
                    </button>
                  </div>
                  <div className="directions-button-search">
                    <button className="h-9 w-9 rounded-full bg-LightBlue flex items-center justify-center">
                      <i className="ri-share-fill text-Secondary text-lg duration-300 "></i>
                    </button>
                  </div>
                  <div className="directions-button-search">
                    <button className="h-9 w-9 rounded-full bg-LightBlue flex items-center justify-center">
                      <img src={GmailIcon} className="w-5 h-20" alt="" />
                    </button>
                  </div>
                </div>
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
                        <p className="text-Black opacity-70">
                          Beautiful stylish and spacious 2-Bedroom, with 1 king
                          and 1 queen size bed, and 1 free parking spot plus
                          visitor parking. Located in one of the best areas of
                          Downtown Toronto, just a few minutes walk from the CN
                          tower, Rogers Stadium, Scotiabank Arena and the
                          lakeshore. The apartment is surrounded by trendy
                          restaurants, shops and venues. Close to public transit
                          and main street{" "}
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
                      <div className="food-items-section-searched">
                        <div className="food-items-slider">
                          <div className="food-items-section flex justify-between gap-10 items-center mb-3">
                            <div className="food-items-heading">
                              <h4 className="text-20 font-medium text-Black">
                                Food Items
                              </h4>
                            </div>
                            <div className="food-items-sliding-buttons  items-center gap-7 hidden">
                              <button
                                type="button"
                                className="food-items-button-prev w-8 h-8 rounded-full bg-Secondary bg-opacity-10 "
                              >
                                <i className="ri-arrow-left-s-line text-Secondary text-2xl"></i>
                              </button>
                              <button
                                type="button"
                                className="food-items-button-next w-8 h-8 rounded-full bg-Secondary bg-opacity-10"
                              >
                                <i className="ri-arrow-right-s-line text-Secondary text-2xl"></i>
                              </button>
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
                                nextEl: ".food-items-button-next",
                                prevEl: ".food-items-button-prev",
                              }}
                              autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                              }}
                              modules={[Autoplay, Navigation]}
                            >
                              {foodItems.map((items, index) => {
                                return (
                                  <SwiperSlide key={index}>
                                    <div className="single-food-item-searched bg-AddressCard rounded-lg p-3">
                                      <div className="top-veg-nonveg-part flex items-center gap-x-2">
                                        <img
                                          src={items.veg ? VegIcon : NonVegIcon}
                                          className="w-[14px] h-[14px]"
                                          alt=""
                                        />
                                        <p className="text-Black">
                                          {items.title}
                                        </p>
                                      </div>
                                      <div className="bottom-price-section mt-3">
                                        <h4 className="text-Black font-medium">
                                          {items.pirce} /{" "}
                                          <span className="text-sm opacity-50">
                                            person
                                          </span>
                                        </h4>
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                );
                              })}
                            </Swiper>
                          </div>
                          <div className="food-items-bottom-slider-section grid grid-cols-3 gap-4">
                            {foodItems.map((items, index) => {
                              return (
                                <div
                                  className="single-food-item-searched bg-AddressCard rounded-lg p-3"
                                  key={index}
                                >
                                  <div className="top-veg-nonveg-part flex items-center gap-x-2">
                                    <img
                                      src={items.veg ? VegIcon : NonVegIcon}
                                      className="w-[14px] h-[14px]"
                                      alt=""
                                    />
                                    <p className="text-Black">{items.title}</p>
                                  </div>
                                  <div className="bottom-price-section mt-3">
                                    <h4 className="text-Black font-medium">
                                      {items.pirce} /{" "}
                                      <span className="text-sm opacity-50">
                                        person
                                      </span>
                                    </h4>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
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
                        <div className="rating-searched-bottom-slider-section flex items-center flex-wrap gap-10">
                          {foodItems.map((items, index) => {
                            return (
                              <div
                                className="single-rating-profile flex items-center gap-x-2"
                                key={index}
                              >
                                <div className="left-image-rating-pro">
                                  <img
                                    src={BusinessOwner}
                                    className="max-w-[50px] max-h-[50px] rounded-full"
                                    alt=""
                                  />
                                </div>
                                <div className="right-text-rating-profile">
                                  <h4 className="font-medium text-Black">
                                    SM. Srinivas Kiran
                                  </h4>
                                  <div className="five-stars-section flex items-center gap-x-1">
                                    <i className="ri-star-fill text-StarGold"></i>
                                    <i className="ri-star-fill text-StarGold"></i>
                                    <i className="ri-star-fill text-StarGold"></i>
                                    <i className="ri-star-fill text-StarGold"></i>
                                    <i className="ri-star-fill text-StarGold"></i>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
                            value={rating}
                            onChange={setRating}
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







<>

<div className="single-form-section-business business-basic-details  rounded-[15px] hidden bg-white">
                              <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                                <h4 className="text-lg font-medium text-Secondary">
                                  Link & Information
                                </h4>
                              </div>
                              <div className="inner-fields-grid-outer-main p-6 grid grid-cols-12 gap-5 items-end">
                                <div className="form-inputsec relative col-span-6">
                                  <div className="label-section mb-1">
                                    <p className="text-BusinessFormLabel">
                                      Advertisement Title*
                                    </p>
                                  </div>
                                  <Field
                                    type="text"
                                    name="advertTitle"
                                    placeholder="Enter Advertisement Title*"
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${
                                      errors.advertTitle && touched.advertTitle
                                        ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                        : "text-Black border-LoginFormBorder placeholder:text-Black"
                                    }`}
                                  />
                                </div>
                                <div className="form-inputsec relative col-span-6">
                                  <div className="label-section mb-1">
                                    <p className="text-BusinessFormLabel">
                                      Advertisement Link*
                                    </p>
                                  </div>
                                  <Field
                                    type="text"
                                    name="advertLink"
                                    placeholder="Enter Advertisement Title*"
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${
                                      errors.advertLink && touched.advertLink
                                        ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                        : "text-Black border-LoginFormBorder placeholder:text-Black"
                                    }`}
                                  />
                                </div>
                                <div className="form-inputsec relative col-span-12">
                                  <div className="label-section mb-1">
                                    <p className="text-BusinessFormLabel">
                                      Subject*
                                    </p>
                                  </div>
                                  <Field
                                    type="text"
                                    name="subject"
                                    placeholder="Enter Complete Subject*"
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${
                                      errors.subject && touched.subject
                                        ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                        : "text-Black border-LoginFormBorder placeholder:text-Black"
                                    }`}
                                  />
                                </div>
                                <div className="form-inputsec relative col-span-12">
                                  <div className="label-section mb-1">
                                    <p className="text-BusinessFormLabel">
                                      {" "}
                                      Message*
                                    </p>
                                  </div>
                                  <Field
                                    as="textarea"
                                    name="message"
                                    placeholder="Enter Message*"
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 h-32 resize-none rounded-lg bg-white w-full text-Black  ${
                                      errors.message && touched.message
                                        ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                        : "text-Black border-LoginFormBorder placeholder:text-Black"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="single-form-section-business business-basic-details overflow-hidden hidden rounded-[15px] bg-white">
                              <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                                <h4 className="text-lg font-medium text-Secondary">
                                  Advertisement Picture
                                </h4>
                              </div>
                              <div className="inner-fields-grid-outer-main p-6 grid grid-cols-12 gap-5">
                                <div className="form-inputsec relative col-span-12">
                                  {advertImage && (
                                    <div
                                      className={`top-images-sec-uploaded-business-doc mb-5 `}
                                    >
                                      <div className="single-image-business-photo rounded-lg overflow-hidden relative">
                                        <img
                                          src={advertImgPrev}
                                          className="object-cover w-full h-56"
                                          alt=""
                                        />
                                        <button
                                          type="button"
                                          onClick={removeFile}
                                          className="py-[6px] px-6 bg-white rounded-full flex items-center justify-center absolute top-3 right-3 shadow-2xl"
                                        >
                                          <i className="ri-close-large-fill text-red-500 mr-2"></i>
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  <div className="label-section mb-1">
                                    <p className="text-BusinessFormLabel">
                                      Advertisement Banner Photo*
                                    </p>
                                  </div>
                                  <div className="file-upload-outer-section-custom bg-ProfileScreensBg rounded-10p overflow-hidden relative h-[130px]">
                                    <input
                                      type="file"
                                      name=""
                                      id=""
                                      onChange={(e) => handleFileChange(e)}
                                      className="h-full w-full opacity-0 relative z-10 cursor-pointer"
                                    />
                                    <div className="inner-file-upload-butifier absolute top-1/2 left-1/2 w-full flex justify-center flex-col items-center px-5 gap-x-5">
                                      <img
                                        src={FileUploadIcon}
                                        className="w-10 h-10 mb-4"
                                        alt=""
                                      />
                                      <p className="text-Black">
                                        Click to Upload photo of your
                                        Advertisement
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
</>