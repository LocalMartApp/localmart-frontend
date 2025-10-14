import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSaveBusinessStore from "../../Store/useSaveBusinessStore";
import Emptymedia from "../../assets/images/emptymedia-business.png";
import GmailIcon from "../../assets/images/gmail-icon.svg";
import toast from "react-hot-toast";
import { useAuth } from "../../utils/AuthContext";
import './SearchPage.scss'

const BusinessListCard = ({
  business,
  showSaveButton = true,
  onNavigate,
  onStatusClick,
  className = "",
}) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useSaveBusinessStore();
  const { authToken } = useAuth()

  // Status modal state - moved to parent component
  // const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  // const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  // const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleNavigate = (businessData) => {
    if (onNavigate) {
      onNavigate(businessData);
    } else {
      navigate(`/business-details/${businessData._id}`);
    }
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(business._id);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    // Handle specific actions here if needed
    console.log(`${action} clicked for business:`, business._id);
  };

  // Handle status click - will be passed from parent
  const handleStatusClick = (e) => {
    e.stopPropagation();
    // This will be handled by parent component
    if (onStatusClick) {
      onStatusClick(business);
    }
  };


  
  const long = business?.location?.coordinates[0];
  const lat = business?.location?.coordinates[1];

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, "_blank");
  };

  const openMailBox = () => {
    const email = business?.email?.trim();

    if (email) {
      window.open(`mailto:${email}`, '_blank');
    } else {
      toast.error("Email not provided by the business");
    }
  }

  const showNumber = () => {
    toast.error("Login to view this number")
  }

  const callNumber = () => {
    const mobileNumber = business?.mobileNumber?.trim();

    if (mobileNumber) {
      window.open(`tel:${mobileNumber}`, '_blank');
    } else {
      toast.error("Number not provided by the business");
    }
  }
  return (
    <div
      className={`group transform transition-all  ${className}`}
    >
      <div className="w-full bg-white rounded-3xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100 transition-all duration-700 ease-out relative">

        {showSaveButton && (
          <button
            onClick={handleToggleFavorite}
            className="absolute top-5 right-5 w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ease-out hover:bg-white z-20 border border-gray-100"
            title={
              isFavorite(business._id) ? "Remove from saved" : "Save business"
            }
          >
            {isFavorite(business._id) ? (
              <i className="ri-bookmark-fill text-Primary text-xl"></i>
            ) : (
              <i className="ri-bookmark-line text-gray-500 text-xl group-hover:text-Primary transition-colors duration-300"></i>
            )}
          </button>
        )}


        <div className="absolute top-5 right-20 z-10">
          <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2 border border-gray-200">
            <i className="ri-star-fill text-yellow-400 text-sm"></i>
            <span className="text-sm font-semibold text-gray-800">
              {business.averageRating || "0.0"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 business-list-card-main-grid min-h-[200px]">

          <div className="col-span-4 left-business-list-card-section overflow-hidden relative ">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-l-3xl"></div>
            <img
              src={
                business?.mediaFiles[0]?.fileUrl
                  ? business?.mediaFiles[0]?.fileUrl
                  : Emptymedia
              }
              className="h-full w-full group-hover:scale-105 duration-1000 object-cover transition-transform ease-out"
              alt={business?.name || "Business image"}
            />

            <div className="absolute bottom-3 left-3 z-20">
              <div className="flex items-center">

                <div
                  className="relative flex items-center cursor-pointer"
                  onClick={handleStatusClick}
                >
                  {business?.businessStatuses
                    ?.slice(0, 2)
                    .map((status, index) => (
                      <div
                        key={status._id}
                        className="relative group"
                        style={{ marginLeft: index > 0 ? "-12px" : "0" }}
                        title={status.text}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-lg bg-gray-100 flex items-center justify-center relative z-10 hover:scale-110 transition-transform duration-200">
                          {status.image ? (
                            <img
                              src={status.image}
                              alt={status.text}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <i className="ri-image-line text-white text-xs"></i>
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
                          {status.text}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                        </div>
                      </div>
                    ))}
                </div>


                {business?.businessStatuses?.length > 0 && (
                  <button
                    onClick={handleStatusClick}
                    className="ml-2 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium hover:bg-black/90 transition-all duration-200 flex items-center gap-1"
                  >
                    <span>View All</span>
                    <i className="ri-arrow-right-line text-xs"></i>
                  </button>
                )}
              </div>
            </div>
          </div>


          <div className="col-span-8 right-business-list-card-section p-6 flex flex-col justify-between rounded-r-3xl">
            <div className="space-y-4">

              <div className="space-y-2">
                <h3 className="text-2xl font-medium text-gray-900 group-hover:text-Primary transition-colors duration-500 ease-out">
                  {business?.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <i className="ri-thumb-up-fill text-green-500"></i>
                  <span>Highly Recommended</span>
                </div>
              </div>


              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm flex-wrap">
                  <div className="flex items-center gap-2 text-green-600">
                    <i className="ri-time-line"></i>
                    <span className="font-medium">
                      {business?.workingHours}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-map-pin-line"></i>
                    <span>
                      {business?.stateId?.name} - {business?.cityId?.name},{" "}
                      {business?.area?.trim()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {business.ratedPeople}
                    </span>{" "}
                  </div>
                  {business.topSearch && (
                    <div className="bg-Primary/10 text-Primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <i className="ri-search-line"></i>
                      <span>Top Searched</span>
                    </div>
                  )}
                </div>
              </div>
            </div>


            <div className="flex items-center gap-4 pt-4 border-t border-gray-100 flex-wrap justify-between">
              <button
                type="button"
                onClick={authToken ? callNumber : showNumber}
                className="bg-Green rounded-full text-white font-medium py-2.5 px-6 hover:bg-green-600 transition-all duration-300 ease-out hover:scale-105 text-sm z-10 relative"
              >
                Show Contact
              </button>
              <div className="share-links-sec flex gap-4">
                <button
                  onClick={openGoogleMaps}
                  className="w-8 h-8 bg-Green rounded-full flex items-center justify-center relative z-10"
                  title="Directions"
                >
                  <i className="ri-direction-fill text-white text-xl"></i>
                </button>
                <button
                  onClick={(e) => handleActionClick(e, "Share")}
                  className="w-8 h-8 bg-Secondary rounded-full flex items-center justify-center relative z-10"
                  title="Share"
                >
                  <i className="ri-share-fill text-white text-xl"></i>
                </button>
                <button
                  onClick={openMailBox}
                  className="relative z-10"
                  title="Email"
                >
                  <img src={GmailIcon} className="w-7 h-7" alt="Gmail" />
                </button>
              </div>
            </div>
          </div>
        </div>


        <button
          onClick={() => handleNavigate(business)}
          className="absolute inset-0 w-full h-full z-0"
          aria-label={`View details for ${business?.name}`}
        ></button>
      </div>
    </div>
  );
};

export default BusinessListCard;
