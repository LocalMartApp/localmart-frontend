import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./SearchPage.scss";
import { NavLink, useNavigate } from "react-router-dom";
import SearchTopPicksSlider from "./SearchTopPicksSlider";
import BusinessImage from "../../assets/images/business-card-image-1.jpg";
import BusinessImage2 from "../../assets/images/business-card-image-2.jpg";
import BusinessImage3 from "../../assets/images/business-card-image-3.jpg";
import BusinessImage4 from "../../assets/images/business-card-image-4.jpg";
import GmailIcon from "../../assets/images/gmail-icon.svg";
import useSearchStore from "../../Store/useSearchStore";
import useSaveBusinessStore from "../../Store/useSaveBusinessStore";
import ShimmerSearch from "../../utils/SkeltonLoaders/ShimmerSearch";
import Emptymedia from "../../assets/images/emptymedia-business.png";
import Lottie from "lottie-react";
import EmptyLoader from "../../assets/images/animated-logos/emptyastro.json";
import ReactPaginate from "react-paginate";
import ViewSwitch from "./ViewSwitch";
import BusinessGridCard from "./BusinessGridCard";
import BusinessListCard from "./BusinessListCard";

const SearchPage = () => {
  const navigate = useNavigate();

  const {
    filters,
    setFilter,
    results,
    loading,
    error,
    fetchSearchResults,
    totalPages,
    totalResults,
    getPaginationInfo,
  } = useSearchStore();
  const { isFavorite, toggleFavorite } = useSaveBusinessStore();

  const [sortByBtn, setSortByBtn] = useState(false);
  const [topRatedBtn, setTopRatedBtn] = useState(false);
  const [openNowBtn, setOpenNowBtn] = useState(false);
  const [priceBtn, setPriceBtn] = useState(false);
  const [sortSelect, setSortSelect] = useState("Sort By");
  const [priceSlect, setPriceSelect] = useState("Price");
  const [viewType, setViewType] = useState("list"); // 'list' or 'grid'

  const [favorite, setFavorite] = useState(false);

  // Status modal state
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    fetchSearchResults();
  }, [filters]);

  const handleNavigate = (item) => {
    navigate(`/search/complete-details/${item._id}`);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (
      isStatusModalOpen &&
      isAutoPlaying &&
      selectedBusiness?.businessStatuses?.length > 1
    ) {
      const interval = setInterval(() => {
        setCurrentStatusIndex((prevIndex) =>
          prevIndex === selectedBusiness.businessStatuses.length - 1
            ? 0
            : prevIndex + 1
        );
      }, 3000); // 3 seconds per status like Instagram

      return () => clearInterval(interval);
    }
  }, [
    isStatusModalOpen,
    isAutoPlaying,
    selectedBusiness?.businessStatuses?.length,
  ]);

  // Keyboard support for modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isStatusModalOpen) {
        if (event.key === "Escape") {
          handleCloseStatusModal();
        } else if (event.key === "ArrowLeft") {
          handleStatusNavigation("prev");
        } else if (event.key === "ArrowRight") {
          handleStatusNavigation("next");
        } else if (event.key === " ") {
          event.preventDefault();
          toggleAutoPlay();
        }
      }
    };

    if (isStatusModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isStatusModalOpen]);

  // Handle status modal open
  const handleStatusClick = (business) => {
    setSelectedBusiness(business);
    setIsStatusModalOpen(true);
    setCurrentStatusIndex(0);
    setIsAutoPlaying(true);
  };

  // Handle status modal close
  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setCurrentStatusIndex(0);
    setIsAutoPlaying(true);
    setSelectedBusiness(null);
  };

  // Handle manual navigation
  const handleStatusNavigation = (direction) => {
    if (direction === "next") {
      setCurrentStatusIndex((prev) =>
        prev === selectedBusiness.businessStatuses.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentStatusIndex((prev) =>
        prev === 0 ? selectedBusiness.businessStatuses.length - 1 : prev - 1
      );
    }
  };

  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1; // ReactPaginate is 0-based, API is 1-based
    console.log("Page clicked:", selectedPage, "Total pages:", totalPages);
    setFilter("page", selectedPage);
  };

  // Debug pagination info
  console.log("Pagination Debug:", {
    totalPages,
    totalResults,
    currentPage: getPaginationInfo().currentPage,
    resultsLength: results?.length,
  });
  const searchedContent = [
    {
      id: 1,
      image: BusinessImage,
      title: "Sri Megha Restaurant",
      opensAt: "Opens at 10:30 AM",
      ratedPeople: "1307 People Rated this place",
      topSearch: true,
      rating: 4.5,
      location: "Rajahmundry - Kothapalli",
    },
    {
      id: 2,
      image: BusinessImage2,
      title: "Kritunga Restaurant",
      opensAt: "Opens at 12:30 AM",
      ratedPeople: "2000 People Rated this place",
      topSearch: true,
      rating: 4.1,
      location: "Rajahmundry - Lalacheruvu",
    },
    {
      id: 3,
      image: BusinessImage3,
      title: "Paradise Restaurant",
      opensAt: "Opens at 10:30 AM",
      ratedPeople: "3201 People Rated this place",
      topSearch: true,
      rating: 4.1,
      location: "Rajahmundry - Bus Stand",
    },
    {
      id: 4,
      image: BusinessImage4,
      title: "Shiva Restaurant",
      opensAt: "Opens at 10:30 AM",
      ratedPeople: "0404 People Rated this place",
      topSearch: false,
      rating: 3.8,
      location: "Rajahmundry - Kothapalli",
    },
  ];

  return (
    <div className="SearchPage">
      <div className="main-search-page-section">
        <section className="search-page-section-1 py-10">
          <div className="inner-search-page-section-1 breadcrumb-section-search">
            <div className="container">
              <div className="breadcrum-inner-section">
                <ul className="flex items-center gap-x-2">
                  <li>
                    <NavLink className={`text-Black `} to={-1}>
                      Back
                    </NavLink>
                  </li>
                  <li>
                    <i className="ri-arrow-right-s-line"></i>
                  </li>
                  <li>
                    <p className={`text-Black `}>Business Listings</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="search-page-section-2 hidden">
          <div className="inner-search-page-section-2">
            <div className="container">
              <div className="sorting-buttons-grid-section grid grid-cols-12 gap-x-8">
                <div className="col-span-3 single-sorting-btn">
                  <div className="inner-single-sorting-button relative">
                    <button
                      type="button"
                      onClick={() => {
                        setSortByBtn(!sortByBtn), setPriceBtn(false);
                      }}
                      className={`w-full flex items-center gap-4 justify-between  duration-300 ${
                        sortByBtn
                          ? "rounded-10p bg-LightBlue"
                          : "rounded-40p bg-LightGrayBg"
                      } px-6 py-2`}
                    >
                      <div className="left-sort-text">
                        <p className="text-Black font-medium text-lg">
                          {sortSelect}
                        </p>
                      </div>
                      <div
                        className={`right-arrow-icon  duration-300 ${
                          sortByBtn ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <i className={`ri-arrow-down-s-line text-xl`}></i>
                      </div>
                    </button>
                    <div
                      className={`absolute-sorting-section flex flex-col gap-y-2 z-[999] shadow-md rounded-10p bg-LightBlue py-4 absolute left-0 w-full duration-300 ${
                        sortByBtn
                          ? "visible translate-y-2 opacity-100"
                          : "invisible translate-y-10 opacity-0"
                      }`}
                    >
                      <div className="single-sorting-abs-btns">
                        <button
                          type="button"
                          className="py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left"
                          onClick={() => {
                            setSortSelect("Sort A-Z"), setSortByBtn(false);
                          }}
                        >
                          Sort A-Z
                        </button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button
                          type="button"
                          className="py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left"
                          onClick={() => {
                            setSortSelect("Sort Z-A"), setSortByBtn(false);
                          }}
                        >
                          Sort Z-A
                        </button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button
                          type="button"
                          className="py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left"
                          onClick={() => {
                            setSortSelect("Trending"), setSortByBtn(false);
                          }}
                        >
                          Trending
                        </button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button
                          type="button"
                          className="py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left"
                          onClick={() => {
                            setSortSelect("Popular"), setSortByBtn(false);
                          }}
                        >
                          Popular
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 single-sorting-btn">
                  <div className="inner-single-sorting-button relative">
                    <button
                      type="button"
                      onClick={() => setTopRatedBtn(!topRatedBtn)}
                      className={`w-full flex items-center gap-4   duration-300 ${
                        topRatedBtn
                          ? "rounded-10p bg-LightBlue"
                          : "rounded-40p bg-LightGrayBg"
                      } px-6 py-2`}
                    >
                      <div
                        className={`right-arrow-icon  duration-300 ${
                          topRatedBtn ? " -rotate-180" : "rotate-0"
                        }`}
                      >
                        <i className={`ri-star-s-fill text-xl`}></i>
                      </div>
                      <div className="left-sort-text">
                        <p className="text-Black font-medium text-lg">
                          Top Rated
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="col-span-3 single-sorting-btn">
                  <div className="inner-single-sorting-button relative">
                    <button
                      type="button"
                      onClick={() => {
                        setPriceBtn(!priceBtn), setSortByBtn(false);
                      }}
                      className={`w-full flex items-center gap-4 justify-between  duration-300 ${
                        priceBtn
                          ? "rounded-10p bg-LightBlue"
                          : "rounded-40p bg-LightGrayBg"
                      } px-6 py-2`}
                    >
                      <div className="left-sort-text">
                        <p className="text-Black font-medium text-lg">
                          {priceSlect}
                        </p>
                      </div>
                      <div
                        className={`right-arrow-icon  duration-300 ${
                          priceBtn ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <i className={`ri-arrow-down-s-line text-xl`}></i>
                      </div>
                    </button>
                    <div
                      className={`absolute-sorting-section flex flex-col gap-y-2 rounded-10p z-[999] bg-LightBlue py-4 absolute left-0 w-full duration-300 shadow-md ${
                        priceBtn
                          ? "visible translate-y-2 opacity-100"
                          : "invisible translate-y-10 opacity-0"
                      }`}
                    >
                      <div className="single-sorting-abs-btns">
                        <button
                          type="button"
                          className="py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left"
                          onClick={() => {
                            setPriceSelect("Low - High"), setPriceBtn(false);
                          }}
                        >
                          Price Low - High
                        </button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button
                          type="button"
                          className="py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left"
                          onClick={() => {
                            setPriceSelect("High - Low"), setPriceBtn(false);
                          }}
                        >
                          Price High - Low
                        </button>
                      </div>
                      <div className="single-sorting-abs-btns">
                        <button
                          type="button"
                          className="py-2 px-4 bg-transparent hover:bg-white duration-300 w-full text-left"
                          onClick={() => {
                            setPriceSelect("Mid Range"), setPriceBtn(false);
                          }}
                        >
                          Price Mid Range
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 single-sorting-btn">
                  <div className="inner-single-sorting-button relative">
                    <button
                      type="button"
                      onClick={() => setOpenNowBtn(!openNowBtn)}
                      className={`w-full flex items-center gap-4   duration-300 ${
                        openNowBtn
                          ? "rounded-10p bg-LightBlue"
                          : "rounded-40p bg-LightGrayBg"
                      } px-6 py-2`}
                    >
                      <div
                        className={`right-arrow-icon  duration-300 ${
                          openNowBtn ? " -rotate-180" : "rotate-0"
                        }`}
                      >
                        <i className={`ri-circle-fill text-Green`}></i>
                      </div>
                      <div className="left-sort-text">
                        <p className="text-Black font-medium text-lg">
                          Open Now
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="search-page-section-3">
          <div className="inner-search-page-section-3 pb-10">
            <div className="container">
              <div className="search-page-grid-section-main">
                <div className="grid grid-cols-12 gap-30p search-grid-cards-section-list-gridviews">
                  <div className="col-span-12 left-searched-cards">
                    {/* View Switch Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-2xl font-medium text-gray-900">
                            {totalResults > 0
                              ? totalResults
                              : results?.length || 0}{" "}
                            Results Found
                          </h3>
                          <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                          <p className="text-sm text-gray-600">
                            {viewType === "grid" ? "Grid View" : "List View"}
                          </p>
                        </div>
                        {(totalResults > 0 || results?.length > 0) && (
                          <div className="text-sm text-gray-500">
                            {totalResults > 0
                              ? getPaginationInfo().showingText
                              : `Showing ${results?.length || 0} results`}
                          </div>
                        )}
                      </div>
                      <div className="view-swicth-section-buttons">
                        <ViewSwitch
                          viewType={viewType}
                          onViewChange={setViewType}
                        />
                      </div>
                    </div>

                    <div
                      key={viewType}
                      className={`transition-all duration-500 ease-in-out ${
                        viewType === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                          : "flex flex-col gap-y-6"
                      }`}
                    >
                      {loading && (
                        <div className="col-span-full">
                          <ShimmerSearch />
                        </div>
                      )}
                      {!loading && results && results.length > 0 ? (
                        results.map((items, index) => {
                          if (viewType === "grid") {
                            return (
                              <BusinessGridCard
                                key={index}
                                business={items}
                                onPress={handleNavigate}
                                onToggleFavorite={toggleFavorite}
                                isFavorite={isFavorite(items._id)}
                                showSaveButton={true}
                                showStatusButton={true}
                                showCallButton={true}
                                showShareButton={true}
                                showMapsButton={true}
                              />
                            );
                          }

                          return (
                            <BusinessListCard
                              key={items._id || index}
                              business={items}
                              showSaveButton={true}
                              onNavigate={handleNavigate}
                              onStatusClick={handleStatusClick}
                            />
                          );
                        })
                      ) : (
                        <div className="no-bus-found">
                          <div className="nodata-found-section flex justify-center flex-col items-center pt-10 pb-5 w-full">
                            <Lottie
                              animationData={EmptyLoader}
                              style={{ width: 300 }}
                            />
                            <div className="no-data-found-text-btn mt-8 text-center">
                              <p className="text-center text-xl font-medium text-gray-700">
                                No businesses found based on your search
                                criteria.
                              </p>
                              <p className="text-center text-sm text-gray-500 mt-2">
                                Try adjusting your filters or search terms.
                              </p>
                              {/* <button type="button" onClick={() =>  setAddAddressToggle(true)} className="text-Secondary font-semibold text-xl mt-5">Add Address</button> */}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pagination */}
                    {(totalResults > 0 || results?.length > 0) &&
                      totalPages > 1 && (
                        <div className="pagination-container mt-8">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                            <div className="text-sm text-gray-600">
                              {totalResults > 0
                                ? getPaginationInfo().showingText
                                : `Showing ${results?.length || 0} results`}
                            </div>
                            <div className="text-sm text-gray-500">
                              Page {getPaginationInfo().currentPage} of{" "}
                              {getPaginationInfo().totalPages}
                            </div>
                          </div>
                          <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            forcePage={getPaginationInfo().currentPage - 1} // Convert to 0-based for ReactPaginate
                            containerClassName={
                              "pagination bottom-paginate-section w-fit bg-white rounded-lg flex gap-2 justify-center my-6"
                            }
                            pageClassName={
                              "paginated-clickers border rounded-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                            }
                            activeClassName={
                              "bg-Secondary text-white active-paginate"
                            }
                            previousClassName={
                              "px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                            }
                            nextClassName={
                              "px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                            }
                            breakClassName={"px-3 py-1"}
                            activeLinkClassName="active-paginate"
                            disabledClassName="opacity-50 cursor-not-allowed"
                            disabledLinkClassName="cursor-not-allowed"
                          />
                        </div>
                      )}
                  </div>
                  <div className="col-span-12 hidden">
                    <div className="right-top-picks-slider sticky top-5">
                      <SearchTopPicksSlider />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Status Modal */}
      {isStatusModalOpen && selectedBusiness?.businessStatuses?.length > 0 && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
          onClick={handleCloseStatusModal}
        >
          <div
            className="relative w-full max-w-md h-[80vh] bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseStatusModal}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <i className="ri-close-line text-lg"></i>
            </button>

            {/* Status Content */}
            <div className="relative w-full h-full">
              {selectedBusiness.businessStatuses.map((status, index) => (
                <div
                  key={status._id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentStatusIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Status Image */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    {status.image ? (
                      <img
                        src={status.image}
                        alt={status.text}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <i className="ri-image-line text-white text-6xl"></i>
                      </div>
                    )}
                  </div>

                  {/* Status Text Overlay */}
                  {status.text && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white text-lg font-medium leading-relaxed">
                        {status.text}
                      </p>
                    </div>
                  )}

                  {/* User Info */}
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {status.user?.firstName?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {status.user?.firstName} {status.user?.lastName}
                      </p>
                      <p className="text-white/70 text-sm">
                        {new Date(status.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              {/* Previous Button */}
              <button
                onClick={() => handleStatusNavigation("prev")}
                className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <i className="ri-arrow-left-line text-lg"></i>
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={toggleAutoPlay}
                className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <i
                  className={`text-xl ${
                    isAutoPlaying ? "ri-pause-line" : "ri-play-line"
                  }`}
                ></i>
              </button>

              {/* Next Button */}
              <button
                onClick={() => handleStatusNavigation("next")}
                className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <i className="ri-arrow-right-line text-lg"></i>
              </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute top-4 left-4 right-4 flex gap-1">
              {selectedBusiness.businessStatuses.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className={`h-full bg-white transition-all duration-3000 ${
                      index === currentStatusIndex && isAutoPlaying
                        ? "animate-pulse"
                        : index < currentStatusIndex
                        ? "w-full"
                        : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SearchPage.propTypes = {};

SearchPage.defaultProps = {};

export default SearchPage;
