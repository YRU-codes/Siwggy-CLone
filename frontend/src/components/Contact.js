const Contact = () =>{
    return (
        <div>
            <h2>This is contact us page</h2>
            <form>
                <input type="text" placeholder="enter your name"/>

                {/* <label htmlFor="male">Male</label><input id="male" type="radio" name="gender" defaultChecked/>
                <label htmlFor="female">Female</label><input id="female" type="radio" name="gender"/><br/>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                <label htmlFor="vehicle1"> I have a bike</label><br/>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label htmlFor="vehicle2"> I have a car</label><br></br> */}
            </form>
            <button type="submit" >Submit</button>
        </div>
    )
}

export default Contact;