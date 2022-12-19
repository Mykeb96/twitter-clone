import type { NextPage } from 'next'
import Link from 'next/link';
import { logout, useAuth } from '../firebase'
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { db } from "../firebase";
import { uid } from "uid"
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import {CgLogOut, CgProfile} from 'react-icons/cg'
import Image from 'next/image';
import defaultPic from '../assets/images/default-profile-picture.png'
import {BsFillTrashFill} from 'react-icons/bs'

const Dashboard: NextPage = () => {

    const router = useRouter();
    const currentUser = useAuth();

    async function handleLogout(){
        logout()
          .then(res => {
            Cookies.remove("loggedin")
            router.push('/')
        })
          .catch(err => console.log(err))

      }

      const [newPost, setNewPost] = useState<string>("");
      const [data, setData] = useState<any>([]);
      const [sortedData, setSortedData] = useState<any>([])
      const [loading, setLoading] = useState<boolean>(true)
      const [activeUser, setActiveUser] = useState<any>({})
    
      const handleChange = (e: any) => {
        setNewPost(e.target.value);
      };
    
      //read
      useEffect(() => {
        onValue(ref(db), (snapshot) => {
          setData([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setData((oldArray: any) => [...oldArray, todo]);
            });
          }
        });

        setLoading(false)

      }, []);

      useEffect(() => {

        setSortedData(data.reverse())

      }, [data])

      useEffect(() => {

        if (currentUser != null){
          if (Object.keys(currentUser).length > 1){
            setActiveUser(currentUser)
            console.log(activeUser)
           }
        }



     }, [currentUser])
      
      

    
      // write
      const writeToDatabase = () => {
        const uuid = uid();
        const currentdate = new Date(); 
        var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        var submitDate = data.length + 1

        set(ref(db, `/${submitDate}`), {
          name: activeUser?.displayName,
          message: newPost,
          uuid,
          datetime,
          profilePic: activeUser?.photoURL != null ? activeUser?.photoURL : null,
          email: activeUser?.email,
          submitDate: submitDate
        });
    
        setNewPost("");
      };
    
      // //update
      // const handleUpdate = (todo) => {
      //   setIsEdit(true);
      //   setTempUuid(todo.uuid);
      //   setTodo(todo.todo);
      // };
    
      // const handleSubmitChange = () => {
      //   update(ref(db, `/${tempUuid}`), {
      //     todo,
      //     uuid: tempUuid,
      //   });
    
      //   setTodo("");
      //   setIsEdit(false);
      // };
    
      //delete
      const handleDelete = (id: any) => {
        remove(ref(db, `/${id}`));
        router.push('/dashboard')

      };
    

    

      return Object.keys(activeUser).length > 1 ? (
    <div className='dash-container'>

      {/* Currently signed in as: {currentUser?.email} */}
      <div className='nav'>
        {/* <img className='dash-profile-picture' src='../assets/images/default-profile-picture.png' /> */}
        <div className='dash-profile-picture'>
          <Image style={{borderRadius: '50%'}} src={activeUser?.photoURL == null ? defaultPic : activeUser?.photoURL} width={200} height={200}/>
        </div>
        <CgLogOut onClick={handleLogout} className='nav-icon'/>
        <Link href='/profile'><CgProfile className='nav-icon'/></Link>
      </div>
      <div className='main-content-container'>
        <div className='user-post-box' >
          <div style={{display: 'flex'}}>
            {/* <img src={activeUser?.photoURL} className='user-post-box-img'/> */}
            <div className='user-post-box-img'>
              <Image style={{borderRadius: '50%'}} src={activeUser?.photoURL == null ? defaultPic : activeUser?.photoURL} width={200} height={200} />
            </div>
            <textarea value={newPost} onChange={e => handleChange(e)} maxLength={255} required={true} placeholder={'Say something...'}/>
          </div>
          <button onClick={writeToDatabase} className='button2'>Post</button>
        </div>
        <br />

        <div className='posts-container'>
          {loading ? <p>Loading posts...</p> : sortedData.map((item: any, id: number) => 
            <div className='post' key={id}>
              <div className='post-user-container'>
                {/* <img src={item?.profilePic != null ? item?.profilePic : }/> */}
              <div style={{marginRight: '10px'}}>
                <Image style={{borderRadius: '50%'}} src={item?.profilePic == null ? defaultPic : item?.profilePic} width={75} height={75}/>
              </div>
                <h4>{item?.name != null ? item?.name : item?.email}</h4>
              </div>

              <p>{item?.message}</p>

              {item?.email == activeUser?.email ? <BsFillTrashFill onClick={() => handleDelete(item?.submitDate)} className='post-delete'>Delete</BsFillTrashFill> : ''}

            </div>
          )}
        </div>
      </div>

    </div>
  ) : <div>loading...</div>
}

export default Dashboard
