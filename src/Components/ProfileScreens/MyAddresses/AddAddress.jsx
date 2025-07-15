import React , { useState , useEffect } from 'react'
import { AddAddressValidationSchema } from '../../../utils/Validation';
import { Formik , Field , Form } from 'formik';
import axios from 'axios';
import { config } from '../../../env-services';
import toast from 'react-hot-toast';

const AddAddress = () => {

    const [otherAddressType , setOtherAddressType] = useState();
    const [addressType , setAddressType] = useState('home');
    const [stateOptions1 , setStateOptions1] = useState([]);
    const [cityOptions1 , setCityOptions1] = useState([]);
    const [pincodeOptions1 , setPincodeOptions1] = useState([]);
    const [userToken , setUserToken] = useState('')

    useEffect(() => {
        getStates()
        getUserDetails()
    }, [])
    

    const getUserDetails = async () => {
        const response = localStorage.getItem("authToken");
        if (!response) return;
      
        const userParse = JSON.parse(response);
        setUserToken(userParse);
    };


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
        addressType : "",
        customAddressType : "",
        completeAddress : "",
        stateId : "",
        cityId : "",
        pincodeId : ""
    }

    const lowerCaseConverter = (e) => {
        const lowercase = e.target.value.toLowerCase();
        setAddressType(lowercase);
        setOtherAddressType(e.target.value);
    }


    const handleAddAddress = async(data) => {

        const obj = {
            countryId :  "678da88c9c4467c6aa4eeb86",
            stateId :  data.stateId,
            cityId :  data.cityId,
            pincode :  data.pincodeId,
            addressType :  addressType == 'home' ? 'Home' : addressType == 'work' ? 'Work' : addressType == 'hostel' ? 'Hostel' : 'Home',
            customAddressType : otherAddressType,
            description :  data.completeAddress
        }

        setModalIsOpen(true)

        try {
            await axios.post(`${config.api}address` , obj , {
                headers : {
                    Authorization: `Bearer ${userToken}`, 
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
              if(response) {
                  toast.success('Address Added Successfully');
                //   console.log(response , 'userreg-res');
                  navigate('/profile/my-addresses')
                  setModalIsOpen(false)
              }
            })
            .catch((err) => {
              setModalIsOpen(false)
              toast.error(err?.response?.data?.message);
            //   console.log(err , 'error')
            });
          } catch (error) {
            setModalIsOpen(false)
            // console.log(error)
          }
    }

  return (
    <div>
        <Formik
            validationSchema={AddAddressValidationSchema}
            initialValues={addressValues}
            onSubmit={(values) => handleAddAddress(values)}
        >
            {({  errors, touched , handleSubmit , values , setFieldValue}) => (
                <Form>
                    <div className="inner-grid-section grid grid-cols-12 gap-[18px]">
                        <div className="form-inputsec relative col-span-6">
                            <Select options={stateOptions1} 
                                placeholder='Select State'
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        paddingTop: 6,
                                        paddingBottom: 6,
                                        borderColor: errors.state ? '#FF4E4E' : '#B3B3B3',
                                    //   borderColor: state.isFocused ? 'grey' : 'red',
                                    }),
                                    }}
                                    value={stateOptions1.find(option => option.value === values.state)} 
                                    onChange={(option) => {setFieldValue('stateId', option ? option.value : '') , getCities(option.value)}}
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
                                        borderColor: errors.city ? '#FF4E4E' : '#B3B3B3',
                                    //   borderColor: state.isFocused ? 'grey' : 'red',
                                    }),
                                    }}
                                    value={cityOptions1.find(option => option.value === values.city)} 
                                    onChange={(option) => {setFieldValue('cityId', option ? option.value : '') , getPincodes(option.value)}}
                            />
                        </div>
                        <div className="form-inputsec relative col-span-6">
                            {/* <Select options={pincodeOptions1} 
                                placeholder='Select Pincode'
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        paddingTop: 6,
                                        paddingBottom: 6,
                                        borderColor: errors.city ? '#FF4E4E' : '#B3B3B3',
                                    //   borderColor: state.isFocused ? 'grey' : 'red',
                                    }),
                                    }}
                                    value={pincodeOptions1.find(option => option.value === values.city)} 
                                    onChange={(option) => setFieldValue('pincodeId', option ? option.value : '')}
                            /> */}
                             <Field type="number" name="pincodeId" placeholder='Enter Pincode*'
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 h-full px-5 rounded-xl bg-white w-full text-Black  ${errors.pincodeId && touched.pincodeId ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />  
                        </div>
                        <div className="text-area-address-section col-span-12">
                            <div className="form-inputsec relative h-full">   
                                <Field as="textarea" name="completeAddress" placeholder='Enter Complete Address*'
                                    className={`outline-none border h-full resize-none focus:border-Secondary focus:bg-LightBlue duration-300 px-20p py-4 rounded-xl bg-white w-full text-Black  ${errors.completeAddress && touched.completeAddress ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                />                                                     
                            </div>
                        </div>
                        <div className="col-span-12 multiple-selection-address-outer">
                            <div className="top-multiple-chosse-options-address">
                                <p className='font-medium text-Black '>Select Address type</p>
                                <div className="grid grid-cols-3 gap-x-10p mt-2 mb-3">
                                    {addressTypesArray.map((items , index) => {
                                        return (
                                            <button className={`single-address-item relative  py-2 px-5 rounded-full ${items.name == addressType ? 'bg-Secondary' : 'bg-LightGrayBg'}`} key={index} onClick={() => setAddressType(items.name)}>
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
                        <div className="bottom-form-submitter mt-5 col-span-12  overflow-hidden relative group bg-Primary rounded-xl">
                            <button type='button' onClick={handleSubmit} className='w-full py-3 px-4 text-white font-semibold text-lg '>Submit & Register</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default AddAddress