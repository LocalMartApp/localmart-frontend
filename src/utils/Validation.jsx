import * as yup from 'yup';
import { ref } from "yup";



export const LoginValidation = yup.object().shape({
    email: yup.string().email('Please Enter Valid Email').required('Email Address Required'),
})


export const LoginNumberValidation = yup.object().shape({
    number: yup.number().required('Please Enter Your Mobile Number').min(10 , "Minimum 10 Digits"),
})

export const userLoginNumberValidation = yup.object().shape({
    number: yup.number().required('Please Enter Your Mobile Number').min(10 , "Minimum 10 Digits"),
    password: yup.string().required('Please Enter Password'),
})

export const userLoginEmailValidation = yup.object().shape({
    email: yup.string().email('Please Enter Valid Email').required('Email Address Required'),
    password: yup.string().required('Please Enter Password'),
})

export const userRegEmailValidation = yup.object().shape({
    email: yup.string().email('Please Enter Valid Email').required('Email Address Required'),
})

export const userRegNumberValidation = yup.object().shape({
    mobileNumber: yup.number().required('Please Enter Your Mobile Number').min(10 , "Minimum 10 Digits"),
})


export const completeUserRegValidation = yup.object().shape({
    firstName: yup.string().required('Please Enter First Name'),
    lastName: yup.string().required('Please Enter Last Name'),
    email:  yup.string().email('Please Enter Valid Email').required('Email Address Required'),
    mobileNumber: yup.number().required('Please Enter Your Mobile Number').min(10 , "Minimum 10 Digits"),
    password: yup.string().required('Please Enter Password'),
    birthDate: yup.string().required('Please Enter Birthdate'),
    address:  yup.string().required('Please Enter Complete Address'),
    state: yup.string().required('Please Select State'),
    city: yup.string().required('Please Select City'),
    pincode: yup.string().required('Please Enter Pincode'),
})


export const AddAddressValidationSchema = yup.object().shape({
    addressType: yup.string().required('Please Select Address Type'),
    address:  yup.string().required('Please Enter Complete Address'),
    state: yup.string().required('Please Select State'),
    city: yup.string().required('Please Select City'),
    pincode: yup.string().required('Please Enter Pincode'),
})


export const businessFormAddValidation = yup.object().shape({
    userName: yup.string().required('Enter User Name'),
    businessName: yup.string().required('Please enter business name'),
    businessTitle: yup.string().notRequired(),
    aboutBusiness: yup.string().notRequired(),
    mobileNumber: yup.number().notRequired(),
    email: yup.string().email('Please Enter Valid Email').notRequired(''),
    socialMedia: yup.string().url().notRequired(),
    completeAddress: yup.string().required('Enter complete address'),
    landmark: yup.string().notRequired(),    
    pincode: yup.string().notRequired(''),
    yearlyTurnOver: yup.string().notRequired(''),
    noOfEmployees: yup.number().notRequired(''),
    yearOfEstablishment: yup.number().notRequired(''),
    websiteAddress: yup.string().notRequired(), 
    GSTNumber: yup.string().notRequired(),
    itemName:  yup.string().notRequired(),
    itemType:  yup.string().notRequired(),
    itemPrice: yup.string().notRequired(),
    workingHours:   yup.string().notRequired('') ,
    servicesOffer:  yup.string().notRequired(''),
    businessCategory: yup.string().notRequired(''),
    businessState: yup.string().notRequired(''),
    businessCity: yup.string().notRequired(''),
    
})






// export const businessFormAddValidation = yup.object().shape({
//     userName: yup.string().notRequired(''),
//     businessName: yup.string().required('Please Enter Business Name'),
//     businessTitle: yup.string().notRequired(),
//     mobileNumber: yup.number().notRequired(),
//     email: yup.string().email('Please Enter Valid Email').notRequired(''),
//     socialMedia: yup.string().url().notRequired(),
//     completeAddress: yup.string().required('Please Enter Complete Address'),
//     landmark: yup.string().notRequired(),    
//     pincode: yup.string().required('Please Enter Pincode'),
//     yearlyTurnOver: yup.string().required('Please Enter  yearly turn over'),
//     noOfEmployees: yup.number().required('Please Enter Number of Employees').min(1 , "Minimum 1 Digit"),
//     yearOfEstablishment: yup.number().required('Please Enter Year of Establishment').min(1 , "Minimum 1 Digit"),
//     websiteAddress: yup.string().notRequired(), 
//     GSTNumber: yup.string().notRequired(),
//     itemName:  yup.string().notRequired(),
//     itemType:  yup.string().notRequired(),
//     itemPrice: yup.string().notRequired(),
//     workingHours:   yup.string().required('Please select this field'),    
//     servicesOffer:  yup.string().required('Please select this field'),
//     businessCategory: yup.string().required('Please select this field'),
//     businessState: yup.string().required('Please select this field'),
//     businessCity: yup.string().required('Please select this field'),
    
// })


export const businessMediaValidation = yup.object().shape({
    itemName:  yup.string().notRequired(),
    itemType:  yup.string().notRequired(),
    itemPrice: yup.string().notRequired(),
})


export const profileEditValidation = yup.object().shape({
    firstName: yup.string().required('Please Enter First Name'),
    lastName: yup.string().required('Please Enter Last Name'),
    birthDate: yup.string().required('Please Enter Birthdate'),
    state: yup.string().required('Please Select State'),
    city: yup.string().required('Please Select City'),
    pincode: yup.string().required('Please Enter Pincode'),
})

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Please Enter new password'),
  confirmPassword: yup.string().required("Please confirm your password").oneOf([ref("password")], "Passwords do not match"),
})



export const addAdvertValidation = yup.object().shape({
    email: yup.string().email('Please Enter Valid Email').required('Email Address Required'),
    firstName: yup.string().required('Please Enter First Name'),
    lastName: yup.string().required('Please Enter Last Name'),
    mobileNumber: yup.number().required('Please Enter Your Mobile Number').min(10 , "Minimum 10 Digits"),
    alternateMobile: yup.number().required('Please Enter Your Mobile Number').min(10 , "Minimum 10 Digits"),
    // advertTitle: yup.string().required('Please Enter Advertisement Title'),
    // advertLink: yup.string().url().required('Please Enter Advertisement Link (URL)'),
    // subject: yup.string().required('Please Enter Subject'),
    // message: yup.string().required('Please Enter Message'),
})



