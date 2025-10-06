import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./BusinessPage.scss";

// images-export
import InnovationImage from "../../assets/images/innovation-business.svg";
import Growth from "../../assets/images/mission-growth.svg";
import HaveBusiness from "../../assets/images/have-business.svg";
import PgHostel from "../../assets/images/recharge-logos/pg-hostel.svg";
import Hospital from "../../assets/images/categories-logos/hospital.svg";
import HomeDecor from "../../assets/images/categories-logos/home-decors.svg";
import HotelRoom from "../../assets/images/categories-logos/hotels.svg";
import Restaurants from "../../assets/images/categories-logos/restuarants.svg";
import Courier from "../../assets/images/categories-logos/courier.svg";
import Gym from "../../assets/images/categories-logos/gym.svg";
import Dental from "../../assets/images/categories-logos/dental.svg";
import FunctionHall from "../../assets/images/categories-logos/function-hall.svg";
import Packers from "../../assets/images/categories-logos/packers-movers.svg";
import WeddingHall from "../../assets/images/categories-logos/wedding-halls.svg";
import PetShop from "../../assets/images/categories-logos/petshop.svg";
import BusinessPopServSlider from "./BusinessPopServSlider";
import BusinessImage from "../../assets/images/business-card-image-1.jpg";
import BusinessImage2 from "../../assets/images/business-card-image-2.jpg";
import BusinessImage3 from "../../assets/images/business-card-image-3.jpg";
import BusinessImage4 from "../../assets/images/business-card-image-4.jpg";
import ThreeMLogo from "../../assets/images/three-m-logo.svg";
import MitsuBishi from "../../assets/images/mitsubishi-logo.svg";
import BMWLogo from "../../assets/images/bmw-logo.svg";
import HaierLogo from "../../assets/images/haier-logo.svg";
import LGlogo from "../../assets/images/lg-logo.svg";
import HaveelsLogo from "../../assets/images/haveels.svg";
import { useNavigate } from "react-router-dom";
import useSearchStore from "../../Store/useSearchStore";
import axios from "axios";
import { config } from "../../env-services";
import BrowseAllCategories from "../Home/BrowseAllCategories";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import '../Home/Home.scss'
import DetectingLoader from "../../utils/Loader/DetectingLoader";
import AdSlider from "../Home/AdSlider";

const GOOGLE_MAPS_API_KEY = "AIzaSyD5_3Xmuuyxph0PEHPNK97qYyBr30OEllQ";

const BusinessPage = () => {
  const navigate = useNavigate();

  const {
    filters,
    setFilter,
    removeFilter,
    fetchSearchResults,
    setIsLocationAutoDetected,
    isLocationAutoDetected,
  } = useSearchStore();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [mapSuggestions, setMapSuggestions] = useState([]);
  const [areaSuggestions, setAreaSuggestions] = useState("");
  const [mapSelectedCity, setMapSelectedCity] = useState("");
  const [inputValue, setInputValue] = useState("");
  const debounceTimeout = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [headerBar, setHeaderBar] = useState(false);
  const [localmartCategories, setLocalmartCategories] = useState([]);
  const [allCategoryOpen, setAllCategoryOpen] = useState(false);
  const [userCity, setUserCity] = useState(null);
  const [searchSuggest, setSearchSuggest] = useState(false);

  const placeholders = [
    "Search for anything?",
    "Search for restaurants",
    "Search for businesses",
    "Search for products",
  ];

  const autocompleteService = useRef(null);

  const inputRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          if (filters?.city === "" && isLocationAutoDetected) {
            getUserLocationDetails(lat, lng);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    getAllCategories();
    // getCities()

    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    // setTimeout(() => {
    //   openModal()
    // }, 2000)

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);

    return () => {
      clearInterval(interval), clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  const fetchSuggestions = async (searchTerm) => {
    try {
      await axios
        .get(
          `${
            config.api
          }search/suggestions?q=${searchTerm}&city=${filters?.city.toLowerCase()}`
        )
        .then((resposne) => {
          setSuggestions(resposne?.data?.data?.suggestions);
          setSearchSuggest(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  const handleSuggestionClick = async (data) => {
    setIsLocationAutoDetected(false);
    setFilter("categoryId", data?.categoryId);
    setFilter("businessId", "");
    navigate("/search");
  };

  const handleCategorySuggestionClick = async (data) => {
    setFilter("businessId", "");
    setFilter("categoryId", data);
    navigate("/search");
  };

  const getUserLocationDetails = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    setDetectModalOpen(true);

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setDetectModalOpen(false);
        let area = "";
        let city = "";

        results[0].address_components.forEach((component) => {
          if (component.types.includes("sublocality_level_1")) {
            area = component.long_name;
          }
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
        });

        let formattedInput = "";
        if (area && city) {
          formattedInput = `${city}`;
        } else if (area) {
          formattedInput = area;
        } else if (city) {
          formattedInput = city;
        }

        if (isLocationAutoDetected) {
          setInputValue(formattedInput);
          setFilter("city", formattedInput);
        }
        setMapSelectedCity(city);
      } else {
        setDetectModalOpen(false);
      }
    });
    setDetectModalOpen(false);
  };

  useEffect(() => {
    if (userCity) {
      getCities();
    }
  }, [userCity]);

  useEffect(() => {
    if (isLoaded && !autocompleteService.current) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  const getAllCategories = async () => {
    await axios.get(config.api + `business-category`).then((response) => {
      // console.log(response)
      setLocalmartCategories(response?.data?.data);
      // console.log('response' , response)
    });
  };

  const openBrowseCategory = () => setAllCategoryOpen(true);
  const closeBrowseCategory = () => setAllCategoryOpen(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsLocationAutoDetected(false);
    setFilter("city", value);
    if (value.length > 2 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          types: ["geocode"],
          componentRestrictions: { country: "IN" },
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setMapSuggestions(predictions);
          } else {
            setMapSuggestions([]);
          }
        }
      );
    } else {
      setMapSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    const placeService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    placeService.getDetails({ placeId: place.place_id }, (details, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let area = "";
        let city = "";

        details.address_components.forEach((component) => {
          if (component.types.includes("sublocality_level_1")) {
            area = component.long_name;
          }
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
        });

        let formattedInput = "";
        if (area && city) {
          formattedInput = `${area}, ${city}`;
        } else if (area) {
          formattedInput = area;
        } else if (city) {
          formattedInput = city;
        }

        setInputValue(formattedInput);
        setMapSelectedCity(city);
        setFilter("city", city);
        setMapSuggestions([]);
      }
    });
    setIsLocationAutoDetected(false);
  };

  const allCategories = [
    {
      icon: PgHostel,
      title: "Hostels & PG’s",
    },
    {
      icon: Hospital,
      title: "Hospitals",
    },
    {
      icon: HomeDecor,
      title: "Home Decors",
    },
    {
      icon: HotelRoom,
      title: "Hotels",
    },
    {
      icon: Restaurants,
      title: "Restaurants",
    },
    {
      icon: Courier,
      title: "Courier Service",
    },
    {
      icon: Gym,
      title: "GYM’s",
    },
    {
      icon: Dental,
      title: "Dental",
    },
    {
      icon: FunctionHall,
      title: "Function Halls",
    },
    {
      icon: Packers,
      title: "Packers & Movers",
    },
    {
      icon: WeddingHall,
      title: "Wedding Halls",
    },
    {
      icon: PetShop,
      title: "Pet Shops",
    },
  ];

  const VerifiedSelles = [
    {
      image: BusinessImage,
      recommend: true,
      rating: "4.5",
      location: "Rajahmundry - Kothapalli",
      title: "Sri Megha Restaurant",
    },
    {
      image: BusinessImage2,
      recommend: true,
      rating: "4.5",
      location: "Rajahmundry - Lala Cheruvu",
      title: "Kritunga Restaurant",
    },
    {
      image: BusinessImage3,
      recommend: true,
      rating: "4.5",
      location: "Rajahmundry - Bus Station",
      title: "Krishna Restaurant",
    },
    {
      image: BusinessImage4,
      recommend: true,
      rating: "4.5",
      location: "Rajahmundry - Kotipalli",
      title: "Vasishta Foods",
    },
  ];

  const exploreBrands = [
    {
      image: ThreeMLogo,
    },
    {
      image: MitsuBishi,
    },
    {
      image: BMWLogo,
    },
    {
      image: HaierLogo,
    },
    {
      image: LGlogo,
    },
    {
      image: HaveelsLogo,
    },
  ];

  return (
    <div className="BusinessPage">
      <div className="business-to-business-main-section home-section-1">
        <div className="top-business-section-page bg-Secondary bg-opacity-15 py-16">
          <div className="container">
            <div
              className={`top-main-search-section-home duration-500 z-[9999]`}
            >
              <div className="inner-search-relative-section-home relative">
                <div className="search-grid-section-home-main">
                  <div className="search-grid-container-main">
                    <div className="grid grid-cols-10 justify-center gap-x-6 top-search-section-grid-parent">
                      <div className="col-span-3 relative">
                        <div
                          className={`location-setting-section grid overflow-hidden relative items-center grid-cols-6 gap-x-4 w-full bg-white rounded-full px-5 h-70p ${
                            headerBar ? "shadow-xl" : ""
                          }`}
                        >
                          <div className="icon-section absolute top-1/2 left-8 z-10">
                            <i className="ri-map-pin-fill text-2xl text-Secondary"></i>
                          </div>
                          <div className="country-selection col-span-6 relative h-full">
                            <input
                              type="text"
                              className="h-full w-full pl-10 outline-none"
                              value={filters?.city || inputValue}
                              onChange={handleInputChange}
                              placeholder="Enter your locality"
                              name=""
                              id=""
                            />
                          </div>
                        </div>
                        {mapSuggestions.length > 0 && (
                          <div className="bottom-suggestions-list mt-5 bg-white rounded-3xl p-4 absolute shadow-xl h-[200px] overflow-y-auto">
                            <ul className="suggestions-list">
                              {mapSuggestions.map((place, index) => {
                                return (
                                  <li
                                    key={place.place_id}
                                    onClick={() => handleSelect(place)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg text-sm"
                                  >
                                    {place.description}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div
                        className={`col-span-7 ${headerBar ? "shadow-xl" : ""}`}
                      >
                        <div
                          className={`big-search-section duration-500 bg-white p-[6px] h-70p relative ${
                            searchSuggest
                              ? "rounded-t-30p rounded-b-0"
                              : "rounded-40p"
                          }`}
                        >
                          <div className="grid grid-cols-10 h-full">
                            <div className="col-span-8">
                              <div className="main-search-input-section h-full relative">
                                <input
                                  type="text"
                                  onFocus={() => setSearchSuggest(true)}
                                  value={query}
                                  onChange={(e) => setQuery(e.target.value)}
                                  placeholder={placeholders[currentIndex]}
                                  name=""
                                  id=""
                                  className="text-xl text-Black h-full max-h-[58px] font-medium pl-9 pr-5 w-full bg-transparent focus:outline-none focus:border-none outline-none border-none"
                                />
                                {searchSuggest && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setQuery("");
                                      setSearchSuggest(false);
                                      setSuggestions([]);
                                    }}
                                    className="absolute top-1/2 right-10 text-xl search-clear-icon"
                                  >
                                    <i className="ri-close-large-fill text-red-400"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="cate-loc-search-btn h-full w-full">
                                <button
                                  type="button"
                                  onClick={() => fetchSuggestions(query)}
                                  className="bg-Primary duration-300 hover:scale-95 rounded-full h-full max-h-[58px] flex items-center w-full justify-center shadow-customized"
                                >
                                  <p className="text-white  font-medium">
                                    Search
                                  </p>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`absolute-searched-results-section bg-white rounded-b-30p absolute w-full h-[300px] overflow-hidden overflow-y-auto border-t border-BorderColor left-0 z-[9999] duration-500 ${
                              searchSuggest
                                ? "opacity-100 visible translate-y-[5px]"
                                : "invisible opacity-0 translate-y-6"
                            } ${
                              headerBar
                                ? "border-[2px] border-t-[1px] border-BorderColor"
                                : ""
                            }`}
                          >
                            <div className="inner-searched-results-section px-4 py-4 flex flex-col gap-y-4">
                              {searchSuggest && suggestions.length > 0 ? (
                                suggestions.map((items, index) => {
                                  return (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleSuggestionClick(items)
                                      }
                                      className="text-left flex items-center gap-x-4 w-full bg-LightBlue px-4 py-3 rounded-lg"
                                      key={index}
                                    >
                                      <div className="left-goto-icon w-10 h-10 flex items-center justify-center bg-white rounded-full">
                                        <i className="bi bi-arrow-up-right"></i>
                                      </div>
                                      <div className="right-text-below-text text-left">
                                        <p className="text-lg font-semibold">
                                          {items?.suggestion}
                                        </p>
                                        <div className="sub-text">
                                          <p className="opacity-60">Category</p>
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })
                              ) : (
                                <button
                                  type="button"
                                  className="text-left flex items-center gap-x-4 w-full bg-LightGrayBg px-4 py-3 rounded-lg"
                                >
                                  <div className="right-text-below-text text-left">
                                    <p className="text-lg font-semibold">
                                      No Data Found
                                    </p>
                                  </div>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="list-business-top-section py-8">
          <div className="container">
            <div className="right-side-list-business-button flex items-center justify-center">
              <button
                type="button"
                onClick={() => navigate("/business/add-business")}
              >
                <div className="list-business-btn-inner flex items-center gap-3">
                  <div className="left-icon-list-business">
                    <i className="ri-shake-hands-line text-Secondary text-2xl"></i>
                  </div>
                  <div className="right-list-business-text">
                    <p className="text-Secondary text-xl font-medium">
                      List Your Businesses
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <section className="business-page-section-1 pt-30p pb-70p hidden">
          <div className="inner-business-page-section-1">
            <div className="container">
              <div className="business-section-1-grid">
                <div className="business-grid-items business-sec-1-item-1 rounded-20p bg-[#E0EFFF]">
                  <div className="inner-business-card-section flex flex-col h-full justify-between gap-6">
                    <div className="business-sec-1-cards-top-heading">
                      <h2 className="text-Black font-medium">
                        Making Innovation <br />
                        That Drives Result
                      </h2>
                    </div>
                    <div className="business-sec-1-center-image">
                      <img src={InnovationImage} alt="" />
                    </div>
                    <div className="bottom-business-card-button">
                      <button className="border-Secondary border text-white font-medium duration-300 hover:bg-transparent bg-Secondary hover:text-Secondary rounded-full">
                        Start Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="business-grid-items business-sec-1-item-2 rounded-20p bg-[#FFEFEA]">
                  <div className="inner-business-card-section flex flex-col h-full justify-between gap-6">
                    <div className="business-sec-1-cards-top-heading">
                      <h2 className="text-Black font-medium">
                        Your Growth <br /> Our Mission
                      </h2>
                    </div>
                    <div className="business-sec-1-center-image">
                      <img src={Growth} alt="" />
                    </div>
                    <div className="bottom-business-card-button">
                      <button className="border-Secondary border text-white font-medium duration-300 hover:bg-transparent bg-Secondary hover:text-Secondary rounded-full">
                        Start Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="business-grid-items business-sec-1-item-3 rounded-20p bg-[#FFE9F3]">
                  <div className="inner-business-card-section flex flex-col  h-full justify-between gap-6">
                    <div className="business-sec-1-cards-top-heading">
                      <h2 className="text-Black font-medium">
                        Have a Business ?
                      </h2>
                    </div>
                    <div className="business-sec-1-center-image">
                      <img src={HaveBusiness} alt="" />
                    </div>
                    <div className="bottom-business-card-button">
                      <button className="border-Secondary border text-white font-medium duration-300 hover:bg-transparent bg-Secondary hover:text-Secondary rounded-full">
                        List Business
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business-section-2">
          <div className="inner-business-section-2">
            <div className="container">
              <div className="main-categories-home-sec-5">
                <div className="top-heading-part-categories flex justify-between gap-10 items-center mb-10">
                  <div className="left-categories-heading-home">
                    <h2 className="text-30 text-white font-medium">
                      Explore Wide Range Categories
                    </h2>
                  </div>
                  <div className="explore-all-cates-button">
                    <button
                      type="button"
                      onClick={openBrowseCategory}
                      className="explore-cities-button-prev shadow-customized bg-white px-5 py-2 rounded-full flex items-center gap-10p border-LightBlack border-opacity-40 border"
                    >
                      <i className="ri-menu-3-line text-Primary text-2xl"></i>
                      <p className="text-Primary text-lg font-medium">
                        Browse All
                      </p>
                    </button>
                  </div>
                </div>
                <div className="bottom-all-categories-section">
                  <div className="grid grid-cols-6 gap-x-90p gap-y-60p business-page-categories-sec">
                    {localmartCategories && localmartCategories.length > 0
                      ? localmartCategories.slice(0, 12).map((items, index) => {
                          return (
                            <button
                              type="button"
                              onClick={() =>
                                handleCategorySuggestionClick(items?._id)
                              }
                              key={index}
                              className="single-recharge-component-home-sec-2 group flex flex-col justify-center items-center gap-3"
                            >
                              <div className="top-image-blk bg-white w-100p h-100p flex items-center justify-center p-5 rounded-[15px]">
                                <img
                                  src={items?.icon}
                                  className="duration-500 group-hover:scale-125"
                                  alt=""
                                />
                              </div>
                              <div className="bottom-text-blk">
                                <p className="text-white text-center text-medium">
                                  {items?.name}
                                </p>
                              </div>
                            </button>
                          );
                        })
                      : allCategories.map((items, index) => {
                          return (
                            <button
                              type="button"
                              key={index}
                              className="single-recharge-component-home-sec-2 group flex flex-col justify-center items-center gap-3"
                            >
                              <div className="top-image-blk bg-white w-100p h-100p flex items-center justify-center p-5 rounded-[15px]">
                                <img
                                  src={items.icon}
                                  className="duration-500 group-hover:scale-125"
                                  alt=""
                                />
                              </div>
                              <div className="bottom-text-blk">
                                <p className="text-white text-center text-medium">
                                  {items.title}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="browse-all-categories-fixed-section">
          <BrowseAllCategories
            isCategoryOpen={allCategoryOpen}
            closeCategory={closeBrowseCategory}
          />
        </div>
        <section className="business-section-4 py-16">
          <div className="inner-business-section-4">
            <AdSlider/>
            {/* <BusinessPopServSlider title="Popular Services" /> */}
          </div>
        </section>
        <section className="business-page-section-3 hidden">
          <div className="inner-business-page-section-3 bg-LightBlue py-16">
            <div className="container">
              <div className="business-section-3-heading-sec flex items-center justify-between gap-10">
                <div className="left-verified-sell-head">
                  <h4 className="text-3xl font-medium text-Black">
                    {" "}
                    Verified Sellers {filters?.city || inputValue ? `In ${filters?.city || inputValue}` : 'Near you'}
                  </h4>
                </div>
                <div className="right-business-explore-sec">
                  <button type="button" className="flex items-center gap-3">
                    <p className="text-Secondary font-medium">Explore More</p>
                    <i className="bi bi-arrow-right text-Secondary text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="business-sec-3-main-cards-section pt-10">
                <div className="grid grid-cols-2 gap-5 verified-sellers-business-cards-grid">
                  {VerifiedSelles.map((items, index) => {
                    return (
                      <div
                        className="single-business-sec-3-card  bg-white rounded-xl overflow-hidden group"
                        key={index}
                      >
                        <div className="inner-verified-sellers-card-sec grid grid-cols-12 h-full">
                          <div className="left-image-section-bus-sec-3 col-span-4 overflow-hidden h-full">
                            <img
                              src={items.image}
                              className="h-full object-cover group-hover:scale-125 duration-500"
                              alt=""
                            />
                          </div>
                          <div className="right-side-business-card-details relative p-5 col-span-8">
                            <div className="inner-seller-business-card-details flex flex-col justify-between h-full">
                              <div className="business-card-title mb-3">
                                <h4 className="text-xl font-medium text-Black">
                                  {items.title}
                                </h4>
                              </div>
                              <div className="business-card-recommend-address-section flex flex-col gap-y-2">
                                <div className="business-recommended-section flex items-center gap-10p opacity-60">
                                  <i className="ri-thumb-up-fill text-LightText"></i>
                                  <p className="text-sm text-LightText">
                                    Highly Recommended
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  className="business-recommended-section flex items-center gap-10p opacity-60"
                                >
                                  <i className="ri-map-pin-line text-Black"></i>
                                  <p className="text-sm text-LightText">
                                    {items.location}
                                  </p>
                                </button>
                              </div>
                              <div className="bottom-business-card-number-det flex items-center justify-between w-full mt-5">
                                <div className="number-business-btn">
                                  <button
                                    type="button"
                                    className="font-medium text-white bg-Green rounded-full  text-sm py-[7px] px-5"
                                  >
                                    Show Number
                                  </button>
                                </div>
                                <div className="send-enquiry-btn">
                                  <button
                                    type="button"
                                    className="font-medium text-white bg-Primary rounded-full text-sm  py-[7px] px-5"
                                  >
                                    Send Enquiry
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="rating-section-right-side-business bg-LightGrayBg rounded-[5px] px-10p py-1 absolute top-4 right-4 flex items-center gap-2">
                              <i className="ri-star-fill text-StarGold"></i>
                              <p className="text-Black font-medium">
                                {items.rating}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="business-section-4 py-16 hidden">
          <div className="inner-business-section-4">
            <BusinessPopServSlider title="Explore by Restaurants & Stays" />
          </div>
        </section>
        <section className="business-page-section-5 hidden">
          <div className="inner-business-page-section-5 bg-LightBlue py-16">
            <div className="container">
              <div className="business-section-3-heading-sec flex items-center justify-between gap-10">
                <div className="left-verified-sell-head">
                  <h4 className="text-3xl font-medium text-Black">
                    {" "}
                    Explore By Top Brands
                  </h4>
                </div>
                <div className="right-business-explore-sec">
                  <button type="button" className="flex items-center gap-3">
                    <p className="text-Secondary font-medium">Explore More</p>
                    <i className="bi bi-arrow-right text-Secondary text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="brands-business-page-main-sec mt-10">
                <div className="grid grid-cols-6 gap-16 brands-business-grid-sec">
                  {exploreBrands.map((items, index) => {
                    return (
                      <div className="single-brand-sec-business" key={index}>
                        <img src={items.image} alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

BusinessPage.propTypes = {};

BusinessPage.defaultProps = {};

export default BusinessPage;
