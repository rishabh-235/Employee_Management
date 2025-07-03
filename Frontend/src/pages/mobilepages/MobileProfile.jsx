import React from 'react';
import './style/mobileprofile.css';

function MobileProfile() {
  return (
    <div className="mobile-profile-container">
      <form>
        <label htmlFor="firstname">First Name</label>
        <input type="text" id="firstname" name="firstname" />

        <label htmlFor="lastname">Last Name</label>
        <input type="text" id="lastname" name="lastname" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />

        <label htmlFor="confirmpassword">Confirm Password</label>
        <input type="password" id="confirmpassword" name="confirmpassword" />

        <button className='mobile-profile-save-button'>Save</button>
      </form>
    </div>
  )
}

export default MobileProfile