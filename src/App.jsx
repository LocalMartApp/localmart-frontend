import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Header from './Shared/Header/Header'
import Footer from './Shared/Footer/Footer'
import MyProfile from './Components/ProfileScreens/MyProfile/MyProfile'
import MyAddresses from './Components/ProfileScreens/MyAddresses/MyAddresses'
import MyBusiness from './Components/ProfileScreens/MyBusiness/MyBusiness'
import Notifications from './Components/ProfileScreens/Notifications/Notifications'
import MyFavourites from './Components/ProfileScreens/MyFavourites/MyFavourites'
import UserLogin from './Components/Auth/UserLogin/UserLogin'
import BusinessPage from './Components/BusinessPage/BusinessPage'
import UserRegister from './Components/Auth/UserRegister/UserRegister'
import CompleteRegistration from './Components/Auth/UserRegister/CompleteRegistration'
import SearchPage from './Components/SearchPage/SearchPage'
import SearchDetails from './Components/SearchPage/SearchDetails'
import BusinessFormAdding from './Components/BusinessFormAdding/BusinessFormAdding'
import { Toaster } from 'react-hot-toast';
import BusinessUploadMedia from './Components/BusinessFormAdding/BusinessUploadMedia'
import CancellationPolicy from './Components/PoliciesPages/CancellationPolicy'
import TermsandConditions from './Components/PoliciesPages/TermsandConditions'
import PrivacyPolicy from './Components/PoliciesPages/PrivacyPolicy'
import ScrollToTop from './utils/ScrollToTop'
import React, { useState } from 'react'




const Layout = () => {


  return (
      <>
        <Header/>
        <Routes>
          <Route exact={true} Component={Home} path='/' />
          <Route exact={true} Component={MyProfile} path='/profile/my-profile' />
          <Route exact={true} Component={MyAddresses} path='/profile/my-addresses' />
          <Route exact={true} Component={MyBusiness} path='/profile/my-businesess' />
          <Route exact={true} Component={MyFavourites} path='/profile/my-favourites' />
          <Route exact={true} Component={Notifications} path='/profile/notifications' />
          <Route exact={true} Component={BusinessPage} path='/businesses'/>
          <Route exact={true} Component={UserLogin} path='/login' />
          <Route exact={true} Component={UserRegister} path='/register' />
          <Route exact={true} Component={CompleteRegistration} path='/register-details' />
          <Route exact={true} Component={SearchPage} path='/search' />
          <Route exact={true} Component={SearchDetails} path='/search/complete-details/:id'/>
          <Route exact={true} Component={BusinessFormAdding} path='/business/add-business' />
          <Route exact={true} Component={BusinessUploadMedia} path='/business/add-photos' />

          {/* Ploicies Pages */}
          <Route exact={true} Component={CancellationPolicy} path='/cancellation-policy'/>
          <Route exact={true} Component={TermsandConditions} path='/terms-conditions'/>
          <Route exact={true} Component={PrivacyPolicy} path='/privacy-policy'/>
        </Routes>
        <Footer/>
      </>
  )
}




function App() {


  const [headerBar , setHeaderBar] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 600) {
      setHeaderBar(true)
    }
    if(window.pageYOffset <= 500) {
      setHeaderBar(false)
    }
  });


  return (
    <>
     <Router>
      <ScrollToTop/>
      <Layout/>
      <Toaster 
          position="top-center"
          reverseOrder={false}
          gutter={12}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
              fontFamily: 'Poppins',
              paddingRight: 15,
              paddingLeft: 15,
            },
        
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
      />
      <div className={`go-to-top-button-section z-[99999] fixed bottom-10 right-10 w-10 h-10 ${headerBar ? 'block' : ''}`} onClick={scrollToTop}>
          <button type="button" className='w-full bg-Secondary h-full rounded-full flex items-center justify-center'>
            <i className="ri-arrow-up-line text-lg text-white"></i>
          </button>
      </div>
     </Router>
    </>
  )
}

export default App
