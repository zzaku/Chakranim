import { NavLink, Nav, Bars, NavMenu } from "./NavbarElements";
import { FcSearch } from 'react-icons/fc';
import { TiThList } from 'react-icons/ti';
import { useState } from 'react';
import './style/Nav.css'

const Navbar = () => {

const [appearNav, setAppearNav] = useState()

    window.addEventListener('scroll',function(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if(scrollTop === 0){
        setAppearNav(false)
      }
      else{
        setAppearNav(true)
      }
    });

    return(
        <> {appearNav ? 
            <Nav className="Navigation">
                <NavLink to={"/"}>
                    <TiThList size={"40px"} />
                </NavLink>
                <Bars />
                <NavMenu>
                <NavLink to={"/"}>
                    <FcSearch size={"40px"}/>
                </NavLink>
                </NavMenu>
            </Nav>
            :
            null}
        </> 
    )
}

export default Navbar