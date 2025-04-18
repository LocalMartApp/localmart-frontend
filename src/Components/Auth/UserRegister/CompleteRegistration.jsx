import React , {useState , useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LeftRegisterImage from '../../../assets/images/register-left-image-big.jpg';
import { Formik, Form, Field } from 'formik';
import EmailLogo from '../../../assets/images/email-icon.svg';
import DobLogo  from '../../../assets/images/dob-icon.svg'
import { completeUserRegValidation } from '../../../utils/Validation';
// import DatePicker from "react-datepicker";
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";
import authServices from '../../Services/auth-services.jsx';
import axios from 'axios';
import { config } from '../../../env-services';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import Loader from '../../../utils/Loader/Loader.jsx';




const CompleteRegistration = () => {

    
    const navigate = useNavigate();
    const location = useLocation();

    const [passwordHandle , setPasswordHandle] = useState(false);
    const [date, setDate] = useState(new Date());
    const [addressType , setAddressType] = useState('home');
    const [otherAddressType , setOtherAddressType] = useState();
    const [selectedValue , setSelectedValue] = useState();
    const [stateOptions1 , setStateOptions1] = useState([]);
    const [cityOptions1 , setCityOptions1] = useState([]);
    const [pincodeOptions1 , setPincodeOptions1] = useState([]);
    const [modalIsOpen ,  setModalIsOpen] = useState(false)

    const receivedMail = location.state?.readEmail || '';
    const receivedToken = location.state?.token || '';


    console.log(receivedToken , "token")


    const lowerCaseConverter = (e) => {
        const lowercase = e.target.value.toLowerCase();
        setAddressType(lowercase);
        setOtherAddressType(e.target.value);
    }


    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          borderRadius: 18,
          paddingLeft: 40
        },
    };



    useEffect(() => {
        getStates()
    }, [])


    const stateOptions = [
        { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
        { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
        { value: 'Telangana', label: 'Telangana' },
        { value: 'Amaravathi', label: 'Amaravathi' }
    ]

    const cityOptions = [
        { value: 'Kakinada', label: 'Kakinada' },
        { value: 'Rajahmundry', label: 'Rajahmundry' },
        { value: 'Vizag', label: 'Vizag' },
        { value: 'Vijayawada', label: 'Vijayawada' }
    ]
         

    const handleDateChange = (value) => {
        console.log(value)
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

    
    function numbersOnly(e) {
        var key = e.key;
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            e.preventDefault();
        }
        else {
            console.log("You pressed a key: " + key);
        }
    }

    

    const completeRegValues = {
        firstName: '',
        lastName: '',
        email: receivedMail ? receivedMail : '',
        mobileNumber: '',
        password: '',
        birthDate: '',
        address: '',
        state: '',
        city: '',
        pincode: '',
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


    const handleUserRegistration = async(data) => {

        const obj = {
            firstName :  data.firstName,
            lastName :  data.lastName,
            email :  data.email,
            mobileNumber :  data.mobileNumber,
            password :  data.password,
            dateOfBirth : data.birthDate,
            countryId :  "678da88c9c4467c6aa4eeb86",
            stateId :  data.state,
            cityId :  data.city,
            pincode :  data.pincode,
            addressType :  addressType == 'home' ? 'Home' : addressType == 'work' ? 'Work' : addressType == 'hostel' ? 'Hostel' : 'Home',
            customAddressType : otherAddressType,
            description :  data.address
        }


        // console.log("obj" , obj)

        setModalIsOpen(true)

        try {
            await axios.post(`${config.api}auth/completeUserProfile` , obj , {
                headers : {
                    Authorization: `Bearer ${receivedToken}`, 
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
              if(response) {
                  toast.success('Account Registered Successfully');
                  navigate('/login')
                  setModalIsOpen(false)
              }
            })
            .catch((err) => {
              setModalIsOpen(false)
              toast.error(err?.response?.data?.message);
            });
          } catch (error) {
            setModalIsOpen(false)
          }
    }



    



  return (
    <div className='complete-registration-main-section'>
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <Loader/>
        </Modal>
        <div className="UserRegister">
            <div className="userlogin-main-section bg-ProfileScreensBg py-20">
                <div className="container">
                    <div className="inner-user-register-grid-section-outer bg-white rounded-20p ">
                        <div className="grid grid-cols-12">
                            <div className="col-span-5">
                                <div className="left-user-register-image h-full">
                                    <img src={LeftRegisterImage} className='h-full object-cover rounded-l-20p' alt="" />
                                </div>
                            </div>
                            <div className="col-span-7">
                                <div className="right-side-user-register-form-section px-10 py-10">
                                    <div className="top-register-heading-section mb-10">
                                        <h2 className='text-2xl font-medium text-Black'>Regitser your account</h2>
                                        <p className='text-Black opacity-50'>fill details and Register to explore more on localmart</p>
                                    </div>
                                    <div className="complete-det-registerform-section">
                                        <div className="inner-registration-form-grid-outer-section">
                                            <Formik
                                                validationSchema={completeUserRegValidation}
                                                initialValues={completeRegValues}
                                                onSubmit={(values) => handleUserRegistration(values)}
                                            >
                                                {({  errors, touched , handleSubmit , values , setFieldValue}) => (
                                                <Form>
                                                    <div className="inner-grid-section grid grid-cols-12 gap-[18px]">
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field type="text" name="firstName" placeholder='Enter First Name*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.firstName && touched.firstName ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                
                                                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2 h-full flex items-center">
                                                                <i className="ri-user-line text-xl"></i>
                                                            </div>
                                                        </div>
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field type="text" name="lastName" placeholder='Enter Last Name*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.lastName && touched.lastName ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                
                                                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2 h-full flex items-center">
                                                                <i className="ri-user-line text-xl"></i>
                                                            </div>
                                                        </div>
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field type="email" name="email" placeholder='Enter Email Address*' value={receivedMail} disabled={receivedMail ? true : false}
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                 
                                                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2 h-full flex items-center">
                                                                <img src={EmailLogo} className='max-w-[22px]' alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field type="tel" name="mobileNumber" placeholder='Enter Mobiile Number*' onKeyPress={(e) => numbersOnly(e)} maxLength={10}
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.mobileNumber && touched.mobileNumber ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                
                                                            <div className="email-input-icon pr-3 border-r border-r-BorderColor absolute left-4 top-1/2 h-full flex items-center">
                                                                <p className='text-Black font-medium'>+91</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field type={passwordHandle ? 'text' : 'password'} name="password" placeholder='Enter Password*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-20 pr-5 rounded-xl bg-white w-full text-Black  ${errors.password && touched.password ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                
                                                            <div className="email-input-icon text-center pr-4 border-r border-r-BorderColor absolute left-4 top-1/2 h-full flex items-center">
                                                                <i className="ri-lock-password-line text-xl opacity-70 text-Black"></i>
                                                            </div>
                                                            <button type="button" className="email-input-icon password-login-icon owa absolute right-4 top-1/2 " onClick={() => setPasswordHandle(!passwordHandle)}>
                                                                <i className={`${passwordHandle ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl text-LightText`}></i>
                                                            </button>
                                                        </div>
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field name="birthDate">
                                                                {({ field, form }) => (
                                                                    <input
                                                                        {...field}
                                                                        // type="date"
                                                                        onFocus={(e) => (e.target.type = "date")}
                                                                        onBlur={(e) => {
                                                                            if (!e.target.value) e.target.type = "text";
                                                                        }}
                                                                        className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.birthDate && touched.birthDate ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                                        placeholder="Select Birthdate"
                                                                    />
                                                                )}
                                                            </Field>
                                                            {/* <Field type="date" name="birthDate" placeholder='Enter BirthDate*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                  */}
                                                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2 h-full flex items-center">
                                                                <img src={DobLogo} className='max-w-[18px]' alt="" />
                                                            </div>
                                                        </div>
                                                        {/* <DatePicker
                                                            selected={date}
                                                            onChange={handleDateChange} 
                                                        /> */}
                                                        <div className="text-area-address-section col-span-7">
                                                            <div className="form-inputsec relative h-full">   
                                                                <Field as="textarea" name="address" placeholder='Enter Complete Address*'
                                                                    className={`outline-none border h-full resize-none focus:border-Secondary focus:bg-LightBlue duration-300 px-20p py-4 rounded-xl bg-white w-full text-Black  ${errors.address && touched.address ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                                />                                                     
                                                            </div>
                                                        </div>
                                                        <div className="col-span-5 multiple-selection-address-outer">
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
                                                        <div className="form-inputsec relative col-span-4">
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
                                                                  onChange={(option) => {setFieldValue('state', option ? option.value : '') , getCities(option.value)}}
                                                            />
                                                        </div>
                                                        <div className="form-inputsec relative col-span-4">
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
                                                                  onChange={(option) => {setFieldValue('city', option ? option.value : '')}}
                                                            />
                                                        </div>
                                                        <div className="form-inputsec relative col-span-4">
                                                            <Field type="number" name="pincode" placeholder='Enter Pincode*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 h-full px-5 rounded-xl bg-white w-full text-Black  ${errors.pincode && touched.pincode ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                
                                                        </div>
                                                        <div className="bottom-form-submitter mt-5 col-span-12  overflow-hidden relative group bg-Primary rounded-xl">
                                                            <button type='button' onClick={handleSubmit} className='w-full py-3 px-4 text-white font-semibold text-lg '>Submit & Register</button>
                                                        </div>
                                                    </div>
                                                </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                    <div className="bottom-dont-havean-account mt-6">
                                        <button type="button" className='text-Black' onClick={() => navigate('/login')}>
                                        <p>Already Have an Account , Click here to <span className='text-Secondary font-medium'>Login</span></p>
                                        </button>
                                    </div>
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

export default CompleteRegistration