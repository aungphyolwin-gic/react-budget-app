import React from 'react'
//helper function
import { createBudget, fetchData } from '../Helper'
import { useLoaderData } from 'react-router-dom';
import { Intro } from '../components/Intro';
import { toast } from 'react-toastify';
import { AddBudgetsForm } from '../components/AddBudgetsForm';

//loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets }
}

export async function dashboardAction({request}){
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
            createBudget( values.newBudget, values.newBudgetAmount)
            // throw new Error("something wrong")
            return toast.success("Budget created.")
        }
        catch(e){
            throw new Error("There's a problem creating new Budget.")
        }
    }
    
}

const Dashboard = ()=>{
    const {userName} = useLoaderData()
    return (
        <>
           { userName ? (
            <div className="dashboard">
                <h1>Welcome Back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    {/* { budgets? ('h') : ('n')} */}
                    <div className="grid-lg">
                        <div className="flex-lg">
                            <AddBudgetsForm/>
                        </div>
                    </div>
                </div>
            </div>
           ) : <Intro/>}
        </>
    )
}

export default Dashboard