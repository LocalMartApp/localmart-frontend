import React, { useState , useEffect , useRef } from 'react';
import PropTypes from 'prop-types';
import './BusinessFormAdding.scss';
import { Formik , Form , Field } from 'formik';
import { businessFormAddValidation } from '../../utils/Validation';
import Select from 'react-select';
import FileUploadIcon from '../../assets/images/file-upload-icon.svg';
import makeAnimated from 'react-select/animated';
import VegIcon from '../../assets/images/veg-icon.svg';
import NonVegIcon from '../../assets/images/non-veg-icon.svg';
import MapIcon from '../../assets/images/maps-icon-input.svg';



import { GoogleMap , LoadScript , Marker , useJsApiLoader , StandaloneSearchBox } from '@react-google-maps/api';


const animatedComponents = makeAnimated();

const GOOGLE_MAPS_API_KEY = "AIzaSyCfHCytpE0Oq4tvXmCWaOl05iyH_OfLGuM";


const BusinessFormAdding = () => {
  

  const [stateSelect , setStateSelect] = useState('');
  const [citySelect , setCitySelect] = useState('');
  const [busCateSelect , setBusCateSelect] = useState('');
  const [businessDoc , setBusinessDoc] = useState();
  const [multiAmentites , setMultiAmenities] = useState();
  const [businessPhotos , setBusinessPhotos] = useState([]);
  const [foodItemsArray , setFoodItemsArray] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 17.0005, lng: 81.8040 });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const inputRef = useRef(null)


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })



  const handlePlacesChange = () => {
    const places = inputRef.current.getPlaces();
    if (places.length > 0) {
      const location = places[0].geometry.location;
      const lat = location.lat();
      const lng = location.lng();

      setMapCenter({ lat, lng });
      setSelectedLocation({ lat, lng });
      // console.log(`Selected Location: Latitude: ${lat}, Longitude: ${lng}`);
    }
  }


  // console.log(selectedLocation , "selectedLocation")





  const businessAddValues = {
      userName: '',
      businessName: '',
      businessState: '',
      businessCity: '',
      businessTitle: '',
      businessCategory: '',
      mobileNumber: '',
      workingHours: '',
      servicesOffer: '',
      email: '',
      socialMedia: '',
      completeAddress: '',
      landmark: '',
      pincode: '',
      yearlyTurnOver: '',
      noOfEmployees: '',
      yearOfEstablishment: '',
      websiteAddress: '',
      GSTNumber: '',
      itemName: '',
      itemType: '',
      itemPrice: ''
  }

  const stateOptions = [
    { value: 'Andhrapradesh', label: 'Andhrapradesh' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Banglore', label: 'Banglore' },
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

  const amenities = [
    { value: 'Free Wifi', label: 'Free Wifi' },
    { value: 'Parking', label: 'Parking' },
    { value: 'Music', label: 'Music' },
    { value: 'Air Condition', label: 'Air Condition' },
    { value: 'Entertainement', label: 'Entertainement' },
  ]


  const workingHours = [
    { value: '10:00 AM - 6:00 PM 8Hrs', label: '10:00 AM - 6:00 PM 8Hrs' },
    { value: '09:00 AM - 6:00 PM 9Hrs', label: '09:00 AM - 6:00 PM 9Hrs' },
    { value: '10:00 AM - 10:00 PM 12Hrs', label: '10:00 AM - 10:00 PM 12Hrs' },
  ]


  const servicesOffered = [
    { value: 'B2B (Business-to-Business)', label: 'B2B (Business-to-Business)' },
    { value: 'B2C (Business-to-Consumer)', label: 'B2C (Business-to-Consumer)' },
    { value: 'Both', label: 'Both' },
  ]

  const busCateOptions = [
    { value: 'Hospitals', label: 'Hospitals' },
    { value: 'Home Decors', label: 'Home Decors' },
    { value: 'Packers & Movers', label: 'Packers & Movers' },
    { value: 'Car Rental', label: 'Car Rental' },
    { value: 'Restaurants', label: 'Restaurants' },
  ]


  const foodItemTypes = [
    { value: 'Veg', label: 'Veg' },
    { value: 'Non-Veg', label: 'Non-Veg' },
  ]



  
  // const handleFileChange = async (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   const validFiles = selectedFiles.filter(file =>
  //     file.type === 'image/jpeg' || file.type === 'image/png'
  //   );

  //   if (validFiles.length < selectedFiles.length) {
  //     alert('Only JPEG and PNG files are allowed!');
  //   }

  // 
  //   const base64Photos = await Promise.all(
  //     validFiles.map(file => fileToBase64(file))
  //   );

  //   setBusinessPhotos((prevPhotos) => [...prevPhotos, ...base64Photos]);
  // };




  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
  
    const validFiles = selectedFiles.filter(file => {
      if (file.size > 2 * 1024 * 1024) { 
        alert(`File ${file.name} exceeds 2MB and will not be uploaded.`);
        return false;
      }
      return file.type === 'image/jpeg' || file.type === 'image/png';
    });
  
    // if (validFiles.length < selectedFiles.length) {
    //   alert('Only JPEG and PNG files under 2MB are allowed!');
    // }
    const base64Photos = await Promise.all(
      validFiles.map(file => fileToBase64(file))
    );
  
    setBusinessPhotos((prevPhotos) => [...prevPhotos, ...base64Photos]);
  };



  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const addFoodItem = (values) => {
    const { itemName, itemType, itemPrice } = values;
    const newFoodItem = { itemName, itemType, itemPrice };
    setFoodItemsArray((prevFoodItemsArray) => [...prevFoodItemsArray, newFoodItem]);
  };

  const removeFoodItem = (index) => {
    setFoodItemsArray((prevFoodItemsArray) =>
      prevFoodItemsArray.filter((_, i) => i !== index) // Remove item at the given index
    );
  };


  const handleRemoveImage = (indexToRemove) => {
    setBusinessPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleAddingBusiness = (data) => {
    console.log(data)
  }

  return (
    <div className="BusinessFormAdding bg-LightBlue bg-opacity-80">
        <div className="inner-main-business-form-section py-50p">
          <div className="container">
            <div className="top-business-form-heading mb-10">
              <h2 className='font-medium text-Black text-2xl'>Add Business</h2>
            </div>
            <div className="bottom-form-section-business-add">
              <div className="inner-business-form-section">
                <div className="single-form-section-business">
                  <Formik
                      validationSchema={businessFormAddValidation}
                      initialValues={businessAddValues}
                      onSubmit={(values) => handleAddingBusiness(values)}
                  >
                      {({  errors, touched , handleSubmit , setFieldValue , values}) => (
                      <Form>
                        <div className="main-business-former-sec flex flex-col gap-10">
                          <div className="single-form-section-business business-basic-details overflow-hidden rounded-[15px] bg-white">
                            <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                              <h4 className='text-lg font-medium text-Secondary'>Basic Details</h4>
                            </div>
                            <div className="inner-fields-grid-outer-main p-6 grid grid-cols-12 gap-5">
                              <div className="form-inputsec relative col-span-4">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>User Name*</p>
                                </div>
                                <Field type="text" name="userName" placeholder='Enter User Name*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.userName && touched.userName ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-8">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Business Name*</p>
                                </div>
                                <Field type="text" name="businessName" placeholder='Enter Business Name*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.businessName && touched.businessName ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-12">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Business Title(optional)</p>
                                </div>
                                <Field type="text" name="businessTitle" placeholder='Enter Business Name*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black border-LoginFormBorder placeholder:text-Black`} 
                                />                                
                              </div>
                            </div>
                          </div>
                          <div className="single-form-section-business business-basic-details overflow-hidden rounded-[15px] bg-white">
                            <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                              <h4 className='text-lg font-medium text-Secondary'>Contact Information</h4>
                            </div>
                            <div className="inner-fields-grid-outer-main p-6 grid grid-cols-12 gap-5">
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Mobile Number*</p>
                                </div>
                                <Field type="number" name="mobileNumber" placeholder='Enter Mobile Number*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.mobileNumber && touched.mobileNumber ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Email Address*</p>
                                </div>
                                <Field type="email" name="email" placeholder='Enter Email Address*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-12">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Social Media Links(optional)</p>
                                </div>
                                <Field type="text" name="socialMedia" placeholder='Enter Social Media Link'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black border-LoginFormBorder placeholder:text-Black`} 
                                />
                              </div>
                            </div>
                          </div>
                          <div className="single-form-section-business business-basic-details rounded-[15px] bg-white">
                            <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                              <h4 className='text-lg font-medium text-Secondary'>Address Information</h4>
                            </div>
                            <div className="inner-fields-grid-outer-main p-6 grid grid-cols-12 gap-5">
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Select Sate*</p>
                                </div>
                                <Select options={stateOptions} 
                                  placeholder='Choose State'
                                  name='businessState'
                                  styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 10,
                                        paddingLeft: 8,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        borderWidth: 1,
                                        outlineWidth: 0,
                                        borderColor: errors.businessState ? '#FF4E4E' : '#B3B3B3',
                                        fontSize: 16,
                                        minWidth: '100%',
                                        height: 50,
                                        // borderColor: state.isFocused ? 'grey' : 'red',
                                        boxShadow: state.isFocused ? 'none' : 'none',
                                        
                                      }),
                                    }}
                                  value={stateOptions.find(option => option.value === values.businessState)} 
                                  onChange={(option) => setFieldValue('businessState', option ? option.value : '')}
                                  
                                />                               
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Select City*</p>
                                </div>
                                <Select options={cityOptions} 
                                  placeholder='Choose City'
                                  name='businessCity'
                                  styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 10,
                                        paddingLeft: 8,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        borderWidth: 1,
                                        outlineWidth: 0,
                                        borderColor: errors.businessCity ? '#FF4E4E' : '#B3B3B3',
                                        fontSize: 16,
                                        minWidth: '100%',
                                        height: 50,
                                        // borderColor: state.isFocused ? 'grey' : 'red',
                                        boxShadow: state.isFocused ? 'none' : 'none',
                                        
                                      }),
                                    }}
                                  value={cityOptions.find(option => option.value === values.businessCity)} 
                                  onChange={(option) => setFieldValue('businessCity', option ? option.value : '')}
                                />                               
                              </div>
                              <div className="form-inputsec relative col-span-12">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Complete Address*</p>
                                </div>
                                <Field as="textarea" name="completeAddress" placeholder='Enter Complete Address*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 h-32 resize-none rounded-lg bg-white w-full text-Black  ${errors.completeAddress && touched.completeAddress ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Landmark (optional)</p>
                                </div>
                                <Field type="text" name="landmark" placeholder='Enter Landmark '
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.landmark && touched.landmark ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Pincode*</p>
                                </div>
                                <Field type="text" name="pincode" placeholder='Enter Pincode '
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.pincode && touched.pincode ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                            </div>
                          </div>
                          <div className="single-form-section-business business-basic-details overflow-hidden rounded-[15px] bg-white">
                            <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                              <h4 className='text-lg font-medium text-Secondary'>Detailed Business Address</h4>
                            </div>
                            <div className="inner-fields-grid-outer-main p-6 ">
                              {isLoaded && 
                                <>
                                  <StandaloneSearchBox
                                    onLoad={(ref) => inputRef.current = ref}
                                    onPlacesChanged={handlePlacesChange}
                                  >
                                    <div className="google-search-map-input-sec relative">
                                      <div className="left-map-icon absolute left-6 top-1/2">
                                        <img src={MapIcon} className='w-6 h-6 object-contain' alt="" />
                                      </div>
                                      <input type="text" placeholder="Search for a place..." className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 pl-12 pr-5 py-3 rounded-lg bg-white w-full text-Black `} />
                                    </div>
                                  </StandaloneSearchBox>
                                  <div className="google-map-section-business-form rounded-xl overflow-hidden mt-5">
                                    <GoogleMap
                                        mapContainerStyle={{ width: '100%', height: '300px' }}
                                        center={mapCenter}
                                        zoom={14}
                                      >
                                        {selectedLocation && <Marker position={selectedLocation} />}
                                    </GoogleMap>
                                  </div>
                                </>
                              }
                            </div>
                          </div>
                          <div className="single-form-section-business business-basic-details rounded-[15px] bg-white">
                            <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                              <h4 className='text-lg font-medium text-Secondary'>Business Information</h4>
                            </div>
                            <div className="inner-fields-grid-outer-main p-6 grid grid-cols-12 gap-5">
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Business Category*</p>
                                </div>
                                <Select options={busCateOptions} 
                                  placeholder='Select Business Category'
                                  name='businessCategory'
                                  styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 10,
                                        paddingLeft: 8,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        borderWidth: 1,
                                        outlineWidth: 0,
                                        borderColor: errors.businessCategory ? '#FF4E4E' : '#B3B3B3',
                                        fontSize: 16,
                                        minWidth: '100%',
                                        height: 50,
                                        // borderColor: state.isFocused ? 'grey' : 'red',
                                        boxShadow: state.isFocused ? 'none' : 'none',
                                        
                                      }),
                                    }}
                                  value={busCateOptions.find(option => option.value === values.businessCategory)} 
                                  onChange={(option) => setFieldValue('businessCategory', option ? option.value : '')}
                                />                               
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Yearly Turnover*</p>
                                </div>
                                <Field type="text" name="yearlyTurnOver" placeholder='Enter Yearly Turnover*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.yearlyTurnOver && touched.yearlyTurnOver ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Number of Employees**</p>
                                </div>
                                <Field type="number" name="noOfEmployees" placeholder='Enter Number of Employees*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.noOfEmployees && touched.noOfEmployees ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Year of Establishment*</p>
                                </div>
                                <Field type="text" name="yearOfEstablishment" placeholder='Enter Year of Establishment '
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.yearOfEstablishment && touched.yearOfEstablishment ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Website Address(optional)</p>
                                </div>
                                <Field type="text" name="websiteAddress" placeholder='Enter Website URL '
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.websiteAddress && touched.websiteAddress ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>GST Number(optional)</p>
                                </div>
                                <Field type="text" name="GSTNumber" placeholder='Enter GST Number '
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.GSTNumber && touched.GSTNumber ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Business Registration Documents*</p>
                                </div>
                                <div className="file-upload-outer-section-custom bg-ProfileScreensBg rounded-10p overflow-hidden relative h-50p">
                                    <input type="file" name="" id="" onChange={(e) => setBusinessDoc(e.target.files[0])} className={`h-full w-full opacity-0 relative z-10 cursor-pointer ${businessDoc ? 'hidden' : 'block'}`}/>
                                    {businessDoc ? 
                                      <div className="inner-file-upload-butifier absolute top-1/2 left-1/2 w-full flex items-center px-5 gap-x-5 justify-between">
                                        <p className='text-Black'>{businessDoc?.name}</p>
                                        <button type="button" onClick={() => setBusinessDoc('')} className='w-7 h-7 bg-white rounded-full flex items-center justify-center'><i className="ri-close-large-fill text-red-500"></i></button>
                                      </div> : 
                                      <div className="inner-file-upload-butifier absolute top-1/2 left-1/2 w-full flex items-center px-5 gap-x-5">
                                        <img src={FileUploadIcon} className='w-7 h-7' alt="" />
                                        <p className='text-Black'>Click to Upload Registration document</p>
                                      </div>
                                    }
                                </div>                             
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Amenities*</p>
                                </div>
                                <Select options={amenities} 
                                  placeholder='Select Amenities'
                                  isMulti
                                  components={animatedComponents}
                                  closeMenuOnSelect={false}
                                  styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 10,
                                        paddingLeft: 8,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        borderWidth: 1,
                                        outlineWidth: 0,
                                        borderColor: '#B3B3B3',
                                        fontSize: 16,
                                        minWidth: '100%',
                                        minHeight: 50,
                                        // borderColor: state.isFocused ? 'grey' : 'red',
                                        boxShadow: state.isFocused ? 'none' : 'none',
                                      }),
                                    }}
                                  value={multiAmentites}
                                  onChange={(option) => setMultiAmenities(option)}
                                />                               
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Working Hours*</p>
                                </div>
                                <Select options={workingHours} 
                                  placeholder='Select Working Hours'
                                  name='workingHours'
                                  styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 10,
                                        paddingLeft: 8,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        borderWidth: 1,
                                        outlineWidth: 0,
                                        borderColor: errors.workingHours ? '#FF4E4E' : '#B3B3B3',
                                        fontSize: 16,
                                        minWidth: '100%',
                                        minHeight: 50,
                                        // borderColor: state.isFocused ? 'grey' : 'red',
                                        boxShadow: state.isFocused ? 'none' : 'none',
                                      }),
                                    }}
                                  value={workingHours.find(option => option.value === values.workingHours)} 
                                  onChange={(option) => setFieldValue('workingHours', option ? option.value : '')}
                                />                               
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Services Offered*</p>
                                </div>
                                <Select options={servicesOffered} 
                                  placeholder='Select Services Offered'
                                  styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 10,
                                        paddingLeft: 8,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        borderWidth: 1,
                                        outlineWidth: 0,
                                        borderColor: errors.servicesOffer ? '#FF4E4E' : '#B3B3B3',
                                        fontSize: 16,
                                        minWidth: '100%',
                                        minHeight: 50,
                                        // borderColor: state.isFocused ? 'grey' : 'red',
                                        boxShadow: state.isFocused ? 'none' : 'none',
                                      }),
                                    }}
                                  value={servicesOffered.find(option => option.value === values.servicesOffer)} 
                                  onChange={(option) => setFieldValue('servicesOffer', option ? option.value : '')}
                                />                               
                              </div>
                            </div>
                          </div>

                          <div className="single-form-section-business business-basic-details overflow-hidden rounded-[15px] bg-white">
                            <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                              <h4 className='text-lg font-medium text-Secondary'>Business Pics and media</h4>
                            </div>
                            <div className="inner-fields-grid-outer-main p-6 grid grid-cols-12 gap-5">
                              <div className="form-inputsec relative col-span-12">
                                <div className={`top-images-sec-uploaded-business-doc flex flex-wrap items-center gap-3 ${businessPhotos.length == 0 ? 'mb-0' : 'mb-5'}`}>
                                  {businessPhotos.map((photo , index) => {
                                    return (
                                      <div className="single-image-business-photo rounded-lg overflow-hidden relative" key={index}>
                                        <img src={photo} className='object-cover w-32 h-32' alt="" />
                                        <button type="button" onClick={() => handleRemoveImage(index)} className='w-6 h-6 bg-white rounded-full flex items-center justify-center absolute top-2 right-2'><i className="ri-close-large-fill text-red-500"></i></button>
                                      </div>
                                    )
                                  })}
                                </div>
                                <div className="label-section mb-1">
                                  <p className='text-BusinessFormLabel'>Business Photos and media*</p>
                                </div>
                                <div className="file-upload-outer-section-custom bg-ProfileScreensBg rounded-10p overflow-hidden relative h-[110px]">
                                    <input type="file" name="" id="" multiple onChange={(e) => handleFileChange(e)} className="h-full w-full opacity-0 relative z-10 cursor-pointer"/>
                                    <div className="inner-file-upload-butifier absolute top-1/2 left-1/2 w-full flex justify-center flex-col items-center px-5 gap-x-5">
                                      <img src={FileUploadIcon} className='w-10 h-10' alt="" />
                                      <p className='text-Black'>Click to Upload photos of your business</p>
                                    </div>
                                </div>                               
                              </div>
                            </div>
                          </div>


                          <div className="single-form-section-business business-basic-details overflow-hidden rounded-[15px] bg-white">
                            <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                              <h4 className='text-lg font-medium text-Secondary'>Items and info</h4>
                            </div>
                            <div className="inner-fields-grid-outer-main p-6 ">
                                <div className="gray-bg-block-inner-fields-section bg-ProfileScreensBg grid grid-cols-12 gap-5 p-5 rounded-[15px]">
                                  <div className="form-inputsec relative col-span-4">
                                    <div className="label-section mb-1">
                                      <p className='text-BusinessFormLabel'>Item Name*</p>
                                    </div>
                                    <Field type="text" name="itemName" placeholder='Enter Item Name' onChange={(e) => setFieldValue('itemName' , e.target.value)}
                                        className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.itemName && touched.itemName ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                    />                                
                                  </div>
                                  <div className="form-inputsec relative col-span-4">
                                    <div className="label-section mb-1">
                                      <p className='text-BusinessFormLabel'>Item Type*</p>
                                    </div>
                                    <Select options={foodItemTypes} 
                                        placeholder='Select Item Type'
                                        styles={{
                                            control: (baseStyles, state) => ({
                                              ...baseStyles,
                                              borderRadius: 10,
                                              paddingLeft: 8,
                                              paddingTop: 4,
                                              paddingBottom: 4,
                                              borderWidth: 1,
                                              outlineWidth: 0,
                                              borderColor: '#B3B3B3',
                                              fontSize: 16,
                                              minWidth: '100%',
                                              height: 50,
                                              boxShadow: state.isFocused ? 'none' : 'none',
                                            }),
                                          }}
                                          value={foodItemTypes.find(option => option.value === values.itemType)} 
                                          onChange={(option) => setFieldValue('itemType', option ? option.value : '')}
                                      />                                                           
                                  </div>
                                  <div className="form-inputsec relative col-span-4">
                                    <div className="label-section mb-1">
                                      <p className='text-BusinessFormLabel'>Item Price*</p>
                                    </div>
                                    <Field type="number" name="itemPrice" placeholder='Enter Item Price Per Person*' onChange={(e) => setFieldValue('itemPrice' , e.target.value)}
                                        className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black border-LoginFormBorder placeholder:text-Black`} 
                                    />                                
                                  </div>
                                  <div className="items-add-btn-sec col-span-2">
                                    <button type="button" disabled={!values.itemName || !values.itemPrice || !values.itemType } className='py-3 px-6 rounded-lg bg-Secondary text-white font-semibold w-full disabled:bg-opacity-40' onClick={() => addFoodItem(values)}>Add Item</button>
                                  </div>
                                </div>
                                <div className={`items-cards-looped-sec-business-form grid grid-cols-12 gap-4 ${foodItemsArray.length == 0 ? 'mt-0' : 'mt-5'}`}>
                                    {foodItemsArray.map((items , index) => {
                                      return (
                                        <div className="single-food-item-searched bg-AddressCard rounded-[15px] p-5 relative col-span-3" key={index}>
                                          <div className="top-veg-nonveg-part flex items-center gap-x-2">
                                              <img src={items.itemType == 'Veg' ? VegIcon : NonVegIcon} className='w-[14px] h-[14px]' alt="" />
                                              <p className='text-Black'>{items.itemName}</p>
                                          </div>  
                                          <div className="bottom-price-section mt-3">
                                            <h4 className='text-Black font-medium'>₹{items.itemPrice} / <span className='text-sm opacity-50'>person</span></h4>
                                          </div>
                                          <button type="button" onClick={() => removeFoodItem(index)} className='w-6 h-6 bg-white rounded-full flex items-center justify-center absolute top-2 right-2'><i className="ri-close-large-fill text-red-500"></i></button>
                                        </div>
                                      )
                                    })}
                                </div>
                            </div>
                          </div>
                          <div className="bottom-form-submitter col-span-5  overflow-hidden relative group ">
                              <button type='button' onClick={handleSubmit} disabled={!businessDoc || businessPhotos.length === 0} className='w-full py-5 px-4 rounded-xl text-white font-semibold text-xl h-full bg-Primary disabled:bg-opacity-35 '>Submit Business Listing</button>
                          </div>
                        </div>
                      </Form>
                      )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

BusinessFormAdding.propTypes = {};

BusinessFormAdding.defaultProps = {};

export default BusinessFormAdding;
