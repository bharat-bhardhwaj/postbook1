import React,{useEffect,useState,useContext} from 'react';
import {Usercontext} from '../../App';
import classes from './profile.module.css';
import {useParams} from 'react-router-dom';

const Profile =() => {
    const [userProfile,setProfile]=useState(null)
 
    const {state,dispatch} = useContext(Usercontext);
    const{userid}=useParams()

   const [showfollow,setShowfollow]=useState(state?!state.following.includes(userid):true)

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            
            setProfile(result)
        })
    },[])

    const followUSer =()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                        }
                }
            })
            setShowfollow(false)
        })
    }

    const unfollowUSer =()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setProfile((prevState)=>{
                const newfollower =prevState.user.followers.filter(item=>item!==data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newfollower
                        }
                }
            })
            setShowfollow(true)
        })
    }
    return (
        <>
            {
                userProfile ?  
                
        <div className={classes.Profile}>
        <div className={classes.Maindiv}>

            <div className={classes.Image}>
                <img src={userProfile.user.pic}
                 alt="imahge"></img>
            </div>
            <div className={classes.Contentdiv}>
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>
                <div className={classes.ContentSecond}>
                    <h5>{userProfile.posts.length} posts</h5>
                    <h5>{userProfile.user.followers.length} follower</h5>
                    <h5>{userProfile.user.following.length}following</h5>
                </div>
                {showfollow?
                <button className="btn waves-effect waves-light"
                onClick={()=>followUSer()}>follow</button>
                :<button className="btn waves-effect waves-light"
                onClick={()=>unfollowUSer()}>unfollow</button>
                }
                
                
            </div>
        </div>
    
    <div className={classes.gallery}>
        {
            userProfile.posts.map(item=>{
                return(

                    <img key={item._id} className={classes.item} alt={item.title} src={item.photo} alt={item.title}></img>
                )
            })
        
        }
    </div>
</div>
                
                :<h2>loading........</h2>
            }        
        </>

    )
}

export default Profile;