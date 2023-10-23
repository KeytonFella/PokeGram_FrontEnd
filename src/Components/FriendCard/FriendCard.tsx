import React from 'react';
import { Link } from 'react-router-dom';
import './FriendCard.scss';

// Props for the FriendCard component
interface FriendCardProps {
  username: string | null;
  userId:   string | null;
  imgSrc:   string | null; 
  bio:      string | null;
  //carouselImages: string[]; // Array of image URLs for the carousel
}

const FriendCard: React.FC<FriendCardProps> = ({ username, userId, imgSrc, bio }) => {
  return (
    <div className="card" >
      <img src={imgSrc ?? 'src\images\default_pp.jpg'} className="card-img-top" alt={`${username}'s avatar`} />
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{userId}</h6>
        <p className="card-text"> {bio}</p>
        <Link to={`/profile/${userId}`} className="card-link">
          View Profile
        </Link>
        <Link to={`/api/users/${userId}`} className="card-link">
          Send a message to {username}!
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
