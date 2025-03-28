import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { config } from "../../../env-services";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader/Loader";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { profileEditValidation } from "../../../utils/Validation";
import Select from 'react-select';
import { useAuth } from "../../../utils/AuthContext";



const EditProfile = ({profileData , setEditProfile}) => {


  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
  };


  console.log(profileData)

    const navigate = useNavigate();
    const { authToken , getProfileData} = useAuth();



  const [userToken, setUserToken] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincodes, setPincodes] = useState([]);

  useEffect(() => {
    getUserDetails();
    getStates()
  }, []);

  useEffect(() => {
    getCities(profileData?.state?._id)
    getPincodes(profileData?.city?._id)
  }, []);
  

  const getUserDetails = async () => {
    const response = localStorage.getItem("authToken");
    if (!response) return;

    const userParse = JSON.parse(response);
    setUserToken(userParse);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      borderRadius: 18,
      paddingLeft: 40,
    },
  };

  const profileEditValues = {
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    birthDate: formatDateForInput(profileData?.dateOfBirth) || '',
    state: profileData?.state?._id || '' , 
    city: profileData?.city?._id || '',
    pincode: profileData?.pincode?._id || '',
  };


  // console.log(profileEditValues , userData)

  const getStates = async () => {
    await axios
      .get(config.api + "locations/countries/678da88c9c4467c6aa4eeb86/states")
      .then((response) => {
        if (response?.data?.data) {
          const formattedStates = response?.data?.data.map((item) => ({
            value: item._id,
            label: item.name,
          }));

          setStates(formattedStates);
        }
      });
  };

  const getCities = async (id) => {
    await axios
      .get(config.api + `locations/states/${id}/cities`)
      .then((response) => {
        if (response?.data?.data) {
          const formattedCities = response?.data?.data.map((item) => ({
            value: item._id,
            label: item.name,
          }));
          setCities(formattedCities);
        }
      });
  };

  const getPincodes = async (id) => {

    await axios
      .get(config.api + `locations/cities/${id}/pincodes`)
      .then((response) => {
        if (response?.data?.data) {
          const formattedCities = response.data.data.map((item) => ({
            value: item._id,
            label: item.code,
          }));
          setPincodes(formattedCities);
        }
      });
  };


//   const allMobileViewDetailsProfile = [
//     {
//       title: 'First Name',
//       desc: userData?.firstName
//     },
//     {
//       title: 'Last Name',
//       desc: userData?.lastName
//     },
//     {
//       title: 'Date Of Birth',
//       desc: userData?.dateOfBirth
//     },
//     {
//       title: 'Email Address',
//       desc: userData?.email
//     },
//     {
//       title: 'Phone Number',
//       desc: userData?.mobileNumber
//     },
//     {
//       title: 'User Since',
//       desc: formatDate(userData?.createdAt)
//     },
//     {
//       title: 'Country',
//       desc: userData?.country?.name
//     },
//     {
//       title: 'State',
//       desc: userData?.state?.name
//     },
//     {
//       title: 'City',
//       desc: userData?.city?.name
//     }
//   ]

  const handleUpdateProfile = async (data) => {

    const obj = {
      firstName : data?.firstName,
      lastName : data?.lastName,
      dateOfBirth : data?.birthDate,
      countryId : profileData?.country?._id,
      stateId : data?.state,
      cityId : data?.city,
      pincodeId : data?.pincode,
    }

    // console.log(obj)
    setModalIsOpen(true)
    
    try {
      await axios.put(`${config.api}auth/update-details` , obj , {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        // console.log(response)
        if(response?.data?.success == true) {
            setModalIsOpen(false)
            toast.success('Profile Updated Successfully');
            setEditProfile(false)
            getProfileData(authToken)
        }else {
            setModalIsOpen(false)
            toast.error('Error Updating Profile');
        }
      })
      .catch((err) => {
        setModalIsOpen(false)
        toast.error(err?.message);
        toast.error(err?.response?.data?.message);
        // console.log(err , 'error')
      });
    } catch (error) {
      setModalIsOpen(false)
      console.log(error)
    }
  };

  return (
    <div className="edit-profile-main-section">
      <div className="BusinessFormAdding bg-LightBlue bg-opacity-80">
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Edit Profile Loader"
        >
          <Loader />
        </Modal>
        <div className="inner-main-business-form-section py-50p">
          <div className="container">
            <button
              type="button"
              className="goback-button-sec flex items-center gap-x-4 mb-5"
              onClick={() => setEditProfile(false)}
            >
              <div className="backarrow-sec w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <i className="ri-arrow-left-line text-xl"></i>
              </div>
              <h4 className="font-medium ">Back to Profile</h4>
            </button>
            
            <div className="bottom-form-section-business-add">
              <div className="inner-business-form-section">
                <div className="single-form-section-business">
                  <Formik
                    validationSchema={profileEditValidation}
                    initialValues={profileEditValues}
                    onSubmit={(values) => handleUpdateProfile(values)}
                  >
                    {({ errors, touched, handleSubmit, setFieldValue, values }) => (
                      <Form>
                        <div className="main-business-former-sec flex flex-col gap-10">
                          <div className="single-form-section-business business-basic-details  rounded-[15px] bg-white">
                            <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                              <h4 className="text-lg font-medium text-Secondary">
                                Update Profile Details
                              </h4>
                            </div>
                            <div className="inner-fields-grid-outer-main p-6 grid grid-cols-12 gap-5">
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className="text-BusinessFormLabel">
                                    First Name*
                                  </p>
                                </div>
                                <Field
                                  type="text"
                                  name="firstName"
                                  placeholder="Enter First Name*"
                                  className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${
                                    errors.firstName && touched.firstName
                                      ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                      : "text-Black border-LoginFormBorder placeholder:text-Black"
                                  }`}
                                />
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className="text-BusinessFormLabel">
                                    Last Name*
                                  </p>
                                </div>
                                <Field
                                  type="text"
                                  name="lastName"
                                  placeholder="Enter Last Name*"
                                  className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${
                                    errors.lastName && touched.lastName
                                      ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                      : "text-Black border-LoginFormBorder placeholder:text-Black"
                                  }`}
                                />
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className="text-BusinessFormLabel">
                                    Birth Date*
                                  </p>
                                </div>
                                <Field
                                  type="date"
                                  name="birthDate"
                                  placeholder="Enter Birthdate*"
                                  className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${
                                    errors.birthDate && touched.birthDate
                                      ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                      : "text-Black border-LoginFormBorder placeholder:text-Black"
                                  }`}
                                />
                              </div>

                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className="text-BusinessFormLabel">
                                    Select Sate*
                                  </p>
                                </div>
                                <Select
                                  options={states}
                                  placeholder="Choose State"
                                  name="state"
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderRadius: 10,
                                      paddingLeft: 8,
                                      paddingTop: 4,
                                      paddingBottom: 4,
                                      borderWidth: 1,
                                      outlineWidth: 0,
                                      borderColor: errors.businessState
                                        ? "#FF4E4E"
                                        : "#B3B3B3",
                                      fontSize: 16,
                                      minWidth: "100%",
                                      height: 50,
                                      // borderColor: state.isFocused ? 'grey' : 'red',
                                      boxShadow: state.isFocused ? "none" : "none",
                                    }),
                                  }}
                                  value={states.find((option) => option.value === values.state)}
                                  onChange={(option) => { setFieldValue( "state", option ? option.value : "" ) ,  getCities(option.value)}}
                                />
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className="text-BusinessFormLabel">
                                    Select City*
                                  </p>
                                </div>
                                <Select
                                  options={cities}
                                  placeholder="Choose City"
                                  name="businessCity"
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderRadius: 10,
                                      paddingLeft: 8,
                                      paddingTop: 4,
                                      paddingBottom: 4,
                                      borderWidth: 1,
                                      outlineWidth: 0,
                                      borderColor: errors.businessCity
                                        ? "#FF4E4E"
                                        : "#B3B3B3",
                                      fontSize: 16,
                                      minWidth: "100%",
                                      height: 50,
                                      // borderColor: state.isFocused ? 'grey' : 'red',
                                      boxShadow: state.isFocused
                                        ? "none"
                                        : "none",
                                    }),
                                  }}
                                  value={cities.find(
                                    (option) => option.value === values.city
                                  )}
                                  onChange={(option) => {
                                    setFieldValue(
                                      "city",
                                      option ? option.value : ""
                                    ),
                                      getPincodes(option.value);
                                  }}
                                />
                              </div>
                              <div className="form-inputsec relative col-span-6">
                                <div className="label-section mb-1">
                                  <p className="text-BusinessFormLabel">
                                    Select Pincode*
                                  </p>
                                </div>
                                <Select
                                  options={pincodes}
                                  placeholder="Choose Pincode"
                                  name="pincode"
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderRadius: 10,
                                      paddingLeft: 8,
                                      paddingTop: 4,
                                      paddingBottom: 4,
                                      borderWidth: 1,
                                      outlineWidth: 0,
                                      borderColor: errors.businessCity
                                        ? "#FF4E4E"
                                        : "#B3B3B3",
                                      fontSize: 16,
                                      minWidth: "100%",
                                      height: 50,
                                      // borderColor: state.isFocused ? 'grey' : 'red',
                                      boxShadow: state.isFocused
                                        ? "none"
                                        : "none",
                                    }),
                                  }}
                                  value={pincodes.find(
                                    (option) => option.value === values.pincode
                                  )}
                                  onChange={(option) =>
                                    setFieldValue(
                                      "pincode",
                                      option ? option.value : ""
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="bottom-form-submitter col-span-5  overflow-hidden relative group ">
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="w-full py-5 px-4 rounded-xl text-white font-semibold text-xl h-full bg-Primary disabled:bg-opacity-35 "
                            >
                              Update Profile Details
                            </button>
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
    </div>
  );
};

export default EditProfile;
