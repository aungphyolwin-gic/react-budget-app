import React from 'react'
import { deleteItem, fetchData } from '../Helper';
import { Table } from '../components/Table';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';

//loader
export async function expensesLoader(){
    const expenses = fetchData("expenses");
    // console.log(expenses)
    return {expenses};
}

//action
export async function expensesAction({request}){
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

     //delete expense 
     if(_action === "deleteExpense")
     {
         try {
             //remove expense data
             deleteItem({
                 key : "expenses",
                 id :  values.expenseId 
             })
             return toast.success('Expense deleted.')
         } catch (error) {
             throw new Error("There's a problem in deleting Expense.")
         }
     }
}

const ExpensePage = () => {
    const {expenses} = useLoaderData();
    // console.log(expenses)
  return (
    <div className='grid-lg'>
        <h1>All Expenses</h1>
        {
            (expenses && expenses.length > 0) ?
            (
                <div className="grid-md">
                    <h2>Recent Expenses <small>{expenses.length} total</small></h2>
                    <Table expenses={expenses}/>
                </div>
            )
            : <p>No Expense to show</p>
        }
    </div>
  )
}

export default ExpensePage;