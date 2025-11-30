
import { clearAuth,clearEdit } from '../stateManagement/memberSlice.js';
import toast from 'react-hot-toast';


const logoutUser = (navigate,dispatch) => {
    try {
     

      // Clear persisted storage (localStorage/sessionStorage)
      localStorage.removeItem('memberState'); // persisted slice
      localStorage.removeItem('token');       // if stored separately
      sessionStorage.removeItem('memberState'); // if using session mode

      // Show feedback
      toast.success("Logged out successfully!");

       // Clear Redux state
      dispatch(clearAuth());
            dispatch(clearEdit());
      

      // Redirect to login/home
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Something went wrong during logout.");
    }
  };

  export default logoutUser;