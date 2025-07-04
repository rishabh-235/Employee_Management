import './style/mobileprofile.css';
import { useSelector } from 'react-redux';

function MobileProfile() {
  const user = useSelector((state) => state.user.user);

  const handleUpdateProfile = (event)=>{
    event.preventDefault();
    console.log(event.target);
  }

  return (
    <div className="mobile-profile-container">
      <form onSubmit={handleUpdateProfile} >
        <label htmlFor="firstname">First Name</label>
        <input type="text" id="firstname" name="firstname" defaultValue={user.firstName} />

        <label htmlFor="lastname">Last Name</label>
        <input type="text" id="lastname" name="lastname" defaultValue={user.lastName} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" defaultValue={user.email} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" defaultValue={user.password} />

        <label htmlFor="confirmpassword">Confirm Password</label>
        <input type="password" id="confirmpassword" name="confirmpassword" defaultValue={user.password} />

        <button className='mobile-profile-save-button'>Save</button>
      </form>
    </div>
  )
}

export default MobileProfile