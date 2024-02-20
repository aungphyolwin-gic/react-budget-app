import React from 'react'
import { createExpense, deleteItem, getAllMatchingItems } from '../Helper'
import { useLoaderData } from 'react-router-dom';
import { BudgetItem } from '../components/BudgetItem';
import { AddExpenseForm } from '../components/AddExpenseForm';
import { Table } from '../components/Table';
import { toast } from 'react-toastify';

//loader
export async function budgetLoader({params}){
    const budget = await getAllMatchingItems({
        category : "budgets",
        key : "id",
        value : params.id
    })[0]

    const expenses = await getAllMatchingItems({
        category : "expenses",
        key : "budgetId",
        value : params.id
    })

    // console.log(expenses)

    if(! budget){
        throw new Error("The Budget You are trying to find doesn't exist.")
    }
    return {budget, expenses};
}

//action
export async function budgetAction({request}){
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

     //new expense create
     if(_action === "createExpense")
     {  console.log("here")
         try {
             //save expense data
            createExpense({
                 name : values.newExpense, 
                 amount : values.newExpenseAmount,
                 budgetId : values.newExpenseBudget
             })
             return toast.success(`Expense ${values.newExpense} created.`)
         } catch (error) {
             throw new Error("There's a problem creating new Expense.")
         }
     }

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

export const BudgetPage = () => {
    const {budget, expenses} = useLoaderData();
    // console.log(budget)
    return (
        <div className="grid-lg" style={{ "--accent":budget.color }}>
            <h1 className="h2">
                <span className="accent">{budget.name}</span> Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete= {true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2><span className="accent">{budget.name}</span> Expenses</h2>
                    <Table expenses={expenses} showBudget={false}/>
                </div>
            )}
        </div>
    )
}
