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
  const URL = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/profiles/${USER_ID}`;
  const BUCKET_NAME = 'pokegram-profile-photos';

  let [profile, setProfile] = useState({
      bio: '',
      image_url: ''
  });
  let [file, setFile] = useState('');
  let [editBio, setEditBio] = useState(false);
  let [address, setAddress] = useState({
    street_number: '',
    street_name: '',
    city: '',
    state: '',
    zip: '',
    
  })


  useEffect(() => {
    axios.get(URL, {headers: {Authorization: AuthState.token}})
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

  function updateStreetNumber(event: any){
    setAddress({...address, street_number: event.target.value})
  }
  function updateStreetName(event: any){
    setAddress({...address, street_name: event.target.value})
  }
  function updateCity(event: any){
    setAddress({...address, city: event.target.value})
  }
  function updateState(event: any){
    setAddress({...address, state: event.target.value})
  }
  function updateZip(event: any){
    setAddress({...address, zip: event.target.value})
  }

  // Function to submit bio
  async function submitBio(event: any){
    event.preventDefault()
    console.log(profile.bio)
    axios.put(`${URL}/bio`, {bio: profile.bio}, {headers: {Authorization: AuthState.token}})
    .then(response => console.log(response))
    .catch(err => console.log(err))
    setEditBio(false)
  }

  // Function to upload profile picture
  async function uploadPhoto(event: any){
    event.preventDefault()
    await axios.put(`${URL}/photo/${BUCKET_NAME}/${USER_ID}.png`, file, {headers:{
      'Content-Type': 'image/png',
      Authorization: AuthState.token,
    }})

    await axios.put(`${URL}/photo`, {headers:{Authorization: AuthState.token }})
    .then(response => console.log(response))
    .catch(err => console.log(err))
      
    await axios.get(URL, {headers: {Authorization: AuthState.token}})
    .then(response => setProfile(response.data))
    .catch(err => console.log(err))
  }
  
  async function updateAddress(event: any){
    event.preventDefault();
    console.log(address)
    await axios.put(`${URL}/address`, {address: address}, {headers: {Authorization: AuthState.token}})
    .then(response => alert('Address Updated!'))
    .catch(err => console.log(err))
    setAddress({
      street_number: '',
      street_name: '',
      city: '',
      state: '',
      zip: '',
    });
  }

  return (
    <div className='profile-container'>
      <h1 className='username'>{AuthState.username}</h1>
      <div className='grid-container'>
        <h2 className='container-header'>Update Bio</h2>
        <h2 className='container-header'>Update Profile Picture</h2>
        <h2 className='container-header'>Update Address</h2>
      </div>
      <div className='grid-container'>
        <div className='bio-container'>
          <h4 className='bio'>{`"${profile.bio}"`}</h4>
          <button type='button' className='profile-btn' onClick={() => setEditBio(true)}>Edit bio</button>

          {editBio === true && 
          <form className='bio-form' onSubmit={submitBio}>
            <textarea className='bio-input' defaultValue={profile.bio} onChange={updateBio}/><br/>
            {/* <input type='text' className='bio-input' defaultValue={profile.bio} onChange={updateBio}/><br/> */}
            <button type='button' className='bio-cancel-btn' onClick={() => setEditBio(false)}>Cancel</button>
            <button type='submit' className='profile-btn'>Submit</button>
          </form>
          }
        </div>
        <div className='picture-container'>
          <img src={profile.image_url} alt='profile-pic' className='profile-pic'/>
          {/* <form className='photo-form' onSubmit={uploadPhoto}>
            <h5>Choose a picture to update your profile with!</h5>
            <input type='file' accept='.png' onChange={selectFile} className='profile-btn' /><br/>
            <button type='submit' className='profile-btn'>Upload</button>
          </form> */}
          <div className='photo-form'>
            <h5>Choose a picture to update your profile with!</h5>
            <input type='file' onChange={selectFile} className='profile-btn' accept='.png' /><br/>
            <button type='submit' className='profile-btn' onClick={uploadPhoto}>Upload</button>
          </div>
        </div>
        <form id='address-form' className='address-container' onSubmit={updateAddress}>
            <p className='address-label'>Street Number:</p>
            <input type='text' placeholder='1234' className='address-input' onChange={updateStreetNumber}/>
            <p className='address-label'>Street Name:</p>
            <input type='text' placeholder='Main St' className='address-input' onChange={updateStreetName}/>
            <p className='address-label'>City:</p>
            <input type='text' placeholder='Seattle' className='address-input' onChange={updateCity}/>
            <p className='address-label'>State:</p>
            <input type='text' placeholder='WA' className='address-input' maxLength={2} onChange={updateState}/>
            <p className='address-label'>Zip:</p>
            <input type='text' placeholder='99999' className='address-input' onChange={updateZip}/>
            <button type='submit' className='profile-btn'>Update Address</button>
        </form>
      </div>
      <Team team_user_id={AuthState.user_id}/>
      <ProfilePokemon user_id={AuthState.user_id}/>
    </div>
  )
}

export default Profiles