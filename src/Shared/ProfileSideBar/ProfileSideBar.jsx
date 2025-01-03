import React from 'react';
import PropTypes from 'prop-types';
import './ProfileSideBar.scss';
import { NavLink } from 'react-router-dom';


const ProfileSideBar = () => {
  
  const navigationLinks = [
    {
      title: 'My Profile',
      link: '/profile/my-profile',
      button: false,
    },
    {
      title: 'Notifications',
      link: '/profile/notifications',
      button: false,
    },
    {
      title: 'Addresses',
      link: '/profile/my-addresses',
      button: false,
    },
    {
      title: 'My Favorites',
      link: '/profile/my-favourites',
      button: false,
    },
    {
      title: 'My Businesses',
      link: '/profile/my-businesess',
      button: false,
    },
    {
      title: 'My Transactions',
      link: '/profile/my-transactions',
      button: false,
    },
    {
      title: 'Customer Care',
      link: '/customer-care',
      button: false,
    },
    {
      title: 'Feedback',
      link: '/feedback',
      button: false,
    },
    {
      title: 'Help',
      link: '/help',
      button: false,
    },
    {
      title: 'Log Out',
      link: '/log-out',
      button: true,
    },
  ]

  return (
    <div className="ProfileSideBar">
      <div className="inner-sidebar-section">
        <div className="sidebar-navigation-part">
          <nav>
            <ul className='flex flex-col gap-4'>
              {navigationLinks.map((items , index) => {
                return (
                  <li className="single-navigator-sidebar" key={index}>
                    <NavLink className='py-2 px-4 duration-300 hover:text-Primary text-Black' to={items.link}>{items.title}</NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

ProfileSideBar.propTypes = {};

ProfileSideBar.defaultProps = {};

export default ProfileSideBar;
