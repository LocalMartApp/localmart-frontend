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






function App() {

  return (
    <>
     <Router>
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
      </Routes>
      <Footer/>
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
     </Router>
    </>
  )
}

export default App
