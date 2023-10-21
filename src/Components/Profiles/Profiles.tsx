import React, {useEffect, useState} from 'react'
import ProfilePokemon from './ProfilePokemon'
import './Profiles.scss'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import Team from '../Team/Team';

function Profiles() {
  
  const AuthState = useSelector((state: RootState) => state.auth);
  const USER_ID = AuthState.user_id;
  // ID for testintg
  //const id = '66efa9ce-6a6d-4466-a2ef-a48f00f82f40'
  const URL = `http://52.90.96.133:5500/api/profiles/${USER_ID}`;

  let [profile, setProfile] = useState({
      bio: '',
      image_url: ''
  });
  let [file, setFile] = useState('');
  let [editBio, setEditBio] = useState(false);


  useEffect(() => {
    axios.get(URL, {headers: {'Authorization': 'Bearer ' + AuthState.token}})
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
  async function submitBio(event: any){
    event.preventDefault()
    console.log(profile.bio)
    try{
      let headers = {
        'Authorization': `Bearer ${AuthState.token}`,
        'Content-Type': 'application/json'
      }
      const response = await axios.put(`${URL}/bio`, {bio: profile.bio}, {headers})
      alert('Bio updated!');
      setEditBio(false)
    }
    catch(err){
      console.error(err);
    }
  }

  // Function to upload profile picture
  async function uploadPhoto(event: any){
    event.preventDefault()

    let formData = new FormData();
    formData.append('image', file)
    await axios.put(`${URL}/photo`, formData, {headers:{
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + AuthState.token,
    }})

    axios.get(URL, {headers: {'Authorization': 'Bearer ' + AuthState.token}})
    .then(response => setProfile(response.data))
    .catch(err => console.log(err))
  }
  



  return (
    <div className='profile-container'>
        <div className='profile-info'>
            <h1 className='username'>{AuthState.username}</h1>
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
        <Team team_user_id={AuthState.user_id}/>
        <ProfilePokemon user_id={AuthState.user_id}/>
    </div>
  )
}

export default Profiles