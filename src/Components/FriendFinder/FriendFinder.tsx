import React, {useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import './FriendFinder.scss'
import { Link } from 'react-router-dom';

function FriendFinder() {
    const AuthState = useSelector((state: RootState) => state.auth);
    const URL = `http://52.90.96.133:5500/api/addresses/user/${AuthState.user_id}/others`;

    let [nearbyUsers, setNearbyUsers] = useState([] as any);
    let [distance, setDistance] = useState(0);

     function getUsers(e: any){
        e.preventDefault();
        axios.post(URL, {distance: distance}, {headers: {Authorization: `Bearer ${AuthState.token}`}}).then((res) => {
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
        <h1>Friend Finder</h1>
        <div className='radius-form'>
            <form onSubmit={getUsers} > 
                <label htmlFor='radius-input' className='radius-label'>Search radius (miles): </label>
                <input type="text" placeholder='25' onChange={distanceChange} className='radius-input'/>
                <input type="submit" value="Submit" className='radius-btn'/>
            </form>
        </div>
        <div className='user-container'>
            {nearbyUsers.map((user: any) => (
                <div className="user-entry" key={user.user_id}>
                    <h3>{user.username}</h3>
                    <p>{user.distance.toFixed(3)} miles away</p>
                    <button>
                        View Profile
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FriendFinder