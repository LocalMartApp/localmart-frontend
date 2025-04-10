import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Advertise.scss";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../utils/Loader/Loader";
import Modal from "react-modal";
import FileUploadIcon from "../../assets/images/file-upload-icon.svg";
import axios from "axios";
import { config } from "../../env-services";
import { Formik, Field, Form } from "formik";
import { addAdvertValidation } from "../../utils/Validation";

const Advertise = () => {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [advertImage, setAdvertImage] = useState();
  const [advertImgPrev, setAdvertImgPrev] = useState();

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

  const advertValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    alternateMobile: "",
    // advertTitle: "",
    // advertLink: "",
    // subject: "",
    // message: "",
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return; // If no file is selected, do nothing

    if (file.size > 2 * 1024 * 1024) {
      alert(`File ${file.name} exceeds 2MB and will not be uploaded.`);
      return;
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Only JPEG and PNG formats are allowed.");
      return;
    }

    const base64 = await fileToBase64(file);
    setAdvertImage(file);
    setAdvertImgPrev(base64);
  };

  const removeFile = () => {
    setAdvertImage(null);
    setAdvertImgPrev(null);
  };

  // Function to convert file to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  function numbersOnly(e) {
    var key = e.key;
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      e.preventDefault();
    } else {
      // console.log("You pressed a key: " + key);
    }
  }

  const handleAddAdvert = async (values) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("mobileNumber", values.mobileNumber);
    formData.append("alternateMobileNumber", values.alternateMobile);
    // formData.append("advertisementTitle", values.advertTitle);
    // formData.append("advertisementLink", values.advertLink);
    // formData.append("subject", values.subject);
    // formData.append("message", values.message);
    // formData.append("file", advertImage);

    console.log("formData", formData);
    setModalIsOpen(true);
    try {
      await axios
        .post(`${config.api}admin/advertisements`, formData, {
          headers: {
            //   Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response?.data?.success == true) {
            toast.success("Advertisment Created Successfully");
            setModalIsOpen(false);
            // const busId = response?.data?.data?._id
            navigate('/')
          } else {
            toast.error("Error in Creating Advertisment");
            setModalIsOpen(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setModalIsOpen(false);
        });
      // console.log("Response:", response.data);
    } catch (error) {
      setModalIsOpen(false);
    }
  };

  return (
    <div className="Advertise">
      <div className="add-advertisement mani-add-business-section bg-DashboardGray w-full">
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Loader />
        </Modal>
        <div className="container">
        <div className="inner-add-business-section  py-8 ">
          <button
            type="button"
            className="goback-button-sec flex items-center gap-x-4 mb-5"
            onClick={() => navigate(-1)}
          >
            <div className="backarrow-sec w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl"></i>
            </div>
            <h4 className="font-medium ">Back</h4>
          </button>
          <div className="inner-main-business-form-section">
            <div className="">
              <div className="bottom-form-section-business-add">
                <div className="inner-business-form-section">
                  <div className="single-form-section-business">
                    <Formik
                      validationSchema={addAdvertValidation}
                      initialValues={advertValues}
                      onSubmit={(values) => handleAddAdvert(values)}
                    >
                      {({ errors, touched, handleSubmit, setFieldValue, values }) => (
                        <Form>
                          <div className="main-business-former-sec flex flex-col gap-10">
                            <div className="single-form-section-business business-basic-details  rounded-[15px] bg-white">
                              <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
                                <h4 className="text-lg font-medium text-Secondary">
                                  Basic Details
                                </h4>
                              </div>
                              <div className="inner-fields-grid-outer-main p-6 grid grid-cols-12 gap-5 items-end">
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
                                <div className="form-inputsec relative col-span-12">
                                  <div className="label-section mb-1">
                                    <p className="text-BusinessFormLabel">
                                      Email Address
                                    </p>
                                  </div>
                                  <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email*"
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${
                                      errors.email && touched.email
                                        ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                        : "text-Black border-LoginFormBorder placeholder:text-Black"
                                    }`}
                                  />
                                </div>
                                <div className="form-inputsec relative col-span-6">
                                  <div className="label-section mb-1">
                                    <p className="text-BusinessFormLabel">
                                      Mobile Number
                                    </p>
                                  </div>
                                  <Field
                                    type="tel"
                                    name="mobileNumber"
                                    placeholder="Enter Mobile Number*"
                                    maxLength={10}
                                    onKeyPress={(e) => numbersOnly(e)}
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${
                                      errors.mobileNumber &&
                                      touched.mobileNumber
                                        ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                        : "text-Black border-LoginFormBorder placeholder:text-Black"
                                    }`}
                                  />
                                </div>
                                <div className="form-inputsec relative col-span-6">
                                  <div className="label-section mb-1">
                                    <p className="text-BusinessFormLabel">
                                      Alternate Mobile Number
                                    </p>
                                  </div>
                                  <Field
                                    type="tel"
                                    name="alternateMobile"
                                    placeholder="Enter Alternate Mobile Number*"
                                    maxLength={10}
                                    onKeyPress={(e) => numbersOnly(e)}
                                    className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${
                                      errors.alternateMobile &&
                                      touched.alternateMobile
                                        ? "border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500"
                                        : "text-Black border-LoginFormBorder placeholder:text-Black"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="bottom-form-submitter col-span-5  overflow-hidden relative group ">
                              <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full py-4 px-4 rounded-xl text-white font-semibold text-lg h-full bg-Primary disabled:bg-opacity-35 "
                              >
                                Submit Advertisement
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
      </div>
    </div>
  );
};

Advertise.propTypes = {};

Advertise.defaultProps = {};

export default Advertise;
