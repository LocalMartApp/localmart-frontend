import React , {useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import './MyAddresses.scss';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../env-services';
import axios from 'axios';

const MyAddresses = () => {

  const navigate = useNavigate();

  const [userToken ,  setUserToken] = useState();
  const [allAddress , setAllAddress] = useState("");


    useEffect(() => {
      getUserDetails()
      getAddresses()
    } , [])
  
  
    const getUserDetails = async () => {
      const response = await localStorage.getItem('authToken');
      const userParse = JSON.parse(response);
      setUserToken(userParse);
      // getAllAddresses(userParse)
    };


    // const getAllAddresses = async(token) => {
    //     await axios.post(`${config.api}address`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`, 
    //       },
    //     }).then((response) => {
    //       // console.log(response);
    //       setAllAddress(response)
    //     }).catch((err) => {
    //       console.log(err)
    //     })
    // }


    const getAddresses = async() => {
      console.log(userToken)
      try {
        await fetch(`${config.api}address` , {
          method: 'GET',
          headers: {
              "Authorization": `Bearer ${userToken}` ,
          }
      }).then((response) => [
        console.log( "response" , response)
      ]).catch((err) => {
        console.log(err)
      })
      }catch (error) {

      }
    }

  

  const addresses = [
    {
      type: 'Home',
      addressNumber: '+91 901 901 9548',
      completeAddress: '301, 3rd Floor , Arcade Apartments new Era , Floris Street , Near Gaming Club , 4th Block',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500018',
    },
    {
      type: 'Work',
      addressNumber: '+91 901 901 9548',
      completeAddress: '301, 3rd Floor , Arcade Apartments new Era , Floris Street , Near Gaming Club , 4th Block',
      city: 'Rajahmundry',
      state: 'Andhra Pradesh',
      pincode: '533010',
    },
    {
      type: 'Gym',
      addressNumber: '+91 901 901 9548',
      completeAddress: '301, 3rd Floor , Arcade Apartments new Era , Floris Street , Near Gaming Club , 4th Block',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500018',
    },
  ]

  return (
    <div className="MyAddresses">
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
          <div className=" profile-section-navigation-details-card bg-white py-8 px-8 rounded-20p similar-profile-sidebar-outer">
              <div className="grid grid-cols-12 gap-9 profile-sidebar-main-grid">
                <div className="col-span-3 left-sidebar-section-proile border-r border-BorderColor border-opacity-40">
                    <ProfileSideBar/>
                </div>
                <div className="col-span-9 right-profile-content-section">
                    <div className="profile-main-details-heading-part flex items-center justify-between gap-x-40">
                      <div className="left-main-prof-det-head">
                        <h4 className='text-Black font-medium text-lg'>Addresses</h4>
                      </div>
                      <div className="right-edit-prof-button">
                        <button type="button" className='flex items-center gap-x-[15px] rounded-full bg-Primary justify-center px-6 py-2 border border-Primary duration-300 hover:bg-white group'>
                          <p className='text-white group-hover:text-Primary duration-300'>Add Address</p>
                          <i className="text-white ri-add-circle-line group-hover:text-Primary duration-300"></i>
                        </button>
                      </div>
                    </div>
                    <div className="profile-details-main-cards-section grid grid-cols-2 gap-6 mt-4">
                      {addresses.map((items , index) => {
                        return (
                          <div className="single-address-card-prof bg-AddressCard p-5 rounded-[15px] relative" key={index}>
                              <div className="inner-single-address-card">
                                <div className="top-address-type-number-sec flex items-center gap-6">
                                    <div className="address-type-sec flex items-center gap-2 bg-white rounded-full px-[18px] py-[6px]">
                                      <div className="address-type-icon">
                                        <i className={`${items.type == 'Home' ? 'ri-home-4-line' : items.type == 'Work' ? 'ri-building-line' : 'ri-news-line'} text-[#696969]`}></i>
                                      </div>
                                      <div className="addresstype-text">
                                        <p className='text-[#494949] font-medium'>{items.type}</p>
                                      </div>
                                    </div>
                                    <div className="address-number-sec">
                                        <p className='text-Black font-medium'>{items.addressNumber}</p>
                                    </div>
                                </div>
                                <div className="middle-complete-address-sec mt-5 mb-3">
                                  <p className='text-[#777777]'>{items.completeAddress}</p>
                                </div>
                                <div className="bottom-address-city-state-pin-section flex gap-10 items-center justify-between">
                                  <div className="address-city-pin flex items-center gap-5">
                                    <div className="address-city">
                                      <p className='text-Black font-medium'>{items.city}</p>
                                    </div>
                                    <div className="address-pin">
                                      <p className='text-Black'>{items.pincode}</p>
                                    </div>
                                  </div>
                                  <div className="address-state-sec">
                                    <p className='font-medium text-Black'>{items.state}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="address-delete-edit-section absolute top-5 right-5">
                                <div className="address-delete-edit-inner-sec flex items-center gap-4">
                                  <div className="address-edit-btn"><button type="button" className='w-9 h-9 rounded-full bg-white flex items-center justify-center'><i className="ri-edit-line text-Secondary text-lg"></i></button></div>
                                  <div className="address-delete-btn"><button type="button" className='w-9 h-9 rounded-full bg-white flex items-center justify-center'><i className="bi bi-trash3 text-red-500 text-lg"></i></button></div>
                                </div>
                              </div>
                          </div>
                        )
                      })}
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MyAddresses.propTypes = {};

MyAddresses.defaultProps = {};

export default MyAddresses;
