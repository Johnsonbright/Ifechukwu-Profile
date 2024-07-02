import React from 'react';
import './skill.css';
import ui from '../../assets/ui.jpeg';
import webdesign from '../../assets/webdesign.jpeg';
import appdesign from '../../assets/appdesign.jpg'


export default function skill() {
  return (
    <section id="skill">
      <span className="skillTitle">What I do </span>
      <span className="skillDesc">I am a skilled and passionate web designer with experience in creating visually appealing and user-friendly websites. I have a strong understanding of design and a keen eye for detail. i am proficient in HTML, CSS, and Javascript.</span>
      <div className="skillBars">
        <div className="skillBar">
          <img src={ui} alt="Uidesign" className="skillBarImg" />
          <div className="skillBarText">
            <h2>UI/UX Design</h2>
            <p>This is a demo text</p>
          </div>
        </div>

        <div className="skillBar">
          <img src={webdesign} alt="webdesign" className="skillBarImg" />
          <div className="skillBarText">
            <h2>Website Design</h2>
            <p>This is a demo text</p>
          </div>
        </div>

        <div className="skillBar">
          <img src={appdesign} alt="appdesign" className="skillBarImg" />
          <div className="skillBarText">
            <h2>App Design</h2>
            <p>This is a demo text</p>
          </div>
        </div>
      </div>
    </section>
  )
}
