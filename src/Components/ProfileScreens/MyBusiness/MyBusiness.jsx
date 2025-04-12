import React, { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import './MyBusiness.scss';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';
import BusinessImage from '../../../assets/images/business-card-image-1.jpg';
import BusinessAddIcon from '../../../assets/images/business-add-icon.svg';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../env-services';
import axios from 'axios';

const MyBusiness = () => {

  const navigate = useNavigate();

  const [userToken , setUserToken] = useState('');
  const [allBusinesses , setAllBusinesses] = useState([])

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
      getBusinesses(userParse)
    };



  const getBusinesses = async(token) => {
    if (!token) return; 
    try {
      await axios.get(`${config.api}business` , {
        headers: {
            "Authorization": "Bearer " +  token ,
            "content-type": "application/json"
        }
    })
    .then(response => {
      // console.log(response)
      setAllBusinesses(response?.data?.data)
    })
    .catch((err) => {
      console.log(err)
    })
    }catch (error) {
      console.log(error)
    }
  }

  // const handleGetDirections = (latitude, longitude) => {
  //   const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  //   window.open(googleMapsUrl, "_blank"); // Opens in a new tab
  // };

  return (
    <div className="MyBusiness">
      <div className="my-profile-inner-section bg-ProfileScreensBg">
          <div className="top-similar-header-section-profile-screens mb-30p">
            <div className="container">
              <div className="top-similar-header-section-profile-inner flex items-center gap-10 justify-between">
                <div className="left-profilescreens-heading">
                  <h4 className='text-xl text-Black font-medium'>My Account</h4>
                </div>
                <div className="right-add-business-button">
                  <button type="button" onClick={() => navigate('/business/add-business')}>
                    <div className="list-business-btn-inner flex items-center gap-3">
                      <div className="left-icon-list-business">
                        <i className="ri-shake-hands-line text-Secondary text-2xl"></i>
                      </div>
                      <div className="right-list-business-text">
                        <p className='text-Secondary text-xl font-medium'>List Your Businesses</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className=" favorite-section-navigation-details-card bg-white py-8 px-8 rounded-20p similar-profile-sidebar-outer">
                <div className="grid grid-cols-12 gap-9 profile-sidebar-main-grid">
                  <div className="col-span-3 left-sidebar-section-proile border-r border-BorderColor border-opacity-40">
                      <ProfileSideBar/>
                  </div>
                  <div className="col-span-9 right-business-content-section">
                      <div className="business-main-details-heading-part h-full">
                        <div className="left-main-prof-det-head mb-5">
                          <h4 className='text-Black font-medium text-lg'>Your Businesses  <span className='font-light text-Secondary'>0{allBusinesses?.length}</span></h4>
                        </div>
                        <div className="mybusiness-cards-section mt-6 hidden">
                          <div className="mybusiness-cards-grid-section grid grid-cols-3 gap-5">
                            {allBusinesses && allBusinesses.length > 0 ?  
                              allBusinesses.map((items , index) => {  
                                return (
                                <button type='button' onClick={() => navigate(`/busniess/complete-details/${items?._id}`, { state: { items }})} key={index} className="text-left single-mybusiness-card shadow-lg rounded-[15px] group border-BorderColor overflow-hidden h-full min-h-[360px] border relative">
                                  <div className="top-image-mybusiness-section max-h-[180px] h-full overflow-hidden">
                                    <img src={items?.mediaFiles[0] ? items?.mediaFiles[0]?.fileUrl : BusinessImage } className='w-full h-full group-hover:scale-110 duration-300 object-cover' alt="" />
                                  </div>
                                  <div className="inner-bottom-mybusiness-section px-5 pt-5 pb-4">
                                    <h6 className='text-Black font-medium text-xl capitalize'>{items?.name}</h6>
                                    <div className="business-card-recommend-address-section flex flex-col gap-y-1 mt-2">
                                      <div className="business-recommended-section flex items-center gap-10p opacity-60">
                                        <i className="ri-time-line text-LightText"></i>
                                        <p className='text-sm text-LightText'>{items?.workingHours}</p>
                                      </div>
                                      <button type='button' className="business-recommended-section flex items-center gap-10p  justify-center w-fit">
                                        <i className="ri-line-chart-line text-Black"></i>
                                        <p className='text-sm text-LightText opacity-60'>135 People Recently Searched</p>
                                      </button>
                                    </div>
                                    <div className="number-button mt-5">
                                        <button type="button" className='flex items-center gap-2 group'>
                                          <div className="left-call-icon">
                                            <i className="ri-phone-fill text-Green text-lg duration-300 "></i>
                                          </div>
                                          <div className="right-call-text">
                                            <p className='text-Green font-medium duration-300'>{items?.mobileNumber}</p>
                                          </div>
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
                                )
                              }) : null }
                            <button type='button' onClick={() => navigate('/business/add-business')} className="single-mybusiness-card empty-mybusiness-cardbtn shadow-lg rounded-[15px] border border-dashed border-BorderColor group overflow-hidden relative flex items-center justify-center min-h-80 max-h-full">
                                <div className="inner-empty-business-card flex flex-col gap-5 items-center">
                                    <div className="top-icon-add-business-icon">
                                      <img src={BusinessAddIcon} className='w-8 h-8 duration-500 group-hover:rotate-90' alt="" />
                                    </div>
                                    <div className="bottom-add-business-text">
                                      <p className='text-[20px] font-medium text-Secondary text-center'>List Your Businesses <br /> Now</p>
                                    </div>
                                </div>
                            </button>
                          </div>
                        </div>
                        <div className="bottom-business-table-section overflow-hidden border-black border-opacity-20 rounded-xl px-5 py-2 border h-[490px] overflow-y-auto overflow-x-auto">
                          <div className="inner-business-table-section bg-white rounded-xl overflow-hidden w-[870px]">
                            <table cellPadding={15} >
                              <thead className='sticky top-0'>
                                <tr className=''>
                                  <th className='text-left font-normal opacity-50'>Name</th>
                                  <th className='text-left font-normal opacity-50'>City</th>
                                  <th className='text-left font-normal opacity-50'>Status</th>
                                  {/* <th className='text-left font-normal opacity-50'>Number</th>
                                  <th className='text-left font-normal opacity-50'>UserName</th> */}
                                  <th className='text-left font-normal opacity-50'>Category</th>

                                </tr>
                              </thead>
                                <tbody>
                                  {allBusinesses && allBusinesses.length > 0 ?  
                                    allBusinesses.map((items , index) => {
                                      return (
                                        <tr className='hover:bg-Secondary hover:bg-opacity-5 cursor-pointer' onClick={() => navigate(`/busniess/complete-details/${items?._id}`, { state: { items }})} key={index} >
                                          <td>
                                            <div className="business-name-sec flex items-center gap-x-4">
                                              <div className="left-bus-image ">
                                                <img src={items?.mediaFiles[0] ? items?.mediaFiles[0]?.fileUrl : BusinessImage }className='w-10 h-10 rounded-full' alt="" />
                                              </div>
                                              <div className="right-business-name">
                                                <p className='text-sm'>{items?.name} </p>
                                                <p className='text-xs'>{items?.businessCode ? items?.businessCode : null}</p>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="business-username-sec">
                                              <p className='text-sm'>{items?.cityId?.name}</p>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="edit-delete-buttons flex items-center gap-x-5">
                                              <p className={`text-sm font-medium ${items?.status == 'in_review' ? 'text-orange-500' : items?.status == 'published' ? 'text-green-500' : 'text-red-400'}`}>{items?.status == "in_review" ? 'In Review' : items?.status == 'published' ? 'Published' : 'Rejected'}</p>
                                            </div>
                                          </td>
                                          {/* <td>
                                            <div className="business-number-sec">
                                            <p className={`text-sm ${items?.mobileNumber ? 'text-Black' : 'text-red-400'}`}>{items?.mobileNumber ? items?.mobileNumber : 'Not Provided'}</p>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="business-username-sec">
                                              <p className='text-sm'>{items?.userName}</p>
                                            </div>
                                          </td> */}
                                          <td>
                                            <div className="business-username-sec">
                                              <p className='text-sm capitalize'>{items?.categoryId?.name}</p>
                                            </div>
                                          </td>
                                         

                                        </tr>
                                      )
                                    }) : 
                                      <tr>
                                        <td colSpan={6}>
                                          <div className="nodata-found-section flex justify-center flex-col items-center py-5">
                                            {/* <Lottie animationData={EmptyLoader} style={{ width: 300}}/> */}
                                            <div className="no-data-found-text-btn mt-5">
                                              <p className='text-center'>No Data Found</p>
                                              <button type="button" onClick={() => navigate('/business/add-business')} className="text-Secondary font-semibold text-xl mt-5">Add Business</button>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    } 
                                </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}

MyBusiness.propTypes = {};

MyBusiness.defaultProps = {};

export default MyBusiness;
