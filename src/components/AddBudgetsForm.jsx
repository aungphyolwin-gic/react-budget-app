import { CurrencyDollarIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Form } from 'react-router-dom'

export const AddBudgetsForm = () => {
  return (
    <div className='form-wrapper'>
        <h2 className='h3'>Create Budget</h2>
        <Form method='post' className='grid-sm'>
            <div className="grid-xs">
                <label htmlFor="newBudget">Budget Name</label>
                <input type="text" name='newBudget' id='newBudget' placeholder='eg., Groceries' required/>
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Amount</label>
                <input type="number" step="0.01" name='newBudgetAmount' id='newBudgetAmount' 
                        placeholder='eg.,$350' required inputMode='decimal'/>
            </div>

                <input type='hidden' name='_action' value='createBudget' />

            <button type='submit' className='btn btn--dark'>
                <span>Create budget</span>
                <CurrencyDollarIcon width={20}/>
            </button>
        </Form>
    </div>
  )
}
