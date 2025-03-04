import React, { useState } from 'react'
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const Drafts = () => {



const useSearchStore = create(
  persist(
    (set, get) => ({
      filters: {
        searchKey: "",
        city: "",
        category: "",
      },
      results: [],
      loading: false,
      error: "",
      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),
      removeFilter: (key) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: "",
          },
        })),
      fetchSearchResults: async () => {
        const { filters } = get();

        const queryParams = new URLSearchParams(filters);

        set({ loading: true, error: "" });

        try {
          // const params = new URLSearchParams(filters);

          const response = await axios.get(
            `http://13.234.223.21:8080/search/businesses?${queryParams}`
          );
          set({ results: response.data.data, loading: false });
        } catch (err) {
          set({
            error: err.message || "Failed to fetch search results",
            loading: false,
          });
        }
      },
      resetFilters: () =>
        set({ filters: { searchKey: "", city: "", category: "" } }),
    }),
    {
      name: "search-store",
      getStorage: () => localStorage,
    }
  )
);

    const allCategories = [
        {
            image: PgHostel,
            rightText: "Hostels & PG's"
        },
        {
            image: Hospital,
            rightText: "Hospitals"
        },

        {
            image: HomeDecor,
            rightText: "Home Decors"
        },
        {
            image: Packers,
            rightText: "Packers&Movers"
        },
        {
            image: HotelRoom,
            rightText: "Hotels"
        },
        {
            image: Restaurants,
            rightText: "Restaurants"
        },
        {
            image: Courier,
            rightText: "Couriers"
        },
        {
            image: Gym,
            rightText: "Gym"
        },
        {
            image: Dental,
            rightText: "Dental"
        },
        {
            image: FunctionHall,
            rightText: "Function Halls"
        },
        {
            image: WeddingHall,
            rightText: "Wedding Halls"
        },
        {
            image: PetShop,
            rightText: "Pet Shop"
        },
    ]




  return (
    <div>
        <div className={`top-fixed-header-section hidden fixed left-0 w-full z-[99] shadow-customized duration-500 ${headerBar ? '-top-0 opacity-100 hidden' : '-top-full opacity-0'}`}>
          <div className="inner-header-section bg-white py-5">
            <div className="container">
              <div className="grid grid-cols-12 items-center">
                <div className="header-left-logo-section  text-left">
                  <div className="logo-inner-section">
                    <img src={Logo} className='max-h-[50px] w-auto' alt="" />
                  </div>
                </div>
                <div className="header-search-section col-span-6">
                  <div className="inner-seacrh-section grid grid-cols-12  bg-white border-BorderColor border  rounded-full py-1 pr-1 pl-4 justify-between">
                      <div className="col-span-5">
                          <div className="category-section flex items-center gap-2">
                            <div className="left-category-logo-search w-[10%]">
                              <i className=" ri-map-pin-line text-Primary text-xl"></i>
                            </div>
                            <div className="right-category-dropdown-section w-[80%]">
                                {/* <button type='button'>
                                    <div className="top-section-category-select flex items-center gap-3">
                                      <p className='text-LightBlack text-sm'>Category</p>
                                      <i className="ri-arrow-down-s-line text-LightBlack"></i>
                                    </div>
                                </button> */}
                                <Select options={cityOptions} 
                                    placeholder='City'
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: 10,
                                          paddingLeft: 0,
                                          paddingTop: 4,
                                          paddingBottom: 4,
                                          borderWidth: 0,
                                          outlineWidth: 0,
                                          boxShadow: state.isFocused ? 'none' : 'none',

                                        }),
                                      }}
                                    value={citySelect}
                                    onChange={(option) => setCitySelect(option)}
                                />
                            </div>
                          </div>
                      </div>
                      <div className="col-span-5">
                        <div className="location-section flex items-center gap-2">
                            <div className="left-location-logo-search w-[10%]">
                              <i className="ri-file-list-3-line text-Primary text-xl"></i>
                            </div>
                            <div className="right-location-dropdown-section w-[80%]">
                                {/* <button type='button'>
                                    <div className="top-section-location-select flex items-center gap-3">
                                      <p className='text-LightBlack text-sm'>Location</p>
                                      <i className="ri-arrow-down-s-line text-LightBlack"></i>
                                    </div>
                                </button> */}
                                 <Select options={categoryOptions} 
                                    placeholder='Category'
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: 10,
                                          paddingLeft: 0,
                                          paddingTop: 4,
                                          paddingBottom: 4,
                                          borderWidth: 0,
                                          outlineWidth: 0,
                                          borderColor: '#fff',
                                          outlineColor: '#fff',
                                          // borderColor: state.isFocused ? 'grey' : 'red',
                                          boxShadow: state.isFocused ? 'none' : 'none',
                                        }), 
                                      }}
                                      value={categorySelect}
                                    onChange={(option) => setCategorySelect(option)}
                                />
                            </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                          <div className="cate-loc-search-btn h-full w-full">
                            <button type="button" onClick={handleSearchNav} className='bg-Primary duration-300 h-full hover:scale-95 rounded-full py-1 flex items-center w-full justify-center shadow-customized'>
                              <i className="text-white text-lg ri-search-line"></i>
                            </button>
                          </div>
                      </div>
                  </div>
                </div>
                <div className="header-buttons-sections col-span-5">
                  <div className="flex items-center gap-8 justify-end">
                    <div className="notification-header-button rounded-full">
                      <button type='button' className=' bg-none w-10 h-10 flex items-center justify-center'>
                        <i className="bi bi-bell text-xl text-Primary"></i>
                      </button>
                    </div>
                    <div className={`language-selection-header relative duration-300 ${language ? 'rounded-xl rounded-b-none ' : 'rounded-[20px]'}`}>
                      <button type="button" className='flex items-center gap-1 h-10 px-3 ' onClick={handleLanguageSelect}>
                        <img src={LanSvg} className='max-w-[18px] min-w-[18px]' alt="" />
                        <p className='text-Black'>{languageSelector}</p>
                        <i className={`bi bi-chevron-down duration-300 ${language ? 'rotate-180' : 'rotate-0'}`}></i>
                      </button>
                      <div className={`bottom-languages-button z-10 flex-col py-2 flex gap-2 absolute bg-white outline outline-BorderColor outline-1 w-full rounded-b-xl duration-500 ${language ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <button type="button" className='py-1 text-center ' onClick={() => {setLanguageSelector('EN') , handleLanguageSelect()}}>
                          <p className='text-Black text-center'>EN</p>
                        </button>
                        <button type="button" className='py-1 text-center ' onClick={() => {setLanguageSelector('TE') , handleLanguageSelect()}}>
                          <p className='text-Black text-center'>TE</p>
                        </button>
                        <button type="button" className='py-1 text-center ' onClick={() => {setLanguageSelector('HI') , handleLanguageSelect()}}>
                          <p className='text-Black text-center'>HI</p>
                        </button>
                      </div>
                    </div>
                    <div className="advertise-button-header">
                      <button type="button" className='flex items-center gap-3'>
                      <i className="ri-megaphone-line text-Black"></i>
                        <p className='text-Black text-lg font-medium'>Advertise</p>
                      </button>
                    </div>
                    <div className="login-button-header">
                      <button type="button" onClick={() => navigate('/login')} className='bg-Primary h-10 px-3 overflow-hidden rounded-full flex items-center gap-2 min-w-[190px] justify-center'>
                        <i className="ri-login-circle-fill text-white text-lg"></i>
                        <p className='text-white font-medium text-lg'>Login | Signup</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        
    </div>
  )
}

export default Drafts