import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [ formData, setFormData] = useState({});
  const [errorMessages, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
    // the ... spread syntax to merge multiple objects into one new object
  }

  const handleSubmit = async (e) => {
    //prevent from refreshing the page
    e.preventDefault();

    if(!formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields.')
    }

    try {
      setLoading(true); //when we try we're loading
      setErrorMessage(null); //clean error array
      //fetch data: routes, http method, header
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify(formData) //transform into string since we cannot fetch array
      });
      const data = await res.json();

      if(data.success === false){
        return setErrorMessage(data.message);
      }

      //if everything went well you can go to the home page
      if(res.ok){
        navigate('/');
      }

      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      {/* container  */}
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left side  */}
        <div className='flex-1'>
        <Link to="/" 
        className="font-bold dark:text-white text-4xl">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Sahand's</span>
          Blog
        </Link>

        <p className='text-sm mt-5'>
          This is a demo project. You can sign in with your email and password or with Google.
        </p>
        </div>

        {/* right side  */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
           
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
            </div>
            
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
            </div>

            <Button gradientDuoTone='purpleToPink' type='submit'disabled={loading} >
              {
                loading ? (
                  <>
                  <Spinner size="sm" />
                  <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign up
            </Link>
          </div>
          {
            // if errorMessages is not null, then 
            errorMessages && (
              <Alert className='mt-5' color='failure'>
                {errorMessages}
              </Alert>
            )
          }

        </div>
      </div>
    </div>
  )
}
