
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AllEvent from './components/Admin/AllEvent';
import AdminHome from './components/Admin/AdminHome';
import User from './components/User/User'
// import AdminSignIn from './components/Admin/LoginPage';
import AddEvent from './components/Admin/AddEvent';
import LoginForm from './components/LoginForm/LoginForm'
import LoginPage from './components/Admin/LoginPage'
import { ProtRouteAdmin } from './components/auth/ProtRouteAdmin';
import { ProtRouteUser } from './components/auth/ProtRouteUser';
import { AuthProvider } from './components/AuthRouter';
import Home from './components/Home/Home';
import SignUp from './components/Home/SignUp/SignUpForm';
import Eventbooking from './components/Admin/Eventbooking';
import Mybooking from './components/User/Mybooking';
import EventRegister from './components/User/Eventregister';
import Paymentpage from './Paymentpage';


function App() {


  return (
    <AuthProvider>
      <Routes >

        {/* <Route path='/' element={<ProtRouteUser><Home /></ProtRouteUser>} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/adlogin' element={<LoginPage />}/>
        <Route path='/signup' element={<SignUp />} />

        {/* <Route path='/admin' element={<ProtRouteAdmin><AdminHome /></ProtRouteAdmin>} /> */}
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/user' element={<User />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/all-event" element={<AllEvent />} />
        <Route path="/event-bookings" element={<Eventbooking />} />
        <Route path="/event-register" element={<EventRegister />} />
        <Route path="/mybooking" element={<Mybooking />} />
        <Route path="/payment" element={<Paymentpage />} />
        {/* <Route path='/admin/login' element={<AdminSignIn />} /> */}

        <Route path='*' element={<h1>No page avialable</h1>} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
