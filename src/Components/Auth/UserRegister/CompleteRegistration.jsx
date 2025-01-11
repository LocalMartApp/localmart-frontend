import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import LeftRegisterImage from '../../../assets/images/register-left-image-big.jpg';
import { Formik, Form, Field } from 'formik';
import EmailLogo from '../../../assets/images/email-icon.svg';
import { userRegEmailValidation } from '../../../utils/Validation';
import DatePicker from "react-datepicker";
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";


const CompleteRegistration = () => {

    const navigate = useNavigate();
    const [passwordHandle , setPasswordHandle] = useState(false);
    const [date, setDate] = useState(new Date());
    const [addressType , setAddressType] = useState('home');
    const [selectedValue , setSelectedValue] = useState();

    const lowerCaseConverter = (e) => {
        const lowercase = e.target.value.toLowerCase();
        setAddressType(lowercase)
    }


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
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
    



  return (
    <div className='complete-registration-main-section'>
        <div className="UserRegister">
            <div className="userlogin-main-section bg-ProfileScreensBg py-20">
                <div className="container">
                    <div className="inner-user-register-grid-section-outer bg-white rounded-20p overflow-hidden">
                        <div className="grid grid-cols-12">
                            <div className="col-span-5">
                                <div className="left-user-register-image h-full">
                                    <img src={LeftRegisterImage} className='h-full object-cover' alt="" />
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
                                                validationSchema={userRegEmailValidation}
                                                initialValues={userRegEmailValidation}
                                                onSubmit={(values) => handleEmailRegister(values)}
                                            >
                                                {({  errors, touched , handleSubmit}) => (
                                                <Form>
                                                    <div className="inner-grid-section grid grid-cols-12 gap-[18px]">
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field type="text" name="firstName" placeholder='Enter First Name*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                
                                                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2 h-full flex items-center">
                                                                <i className="ri-user-line text-xl"></i>
                                                            </div>
                                                        </div>
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field type="text" name="lastName" placeholder='Enter Last Name*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                
                                                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2 h-full flex items-center">
                                                                <i className="ri-user-line text-xl"></i>
                                                            </div>
                                                        </div>
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field type="email" name="email" placeholder='Enter Email Address*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                            />                                 
                                                            <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2 h-full flex items-center">
                                                                <img src={EmailLogo} className='max-w-[22px]' alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="form-inputsec relative col-span-6">
                                                            <Field type="number" name="mobileNumber" placeholder='Enter Mobiile Number*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 py-4 pl-70p pr-5 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
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
                                                                <i class="ri-lock-password-line text-xl opacity-70 text-Black"></i>
                                                            </div>
                                                            <button type="button" className="email-input-icon password-login-icon owa absolute right-4 top-1/2 " onClick={() => setPasswordHandle(!passwordHandle)}>
                                                                <i className={`${passwordHandle ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl text-LightText`}></i>
                                                            </button>
                                                        </div>
                                                        {/* <DatePicker
                                                            selected={date}
                                                            onChange={handleDateChange} 
                                                        /> */}
                                                        <div className="text-area-address-section col-span-7">
                                                            <div className="form-inputsec relative h-full">   
                                                                <Field as="textarea" name="address" placeholder='Enter Complete Address*'
                                                                    className={`outline-none border h-full resize-none focus:border-Secondary focus:bg-LightBlue duration-300 px-20p py-4 rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
                                                                />                                                     
                                                            </div>
                                                        </div>
                                                        <div className="col-span-5 multiple-selection-address-outer">
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
                                                                    onKeyUp={(e) => lowerCaseConverter(e)}
                                                                        className={`outline-none border focus:border-Secondary placeholder:text-Black focus:bg-LightBlue duration-300 py-10p px-4 rounded-xl bg-white w-full text-Black lowercase`} 
                                                                    />                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-inputsec relative col-span-4">
                                                            <Select options={options} 
                                                                placeholder='Select State'
                                                                styles={{
                                                                    control: (baseStyles, state) => ({
                                                                      ...baseStyles,
                                                                      borderRadius: 10,
                                                                      paddingLeft: 10,
                                                                      paddingTop: 6,
                                                                      paddingBottom: 6,
                                                                    //   borderColor: state.isFocused ? 'grey' : 'red',
                                                                    }),
                                                                  }}
                                                                onChange={(option) => setSelectedValue(option)}
                                                            />
                                                        </div>
                                                        <div className="form-inputsec relative col-span-4">
                                                            <Select options={options} 
                                                                placeholder='Select City'
                                                                styles={{
                                                                    control: (baseStyles, state) => ({
                                                                      ...baseStyles,
                                                                      borderRadius: 10,
                                                                      paddingLeft: 10,
                                                                      paddingTop: 6,
                                                                      paddingBottom: 6,
                                                                    //   borderColor: state.isFocused ? 'grey' : 'red',
                                                                    }),
                                                                  }}
                                                                onChange={(option) => setSelectedValue(option)}
                                                            />
                                                        </div>
                                                        <div className="form-inputsec relative col-span-4">
                                                            <Field type="text" name="lastName" placeholder='Enter Pincode*'
                                                                className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 h-full px-20p rounded-xl bg-white w-full text-Black  ${errors.email && touched.email ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
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