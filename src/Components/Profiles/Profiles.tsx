import React from 'react'
import ProfilePokemon from './ProfilePokemon'

function Profiles() {
  return (
    <div>
        <div>
            <form className='photo-form' encType='multipart/form-data'>
              <input type='file' name='image' className='inputfile' />
            </form>
        </div>
        <ProfilePokemon />
    </div>
  )
}

export default Profiles