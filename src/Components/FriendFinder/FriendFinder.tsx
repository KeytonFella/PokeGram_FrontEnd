import React, {useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import './FriendFinder.scss'
import { Link } from 'react-router-dom';

function FriendFinder() {
    const AuthState = useSelector((state: RootState) => state.auth);
    const URL = `https://3oa690sz75.execute-api.us-east-1.amazonaws.com/prod/api/nearbyfriends/${AuthState.user_id}`;
    let [nearbyUsers, setNearbyUsers] = useState([] as any);
    let [distance, setDistance] = useState(0);

     function getUsers(e: any){
        e.preventDefault();
        axios.post(URL, {distance: distance}, {headers: {Authorization: AuthState.token}}).then((res) => {
            setNearbyUsers(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    function distanceChange(e: any) {
        e.preventDefault();
        setDistance(e.target.value);
        console.log(distance)
    }
    
  return (
    <div className='friends-container'>
        <h2 >Friend Finder</h2>
        <div className='radius-form'>
            <form onSubmit={getUsers} > 
                <p className='radius-label'>Search radius (miles): </p>
                <input type="text" placeholder='25' onChange={distanceChange} className='radius-input'/>
                <input type="submit" value="Submit" className='radius-btn'/>
            </form>
        </div>
        <div className='user-container'>
            {nearbyUsers.length === 0 && <p className='no-users'>No users found</p>}
            {nearbyUsers.map((user: any) => (
                <div className="user-entry" key={user.user_id}>
                    <h5>{user.username}</h5>
                    <p>{user.distance.toFixed(2)} miles away</p>
                    <Link to={`/profile/${user.user_id}`}>
                        <button type='button' className='view-profile-btn'>View Profile</button>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FriendFinder