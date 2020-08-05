import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar';
import "./App.css";
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom';
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile';
import SubscribeUSerPosts from './components/screens/SubscribesUserposts';

export const Usercontext =createContext()


const Routing =() =>{
  const history =useHistory()
  const {state,dispatch} =useContext(Usercontext);
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }else{
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
    <Route exact path='/'>
    <Home/>
    </Route>

    <Route path="/signin">
      <Signin/>
    </Route>
    <Route exact path="/profile">
      <Profile/>
    </Route>
    <Route path="/signup">
      <Signup/>
    </Route>
    <Route path="/create">
      <CreatePost/>
    </Route>
    <Route path="/profile/:userid">
      <UserProfile/>
    </Route>
    <Route path="/myfollowerspost">
      <SubscribeUSerPosts/>
    </Route>
    </Switch>

  );
}


function App() {

  const [state,dispatch] =useReducer(reducer,initialState);
  return (
    <Usercontext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar/>
    
      <Routing/>

    </BrowserRouter>
    </Usercontext.Provider>
  );
}

export default App;
