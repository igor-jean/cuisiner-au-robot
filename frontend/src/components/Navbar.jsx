import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { MdLogin } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";

const Navbar = () => {
    return (
        <nav className='top-navbar'>
            <div className="container">
                <ul>
                    <li>
                        <NavLink to={'/'}><IoHomeOutline className='icon-size'/></NavLink>
                    </li>
                    <li>
                        <NavLink to={'/recherche'}><LiaSearchSolid className='icon-size'/></NavLink>
                    </li>
                    <li>
                        <NavLink to={'/login'}><MdLogin className='icon-size'/></NavLink>
                    </li>
                    <li>
                        <NavLink to={'/inscription'}><IoPersonAddOutline className='icon-size'/></NavLink>
                    </li>
                </ul>    
            </div>
        </nav>
    );
};

export default Navbar;