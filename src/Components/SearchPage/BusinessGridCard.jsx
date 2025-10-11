import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Emptymedia from "../../assets/images/emptymedia-business.png";
import GmailIcon from "../../assets/images/gmail-icon.svg";
import useSaveBusinessStore from "../../Store/useSaveBusinessStore";

const BusinessGridCard = ({
  business,
  onPress,
  onRemoveFavorite,
  onAddFavorite,
  onToggleFavorite,
  onShare,
  onCall,
  showSaveButton = true,
  showStatusButton = true,
  showCallButton = true,
  showShareButton = true,
  showMapsButton = true,
  isFavorite = false,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const { toggleFavorite } = useSaveBusinessStore();
  const [saveLoading, setSaveLoading] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation effect for status button
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setIsAnimating((prev) => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const handleCall = () => {
    if (business.mobileNumber) {
      window.open(`tel:${business.mobileNumber}`, "_self");
    }
    if (onCall) {
      onCall(business.mobileNumber);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: business.name,
          text: `Check out ${business.name} - ${business.completeAddress}`,
          url: business.socialMediaLink?.[0] || window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `Check out ${business.name} - ${business.completeAddress}`;
        await navigator.clipboard.writeText(shareText);
        alert("Business details copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
    if (onShare) {
      onShare(business);
    }
  };

  const handleToggleFavorite = async () => {
    if (saveLoading) return;

    setSaveLoading(true);
    try {
      if (onToggleFavorite) {
        const result = await onToggleFavorite(business._id);
        if (!result.success) {
          alert(result.message || "Failed to update favorites");
        }
      } else if (isFavorite && onRemoveFavorite) {
        const result = await onRemoveFavorite(business._id);
        if (!result.success) {
          alert(result.message || "Failed to remove from favorites");
        }
      } else if (!isFavorite && onAddFavorite) {
        const result = await onAddFavorite(business._id);
        if (!result.success) {
          alert(result.message || "Failed to add to favorites");
        }
      } else {
        // Use store method as fallback
        const result = await toggleFavorite(business._id);
        if (!result.success) {
          alert(result.message || "Failed to update favorites");
        }
      }
    } catch (error) {
      console.error("Favorite toggle error:", error);
      alert("Failed to update favorites");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCardPress = () => {
    if (onPress) {
      onPress(business);
    } else {
      navigate(`/search/complete-details/${business._id}`);
    }
  };

  const handleStatusPress = () => {
    setStatusModalVisible(true);
  };

  const handleCloseStatusModal = () => {
    setStatusModalVisible(false);
  };

  // Get business image
  const getBusinessImage = () => {
    if (business.mediaFiles && business.mediaFiles.length > 0) {
      return business.mediaFiles[0].fileUrl;
    }
    return Emptymedia;
  };

  // Get location text
  const getLocationText = () => {
    if (business.area) {
      return business.area;
    }
    if (business.cityId?.name) {
      return business.cityId.name;
    }
    if (business.landmark) {
      return business.landmark;
    }
    return "Location not available";
  };

  // Get working hours
  const getWorkingHours = () => {
    if (business.workingHours) {
      return business.workingHours;
    }
    return "Hours not available";
  };

  // Get rating
  const getRating = () => {
    if (business.averageRating && business.averageRating > 0) {
      return business.averageRating.toFixed(1);
    }
    if (business.ratings && business.ratings > 0) {
      return business.ratings.toFixed(1);
    }
    return "0.0";
  };

  // Check if business is popular
  const isPopular = business.totalReviews > 10 || business.averageRating > 4.0;

  return (
    <div className="business-grid-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 relative">
      {/* Top Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={getBusinessImage()}
          alt={business.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Rating and Popular Badge */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <i className="ri-star-fill text-yellow-400 text-sm"></i>
            <span className="text-sm font-bold text-gray-800">
              {getRating()}
            </span>
          </div>
          {isPopular && (
            <div className="bg-gradient-to-r from-Secondary to-Primary text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              <i className="ri-fire-line text-xs"></i>
              <span className="text-xs font-semibold">Popular</span>
            </div>
          )}
        </div>

        {/* Save Button */}
        {showSaveButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite();
            }}
            disabled={saveLoading || isLoading}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:bg-white z-10"
            title={isFavorite ? "Remove from saved" : "Save business"}
          >
            {saveLoading ? (
              <div className="animate-spin w-5 h-5 border-2 border-Primary border-t-transparent rounded-full"></div>
            ) : isFavorite ? (
              <i className="ri-bookmark-fill text-Primary text-xl"></i>
            ) : (
              <i className="ri-bookmark-line text-gray-600 text-xl group-hover:text-Primary transition-colors duration-300"></i>
            )}
          </button>
        )}
      </div>

      {/* Bottom Content */}
      <div className="p-6">
        {/* Title and Status Button */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 truncate flex-1 mr-3 leading-tight">
            {business.name}
          </h3>
          {showStatusButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusPress();
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-Green px-4 py-2 rounded-full text-xs font-semibold hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-200 z-10 relative"
            >
              <div
                className={`w-2 h-2 rounded-full bg-green-500 ${
                  isAnimating ? "animate-pulse" : ""
                }`}
              ></div>
              <span>Status</span>
            </button>
          )}
        </div>

        {/* Location and Time */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <i className="ri-map-pin-line text-gray-400 text-sm"></i>
              <span className="text-sm font-medium">{getLocationText()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-Green">
              <i className="ri-time-line text-Green text-sm"></i>
              <span className="text-sm font-medium">{getWorkingHours()}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        {business.completeAddress && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {business.completeAddress}
            </p>
          </div>
        )}

        {/* Business Code and Category */}
        <div className="flex flex-wrap gap-2 mb-4">
          {business.businessCode && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              <i className="ri-code-s-slash-line mr-1"></i>
              {business.businessCode}
            </span>
          )}
          {business.categoryId?.name && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-Green border border-green-200">
              <i className="ri-price-tag-3-line mr-1"></i>
              {business.categoryId.name}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
            <i className="ri-star-fill text-yellow-400 text-sm"></i>
            <span className="text-sm font-bold text-gray-800">
              {getRating()}
            </span>
            <span className="text-xs text-gray-500">rating</span>
          </div>

          <div className="flex items-center gap-2">
            {showMapsButton && (
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-3 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 group z-10 relative"
              >
                <i className="ri-map-pin-line text-Secondary text-lg group-hover:text-Primary transition-colors duration-300"></i>
              </button>
            )}
            {showShareButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="p-3 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 group z-10 relative"
              >
                <i className="ri-share-line text-Secondary text-lg group-hover:text-Primary transition-colors duration-300"></i>
              </button>
            )}
            {showCallButton && business.mobileNumber && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCall();
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-Green to-green-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl z-10 relative"
              >
                <i className="ri-phone-line text-sm"></i>
                <span>Call Now</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Clickable overlay for card press */}
      <button
        onClick={handleCardPress}
        className="absolute inset-0 w-full h-full z-0"
        aria-label={`View details for ${business.name}`}
      ></button>
    </div>
  );
};

export default BusinessGridCard;
