import React from 'react'
import { ExpenseItem } from './ExpenseItem'

export const Table = ({expenses, showBudget = true}) => {
  return (
    <div className='table'>
        <table>
            <thead>
                <tr>
                    {
                        ["Name","Amount", "Date",showBudget? "Budget":""," "].map((value,index) => (
                            <th key={index}>{value}</th>
                            ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expense)=>(
                        <tr key={expense.id}>
                            {/* {expense.name} */}
                            <ExpenseItem expense={expense} showBudget={showBudget}/>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}
