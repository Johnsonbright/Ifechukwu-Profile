import React, {useState} from 'react';
import './Navbar.css'
import logo from '../../assets/logo.jpg'
import {Link} from 'react-scroll'
import dropmenu from '../../assets/dropmenu.png'

export default function Navbar() {
  const[showMenu, setShowMenu] = useState(false)
  return (
    <nav className="Navbar">
     <img src={logo} alt="logo" className='logo' />
     <div className = "desktopmenu" >
 <Link className="desktopmenulistitem" activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500}>Home</Link>
 <Link activeClass='active' to='skill' spy={true} smooth={true} duration={500} offset={-60} className="desktopmenulistitem">About</Link>
 <Link activeClass="active" to='works' spy={true} smooth={true} duration={500} offset={-100} className="desktopmenulistitem">Porfolio</Link>
 <Link activeClass='active' to='clients' spy={true} smooth={true} duration={500} offset={-100} className="desktopmenulistitem">Client</Link>
     </div>
     <button className="desktopmenubutton" onClick={()=>{
      document.getElementById('contact').scrollIntoView({behaviour:'smooth'})
     }}>
      <div className="desktopmenutext">Contact me </div>
     </button>

     <img src={dropmenu} alt="menu" className='mobMenu' onClick={()=>{setShowMenu(!showMenu)}}/>
     <div className = "navMenu" style={{display: showMenu? 'flex':'none'}}>
 <Link className="listItem" activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} onClick={()=>{setShowMenu(false)}} >Home</Link>
 <Link activeClass='active' to='skill' spy={true} smooth={true} duration={500} offset={-60} className="listItem" onClick={()=>{setShowMenu(false)}}>About</Link>
 <Link activeClass="active" to='works' spy={true} smooth={true} duration={500} offset={-100} className="listItem" onClick={()=>{setShowMenu(false)}} >Porfolio</Link>
 <Link activeClass='active' to='clients' spy={true} smooth={true} duration={500} offset={-100} className="listItem" onClick={()=>{setShowMenu(false)}}>Client</Link>
 <Link activeClass='active' to='clients' spy={true} smooth={true} duration={500} offset={-100} className="listItem" onClick={()=>{setShowMenu(false)}}>Contact</Link>
     </div>
    </nav>
  )
}
