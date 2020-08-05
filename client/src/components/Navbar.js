import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {Usercontext} from '../App';
const NavBar=()=>{
  
  const {state,dispatch} =useContext(Usercontext);
  const history =useHistory();
  const renderlist =()=>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/myfollowerspost">followers Post</Link></li>,
        <li>
          <Link>
           <button style={{
             border:"none",
              textTransform:"uppercase",
              
           }}
           
           onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')

           }}>LOGout</button>
           </Link>
           
        </li>
      ]
    }else{
        return [
          <li><Link to="/signin">Signin</Link></li>,
          <li><Link to="/signup">Signup</Link></li>
        ]
    }
  }

  return (
    <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Postbook</Link>
      <ul id="nav-mobile" className="right">
        {renderlist()}

      </ul>
    </div>
  </nav>
)
}



export default NavBar;