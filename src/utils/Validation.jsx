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



