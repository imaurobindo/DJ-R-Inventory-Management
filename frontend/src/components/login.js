// Import the react JS packages 
import axios from "axios";
import {useState} from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';

// Define the Login function.
export const Login = () => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [showPassword, setShowPassword] = useState(false);

     const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
      toast.success("Haan....   You Very Chalak Bro!");
    };

     // Create the submit method.
     const submit = async e => {
      e.preventDefault();
      const user = {
        username: username,
        password: password,
      };
      try {
        const { data } = await axios.post(`http://${window.location.hostname}:8000/token/`, user, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: false
        });
    
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
    
        // Check if the user is a staff member
        const { data: currentUser } = await axios.get(`http://${window.location.hostname}:8000/current_user/`);
        if (currentUser.username == "admin@gmail.com") {
          window.location.href = '/hidden404/admindashboard';
        } else if (currentUser.is_staff) {
          window.location.href = '/dashboard';
        } else {
          toast.warning("Please Update Your data to access the Dashboard!");
    
          setTimeout(() => {
            window.location.href = '/updateyourprofile';
          }, 3000);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Invalid credentials');
        } else {
          toast.error('Login failed, Please try again with valid credentials !');
        }
      }
    };
    
    return(
      <div className="Auth-form-container">
        <div className="Auth-form-container-inner">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input name='password' 
                type={showPassword ? "text" : "password"}    
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
                <button
              className="eye-button-login"
              type="button"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
                
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                 className="btn btn-primary">Login</button>
            </div>
          </div>
       </form>
       </div>
     </div>
     )
}