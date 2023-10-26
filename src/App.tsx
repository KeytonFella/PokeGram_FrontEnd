import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Trades from './Components/Trades/Trades';
import Profiles from './Components/Profiles/Profiles';
import Confirm from './Components/Confirm/Confirm';
import TeamView from './Components/TeamView/TeamView';
import EditTeam from './Components/EditTeam/EditTeam';
import UserProfile from './Components/UserProfile/UserProfile';
import Friends from './Components/Friends/Friends';
import Messages from './Components/Messages/Messages';


function App() {
  return (
    <div className="App">   
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/trades" element={<Trades/>}/>
        <Route path="/profiles" element={<Profiles />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/editTeam" element={<EditTeam />}/>
        <Route path="/team" element={<TeamView/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/confirm' element={<Confirm/>}/>
        <Route path='/friends' element={<Friends/>}/>
        <Route path="/profile/:profile_id" element={<UserProfile/>} />
        <Route path="/users" element={<Register/>}/>
        <Route path="/posts/:profile_id" element={<UserProfile/>}/>
        <Route path="/messages" element={<Messages/>}/>
    </Routes>
    </div>    
  );
}
export default App;