import React,{useState,useEffect} from 'react'
import {storage} from '../../firebase/firebase';

import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup =() => {
    const history=useHistory()
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [image,setImage]=useState("");
    const [url,setUrl]=useState(undefined);
    useEffect(()=>{
        if(url){
            uploadfields()
        }
    },[url])

    const uploadPic =()=>{
        
            const uploadTask=storage.ref(`profiles/${image.name}`)
            .put(image)

            uploadTask.on('state_changed',(snapshot)=>{

            },(error)=>{
                console.log("error")
            },()=>{
                storage.ref('profiles').child(image.name).getDownloadURL().then(url=>{
                    console.log(url)
                    setUrl(url)
                })
            })

    //     const data =new FormData();
    //     data.append("file",Image)
    //     data.append("upload_preset","Postbook");
    //     data.append("cloud_name","postbookcloud");


    // /////////uploading call..........


    //     fetch("https://api.cloudinary.com/v1_1/postbookcloud/image/upload",{
    //         method:"post",
    //         body:data
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setUrl(data.url);
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
}

    const uploadfields =()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#e53935 red darken-1"})
            return;
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#e53935 red darken-1"})
            }

            else{
                M.toast({html:data.message,classes:"#4db6ac teal lighten-2"})
                history.push('/signin')
            }
        })
        .catch(err=>{
            console.log(err);
        })

    }

    const PostData =()=>{

       if(image){
           uploadPic()
       }else{
           uploadfields()
       }
    
    }
    return (
        <div className="mycard">
        <div className="card auth-card input-field">
            <h2>Postbook</h2>
            <input  type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input  type="text" placeholder="email"value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input  type="password" placeholder="Password"value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <div className="file-field input-field">
                <div className="btn" style={{
                    color:"#DC401E",
                    backgroundColor:"white"
                }}>
                    <span>Upload profile pic</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}></input>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"></input>
                </div>
            </div>

            
            <button className="btn waves-effect waves-light" onClick={()=>PostData()}>Signup
            <i className="material-icons right"></i>
            </button>

            <p>
                <Link to="/signin">Already have an account?</Link>
            </p>
            
 
        </div>
        </div>
    )
}

export default Signup;