const generateRandomColor = ()=>{
    const existigBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existigBudgetLength*16 } 65% 50%`
}
//local storage
export const fetchData = (key)=>{
    return JSON.parse(localStorage.getItem(key));
};

//get all data from matching key
export const getAllMatchingItems = ({category, key, value})=>{
    const data = fetchData(category) ?? [];
    return data.filter((item)=> item[key] === value)
}

//create Budget
export const createBudget = ({name, amount})=>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        amount: +amount,
        createdAt : Date.now(),
        color: generateRandomColor(),
    }

    const existigBudgets = fetchData("budgets") ?? [] ;
    return localStorage.setItem("budgets", JSON.stringify([...existigBudgets, newItem]))
}

//create Expense
export const createExpense = ({name, amount, budgetId})=>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        amount: +amount,
        createdAt : Date.now(),
        budgetId : budgetId
    }

    const existigExpenses = fetchData("expenses") ?? [] ;
    return localStorage.setItem("expenses", JSON.stringify([...existigExpenses, newItem]))
}

export const deleteItem = ({key, id})=>{
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item)=> item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key)
}

export const waait = () => new Promise(res => setTimeout(res, Math.random()*2000))

//total spent by budget
export const calculateSpentByBudget = (budgetId)=>{
    // console.log(budgetId)
    const expenses = fetchData("expenses")?? [];
    const budgetSpent = expenses.reduce((acc, expense)=>{
        
        //check if expense id === to the id from parameter
        if( expense.budgetId !== budgetId) 
        {
            return acc} 
        // console.log(expense.amount)
        //add the total amount spent
        return acc += expense.amount;   
    },0)
    return budgetSpent;
}

//FORMATTING
//currency format
export const formatCurrency = (amt)=>{
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency : "USD"
    })
}

//percetage
export const formatPercentage = (amt)=>{
    return amt.toLocaleString(undefined, {
        style : "percent",
        minimumFractionDigits: 0,
    })
}

//date format
export const formatDatetoLocaleString = ( epop )=> 
new Date(epop).toLocaleDateString();