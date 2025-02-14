import React from 'react';

// Logos Export
import MobileRecharge from '../../assets/images/recharge-logos/mobile-recharge.svg';
import Electricity from '../../assets/images/recharge-logos/electricity.svg';
import LoanPay from '../../assets/images/recharge-logos/loan-payment.svg';
import WaterBill from '../../assets/images/recharge-logos/water.svg';
import HomeRent from '../../assets/images/recharge-logos/home-rent.svg';
import DthTv from '../../assets/images/recharge-logos/dth-tv.svg';
import Fastag from '../../assets/images/recharge-logos/fastag.svg';
import Insurance from '../../assets/images/recharge-logos/insurance.svg'

import Flight from '../../assets/images/recharge-logos/flights.svg';
import Bus from '../../assets/images/recharge-logos/bus.svg';
import Train from '../../assets/images/recharge-logos/train.svg';
import Hotel from '../../assets/images/recharge-logos/hotel-book.svg';
import Hostel from '../../assets/images/recharge-logos/pg-hostel.svg';
import Resort from '../../assets/images/recharge-logos/resorts.svg';
import RentCar from '../../assets/images/recharge-logos/car-rent.svg';
import RentBike from '../../assets/images/recharge-logos/rent-bike.svg';


const RechargesBlocks = () => {

    const rechargeCards = [
        {
          image: MobileRecharge,
          title: "Mobile",
          secondaryTitle: 'Recharges'
        },
        {
          image: Electricity,
          title: "Electricity",
          secondaryTitle: 'Bills'
        },
        {
          image: LoanPay,
          title: "Loan",
          secondaryTitle: 'Payments'
        },
        {
          image: WaterBill,
          title: "Water",
          secondaryTitle: 'Bills'
        },
        {
          image: HomeRent,
          title: "Home Rent",
          secondaryTitle: 'Payments'
        },
        {
          image: DthTv,
          title: "DTH &TV",
          secondaryTitle: 'Payments'
        },
        {
          image: Fastag,
          title: "FASTag",
          secondaryTitle: 'Recharge'
        },
        {
          image: Insurance,
          title: "Insurance",
          secondaryTitle: 'Payment'
        },
    ]


    const bookingCards = [
        {
            image: Flight,
            title: "Flight",
            secondaryTitle: 'Bookings'
        },
        {
            image: Bus,
            title: "Bus",
            secondaryTitle: 'Tickets'
        },
        {
            image: Train,
            title: "Train",
            secondaryTitle: 'Tickets'
        },
        {
            image: Hotel,
            title: "Hotel",
            secondaryTitle: 'Bookings'
        },
        {
            image: Hostel,
            title: "PG/Hostel",
            secondaryTitle: 'Bookings'
        },
        {
            image: Resort,
            title: "Resorts",
            secondaryTitle: 'Booking'
        },
        {
            image: RentCar,
            title: "Car",
            secondaryTitle: 'Rental'
        },
        {
            image: RentBike,
            title: "Bike",
            secondaryTitle: 'Rental'
        },
    ]

  return (
    <div className="recharge-section-home-2-main">
        <div className="recharge-sec-home-2-single-blk-1">
            <div className="container">
                <div className="home-sec-2-recharges-sec flex flex-col gap-y-20p">
                    <div className="bills-heading-part flex items-center justify-between">
                        <div className="bills-left-heading flex items-center gap-3">
                            <h2 className='text-30 font-medium text-Black'>Bills & Recharges</h2>
                            <p className='text-Black'>Pay your bills and recharges instantly with <span className='text-Primary'>LocalMart</span></p>
                        </div>
                        <div className="bills-right-explore">
                            <button type="button" className='flex items-center gap-3'>
                            <p className='text-Secondary font-medium'>Explore More</p>
                            <i className="bi bi-arrow-right text-Secondary text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div className="below-recharges-section-home-2 bg-LightBlue p-10 rounded-[18px]">
                        <div className="grid grid-cols-8 gap-60p recharges-grid-section">
                            {rechargeCards.map((items , index) => {
                                return (
                                    <button type='button' className="single-recharge-component-home-sec-2 group flex flex-col justify-center items-center gap-10p" key={index}>
                                        <div className="top-image-blk bg-white w-100p h-100p flex items-center justify-center p-5 rounded-[15px]">
                                            <img src={items.image} className='duration-500 group-hover:scale-125' alt="" />
                                        </div>
                                        <div className="bottom-text-blk">
                                            <p className='text-GrayText text-center'>{items.title}</p>
                                            <p className='text-GrayText text-center'>{items.secondaryTitle}</p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="recharge-sec-home-2-single-blk-2 mt-60p">
            <div className="container">
                <div className="home-sec-2-recharges-sec flex flex-col gap-y-20p">
                    <div className="bills-heading-part flex items-center justify-between">
                        <div className="bills-left-heading flex items-center gap-3">
                            <h2 className='text-30 font-medium text-Black'>Travels Bookings</h2>
                            <p className='text-Black'>Instant ticket bookings for your best travel experience with <span className='text-Primary'>LocalMart</span></p>
                        </div>
                        <div className="bills-right-explore">
                            <button type="button" className='flex items-center gap-3'>
                            <p className='text-Secondary font-medium'>Explore More</p>
                            <i className="bi bi-arrow-right text-Secondary text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div className="below-recharges-section-home-2 bg-LightOrange p-10 rounded-[18px]">
                        <div className="grid grid-cols-8 gap-60p recharges-grid-section">
                            {bookingCards.map((items , index) => {
                                return (
                                    <button type='button' className="single-recharge-component-home-sec-2 group flex flex-col justify-center items-center gap-10p" key={index}>
                                        <div className="top-image-blk bg-white w-100p h-100p flex items-center justify-center p-5 rounded-[15px]">
                                            <img src={items.image} className='duration-500 group-hover:scale-125' alt="" />
                                        </div>
                                        <div className="bottom-text-blk">
                                            <p className='text-GrayText text-center'>{items.title}</p>
                                            <p className='text-GrayText text-center'>{items.secondaryTitle}</p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RechargesBlocks