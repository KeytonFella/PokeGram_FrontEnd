import React, {useEffect, useState} from 'react'
import ProfilePokemon from './ProfilePokemon'
import './Profiles.css'
import axios from 'axios'

function Profiles() {

  let [profile, setProfile] = useState({
      bio: '',
      image_url: ''
  });
  let [file, setFile] = useState('');
  let [editBio, setEditBio] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:5500/api/profiles/1')
    .then(response => setProfile(response.data))
    .catch(err => console.log(err))
  }, [])
  
  // Function to select file
  function selectFile(event: any){
    setFile(event.target.files[0])
  }

  // Function to update state bio
  function updateBio(event: any){
    setProfile({...profile, bio: event.target.value})
  }

  // Function to submit bio
  function submitBio(event: any){
    event.preventDefault()
    console.log(profile.bio)
    axios.put('http://localhost:5500/api/profiles/1/update/bio', {bio: profile.bio})
    .then(response => alert('Bio updated!'))
    .catch(err => console.log(err))
    setEditBio(false)
  }

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
  



  return (
    <div>
        <div className='profile-info'>
            <h1 className='username'>Username</h1>
            <p className='bio'>{profile.bio}</p>
            <button type='button' className='edit-profile' onClick={() => setEditBio(true)}>Edit bio</button>
            <br/>
            {editBio === true && 
            <form className='bio-form' onSubmit={submitBio}>
              <input type='text' className='bio-input' defaultValue={profile.bio} onChange={updateBio}/>
              <button type='button' className='bio-cancel' onClick={() => setEditBio(false)}>Cancel</button>
              <button type='submit' className='bio-submit'>Submit</button>
            </form>
            }

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