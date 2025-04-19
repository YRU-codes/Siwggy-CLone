import Header from "../components/Header"
import '@testing-library/jest-dom';
import { screen, render, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";

test("should have a LogIn btn", ()=>{
    render(
    <BrowserRouter>
        <Header/>
    </BrowserRouter>)
    // const loginBtn = screen.getByRole('button');
    const loginBtn = screen.getByRole('button',{
        name:"LogIn",
    });
    expect(loginBtn).toBeInTheDocument();
})

// test("should have logout btn on click...", ()=>{
//     render(
//     <BrowserRouter>
//         <Header/>
//     </BrowserRouter>)
//     const loginBtn = screen.getByText('LogIn');

//     fireEvent.click(loginBtn);

//     const logoutBtn = screen.getByText('Logout');
//     expect(logoutBtn).toBeInTheDocument();
// })