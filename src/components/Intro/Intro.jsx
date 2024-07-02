import React from 'react';
import './intro.css';
import picture from '../../assets/picture.png'
import {Link } from 'react-scroll'

export default function Intro() {
  return (
    <section id="intro">
<div className="introcontent">
<span className="hello">Hello, </span>
<span className="introText">I'm  <span className="introName">Ifechukwu</span><br/>  Website Developer</span>
<p className="introPara">I am a skilled web designer with experience in creating visually appealing and user friendly website</p><br/>
<Link><button className="btn"><span className='btn-text'>Hire me</span></button></Link>
</div>
<img src={picture} alt="Profile" className="bg" />
    </section>
  )
}
