import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

// Image Exports
import FooterLogo from '../../assets/images/footer-logo.svg';
import Instagram from '../../assets/images/instagram.svg';
import Facebook from '../../assets/images/faceboook.svg';
import Twitter from '../../assets/images/twitter.svg';
import LinkedIn from '../../assets/images/linkedin.svg';
import { NavLink } from 'react-router-dom';

const Footer = () => {

  const socialLinks = [
    {
      icon: Instagram,
      link: ''
    },
    {
      icon: Facebook,
      link: ''
    },
    {
      icon: Twitter,
      link: ''
    },
    {
      icon: LinkedIn,
      link: ''
    },
  ]

  return (
    <div className="Footer">
      <footer className="footer-main-section">
        <div className="inner-footer-main-section">
          <div className="footer-navigation-part">
            <div className="container">
              <div className="grid grid-cols-12 footer-menu-main-grid-section">
                <div className="col-span-4 footer-logo-desc-column">
                  <div className="footer-logo-des-soc-part">
                    <div className="top-footer-logo-sec">
                      <img src={FooterLogo} className='max-w-[250px]' alt="" />
                    </div>
                    <div className="footer-logo-desc-section mb-6 mt-2">
                      <p className='text-Black w-3/4'>We gather and verify service provider details across various categories & display them on our website.</p>
                    </div>
                    <div className="bottom-footer-social-section flex items-center gap-6">
                      {socialLinks.map((items , index) => {
                        return (
                          <button type="button" className='w-9 h-9'>
                            <img src={items.icon} alt="" />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                {/* <div className="col-span-2">
                  <div className="footer-navigations-1 similar-footer-navigators">
                    <nav>
                      <ul className='flex flex-col gap-5'>
                        <li className='text-Black font-medium'>Home</li>
                        <li className='text-Black font-medium'>About Us</li>
                        <li className='text-Black font-medium'>Conatct Us</li>
                        <li className='text-Black font-medium'>Services</li>
                        <li className='text-Black font-medium'>Categories</li>
                      </ul>
                    </nav>
                  </div>
                </div> */}
                <div className="col-span-3 similar-footer-menu-columns menu-first-column">
                  <div className="footer-navigations-2 similar-footer-navigators">
                    <nav>
                      <ul className='flex flex-col gap-5'>
                        <li className='text-Black font-medium'><NavLink to={'/businesses'}>Business 2 Business</NavLink></li>
                        <li className='text-Black font-medium'><NavLink to={'/coming-soon'}>Booking Services</NavLink></li>
                        <li className='text-Black font-medium'><NavLink to={'/coming-soon'}>Food Deliveries</NavLink></li>
                        <li className='text-Black font-medium'><NavLink to={'/coming-soon'}>Local Businesses</NavLink></li>
                        <li className='text-Black font-medium'><NavLink to={'/coming-soon'}>E-Commerce</NavLink></li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-span-2 similar-footer-menu-columns menu-second-column">
                  <div className="footer-navigations-3 similar-footer-navigators">
                    <nav>
                      <ul className='flex flex-col gap-5'>
                        <li className='text-Black font-medium'><NavLink to={'/advertise'}>Advertise Here</NavLink> </li>
                        <li className='text-Black font-medium'><NavLink to={'/coming-soon'}>Buy & Sell</NavLink> </li>
                        <li className='text-Black font-medium'><NavLink to={'/coming-soon'}>Locate Stores</NavLink> </li>
                        <li className='text-Black font-medium'><NavLink to={'/coming-soon'}>Explore Brands</NavLink> </li>
                        <li className='text-Black font-medium'><NavLink to={'/coming-soon'}>Shopping</NavLink> </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-span-3 similar-footer-menu-columns menu-third-column">
                  <div className="footer-navigations-4 similar-footer-navigators">
                    <nav>
                      <ul className='flex flex-col gap-5'>
                        <li className='text-Black font-medium'><NavLink to={'/terms-conditions'}>Terms & Conditions</NavLink></li>
                        <li className='text-Black font-medium'><NavLink to={'/privacy-policy'}>Privacy Policy</NavLink></li>
                        <li className='text-Black font-medium'><NavLink to={'/cancellation-policy'}>Cancellation Policy</NavLink></li>
                        <li className='text-Black font-medium'><NavLink to={'/'}>Local Mart</NavLink></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-cpoyright-part">
            <div className="container">
                <div className="copyright-outer-sec flex gap-20 justify-center items-center">
                  <div className="left-copyright-sec">
                    <p className='text-Black'>© Copyrights - Local Mart 2024</p>
                  </div>
                  {/* <div className="right-terms-footer-sec">
                    <ul className='flex items-center gap-8 terms-copyright-links'>
                      <li className='text-Black font-medium'><NavLink to={'/terms-conditions'}>Terms & Conditions</NavLink></li>
                      <li className='text-Black font-medium'><NavLink to={'/privacy-policy'}>Privacy Policy</NavLink></li>
                      <li className='text-Black font-medium'><NavLink to={'/cancellation-policy'}>Cancellation Policy</NavLink></li>
                    </ul>
                  </div> */}
                </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
