import React, { useState,useEffect} from 'react';
import {storage} from '../../firebase/firebase';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';

const CreatePost =()=>{
    const history = useHistory();
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [Image,setImage]=useState("");
    const [url,setUrl]=useState("");
    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    
                    title,
                    body,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{
                
                if(data.error){
                    M.toast({html: data.error,classes:"#e53935 red darken-1"})
                }
    
                else{
                    M.toast({html:"created post succesfully",classes:"#4db6ac teal lighten-2"})
                    history.push('/')
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[url])

    const PostDetails =()=>{
        const uploadTask=storage.ref(`posts/${Image.name}`)
            .put(Image)

            uploadTask.on('state_changed',(snapshot)=>{

            },(error)=>{
                console.log("error")
            },()=>{
                storage.ref('posts').child(Image.name).getDownloadURL().then(url=>{
                    console.log(url)
                    setUrl(url)
                })
            })
        


    /////////uploading call..........


        // fetch("https://api.cloudinary.com/v1_1/postbookcloud/image/upload",{
        //     method:"post",
        //     body:data
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     setUrl(data.url);
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
    }

    return (
        <div className="card input-field"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <p style={{
                color:"#DC401E",
                fontSize:"50px",
                textTransform:"uppercase",
                letterSpacing:"20px",
                fontWeight:"100"
            }}>postbook</p>
            <input type="text"  placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn" style={{
                    color:"#DC401E",
                    backgroundColor:"white"
                }}>
                    <span>Upload image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}></input>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"></input>
                </div>
            </div>

            
            <button className="btn waves-effect waves-light" onClick={()=>PostDetails()}> submit post

            </button>
        </div>
    )
}

export default CreatePost;