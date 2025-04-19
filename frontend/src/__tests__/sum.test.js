import { sum } from "../components/sum"

test("this is test the sum function ", ()=>{
    const result = sum(5,7);
    //assertion
    expect(result).toBe(12);
})