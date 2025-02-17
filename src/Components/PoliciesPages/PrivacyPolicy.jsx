import React from 'react'
import { NavLink } from 'react-router-dom'

const PrivacyPolicy = () => {
    
  return (
    <div className='policy-pages-main-sec cancellation-policy'>
        <div className="inner-policy-section">
            <section className="policy-breadcrumb py-20 bg-LightBlue">
                <div className="inner-policy-bread-crumb">
                    <div className="container">
                        <div className="main-policy-head mb-3">
                            <h2 className='uppercase font-bold text-5xl text-Black text-center'>Privacy Policy</h2>
                        </div>
                        <div className="bottom-navigation-breadcrumb">
                            <ul className='flex items-center gap-x-2 justify-center'>
                                <li><NavLink className={'text-Secondary'} to={'/'}>Home</NavLink></li>
                                <li><i className="ri-arrow-right-s-line text-xl"></i></li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="policy-main-content border-b border-Black border-opacity-20 py-16">
                <div className="inner-policy-main-content">
                    <div className="container">
                        <div className="inner-paragraphs flex flex-col gap-5 w-10/12 mx-auto">
                            <p className='text-lg opacity-80'>At <span className='text-Secondary font-semibold'>Localmart</span>, we value the businesses that list their services on 
                                our platform and strive to provide a seamless experience. We understand that users may need to modify or 
                                remove their business listings at any time, and we aim to make the cancellation process as smooth as possible.
                            </p>
                            <p className='text-lg opacity-80'>When a user adds a business to our platform, they have the option to choose between
                                a Free Listing and a Promotional Listing. Free Listings can be removed instantly without any processing time. 
                                However, Promotional Listings, which come with a monthly subscription fee, require a structured cancellation process 
                                to ensure proper termination.
                            </p>
                            <p className='text-lg opacity-80'>If a user decides to remove their business from the platform, the cancellation process will 
                                take 3-4 business days to complete. This time frame allows us to verify the cancellation request and process it systematically. 
                                During this period, the business listing may remain active on the platform until the cancellation is fully executed. Users are 
                                encouraged to plan their cancellations accordingly if they do not wish their business to remain visible.
                            </p>
                            <p className='text-lg opacity-80'>To initiate a cancellation, users must follow the designated process within their account 
                                settings or contact our support team for assistance. Once the request is received, our team will begin the necessary steps to 
                                remove the promotional listing from the platform. Users will be notified about the status of their cancellation via email or SMS updates.
                            </p>
                            <p className='text-lg opacity-80'>It is important to note that once a promotional business listing is removed, it cannot be reactivated under the 
                                same subscription. If users wish to relist their business with promotional benefits, they will need to create a new listing and subscribe again.
                            </p>
                            <p className='text-lg opacity-80'>We recommend that users initiate cancellation requests well in advance of their next billing cycle to ensure a hassle-free process. 
                                If you have any concerns or require assistance with the cancellation process, our support team is always available to help.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default PrivacyPolicy