import React, {useEffect, useState} from 'react'
import ProfilePokemon from './ProfilePokemon'
import './Profiles.css'
import axios from 'axios'

function Profiles() {

  let [profile, setProfile] = useState({
    bio: '',
    image_url: ''
  })

  let [file, setFile] = useState('' as any);

  useEffect(() => {
    axios.get('http://localhost:5500/api/profiles/1')
    .then(response => setProfile(response.data))
    .catch(err => console.log(err))
  }, [])

  // Function to upload profile picture
  async function uploadPhoto(event: any){
    event.preventDefault()

    let formData = new FormData();
    formData.append('image', file)
    await axios.put('http://localhost:5500/api/profiles/1/update/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}})

    axios.get('http://localhost:5500/api/profiles/1')
    .then(response => setProfile(response.data))
    .catch(err => console.log(err))
  }
  
  // Function to select file
  function selectFile(event: any){
    console.log(event.target.files[0])
    setFile(event.target.files[0])
  }

  return (
    <div>
        <div className='profile-info'>
            <h1 className='username'>Username</h1>
            <p className='bio'>{profile.bio}</p>
            <img src={profile.image_url} alt='profile-pic' className='profile-pic' />
            <form className='photo-form' onSubmit={uploadPhoto}>
              <p>Choose a picture to update your profile with!</p>
              <input type='file' onChange={selectFile} className='inputfile' />
              <button type='submit'>Upload</button>
            </form>
        </div>
        <ProfilePokemon />
    </div>
  )
}

export default Profiles