import React, { useRef } from "react";
import Adobe from "../../assets/Adobe.png";
import faceb from "../../assets/faceb.png";
import microsoft from "../../assets/microsoft.png";
import walmart from "../../assets/walmart.png";
import "./Contact.css";
import facebook from "../../assets/facebook.png";
import X from "../../assets/X.png";
import github from "../../assets/github.webp";
import whatsapp from "../../assets/whatsapp.png";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_c0p82xa", "template_3c4woob", form.current, {
        publicKey: "dAewetP9WpX8xXmKp",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          alert('Email Sent!');
          e.target.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <section className="contactPage">
      <div id="clients">
        <h1 className="contactPageTitle">My Client </h1>
        <p className="clientDesc">
          I have had the opportunity to work with a diverse group of companies.
          Some of the notable companies i have worked with includes
        </p>
        <div className="clientImgs">
          <img src={walmart} alt="Client" className="clientImg" />
          <img src={Adobe} alt="Client" className="clientImg" />{" "}
          <img src={faceb} alt="Client" className="clientImg" />{" "}
          <img src={microsoft} alt="Client" className="clientImg" />
        </div>
      </div>
      <div id="contact">
        <h1 className="contactPageTitle">Contact Me</h1>
        <span className="contactDesc">
          Please fill out the form below to discuss any work opportunities
        </span>
        <form className="contactForm" ref={form} onSubmit={sendEmail}>
          <input type="text" className="name" placeholder="Your Name" name='your_name' />
          <input type="email" className="email" placeholder="Your Email" name='your_email' />
          <textarea
            name="message"
            rows="5"
            placeholder="Your message"
            className="msg"
          ></textarea>
          <button type="submit" value="Send" className="submitBtn">
            Submit
          </button>
          <div className="links">
          <a href="https://www.facebook.com/johnson.bright.1213?mibextid=ZbWKwL" target='blank'><img src={facebook} alt="" className="link" /></a> 
         <a href="https://x.com/ifechukwu_uzoma?t=0hp0K4ktittEkzxTu8xOiA&s=09" target='blank'><img src={X} alt="" className="link"  /></a>  
            <a href="https://github.com/Johnsonbright" target="blank" ><img src={github} alt="" className="link"  /></a>
            <a href="https://wa.me/2348144217415" target="blank"><img src={whatsapp} alt="" className="link" /></a>
          </div>
        </form>
      </div>
    </section>
  );
}
