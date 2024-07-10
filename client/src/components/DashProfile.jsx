import {useSelector} from 'react-redux';
import {Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { getStorage, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';

export default function DashProfile() {
  const {currentUser} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  //upload image onclick
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      //create an image temporarily ; only in localhost 
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); 
    }
  };
  useEffect(() => {
    if(imageFile){
      uploadImage();
    }
  }, [imageFile])

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    const storage = getStorage(app);
    //add datetime to the name in order to have an unique name
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }
    )
  }
  return (
    // wrapper container 
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        {/* img container  */}
        <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full" 
        // when you click on that div, call the reference, input[file]
        onClick={()=>filePickerRef.current.click()}>
          <img 
          // if imageFileUrl exist show it ; otherwise show current picture 
          src={imageFileUrl || currentUser.profilePicture} 
          alt="user profile picture" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
        </div>

        <TextInput type='text' id='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
