import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header(){
    const loggedUser = useSelector((store)=> store.user.loggedUser);
    const [menuOpen, setMenuOpen] = useState(false);
    return(
        
        <div className="mx-auto flex justify-between items-center bg-orange-200 shadow-md">
            <div className="logo">
                <img className="w-28 h-20" alt="company logo" src="https://img.freepik.com/free-vector/delivery-logo-template_23-2147880956.jpg?t=st=1734672068~exp=1734675668~hmac=c8652c376641fd8480e582ade8e6d118bc970ba28433f4e46cc93911b7c2c3fe&w=740"/>
            </div>
            <div >
                <ul className="hidden md:flex gap-12 mr-7">
                    <li className="hover:text-amber-800"><Link to="/">Home</Link></li>
                    <li className="hover:text-amber-800"><Link to="/about"> About Us</Link></li>
                    <li className="hover:text-amber-800"><Link to="/contact"> Contact Us </Link></li>
                    <li className="hover:text-amber-800"><Link to="/grocery"> Grocery </Link></li>
                    {loggedUser ? 
                    <>
                        <li className="hover:text-amber-800"><Link to="/cart">Cart Logo</Link></li>
                        <li className="hover:text-amber-800"><Link to="/profile">Profile</Link></li>
                    </>
                     : 
                        <li className="hover:text-amber-800"><Link to="/login">Login</Link></li>
                     }
                </ul>
            </div>
            <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {!menuOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          ) : (
            /* Close Icon */
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
        </button>
        {menuOpen && (
        <ul className="absolute top-full left-0 w-full h-full bg-orange-200 flex flex-col items-center p-4 md:hidden shadow-lg">

          <li className="py-2"><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li className="py-2"><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li className="py-2"><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          <li className="py-2"><Link to="/grocery" onClick={() => setMenuOpen(false)}>Grocery</Link></li>
          {loggedUser ? (
            <>
              <li className="py-2"><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
              <li className="py-2"><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
            </>
          ) : (
            <li className="py-2"><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
          )}
        </ul>
      )}
        </div>
    );
}

export default Header;