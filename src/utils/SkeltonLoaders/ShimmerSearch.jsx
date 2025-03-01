import React from 'react'

const ShimmerSearch = () => {
  return (
    <div className='skeleton-search'>
      <div className="single-searched-cards">
        <div className="single-business-sec-3-card w-full bg-white rounded-xl text-left shadow-customized overflow-hidden animate-pulse">
          <div className="inner-verified-sellers-card-sec grid grid-cols-12">
            <div className="left-image-section-bus-sec-3 col-span-3 overflow-hidden bg-gray-300 h-[260px]"></div>
            <div className="right-side-business-card-details relative px-7 py-6 col-span-9">
              <div className="inner-seller-business-card-details flex flex-col gap-y-4 h-full">
                <div className="business-card-title h-6 bg-gray-300 w-3/4 rounded"></div>
                <div className="business-card-recommend-address-section flex flex-col gap-y-2">
                  <div className="business-recommended-section h-5 bg-gray-300 w-1/2 rounded"></div>
                  <div className="opens-at-location-combined flex items-center gap-x-4">
                    <div className="h-5 bg-gray-300 w-1/4 rounded"></div>
                    <div className="h-5 bg-gray-300 w-1/4 rounded"></div>
                  </div>
                </div>
                <div className="people-rated-top-search-sec flex items-center gap-x-4">
                  <div className="h-5 bg-gray-300 w-1/6 rounded"></div>
                </div>
                <div className="bottom-business-card-number-det flex items-center gap-x-6 w-full mt-5">
                  <div className="h-10 w-28 bg-gray-300 rounded-full"></div>
                  <div className="h-10 w-28 bg-gray-300 rounded-full"></div>
                  <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
                  <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
                  <div className="h-9 w-9 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShimmerSearch
