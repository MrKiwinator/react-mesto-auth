import React from "react";
import { useLocation, Link } from "react-router-dom"
import logoPath from "../images/logo.svg";
import burgerIcon from "../images/burger-icon.svg"
import closeIcon from "../images/menu-close-icon.svg"
import BurgerMenu from "./BurgerMenu";

function Header(props) {

    const location = useLocation();

    return (
        <>
            <header className="header">
                {props.loggedIn &&
                    <BurgerMenu userEmail={props.userEmail} signOut={props.signOut} isOpen={props.isOpen} />
                }
                <div className="header__container">
                    <img alt="Логотип" className="header__logo" 
                        src={logoPath} 
                    />

                    {
                        location.pathname === "/sign-in" ? // if login screen
                            <div className="header__menu">
                                <Link to="/sign-up" className="header__link">Зарегистрироваться</Link>
                            </div> 
                        : location.pathname === "/sign-up" ? // if registration screen
                            <div className="header__menu">
                                <Link to="/sign-in" className="header__link">Войти</Link>
                            </div>
                        : props.loggedIn && // if user is logged in
                            <>
                                <div className="header__menu header__menu_hidden">
                                    <p className="header__text">{props.userEmail}</p>
                                    <Link to="/sign-in" className="header__link" onClick={props.signOut}>Выйти</Link>
                                </div>
                                <div className="header__burger-menu-container">
                                    <button className="header__burger-menu" onClick={props.handleClick}>
                                        {!props.isOpen ? 
                                            <img src={burgerIcon} alt="Открыть меню" /> 
                                        :
                                            <img src={closeIcon} alt="Закрыть меню" />
                                        }
                                    </button>
                                </div>
                            </>
                    }
                </div>
            </header>
        </>
        
    )
}

export default Header;