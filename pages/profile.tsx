import type { NextPage } from 'next'
import { updateProfile, getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react'
import { storage, useAuth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uid } from "uid"
import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image';
import defaultPic from '../assets/images/default-profile-picture.png'


const Profile: NextPage = () => {

    const currentUser = useAuth()
    const router = useRouter()


    const [image, setImage] = useState<any>(null);
    const [url, setUrl] = useState<any>(null);
    const [newName, setNewName] = useState<any>('')
    const [activeUser, setActiveUser] = useState<any>({})
    const [loading, setLoading] = useState<Boolean>(true)

    
    const handleImageChange = (e: any) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      }

      const handleNameChange = (e: any) => {
        setNewName(e.target.value)
      }

      const handleSubmit = () => {
        const uuid = uid();
        const imageRef = ref(storage, `profile_pic_${activeUser?.email}`);

        if (image != null) {
            uploadBytes(imageRef, image)
            .then(() => {
              getDownloadURL(imageRef)
                .then((url) => {
                  setUrl(url);
                  updateProfile(activeUser, {
                    photoURL: url
                  }).then(() => {
                    console.log('changed')
                    console.log(activeUser?.displayName)
                    router.push('/profile')
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
                })
                .catch((error) => {
                  console.log(error.message, "error getting the image url");
                });
              setImage(null);
            })
            .catch((error) => {
              console.log(error.message);
            });
        };

        if (newName != ''){
            updateProfile(activeUser, {
                displayName: newName
              }).then(() => {
                console.log('changed')
                console.log(activeUser?.displayName)
                router.push('/profile')
              }).catch((error) => {
                // An error occurred
                // ...
              });
        }

        
        }

        useEffect(() => {

           if (Object.keys(currentUser).length > 1){
            setActiveUser(currentUser)
           }

        }, [currentUser])
        


        
  return Object.keys(activeUser).length > 1 ? (
    <div className='profile-container'>
      <div className='edit-profile-container'>
      <div style={{display: 'flex', marginLeft: '60px'}}>
        <label />Update Profile Picture
        <input type="file" id="image-input" accept="image/jpeg, image/png, image/jpg" onChange={(e) => handleImageChange(e)}/><div id="display-image"></div>
      </div>
        {/* <img className='profile-picture' src={activeUser?.photoURL} /> */}
        <div className='profile-picture'>
          <Image style={{borderRadius: '50%'}} src={activeUser?.photoURL == null ? defaultPic : activeUser?.photoURL} width={200} height={200}/>
        </div>
        <label />Update Display Name
        <input id='display-name' value={newName} name='display-name' onChange={e => handleNameChange(e)}/>
        <br/>
        <span>{activeUser?.displayName == null ? activeUser?.email : activeUser?.displayName}</span>
        <br/>
        <button onClick={handleSubmit} className='button3'>Submit</button>

        <br/>
        <Link href='/dashboard'><button className='button3'>Dashboard</button></Link>
        </div>

    </div>
  ) : <div>loading...</div>
}

export default Profile
