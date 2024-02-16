import { UserPlusIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Form } from 'react-router-dom'
import illustarction from '../assets/illustration.jpg'

export const Intro = () => {
  return (
    <div className='intro'>
        <div>
            <h1>
                Take control of <span className='accent'>Your Money</span>
            </h1>
            <p>
                Personal budgetting is the secret to financial freedom. Start your journey today.
            </p>
            <Form method='post'>
                <input 
                    type='input'
                    name='userName'
                    required
                    placeholder='What is your name'
                    aria-label='Your Name'
                    autoComplete='given-name'
                />
                <input type='hidden' name='_action' value="creatNewUser"/>
                <button className='btn btn--dark'
                        type='submit'>
                            <span>Create Account</span>
                            <UserPlusIcon width={20}/>
                </button>
            </Form>
        </div>

            <img src={illustarction} alt='Person with money' width={600}/>
    </div>
  )
}
