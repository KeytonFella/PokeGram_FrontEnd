import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';

function FriendFinder() {
    const AuthState = useSelector((state: RootState) => state.auth);
    const USER_ID = AuthState.user_id;
    // id for testing purposes
    const userID = 'd6305ddf-32af-4006-8148-5881761e9e30'
    const URL = `http://52.90.96.133:5500/api/addresses/user/${userID}`;

    type Coordinates = {
        lat: number,
        lng: number
    }

    let [nearbyUsers, setNearbyUsers] = useState([] as any);

    useEffect(() => {
        getAllAddresses();
    },[])

    // Function to get all addresses from database
    async function getAllAddresses(){
        let origin: Coordinates;
        let others: any;
        let requests = [];
        const req1 = await  axios.get(URL).then((response) => {
            origin = response.data
        }).catch((error) => {console.log(error)})
        const req2 = await axios.get(`${URL}/others`, {headers: {'Authorization': AuthState.token}}).then((response) => {
            others = response.data
        }).catch((error) => {console.log(error)})
        requests.push(req1, req2);
        Promise.all(requests).then(() => {
            compareDistances(origin, others);
        })

    }

    // Function to iterate through each address and calculate distance from origin 
    function compareDistances(origin: Coordinates, others: any[]){
        const nearby: any = [];
        if(others.length <= 0){
            setNearbyUsers(nearby)
            return
        }else{

            for(let i = 0; i < others.length; i++){
                const distance = calculateDistance(origin, others[i].address);
                let user = {
                    user_id: others[i].user_id,
                    username: others[i].username,
                    distance: distance
                }
                if (distance <= 25) {
                    nearby.push(user);
                }
            };
            console.log(nearby)
            setNearbyUsers(nearby);
            }
    }

    // ================== Helper Function ==================

    // Helper function to calculate distance between two sets of coordinates in miles
    function calculateDistance(origin: Coordinates, destination: Coordinates) {
        const earthRadiusMiles = 3958.8; // Earth's radius in miles
        
        const lat1 = origin.lat;
        const lon1 = origin.lng;
    
        const lat2 = destination.lat;
        const lon2 = destination.lng;
    
        const dLat: number = ((lat2 - lat1) * Math.PI) / 180;
        const dLon: number = ((lon2 - lon1) * Math.PI) / 180;
    
        const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInMiles = earthRadiusMiles * c;
    
        return distanceInMiles;
    }
 

  return (

    <div>
        <h1>Friend Finder</h1>
        <div>
            {nearbyUsers.map((user: any) => (
                 <div key={user.user_id}>
                    <h3>{user.username}</h3>
                    <p>{user.distance.toFixed(4)} miles away</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FriendFinder