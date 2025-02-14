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

export const businessFormAddValidation = yup.object().shape({
    userName: yup.string().required('Please Enter User Name'),
    businessName: yup.string().required('Please Enter Business Name'),
    businessTitle: yup.string().notRequired(),
    mobileNumber: yup.number().required('Please Enter Your Mobile Number').min(10 , "Minimum 10 Digits"),
    email: yup.string().email('Please Enter Valid Email').required('Email Address Required'),
    socialMedia: yup.string().notRequired(),
    completeAddress: yup.string().required('Please Enter Complete Address'),
    landmark: yup.string().notRequired(),    
    pincode: yup.string().required('Please Enter Pincode'),
    yearlyTurnOver: yup.string().required('Please Enter  yearly turn over'),
    noOfEmployees: yup.number().required('Please Enter Number of Employees').min(1 , "Minimum 1 Digit"),
    yearOfEstablishment: yup.number().required('Please Enter Year of Establishment').min(1 , "Minimum 1 Digit"),
    websiteAddress: yup.string().notRequired(), 
    GSTNumber: yup.string().notRequired(),
    itemName:  yup.string().notRequired(),
    itemType:  yup.string().notRequired(),
    itemPrice: yup.string().notRequired(),
    workingHours:   yup.string().required('Please select this field'),    
    servicesOffer:  yup.string().required('Please select this field'),
    businessCategory: yup.string().required('Please select this field'),
    businessState: yup.string().required('Please select this field'),
    businessCity: yup.string().required('Please select this field'),
    
})

// export const signupschema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Please enter valid Email")
//     .required('Email Address is Required'),
//   name: yup.string().required('Please Enter Your Name'),
//   number: yup.number().required('Please Enter Your Mobile Number').min(10 , "reuiresd"),
//   password: yup.string().required('Please create a password'),
//   confirmPassword: yup 
//   .string()
//   .required("Please confirm your password")
//   .oneOf([ref("password")], "Passwords do not match"),
// })



