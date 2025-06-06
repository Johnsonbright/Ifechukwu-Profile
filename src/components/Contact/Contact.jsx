// import React, { useRef } from "react";
// import Adobe from "../../assets/Adobe.png";
// import faceb from "../../assets/faceb.png";
// import microsoft from "../../assets/microsoft.png";
// import walmart from "../../assets/walmart.png";
// import "./Contact.css";
// import facebook from "../../assets/facebook.png";
// import X from "../../assets/X.png";
// import github from "../../assets/github.webp";
// import whatsapp from "../../assets/whatsapp.png";
// import emailjs from "@emailjs/browser";

// export default function Contact() {
//   const form = useRef()
//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm("service_c0p82xa", "template_3c4woob", form.current, {
//         publicKey: "dAewetP9WpX8xXmKp",
//       })
//       .then(
//         () => {
//           console.log("SUCCESS!");
//           alert('Email Sent!');
//           e.target.reset();
//         },
//         (error) => {
//           console.log("FAILED...", error.text);
//         }
//       );
//   };

//   return (
//     <section className="contactPage">
//       <div id="clients">
//         <h1 className="contactPageTitle">My Client </h1>
//         <p className="clientDesc">
//           I have had the opportunity to work with a diverse group of companies.
//           Some of the notable companies i have worked with includes
//         </p>
//         <div className="clientImgs">
//           <img src={walmart} alt="Client" className="clientImg" />
//           <img src={Adobe} alt="Client" className="clientImg" />{" "}
//           <img src={faceb} alt="Client" className="clientImg" />{" "}
//           <img src={microsoft} alt="Client" className="clientImg" />
//         </div>
//       </div>
//       <div id="contact">
//         <h1 className="contactPageTitle">Contact Me</h1>
//         <span className="contactDesc">
//           Please fill out the form below to discuss any work opportunities
//         </span>
//         <form className="contactForm" ref={form} onSubmit={sendEmail}>
//           <input type="text" className="name" placeholder="Your Name" name='your_name' />
//           <input type="email" className="email" placeholder="Your Email" name='your_email' />
//           <textarea
//             name="message"
//             rows="5"
//             placeholder="Your message"
//             className="msg"
//           ></textarea>
//           <button type="submit" value="Send" className="submitBtn">
//             Submit
//           </button>
//           <div className="links">
//           <a href="https://www.facebook.com/johnson.bright.1213?mibextid=ZbWKwL" target='blank'><img src={facebook} alt="" className="link" /></a> 
//          <a href="https://x.com/ifechukwu_uzoma?t=0hp0K4ktittEkzxTu8xOiA&s=09" target='blank'><img src={X} alt="" className="link"  /></a>  
//             <a href="https://github.com/Johnsonbright" target="blank" ><img src={github} alt="" className="link"  /></a>
//             <a href="https://wa.me/2348144217415" target="blank"><img src={whatsapp} alt="" className="link" /></a>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import emailjs from "@emailjs/browser";

// Import your actual images here
import Adobe from "../../assets/Adobe.png";
import faceb from "../../assets/faceb.png";
import microsoft from "../../assets/microsoft.png";
import walmart from "../../assets/walmart.png";
import facebook from "../../assets/facebook.png";
import X from "../../assets/X.png";
import github from "../../assets/github.webp";
import whatsapp from "../../assets/whatsapp.png";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    your_name: '',
    your_email: '',
    message: ''
  });
  const [hoveredClient, setHoveredClient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const sectionRef = useRef(null);
  const form = useRef();

  const clients = [
    { id: 1, name: 'Walmart', image: walmart, color: 'from-blue-500 to-blue-600' },
    { id: 2, name: 'Adobe', image: Adobe, color: 'from-red-500 to-pink-500' },
    { id: 3, name: 'Facebook', image: faceb, color: 'from-blue-600 to-indigo-600' },
    { id: 4, name: 'Microsoft', image: microsoft, color: 'from-green-500 to-blue-500' }
  ];

  const socialLinks = [
    { 
      id: 1, 
      name: 'Facebook', 
      image: facebook, 
      url: 'https://www.facebook.com/johnson.bright.1213?mibextid=ZbWKwL',
      color: 'from-blue-600 to-blue-700' 
    },
    { 
      id: 2, 
      name: 'X (Twitter)', 
      image: X, 
      url: 'https://x.com/ifechukwu_uzoma?t=0hp0K4ktittEkzxTu8xOiA&s=09',
      color: 'from-gray-800 to-black' 
    },
    { 
      id: 3, 
      name: 'GitHub', 
      image: github, 
      url: 'https://github.com/Johnsonbright',
      color: 'from-gray-700 to-gray-900' 
    },
    { 
      id: 4, 
      name: 'WhatsApp', 
      image: whatsapp, 
      url: 'https://wa.me/2348144217415',
      color: 'from-green-500 to-green-600' 
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission with EmailJS
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    emailjs
      .sendForm("service_c0p82xa", "template_3c4woob", form.current, {
        publicKey: "dAewetP9WpX8xXmKp",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setFormStatus('success');
          setFormData({
            your_name: '',
            your_email: '',
            message: ''
          });
          // Reset form
          if (form.current) {
            form.current.reset();
          }
        },
        (error) => {
          console.log("FAILED...", error.text);
          setFormStatus('error');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
        // Clear status after 5 seconds
        setTimeout(() => setFormStatus(''), 5000);
      });
  };

  return (
    <section className="contact-page" id="contactPage" ref={sectionRef}>
      {/* Background Elements */}
      <div className="bg-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="contact-container">
        {/* Clients Section */}
        <div className={`clients-section ${isVisible ? 'animate-in' : ''}`} id="clients">
          <h1 className="section-title">My Clients</h1>
          <div className="title-decoration"></div>
          <p className="section-description">
            I have had the opportunity to work with a diverse group of companies.
            Some of the notable companies I have worked with include:
          </p>
          <div className="clients-grid">
            {clients.map((client, index) => (
              <div
                key={client.id}
                className="client-card"
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <img
                  src={client.image}
                  alt={`${client.name} Client`}
                  className="client-image"
                />
                <div className="client-name">{client.name}</div>
                {hoveredClient === client.id && (
                  <div className="card-glow active"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className={`contact-section ${isVisible ? 'animate-in' : ''}`} id="contact">
          <div className="contact-info">
            <h2>Let's Connect</h2>
            <p>
              Ready to bring your ideas to life? I'd love to hear about your project 
              and discuss how we can work together to create something amazing.
            </p>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title={link.name}
                  aria-label={`Visit my ${link.name} profile`}
                >
                  <img src={link.image} alt={`${link.name} icon`} />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <input
                  type="text"
                  name="your_name"
                  value={formData.your_name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="your_email"
                  value={formData.your_email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="6"
                  className="form-input"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              {/* Form Status Messages */}
              {formStatus === 'success' && (
                <div className="form-status success" style={{
                  color: '#4ade80',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  background: 'rgba(74, 222, 128, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(74, 222, 128, 0.3)'
                }}>
                  ✅ Message sent successfully!
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="form-status error" style={{
                  color: '#f87171',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  background: 'rgba(248, 113, 113, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 113, 113, 0.3)'
                }}>
                  ❌ Failed to send message. Please try again.
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
                aria-label={isSubmitting ? 'Sending message' : 'Send message'}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}