const generateRandomColor = ()=>{
    const existigBudgetLength = fetchData("budgets")?.lenght ?? 0;
    return `${existigBudgetLength * 16 } 65% 50%`
}
//local storage
export const fetchData = (key)=>{
    return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({key})=>{
    return localStorage.removeItem(key)
}

//create Budget
export const createBudget = (name, amount)=>{
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