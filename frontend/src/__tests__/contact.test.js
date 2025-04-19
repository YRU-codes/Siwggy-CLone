import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Contact from "../components/Contact"
test("heading should be there in the component", ()=>{
    render(<Contact/>);
    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
})

test("should have input field..", ()=>{
    render(<Contact/>);
    //querying
    const input = screen.getByPlaceholderText('enter your name');

    //assertion
    expect(input).toBeInTheDocument();
})

it("should have the 2 radio btns", ()=>{
    render(<Contact/>);
    const radio = screen.getAllByRole('radio');

    expect(radio.length).toBe(2);
})

