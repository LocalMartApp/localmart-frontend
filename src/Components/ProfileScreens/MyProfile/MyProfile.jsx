import React ,  {useState}  from 'react';
import PropTypes from 'prop-types';
import './MyProfile.scss';
import ProfileSideBar from '../../../Shared/ProfileSideBar/ProfileSideBar';
import ProfileImage from '../../../assets/images/profile-image.svg';
import Modal from 'react-modal';

const MyProfile = () => {

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false)
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
    },
  };

  const firstNameDetails = [
    {
      title: 'First Name',
      desc: 'Carlson Jason'
    },
    {
      title: 'Last Name',
      desc: 'Jason Doe'
    },
    {
      title: 'Date Of Birth',
      desc: '18-12-1995'
    }
  ]


  const emailDetails = [
    {
      title: 'Email Address',
      desc: 'carlsonjason1234@gmail.com'
    },
    {
      title: 'Phone Number',
      desc: '+91 915 845 9541'
    },
    {
      title: 'Gender',
      desc: 'Male'
    }
  ]

  return (
    <div className="MyProfile">
      <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
          
      >
        <button type="button" className='text-Black font-medium text-lg' onClick={closeModal}>Close MODAL</button>
      </Modal>
      <div className="my-profile-inner-section bg-ProfileScreensBg">
        <div className="top-similar-header-section-profile-screens mb-30p">
          <div className="container">
            <div className="top-similar-header-section-profile-inner flex items-center gap-10 justify-between">
              <div className="left-profilescreens-heading">
                <h4 className='text-xl text-Black font-medium'>My Account</h4>
              </div>
              <div className="right-add-business-button">
                <button type="button">
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
          <div className=" profile-section-navigation-details-card bg-white py-8 px-8 rounded-20p">
              <div className="grid grid-cols-12 gap-9">
                <div className="col-span-3 left-sidebar-section-proile border-r border-BorderColor border-opacity-40">
                    <ProfileSideBar/>
                </div>
                <div className="col-span-9 right-profile-content-section">
                    <div className="profile-main-details-heading-part flex items-center justify-between gap-x-40">
                      <div className="left-main-prof-det-head">
                        <h4 className='text-Black font-medium text-lg'>Your Profile</h4>
                      </div>
                      <div className="right-edit-prof-button">
                        <button type="button" onClick={openModal} className='flex items-center gap-x-[15px] rounded-full bg-Primary justify-center px-6 py-2 border border-Primary duration-300 hover:bg-white group'>
                          <p className='text-white group-hover:text-Primary duration-300'>Edit Profile</p>
                          <i className="text-white ri-edit-line group-hover:text-Primary duration-300"></i>
                        </button>
                      </div>
                    </div>
                    <div className="profile-details-main-cards-section flex flex-col gap-y-6 mt-4">
                      <div className="profile-card flex items-center gap-x-10 justify-between px-5 py-4 border border-ProfileCardBorder rounded-[15px]">
                        <div className="left-image-name-section-profile flex items-center gap-6">
                          <div className="profile-image">
                            <img src={ProfileImage} className='rounded-full' alt="" />
                          </div>
                          <div className="profile-details-prof">
                            <h6 className='text-Black font-medium'>Carlson Jason Doe</h6>
                            <p className='text-LightText'>carlsonjason1234@gmail.com</p>
                          </div>
                        </div>
                        <div className="right-phone-number-prof-section flex items-center gap-x-[15px]">
                          <i class="ri-phone-fill text-ThemeGreen text-lg"></i>
                          <p className='text-ThemeGreen font-medium text-lg'>+91 954 845 2546</p>
                        </div>
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
                          <div className="combined-details-screen-profile flex items-center gap-20">
                            {emailDetails.map((items , index)=> {
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
