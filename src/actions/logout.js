import { redirect } from "react-router-dom";
import { deleteItem } from "../Helper";
import { toast } from "react-toastify";

export async function logoutAction(){
    //delete
    deleteItem({key: "expenses"})
    deleteItem({key: "budgets"})
    deleteItem({key: "userName"})
        
    toast.success("You have deleted your account.")
        //
    return redirect('/')
}