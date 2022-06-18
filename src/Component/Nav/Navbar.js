import { NavLink, Nav, Bars, NavMenu } from "./NavbarElements";
import { FcSearch } from 'react-icons/fc';
import { TiThList } from 'react-icons/ti';
import { useRef, useState } from 'react';
import './style/Nav.css'

const Navbar = () => {

const [appearNav, setAppearNav] = useState(true)
const nav = useRef()
console.log(nav)

    window.addEventListener('scroll',function(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if(scrollTop === 0){
        nav.current.style.background = "transparent"
      }
      else{
        nav.current.style.background = "#000"
      }
    });

    return(
        <> {appearNav ? 
            <Nav ref={nav} className="Navigation">
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