import React,{useEffect,useState,useContext} from 'react';
import {Usercontext} from '../../App';
import classes from './profile.module.css';

const Profile =() => {
    const [mypics,setPics]=useState([])
    const {state,dispatch} = useContext(Usercontext);
    console.log(state)
    
    useEffect(()=>{
        fetch('/myposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])
    return (
        <div className={classes.Profile}>
            <div className={classes.Maindiv}>

                <div className={classes.Image}>
                    <img src={state?state.pic:"loading"}
                     alt="image"></img>

                     
                </div>
                
            

                
                <div className={classes.Contentdiv}>
                    <h4>{state? state.name:"loading.."}</h4>
                    <h5>{state? state.email:"loading.."}</h5>
                    <div className={classes.ContentSecond}>
                        <h5>{mypics.length} posts</h5>
                        <h5>{state? state.followers.length:0} follower</h5>
                        <h5>{state? state.following.length:0}  following</h5>
                    </div>
                </div>
            </div>
        
        <div className={classes.gallery}>
            {
                mypics.map(item=>{
                    return(

                        <img key={item._id} className={classes.item} alt={item.title} src={item.photo} alt={item.title}></img>
                    )
                })
            
            }
        </div>
    </div>

    )
}

export default Profile;