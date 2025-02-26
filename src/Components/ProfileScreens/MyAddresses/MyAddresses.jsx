import React , {useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import './MyAddresses.scss';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';
import { useNavigate } from 'react-router-dom';
// import { Formik , Field , Form } from 'formik';
import { Formik ,Form , Field } from 'formik';
import axios from 'axios';
import { config } from '../../../env-services';
import Modal from 'react-modal';
import { useAuth } from '../../../utils/AuthContext';
import AddAddress from './AddAddress';
import toast from 'react-hot-toast';
import Loader from '../../../utils/Loader/Loader';
import { AddAddressValidationSchema } from '../../../utils/Validation';
import Select from 'react-select';



const MyAddresses = () => {

  const navigate = useNavigate();

  const {authToken} = useAuth()

  const [userToken ,  setUserToken] = useState();
  const [allAddress , setAllAddress] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [otherAddressType , setOtherAddressType] = useState();
  const [addressType , setAddressType] = useState('home');
  const [stateOptions1 , setStateOptions1] = useState([]);
  const [cityOptions1 , setCityOptions1] = useState([]);
  const [pincodeOptions1 , setPincodeOptions1] = useState([]);
  const [addAddressToggle , setAddAddressToggle] = useState(false);


  const [state , setState] = useState("");
  const [city , setCity] = useState("");
  const [pincode , setPincode] = useState("");
  const [completeAddress , setCompleteAddress] = useState("");



  


    useEffect(() => {
      getUserDetails()
      getStates()
    } , [])

    
  function openModal() {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
  
  
    const getUserDetails = async () => {
      const response = localStorage.getItem("authToken");
      if (!response) return;
    
      const userParse = JSON.parse(response);
      setUserToken(userParse);
      getAddresses(userParse);
    };




    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        borderRadius: '20px'
      },
    };



    const getAddresses = async(token) => {
      try {
        await axios.get(`${config.api}address` , {
          headers: {
              "Authorization": "Bearer " +  token ,
              "content-type": "application/json"
          }
      })
      .then(response => {
        // console.log(response)
        setAllAddress(response?.data?.data)
      })
      .catch((err) => {
        console.log(err)
      })
      }catch (error) {

      }
    }

    const getStates = async() => {
      await axios.get(config.api + 'locations/countries/678da88c9c4467c6aa4eeb86/states')
      .then((response) => {
       if (response?.data?.data) {
           const formattedStates = response.data.data.map(item => ({
               value: item._id, 
               label: item.name ,
           }));
           
           setStateOptions1(formattedStates);
       }
      })
   }


   const getCities = async(id) => {
       console.log(id)
       await axios.get(config.api + `locations/states/${id}/cities`)
      .then((response) => {
       if (response?.data?.data) {
           const formattedCities = response.data.data.map(item => ({
               value: item._id, 
               label: item.name ,
           }));
           setCityOptions1(formattedCities);
       }
      })
   }

   const getPincodes = async(id) => {
       console.log(id)
       await axios.get(config.api + `locations/cities/${id}/pincodes`)
      .then((response) => {
       if (response?.data?.data) {
           const formattedCities = response.data.data.map(item => ({
               value: item._id, 
               label: item.code ,
           }));
           setPincodeOptions1(formattedCities);
       }
      })
   }

   


  const addressTypesArray = [
      {
          name: 'home'
      },
      {
          name: 'work'
      },
      {
          name: 'hostel'
      }
  ]


  const addressValues = {
      addressType : '',
      address : '',
      state : '',
      city : '',
      pincode : ''
  }

  const lowerCaseConverter = (e) => {
      const lowercase = e.target.value.toLowerCase();
      setAddressType(lowercase);
      setOtherAddressType(e.target.value);
  }


  const handleAddAddress = async(value) => {

      const obj = {
          countryId :  "678da88c9c4467c6aa4eeb86",
          stateId :  state,
          cityId :  city,
          pincodeId :  pincode,
          addressType :  otherAddressType ? '' :  addressType == 'home' ? 'Home' : addressType == 'work' ? 'Work' : addressType == 'hostel' ? 'Hostel' : 'Home',
          customAddressType : otherAddressType,
          description :  completeAddress
      }
      console.log(obj , "obj")
      setModalIsOpen(true)
      try {
          await axios.post(`${config.api}address` , obj , {
              headers : {
                  Authorization: `Bearer ${userToken}`, 
                  "Content-Type": "application/json"
              }
          })
          .then((response) => {
            if(response?.data?.success == true) {
              console.log(response);
                toast.success('Address Added Successfully');
                setModalIsOpen(false);
                setAddAddressToggle(false);
                getAddresses(userToken)
            }
          })
          .catch((err) => {
            setModalIsOpen(false);
            setAddAddressToggle(false);
            toast.error(err?.response?.data?.message);
          });
        } catch (error) {
          setModalIsOpen(false);
          setAddAddressToggle(false);
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
      <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
      >
        <Loader/>
      </Modal>
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
                 {addAddressToggle ? <div className="add-address-form-section">
                      <div className="top-add-address-heading flex items-center gap-5 justify-between mb-6">
                        <div className="left-adder-header">
                          <h2 className='text-xl font-medium text-Black'>Add Address</h2>
                        </div>
                        <div className="right-add-closer">
                          <button type="button" className='text-red-400' onClick={() => setAddAddressToggle(false)}> <i className="ri-close-large-line text-red-400 mr-2"></i> Close</button>
                        </div>
                      </div>
                      <div className="inner-grid-section grid grid-cols-12 gap-[18px]">
                          <div className="form-inputsec relative col-span-12">
                            <Select options={stateOptions1} 
                                placeholder='Select State'
                                styles={{
                                      control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: 10,
                                          paddingLeft: 10,
                                          paddingTop: 6,
                                          paddingBottom: 6,
                                          // borderColor: errors.state ? '#FF4E4E' : '#B3B3B3',
                                          // borderColor: state.isFocused ? 'grey' : 'red',
                                      }),
                                    }}
                                    value={stateOptions1.find(option => option.value === state)}
                                    onChange={(option) => {
                                      setState(option?.value);
                                      getCities(option.value);
                                    }}
                              />
                          </div>
                          <div className="form-inputsec relative col-span-6">
                            <Select options={cityOptions1} 
                              placeholder='Select City'
                              styles={{
                                  control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderRadius: 10,
                                      paddingLeft: 10,
                                      paddingTop: 6,
                                      paddingBottom: 6,
                                      // borderColor: errors.city ? '#FF4E4E' : '#B3B3B3',
                                  //   borderColor: state.isFocused ? 'grey' : 'red',
                                  }),
                                  }}
                                  value={cityOptions1.find(option => option.value === city)}
                                  onChange={(option) => {
                                    setCity(option?.value);
                                    getPincodes(option.value);
                                  }}
                              />
                          </div>
                          <div className="form-inputsec relative col-span-6">
                            <Select options={pincodeOptions1} 
                              placeholder='Select Pincode'
                              styles={{
                                  control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderRadius: 10,
                                      paddingLeft: 10,
                                      paddingTop: 6,
                                      paddingBottom: 6,
                                      // borderColor: errors.pincode ? '#FF4E4E' : '#B3B3B3',
                                  //   borderColor: state.isFocused ? 'grey' : 'red',
                                  }),
                                  }}
                                  value={cityOptions1.find(option => option.value === pincode)}
                                  onChange={(option) => {
                                    setPincode(option?.value);
                                  }}
                              />
                          </div>
                          <div className="text-area-address-section col-span-6">
                              <div className="form-inputsec relative h-full">   
                                  <textarea  placeholder='Enter Complete Address*' onKeyUp={(e) => setCompleteAddress(e.target.value)}
                                      className={`outline-none border h-full resize-none focus:border-Secondary focus:bg-LightBlue duration-300 px-20p py-4 rounded-xl bg-white w-full text-Black  ${completeAddress == null ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                  />                                                     
                              </div>
                          </div>
                          <div className="col-span-6 multiple-selection-address-outer">
                              <div className="top-multiple-chosse-options-address">
                                  <p className='font-medium text-Black '>Select Address type</p>
                                  <div className="grid grid-cols-3 gap-x-10p mt-2 mb-3">
                                      {addressTypesArray.map((items , index) => {
                                          return (
                                              <button type='button' className={`single-address-item relative  py-2 px-5 rounded-full ${items.name == addressType ? 'bg-Secondary' : 'bg-LightGrayBg'}`} key={index} onClick={() => setAddressType(items.name)}>
                                                  <p className={`text-sm font-medium duration-300 capitalize  ${items.name == addressType ? 'text-white' : 'text-Black'}`}>{items.name}</p>
                                              </button>
                                          )
                                      })}
                                  </div>
                                  <div className="address-type-input-other">
                                      <input type="text" placeholder='Others ? Please Enter' 
                                      onKeyUp={(e) => {lowerCaseConverter(e)}}
                                          className={`outline-none border focus:border-Secondary placeholder:text-Black focus:bg-LightBlue duration-300 py-10p px-4 rounded-xl bg-white w-full text-Black lowercase`} 
                                      />                                
                                  </div>
                              </div>
                          </div>
                          <div className="bottom-form-submitter mt-5 col-span-12  overflow-hidden relative group ">
                              <button type='button' disabled={!(state && city && pincode && completeAddress)} onClick={handleAddAddress} className='w-full bg-Primary rounded-xl py-3 px-4 text-white font-semibold text-lg disabled:opacity-20'>Add Address</button>
                          </div>
                      </div>

                  </div> :
                  <div className="inner-profile-content-section">
                    <div className="profile-main-details-heading-part flex items-center justify-between gap-x-40">
                      <div className="left-main-prof-det-head">
                        <h4 className='text-Black font-medium text-lg'>Addresses</h4>
                      </div>
                      <div className="right-edit-prof-button">
                        <button type="button" onClick={() => setAddAddressToggle(true)} className='flex items-center gap-x-[15px] rounded-full bg-Primary justify-center px-6 py-2 border border-Primary duration-300 hover:bg-white group'>
                          <p className='text-white group-hover:text-Primary duration-300'>Add Address</p>
                          <i className="text-white ri-add-circle-line group-hover:text-Primary duration-300"></i>
                        </button>
                      </div>
                    </div>
                    <div className="profile-details-main-cards-section grid grid-cols-2 gap-6 mt-4">
                      {allAddress && allAddress.length > 0 ? allAddress.map((items , index) => {
                        return (
                          <div className="single-address-card-prof bg-AddressCard p-5 rounded-[15px] relative" key={index}>
                              <div className="inner-single-address-card">
                                <div className="top-address-type-number-sec flex items-center gap-6">
                                    <div className="address-type-sec flex items-center gap-2 bg-white rounded-full px-[18px] py-[6px]">
                                      <div className="address-type-icon">
                                        <i className={`${items.type == 'Home' ? 'ri-home-4-line' : items.type == 'Work' ? 'ri-building-line' : 'ri-news-line'} text-[#696969]`}></i>
                                      </div>
                                      <div className="addresstype-text">
                                        <p className='text-[#494949] font-medium'>{items.addressType}</p>
                                      </div>
                                    </div>
                                    <div className="address-number-sec">
                                        <p className='text-Black font-medium'>{items.addressNumber}</p>
                                    </div>
                                </div>
                                <div className="middle-complete-address-sec mt-5 mb-3">
                                  <p className='text-[#777777]'>{items.description}</p>
                                </div>
                                <div className="bottom-address-city-state-pin-section flex gap-10 items-center justify-between">
                                  <div className="address-city-pin flex items-center gap-5">
                                    <div className="address-city">
                                      <p className='text-Black font-medium'>{items.cityId?.name}</p>
                                    </div>
                                    <div className="address-pin">
                                      <p className='text-Black'>{items.pincodeId?.code}</p>
                                    </div>
                                  </div>
                                  <div className="address-state-sec">
                                    <p className='font-medium text-Black'>{items.stateId?.name}</p>
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
                      }) : null}
                    </div>
                  </div> }
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
