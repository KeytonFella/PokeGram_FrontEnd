import React from 'react'
import ProfilePokemon from './ProfilePokemon'
import './Profiles.css'

function Profiles() {
  return (
    <div>
        <div className='profile-info'>
            <h1 className='profile-name'>Name</h1>
            <form className='photo-form' encType='multipart/form-data'>
              <p>Choose a picture to update your profile with!</p>
              <input type='file' name='image' className='inputfile' />
            </form>
        </div>
        <ProfilePokemon />
    </div>
  )
}

export default Profiles