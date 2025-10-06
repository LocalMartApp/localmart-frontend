import React from 'react';
import PropTypes from 'prop-types';
import './UnderConstruction.scss';
import UnderConstruct from '../../assets/images/under-construction.svg'
import { useNavigate } from 'react-router-dom';

const UnderConstruction = () => {



  const navigate  = useNavigate()


  return (
    <div className="UnderConstruction py-16 border-b border-Black border-opacity-20">
      <div className="inner-under-construction-page">
        <div className="container">
          <div className="inner-under-construct-content">
            <div className="top-image-section-coming">
              <img src={UnderConstruct} className='h-96 object-contain w-96 mx-auto' alt="" />
            </div>
            <div className="bottom-heading-section-construction mt-10 mb-6">
              <h2 className='text-center text-4xl mb-4 font-medium'>This Page is under development , Stay tuned!</h2>
              <p className='text-center w-[60%] mx-auto opacity-60'>but there's much more to see! We encourage you to explore our other pages to learn more about our services, solutions, and team. Stay tuned — this page will be live soon.</p>
            </div>
            <div className="go-back-section-construction text-center ">
              <button type="button" onClick={() => navigate (-1)} className='flex items-center justify-center mx-auto bg-Secondary px-8 py-2 rounded-full text-white'>
              <i class="bi bi-arrow-left mr-3"></i>
              Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UnderConstruction.propTypes = {};

UnderConstruction.defaultProps = {};

export default UnderConstruction;
