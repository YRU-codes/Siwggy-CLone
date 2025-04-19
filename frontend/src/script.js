import React, { Children, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import Header from "./components/Header";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import RestroMenu from "./components/RestroMenu";
import Login from "./components/Login";
import SignIn from "./components/SIgnIn";
import Error from "./components/Error";
import { Provider } from "react-redux";
import appStore from "./Store/appStore";
import { ThemeProvider } from "./context/themeToggleContext";
import { createBrowserRouter,  Outlet,  RouterProvider } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import Profile from "./components/Profile";
const Grocery = lazy(()=> import('./components/Grocery'));
const Body = lazy(()=> import('./components/Body'));


let persistor = persistStore(appStore);

const App = ()=>{
    return (
        <div className="app">
            <Provider store={appStore}>
                <ThemeProvider>
                    <PersistGate persistor={persistor}>
                        <Header/>
                        <Outlet/>
                    </PersistGate>
                </ThemeProvider>
            </Provider>
        </div>
    );
}

let appRoutes = createBrowserRouter([
    {
        path:'/',
        element:<App />
        ,
        children : [
            {
                path:'/',
                element: (
                    <Suspense fallback={<div>loading....</div>}>
                        <Body/>
                    </Suspense>
                ),
            },
            {
                path:'/about',
                element:<About/>,
            },
            {
                path:'/contact',
                element:<Contact/>,
            },
            {
                path:'/grocery',
                element:(
                    <Suspense fallback={<div>loading....</div>}>
                        <Grocery/>
                    </Suspense>  
                ),
            },
            {
                path:'/cart',
                element:<Cart />
            },
            {
                path:'/restromenu/:resId',
                element:<RestroMenu/>
            },
            {
                path:'/profile',
                element : <Profile/>
            },
            {
                path:'/login',
                element : <Login />
            },
            {
                path:'/sign-in',
                element : <SignIn/>
            }
        ],
        errorElement: <Error/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRoutes}/>);