import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link, Navigate, useNavigate, useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()
    const navigate = useNavigate();
    // console.log("*** Error ~ error : ", error)
    return (
        <div className='error'>
            <h1>Oooops! We have got a problem.</h1>
            <p>{error.message || error.statusText}</p>
            <div className='flex-md'>
                <button className='btn btn--dark'
                        onClick={()=>navigate(-1)}>
                    <ArrowUturnLeftIcon width={20}/>
                    <span>Go Back</span>
                </button>
                <Link className='btn btn--dark' to='/'>
                    <HomeIcon width={20}/> 
                    <span>Go home</span>
                </Link>
            </div>
        </div>
      )
}
export default Error
