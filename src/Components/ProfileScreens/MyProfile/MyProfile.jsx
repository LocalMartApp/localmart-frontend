import React ,  {useState , useEffect}  from 'react';
import PropTypes from 'prop-types';
import './MyProfile.scss';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';
// import ProfileImage from '../../../assets/images/profile-image.svg';
import ProfileDummyImg from '../../../assets/images/profile-dummy-image.svg';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../../env-services';
import Loader from '../../../utils/Loader/Loader';
import toast from 'react-hot-toast';




const MyProfile = () => {

  const navigate = useNavigate()
  const [userToken ,  setUserToken] = useState();
  const [userData , setUserData] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profilePicModal , setProfilePicModal] = useState(false);
  const [profPic , setProPic] = useState();
  const [preview, setPreview] = useState(); 
  

    useEffect(() => {
      getUserDetails()
    } , [])
  



      const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
          const allowedTypes = ["image/jpeg", "image/png"];

          if (!allowedTypes.includes(file.type)) {
            alert("Only JPG and PNG images are allowed.");
            return;
          }
    
          if (file.size > 2 * 1024 * 1024) {
            alert("File size must be 2MB or less.");
            return;
          }    

          setProPic(file);
          setPreview(URL.createObjectURL(file)); 
        }
      };
  
    const getUserDetails = async () => {
      const response = localStorage.getItem("authToken");
      if (!response) return;
    
      const userParse = JSON.parse(response);
      setUserToken(userParse);
      getPorfileData(userParse);
    };



    const formatDate = (isoString) => {
      return new Date(isoString)
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-");
    };
    

  function openModal() {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false)
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
      borderRadius: 15
    },
  };

  const firstNameDetails = [
    {
      title: 'First Name',
      desc: userData?.firstName
    },
    {
      title: 'Last Name',
      desc: userData?.lastName
    },
    {
      title: 'Date Of Birth',
      desc: userData?.dateOfBirth
    }
  ]


  const emailDetails = [
    {
      title: 'Email Address',
      desc: userData?.email
    },
    {
      title: 'Phone Number',
      desc: userData?.mobileNumber
    },
    {
      title: 'User Since',
      desc: formatDate(userData?.createdAt)
    }
  ]

  const localityDetails = [
    {
      title: 'Country',
      desc: userData?.country?.name
    },
    {
      title: 'State',
      desc: userData?.state?.name
    },
    {
      title: 'City',
      desc: userData?.city?.name
    }
  ]

  const getPorfileData = async(token) => {
        await axios.get(`${config.api}auth/user-details`, {
          headers: {
            Authorization: "Bearer " + token, 
            "content-type": "application/json"
          },
        }).then((response) => {
          console.log(response);
          setUserData(response?.data?.data)
        }).catch((err) => {
          // console.log(err)
        })
  }


  const handleUploadPoriflePic = async () => {

    const formData = new FormData()
    formData.append("file", profPic);


    console.log("formData" , formData);


    setModalIsOpen(true);

    try {
      await axios.post(`${config.api}auth/upload-profile-picture`, formData , {
        headers: {
          Authorization: `Bearer ${userToken}`, 
        },
      })
      .then((response) => {
        console.log(response)
        if(response?.data) {
            toast.success('Profile Pic Uploaded Successfully');
            setModalIsOpen(false)
            setProfilePicModal(false)
            getPorfileData(userToken)
        }else {
            toast.error('Error in upload file');
            setModalIsOpen(false)
        }

      }).catch((err) => {
        console.log(err)
        setModalIsOpen(false)
      })
    } catch (error) {
      setModalIsOpen(false)
    }
  }


  return (
    <div className="MyProfile">
      <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
          
      >
        <Loader/>
      </Modal>
      <Modal
          isOpen={profilePicModal}
          style={customStyles}
          contentLabel="Example Modal"
          
      >
        <div className="upload-profile-photo-section-modal p-3">
          <div className="inner-upload-profile-photo-section">
              <h4 className='text-2xl  mb-8'>Click on below to upload profile picture</h4>
              <div className="top-onclickprofile-pic relative h-48 w-48 mx-auto">
                  <input type="file" onChange={(e) => handleFileChange(e) }  name="" id="" className='opacity-0 h-full w-full relative z-10 cursor-pointer'/>
                  <img src={preview ? preview : userData?.profilePicture ? userData?.profilePicture : ProfileDummyImg} className='rounded-full absolute top-0 left-0 w-full' alt="" />
                <div className="button-upload-icon w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full absolute bottom-0 right-5">
                  <i class="ri-upload-cloud-2-fill text-xl text-Primary"></i>
                </div>
              </div>
              <div className="bottom-details-section bg-ProfileScreensBg rounded-lg p-5 mt-8">
                <div className="inner-single-lists">
                  <p className='text-Secondary font-semibold text-xl'>{userData?.firstName + " " + userData?.lastName}</p>
                  <p className='text-Black opacity-60'>{userData?.email}</p>
                  <p className='text-Black opacity-60'>{userData?.state?.name + " , " + userData?.city?.name}</p>
                </div>
              </div>
              <div className="bottom-two-cancel-upload-buttons flex items-center justify-between mt-8">
                  <div className="cancel-button w-[48%]">
                    <button type="button" onClick={() => setProfilePicModal(false)} className='bg-LightGrayBg w-full px-5 py-3 rounded-md text-lg border-Black border border-opacity-40'>Cancel</button>
                  </div>
                  <div className="upload-button w-[48%]">
                    <button type="button" disabled={!profPic} onClick={() => handleUploadPoriflePic()} className='bg-Primary px-5 w-full py-3 text-lg rounded-md text-white disabled:opacity-50'>Upload</button>
                  </div>
              </div>
          </div>
        </div>
      </Modal>
      <div className="my-profile-inner-section bg-ProfileScreensBg">
        <div className="top-similar-header-section-profile-screens mb-30p">
          <div className="container">
            <div className="top-similar-header-section-profile-inner flex items-center gap-10 justify-between">
              <div className="left-profilescreens-heading">
                <h4 className='text-xl text-Black font-medium'>My Account</h4>
              </div>
              <div className="right-add-business-button">
                <button type="button" onClick={() => navigate('/business/add-business')}>
                  <div className="list-business-btn-inner flex items-center gap-3">
                    <div className="left-icon-list-business">
                      <i className="ri-shake-hands-line text-Secondary text-2xl"></i>
                    </div>
                    <div className="right-list-business-text">
                      <p className='text-Secondary text-xl font-medium'>List Your Businesses</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className=" profile-section-navigation-details-card bg-white py-8 px-8 rounded-20p similar-profile-sidebar-outer">
              <div className="grid grid-cols-12 gap-9 profile-sidebar-main-grid">
                <div className="col-span-3 left-sidebar-section-proile border-r border-BorderColor border-opacity-40">
                    <ProfileSideBar/>
                </div>
                <div className="col-span-9 right-profile-content-section">
                    <div className="profile-main-details-heading-part flex items-center justify-between gap-x-40">
                      <div className="left-main-prof-det-head">
                        <h4 className='text-Black font-medium text-lg'>Your Profile</h4>
                      </div>
                      <div className="right-edit-prof-button">
                        <button type="button"  className='flex items-center gap-x-[15px] rounded-full bg-Primary justify-center px-6 py-2 border border-Primary duration-300 hover:bg-white group'>
                          <p className='text-white group-hover:text-Primary duration-300'>Edit Profile</p>
                          <i className="text-white ri-edit-line group-hover:text-Primary duration-300"></i>
                        </button>
                      </div>
                    </div>
                    <div className="profile-details-main-cards-section flex flex-col gap-y-6 mt-4">
                      <div className="profile-card flex items-center gap-x-10 justify-between pl-5 pr-8 py-4 border border-ProfileCardBorder rounded-[15px]">
                        <div className="left-image-name-section-profile flex items-center gap-6">
                          <div className="profile-image">
                            <img src={userData?.profilePicture ? userData.profilePicture : ProfileDummyImg} className='rounded-full w-16 h-16' alt="" />
                          </div>
                          <div className="profile-details-prof">
                            <h6 className='text-Black font-medium'>{userData?.firstName} {userData?.lastName} </h6>
                            <p className='text-LightText'>{userData?.email}</p>
                          </div>
                        </div>
                        <button type='button' onClick={() => setProfilePicModal(true)} className="right-phone-number-prof-section flex items-center gap-x-[15px]">
                          <i class="ri-upload-cloud-2-fill text-Secondary"></i>
                          <p className='text-Secondary font-medium'>Update Profile image</p>
                        </button>
                      </div>
                      <div className="profile-information-details-bottom-part  px-5 py-4 border border-ProfileCardBorder rounded-[15px]">
                          <div className="left-sdie-profile-info-heading">
                            <h4 className='text-lg font-medium text-Black'>Personal Information</h4>
                          </div>
                          <div className="combined-details-screen-profile flex items-center gap-20 mb-12 mt-3">
                            {firstNameDetails.map((items , index)=> {
                              return (
                                <div className="single-detail-profile-sec" key={index}>
                                  <p className='text-LightBlack opacity-50'>{items.title}</p>
                                  <h6 className='text-Black '>{items.desc}</h6>
                                </div>
                              )
                            })}
                          </div>
                          <div className="combined-details-screen-profile flex items-center gap-20  mb-12">
                            {emailDetails.map((items , index)=> {
                              return (
                                <div className="single-detail-profile-sec" key={index}>
                                  <p className='text-LightBlack opacity-50'>{items.title}</p>
                                  <h6 className='text-Black '>{items.desc}</h6>
                                </div>
                              )
                            })}
                          </div>
                          <div className="combined-details-screen-profile flex items-center gap-20">
                            {localityDetails.map((items , index)=> {
                              return (
                                <div className="single-detail-profile-sec" key={index}>
                                  <p className='text-LightBlack opacity-50'>{items.title}</p>
                                  <h6 className='text-Black '>{items.desc}</h6>
                                </div>
                              )
                            })}
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
}

MyProfile.propTypes = {};

MyProfile.defaultProps = {};

export default MyProfile;
