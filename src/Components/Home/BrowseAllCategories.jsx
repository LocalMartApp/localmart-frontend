import React , { useEffect, useState } from 'react';
import PgHostel from '../../assets/images/recharge-logos/pg-hostel.svg';
import Hospital from '../../assets/images/categories-logos/hospital.svg';
import HomeDecor from '../../assets/images/categories-logos/home-decors.svg';
import HotelRoom from '../../assets/images/categories-logos/hotels.svg';
import Restaurants from '../../assets/images/categories-logos/restuarants.svg';
import Courier from '../../assets/images/categories-logos/courier.svg';
import Gym from '../../assets/images/categories-logos/gym.svg';
import Dental from '../../assets/images/categories-logos/dental.svg';
import FunctionHall from '../../assets/images/categories-logos/function-hall.svg';
import Packers from '../../assets/images/categories-logos/packers-movers.svg';
import WeddingHall from '../../assets/images/categories-logos/wedding-halls.svg';
import PetShop from '../../assets/images/categories-logos/petshop.svg';

import axios from 'axios';
import { config } from '../../env-services';



const BrowseAllCategories = ({ isCategoryOpen , closeCategory }) => {


    const [localmartCategories , setLocalmartCategories] = useState([])


    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = async () => {
        await axios.get(config.api + `business-category`)
        .then((response) => {
            setLocalmartCategories(response?.data?.data)
            console.log('response' , response)
       })
    }



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

    
    const [searchTerm, setSearchTerm] = useState('');

    // Filter categories based on the search term (case-insensitive)
    const filteredCategories = localmartCategories.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (

    <div className="outer-main-section-browse-all-cates">
        <div className={`main-browse-all-categories-section fixed top-0 w-[90%] h-full bg-LightBlue duration-500 z-[999999] p-40p ${isCategoryOpen ? 'right-0 visible' : '-right-full invisible'}`}>
            <div className="top-all-categories-heading-closer-sec flex items-center gap-2">
                <button type="button" onClick={closeCategory}><i className="ri-close-large-line text-xl"></i></button>
                <h2 className='text-Black font-semibold text-[22px]'>All Categories</h2>
            </div>
            <div className="search-input-section-browse-categories mt-10">
                <div className="form-inputsec relative">
                    <input type="text"  placeholder='Search for a category' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className={`outline-none focus:border-Secondary duration-300 py-4 pl-20 pr-5 rounded-xl bg-white w-full text-Black `} 
                    />
                    <div className="email-input-icon pr-4 border-r border-r-BorderColor absolute left-4 top-1/2">
                        <i className="ri-search-line text-2xl"></i>
                    </div>
                </div>
            </div>
            <div className="all-categories-grid-section mt-10">
                <div className="grid grid-cols-4 gap-5">
                    {localmartCategories && localmartCategories.length > 0 ? filteredCategories.map((items , index) => {
                        return (
                            <div className="single-category-item bg-white rounded-10p p-[15px]" key={index}>
                                <div className="inner-single-category-item flex items-center gap-5">
                                    <div className="left-side-image-category">
                                        <img src={items.image} className='object-contain max-w-[35px] max-h-[35px] min-w-[35px]' alt="" />
                                    </div>
                                    <div className="right-side-category-name">
                                        <p className='text-Black font-medium'>{items.name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : null}
                </div>
            </div>
        </div>
        <div className={`main-browse-all-categories-blackoverlay fixed top-0 w-full duration-500 h-full bg-black bg-opacity-25 backdrop-blur-xl z-[99999] ${isCategoryOpen ? 'left-0 visible' : ' -left-full invisible'} `}>

        </div>
    </div>

  )
}

export default BrowseAllCategories