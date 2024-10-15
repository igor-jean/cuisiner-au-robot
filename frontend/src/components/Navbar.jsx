import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { MdLogin } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { AuthStatus, useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { GiCook } from "react-icons/gi";

const Navbar = () => {

    const {status, logout, authenticate} = useAuth()

    useEffect(()=> {
        authenticate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <nav className='top-navbar'>
            <div className="container">
                <ul>
                    <li>
                        <NavLink to={'/'} title='Accueil'><IoHomeOutline className='icon-size'/></NavLink>
                    </li>
                    <li>
                        <NavLink to={'/recherche'} title='Rechercher'><LiaSearchSolid className='icon-size'/></NavLink>
                    </li>
                    {
                        status === (AuthStatus.Guest || AuthStatus.Unknown) && (
                            <>
                                <li>
                                    <NavLink to={'/login'}><MdLogin className='icon-size'/></NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/inscription'}><IoPersonAddOutline className='icon-size'/></NavLink>
                                </li>
                            </>
                        )
                    }
                    {
                        status === AuthStatus.Authenticated && (
                            <>
                                <li className='icon-size li-translate' title='Proposer une recette'>
                                    <NavLink>
                                        <GiCook />
                                    </NavLink>
                                </li>
                                <li className='icon-size' title='Mon compte'>
                                    <NavLink>
                                        <FaRegUser />
                                    </NavLink>
                                </li>
                                <li onClick={logout} className='icon-size' title='Déconnexion'>
                                    <IoIosLogOut />
                                </li>
                            </>
                        )
                    }
                </ul>    
            </div>
        </nav>
    );
};

export default Navbar;