import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ExpensePage, { expensesAction, expensesLoader } from "./pages/ExpensePage";
import { budgetAction, budgetLoader, BudgetPage } from "./pages/BudgetPage";
import deleteBudget from "./actions/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error/>,
    children: [
              {  
                index: true,
                element: <Dashboard/>,
                loader: dashboardLoader,
                action: dashboardAction,
                errorElement: <Error/>,
              },
              {  
                path: "budget/:id",
                element: <BudgetPage/>,
                loader: budgetLoader,
                action: budgetAction,
                errorElement: <Error/>,
                children:[
                  {
                    path: "delete",
                    action: deleteBudget,
                  }
                ]
              },
              {  
                path: "expenses",
                element: <ExpensePage/>,
                loader: expensesLoader,
                action: expensesAction,
                errorElement: <Error/>,
              },
              {  
                path: "logout",
                action: logoutAction
              },
    ]
  },
  
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer/>
    </div>
  );
}

export default App;
