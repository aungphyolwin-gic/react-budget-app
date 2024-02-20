import React from 'react'
import { deleteItem, getAllMatchingItems } from '../Helper'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'

export default function deleteBudget({params}) {
    try{
        deleteItem({
            key : "budgets",
            id : params.id,
        })
        toast.success("Budget deleted successfully.")

        const associatedExpenses = getAllMatchingItems({
            category : "expenses",
            key : "budgetId",
            value: params.id,
        })
        associatedExpenses.forEach(expense => {
            deleteItem({
                key: "expenses",
                id : expense.id,
            })
        });
    }
    catch{
        throw new Error("Problem !!! Budget failed to delete.")
    }
    return redirect('/');
}
