import React from 'react'
import { fetchData } from '../Helper';
import { Table } from '../components/Table';

export function expensesLoader(){
    const expenses = fetchData("expenses");
    return {expenses};
}

const ExpensePage = () => {
    const {expenses} = expensesLoader();
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
            : <h1>No Expense to show</h1>
        }
    </div>
  )
}

export default ExpensePage;