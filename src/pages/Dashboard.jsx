import React from 'react'
//helper function
import { createBudget, createExpense, fetchData, waait } from '../Helper'
import { Link, useLoaderData } from 'react-router-dom';
import { Intro } from '../components/Intro';
import { toast } from 'react-toastify';
import { AddBudgetsForm } from '../components/AddBudgetsForm';
import { AddExpenseForm } from '../components/AddExpenseForm';
import { BudgetItem } from '../components/BudgetItem';
import { Table } from '../components/Table';


//loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { userName, budgets, expenses }
}

export async function dashboardAction({request}){
    await waait();
    const data = await request.formData();
    const {_action,...values} = Object.fromEntries(data);
    // console.log("***DashboardAction entData is : ", _action)

    //new user submission
    if(_action === "creatNewUser"){
        try{
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome , ${values.userName}`)
        }
        catch(e){
            throw new Error("There was a problem creating your account.")
        }
    }

    //new budget creation
    if( _action === "createBudget")
    {
        try{
            //create budget
            createBudget( {
                name : values.newBudget, 
                amount : values.newBudgetAmount
            })
            // throw new Error("something wrong")
            return toast.success("Budget created.")
        }
        catch(e){
            throw new Error("There's a problem creating new Budget.")
        }
    }

    //new expense create
    if(_action === "createExpense")
    {
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
    
}

const Dashboard = ()=>{
    const {userName, budgets, expenses} = useLoaderData()
    return (
        <>
            { userName ? (
            <div className="dashboard">
                <h1>Welcome Back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    {
                        (budgets && budgets.length > 0) ?
                        (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetsForm/>
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget)=> (
                                            <BudgetItem key={budget.id} budget={budget}/>
                                        )) 
                                    }
                                </div>
                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-md">
                                            <h2>Recent Expenses</h2>
                                            <Table expenses={
                                                expenses.sort((a,b) => a.createdAt - b.createdAt)
                                                        .slice(0,8)
                                            } />
                                            {
                                                expenses.length > 8 && (
                                                    <Link to="expenses" className='btn btn--dark'>
                                                        View All expenses
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                        :
                        (
                            <div className="grid-sm">
                                <p> Personal budgeting is the secrect to financial freedom. </p>
                                <p>Create budget to get started!</p>
                                <AddBudgetsForm/>
                            </div>
                        )
                    }
                </div>
            </div>
           ) : <Intro/>}
        </>
    )
}

export default Dashboard