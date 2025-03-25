import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchPage.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchTopPicksSlider from './SearchTopPicksSlider';
import BusinessImage from '../../assets/images/business-card-image-1.jpg';
import BusinessImage2 from '../../assets/images/business-card-image-2.jpg';
import BusinessImage3 from '../../assets/images/business-card-image-3.jpg';
import BusinessImage4 from '../../assets/images/business-card-image-4.jpg';
import GmailIcon from '../../assets/images/gmail-icon.svg';
import useSearchStore from '../../Store/useSearchStore';
import ShimmerSearch from '../../utils/SkeltonLoaders/ShimmerSearch';
import Emptymedia from '../../assets/images/emptymedia-business.png';
import Lottie from 'lottie-react';
import EmptyLoader from '../../assets/images/animated-logos/emptyastro.json';



const SearchPage = () => {
  
  const navigate = useNavigate();

  const {filters, results , loading , error , fetchSearchResults} = useSearchStore();

  console.log(results)
  

  const [sortByBtn , setSortByBtn] = useState(false);
  const [topRatedBtn , setTopRatedBtn] = useState(false);
  const [openNowBtn , setOpenNowBtn] = useState(false);
  const [priceBtn , setPriceBtn] = useState(false);
  const [sortSelect , setSortSelect] = useState('Sort By');
  const [priceSlect , setPriceSelect] = useState('Price');

  const [favorite , setFavorite] = useState(false);
  useEffect(() => {
    fetchSearchResults();  
  }, [filters])

  const handleNavigate = (item) => {
    navigate(`/search/complete-details/${item._id}`);
  };


  const searchedContent = [
    {
      id: 1,
      image: BusinessImage,
      title: 'Sri Megha Restaurant',
      opensAt: 'Opens at 10:30 AM',
      ratedPeople: '1307 People Rated this place',
      topSearch: true,
      rating: 4.5,
      location: 'Rajahmundry - Kothapalli'
    },
    {
      id: 2,
      image: BusinessImage2,
      title: 'Kritunga Restaurant',
      opensAt: 'Opens at 12:30 AM',
      ratedPeople: '2000 People Rated this place',
      topSearch: true,
      rating: 4.1,
      location: 'Rajahmundry - Lalacheruvu'
    },
    {
      id: 3,
      image: BusinessImage3,
      title: 'Paradise Restaurant',
      opensAt: 'Opens at 10:30 AM',
      ratedPeople: '3201 People Rated this place',
      topSearch: true,
      rating: 4.1,
      location: 'Rajahmundry - Bus Stand'
    },
    {
      id: 4,
      image: BusinessImage4,
      title: 'Shiva Restaurant',
      opensAt: 'Opens at 10:30 AM',
      ratedPeople: '0404 People Rated this place',
      topSearch: false,
      rating: 3.8,
      location: 'Rajahmundry - Kothapalli'
    },
  ]



  return (
    <div className="SearchPage">
      <div className="main-search-page-section">
        <section className="search-page-section-1 py-10">
          <div className="inner-search-page-section-1 breadcrumb-section-search">
            <div className="container">
              <div className="breadcrum-inner-section">
                <ul className='flex items-center gap-x-2'>
                  <li><NavLink className={`text-Black `} to={'/'}>Home</NavLink></li>
                  <li><i className="ri-arrow-right-s-line"></i></li>
                  <li><p className={`text-Black `}>Business Listings</p></li>
                  {/* <li><i className="ri-arrow-right-s-line"></i></li>
                  <li><p className={`text-Black `}>150+ Listings</p></li> */}
                </ul>
                {/* <div className="bread-heading-section mt-4">
                  <h2 className='text-xl font-medium text-Black'>Best Restaurants In Rajahmundry from Localmart</h2>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        <section className="search-page-section-2">
          <div className="inner-search-page-section-2">
            <div className="container">
              <div className="sorting-buttons-grid-section grid grid-cols-12 gap-x-8">
                <div className="col-span-3 single-sorting-btn">
                  <div className="inner-single-sorting-button relative">
                    <button type="button" onClick={() => {setSortByBtn(!sortByBtn) , setPriceBtn(false)}} className={`w-full flex items-center gap-4 justify-between  duration-300 ${sortByBtn ? 'rounded-10p bg-LightBlue' : 'rounded-40p bg-LightGrayBg'} px-6 py-2`}>
                      <div className="left-sort-text">
                        <p className='text-Black font-medium text-lg'>{sortSelect}</p>
                      </div>
                      <div className={`right-arrow-icon  duration-300 ${sortByBtn ? 'rotate-180' : 'rotate-0'}`}>
                        <i className={`ri-arrow-down-s-line text-xl`}></i>
                      </div>
                    </button>
                    <div className={`absolute-sorting-section flex flex-col gap-y-2 z-[999] shadow-md rounded-10p bg-LightBlue py-4 absolute left-0 w-full duration-300 ${sortByBtn ? 'visible translate-y-2 opacity-100' : 'invisible translate-y-10 opacity-0'}`}>
                      <div className="single-sorting-abs-btns">
                        <button type="button" className='py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left' onClick={() => {setSortSelect('Sort A-Z') , setSortByBtn(false)}}>Sort A-Z</button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button type="button" className='py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left' onClick={() => {setSortSelect('Sort Z-A') , setSortByBtn(false)}}>Sort Z-A</button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button type="button" className='py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left' onClick={() => {setSortSelect('Trending') , setSortByBtn(false)}}>Trending</button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button type="button" className='py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left' onClick={() => {setSortSelect('Popular') , setSortByBtn(false)}}>Popular</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 single-sorting-btn">
                  <div className="inner-single-sorting-button relative">
                    <button type="button" onClick={() => setTopRatedBtn(!topRatedBtn)} className={`w-full flex items-center gap-4   duration-300 ${topRatedBtn ? 'rounded-10p bg-LightBlue' : 'rounded-40p bg-LightGrayBg'} px-6 py-2`}>
                      <div className={`right-arrow-icon  duration-300 ${topRatedBtn ? ' -rotate-180' : 'rotate-0'}`}>
                        <i className={`ri-star-s-fill text-xl`}></i>
                      </div>
                      <div className="left-sort-text">
                        <p className='text-Black font-medium text-lg'>Top Rated</p>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="col-span-3 single-sorting-btn">
                  <div className="inner-single-sorting-button relative">
                    <button type="button" onClick={() => {setPriceBtn(!priceBtn) , setSortByBtn(false)}} className={`w-full flex items-center gap-4 justify-between  duration-300 ${priceBtn ? 'rounded-10p bg-LightBlue' : 'rounded-40p bg-LightGrayBg'} px-6 py-2`}>
                      <div className="left-sort-text">
                        <p className='text-Black font-medium text-lg'>{priceSlect}</p>
                      </div>
                      <div className={`right-arrow-icon  duration-300 ${priceBtn ? 'rotate-180' : 'rotate-0'}`}>
                        <i className={`ri-arrow-down-s-line text-xl`}></i>
                      </div>
                    </button>
                    <div className={`absolute-sorting-section flex flex-col gap-y-2 rounded-10p z-[999] bg-LightBlue py-4 absolute left-0 w-full duration-300 shadow-md ${priceBtn ? 'visible translate-y-2 opacity-100' : 'invisible translate-y-10 opacity-0'}`}>
                      <div className="single-sorting-abs-btns">
                        <button type="button" className='py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left' onClick={() => {setPriceSelect('Low - High') , setPriceBtn(false)}}>Price Low - High</button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button type="button" className='py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left' onClick={() => {setPriceSelect('High - Low') , setPriceBtn(false)}}>Price High - Low</button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button type="button" className='py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left' onClick={() => {setPriceSelect('Mid Range') , setPriceBtn(false)}}>Price Mid Range</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 single-sorting-btn">
                  <div className="inner-single-sorting-button relative">
                    <button type="button" onClick={() => setOpenNowBtn(!openNowBtn)} className={`w-full flex items-center gap-4   duration-300 ${openNowBtn ? 'rounded-10p bg-LightBlue' : 'rounded-40p bg-LightGrayBg'} px-6 py-2`}>
                      <div className={`right-arrow-icon  duration-300 ${openNowBtn ? ' -rotate-180' : 'rotate-0'}`}>
                        <i className={`ri-circle-fill text-Green`}></i>
                      </div>
                      <div className="left-sort-text">
                        <p className='text-Black font-medium text-lg'>Open Now</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="search-page-section-3">
          <div className="inner-search-page-section-3 py-10">
            <div className="container">
              <div className="search-page-grid-section-main">
                <div className="grid grid-cols-12 gap-30p">
                  <div className="col-span-12 left-searched-cards">
                    <div className="inner-left-searched-cards-sec-before-991 flex flex-col gap-y-30p">
                    {loading && (<ShimmerSearch/>)}
                    {!loading && results && results.length > 0 ? results.map((items , index) => {
                        return (
                          <div className="single-searched-cards">
                              <button onClick={() => handleNavigate(items)} className="single-business-sec-3-card w-full bg-white rounded-xl text-left  shadow-customized overflow-hidden group" key={index}>
                                <div className="inner-verified-sellers-card-sec grid grid-cols-12">
                                  <div className="left-image-section-bus-sec-3 col-span-3 overflow-hidden">
                                      <img src={items?.mediaFiles[0]?.fileUrl ? items?.mediaFiles[0]?.fileUrl : Emptymedia} className='h-full w-full group-hover:scale-125 duration-500 object-cover max-h-[260px]' alt="" />
                                  </div>
                                  <div className="right-side-business-card-details relative px-7 py-6 col-span-9  ">
                                    <div className="inner-seller-business-card-details flex flex-col gap-y-4 h-full">
                                      <div className="business-card-title">
                                        <h4 className='text-2xl font-medium text-Black'>{items?.name}</h4>
                                      </div>
                                      <div className="business-card-recommend-address-section flex flex-col gap-y-2">
                                        <div className="business-recommended-section flex items-center gap-10p opacity-60">
                                          <i className="ri-thumb-up-fill text-LightText"></i>
                                          <p className='text-sm text-LightText'>Highly Recommended</p>
                                        </div>
                                        <div className="opens-at-location-combined flex items-center gap-x-4">
                                            <button type='button' className="business-recommended-section flex items-center gap-10p  justify-center w-fit">
                                                <i className="ri-time-line text-Black opacity-40"></i>
                                                <p className='text-sm text-Green '>{items?.workingHours}</p>
                                            </button>
                                          <button type='button' className="business-recommended-section flex items-center gap-10p opacity-60">
                                            <i className="ri-map-pin-line text-Black"></i>
                                            <p className='text-sm text-LightText'>{items?.stateId?.name + " - " + items?.cityId?.name}</p>
                                          </button>
                                        </div>
                                        <div className="people-rated-top-search-sec flex items-center gap-x-4">
                                          <div className="people-rated-place">
                                            <p className='text-Black font-medium'>{items.ratedPeople}</p>
                                          </div>
                                          {items.topSearch ? 
                                            <div type='button' className="business-recommended-section flex items-center gap-2">
                                              <i className="ri-search-line text-Secondary"></i>
                                              <p className='text-sm text-Secondary'>Top Searched</p>
                                            </div> : null}
                                        </div>
                                      </div>
                                      <div className="bottom-business-card-number-det flex items-center gap-x-6 w-full mt-5">
                                        <div className="send-enquiry-btn">
                                          <button type="button" className='font-medium text-white bg-Primary rounded-full py-2 px-7'>Send Enquiry</button>
                                        </div>
                                        <div className="number-business-btn">
                                          <button type="button" className='font-medium text-white bg-Green rounded-full py-2 px-7'>Show Number</button>
                                        </div>
                                        <div className="directions-button-search">
                                            <button className='h-9 w-9 rounded-full bg-Secondary flex items-center justify-center'>
                                                <i className="ri-direction-fill text-white text-lg duration-300 "></i>
                                            </button>
                                        </div>
                                        <div className="directions-button-search">
                                            <button className='h-9 w-9 rounded-full bg-LightBlue flex items-center justify-center'>
                                                <i className="ri-share-fill text-Secondary text-lg duration-300 "></i>
                                            </button>
                                        </div>
                                        <div className="directions-button-search">
                                            <button className='h-9 w-9 rounded-full bg-LightBlue flex items-center justify-center'>
                                                <img src={GmailIcon} className='w-5 h-20' alt="" />
                                            </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="absoulte-rating-favorite-sec absolute top-4 right-6 ">
                                      <div className="inner-rating-favorite-sec flex items-center gap-x-20p">
                                        <div className="rating-section-right-side-business bg-LightGrayBg rounded-[5px] px-10p py-1 flex items-center gap-2">
                                          <i className="ri-star-fill text-StarGold"></i>
                                          <p className='text-Black font-medium'>{items.rating}</p>
                                        </div>
                                        <div className="right-side-favorite-btn-search">
                                          <button type="button" onClick={() => setFavorite(!favorite)}><i className={`${favorite ? 'ri-heart-3-fill text-red-500' : 'ri-heart-3-line text-Black text-opacity-70'} text-2xl`}></i></button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                          </div>
                        )
                      }) : 
                      <div className="no-bus-found">
                        <div className="nodata-found-section flex justify-center flex-col items-center pt-10 pb-5 w-full">
                          <Lottie animationData={EmptyLoader} style={{ width: 300}}/>
                          <div className="no-data-found-text-btn mt-8 text-center" >
                            <p className='text-center text-xl font-medium'>No Business found based on your search.</p>
                            {/* <button type="button" onClick={() =>  setAddAddressToggle(true)} className="text-Secondary font-semibold text-xl mt-5">Add Address</button> */}
                          </div>
                        </div>
                      </div>
                      }
                    </div>

                    {/* Responsive Section */}
                    <div className="inner-left-searched-cards-sec-after-991-layout flex flex-col gap-y-30p">
                    {!loading && results && results.length > 0 ? results.map((items , index) => {
                        return (
                          <div className="single-searched-cards">
                             <button type='button' className="text-left single-mybusiness-card shadow-lg rounded-[15px]  overflow-hidden bg-white w-full relative" key={index}>
                                <div className="top-image-mybusiness-section max-h-[220px] h-full overflow-hidden group">
                                    <img src={items?.mediaFiles[0]?.fileUrl ? items?.mediaFiles[0]?.fileUrl : Emptymedia } className='w-full h-full group-hover:scale-110 duration-300 object-cover' alt="" />
                                </div>
                                <div className="inner-bottom-mybusiness-section px-5 pt-5 pb-4">
                                    <h6 className='text-Black font-medium text-xl'>{items?.name}</h6>
                                    <div className="business-card-recommend-address-section flex flex-col gap-y-1 mt-2">
                                        <div className="business-recommended-section flex items-center gap-10p opacity-60">
                                            <i className="ri-thumb-up-fill text-LightText"></i>
                                            <p className='text-sm text-LightText'>Highly Recommended</p>
                                        </div>
                                        <button type='button' className="business-recommended-section flex items-center gap-10p  justify-center w-fit">
                                            <i className="ri-time-line text-Black opacity-40"></i>
                                            <p className='text-sm text-Green '>{items?.workingHours}</p>
                                        </button>
                                        <div className="business-recommended-section flex items-center gap-10p opacity-60">
                                            <i className="ri-map-pin-line text-LightText"></i>
                                            <p className='text-sm text-LightText'>{items?.stateId?.name + " - " + items?.cityId?.name}</p>
                                        </div>
                                    </div>
                                    <div className="number-button mt-5 flex items-center gap-x-4">
                                        <button type="button" className='flex items-center gap-2 duration-300 group bg-Primary rounded-full border-Primary border hover:bg-transparent h-9 px-5'>
                                            <p className='text-white font-medium duration-300 group-hover:text-Primary'>Send Enquiry</p>
                                        </button>
                                        <button className='h-9 w-9 rounded-full bg-Green flex items-center justify-center'>
                                            <i className="ri-phone-fill text-white text-lg duration-300 "></i>
                                        </button>
                                        <button className='h-9 w-9 rounded-full bg-Secondary flex items-center justify-center'>
                                            <i className="ri-direction-fill text-white text-lg duration-300 "></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="rating-section-favourite flex items-center gap-2 bg-white px-2 py-1 rounded-md absolute top-5 right-5">
                                    <div className="star">
                                        <i className="ri-star-fill text-[#FFA600]"></i>
                                    </div>
                                    <div className="rating-text">
                                        <p className='text-Black font-medium'>4.1</p>
                                    </div>
                                </div>
                            </button>
                          </div>
                        )
                      }) : null}
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="right-top-picks-slider sticky top-5">
                        <SearchTopPicksSlider/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

SearchPage.propTypes = {};

SearchPage.defaultProps = {};

export default SearchPage;
