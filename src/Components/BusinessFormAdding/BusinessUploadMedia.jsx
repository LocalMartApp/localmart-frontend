import React, { useState } from 'react'
import { Formik , Form , Field } from 'formik';
import './BusinessFormAdding.scss';
import { businessFormAddValidation } from '../../utils/Validation';
import Select from 'react-select';
import FileUploadIcon from '../../assets/images/file-upload-icon.svg';
import VegIcon from '../../assets/images/veg-icon.svg';
import NonVegIcon from '../../assets/images/non-veg-icon.svg';
import { useLocation , useNavigate } from 'react-router-dom';


const BusinessUploadMedia = () => {

    const location = useLocation();
    const navigate = useNavigate();


    const receivedResponse = location.state?.response || '';

    console.log(receivedResponse , "response")



    const [businessPhotos , setBusinessPhotos] = useState([]);
    const [foodItemsArray , setFoodItemsArray] = useState([]);



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

  return (
    <div className='business-media-upload bg-LightBlue bg-opacity-80 BusinessFormAdding'>
        <div className="inner-business-media-upload py-50p">
            <div className="container">
                <div className="top-business-form-heading mb-10">
                    <h2 className='font-medium text-Black text-2xl'>Add Business Photos & Items</h2>
                </div>
                <div className="business-upload-media-sec">
                    <Formik
                        validationSchema={businessFormAddValidation}
                        initialValues={businessAddValues}
                        onSubmit={(values) => handleAddingBusiness(values)}
                    >
                    {({  errors, touched , handleSubmit , setFieldValue , values}) => (
                        <Form>
                            <div className="inner-upload-meida-business-section flex flex-col gap-10">
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
                                    <button type='button' onClick={handleSubmit} disabled={businessPhotos.length === 0} className='w-full py-5 px-4 rounded-xl text-white font-semibold text-xl h-full bg-Primary disabled:bg-opacity-35 '>Submit Business Listing</button>
                                </div>
                            </div>
                        </Form>
                    )}
                    </Formik>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BusinessUploadMedia