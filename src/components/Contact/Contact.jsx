

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
    {
      id: 1,
      name: "SmallClosedWorld Int'l Ltd",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%234ade80'/%3E%3Ctext x='50' y='35' fill='white' text-anchor='middle' font-family='Arial' font-size='8' font-weight='bold'%3ESmall%3C/text%3E%3Ctext x='50' y='45' fill='white' text-anchor='middle' font-family='Arial' font-size='8' font-weight='bold'%3EClosed%3C/text%3E%3Ctext x='50' y='55' fill='white' text-anchor='middle' font-family='Arial' font-size='8' font-weight='bold'%3EWorld%3C/text%3E%3Ctext x='50' y='70' fill='white' text-anchor='middle' font-family='Arial' font-size='6'%3EInt'l Ltd%3C/text%3E%3C/svg%3E",
      color: "from-green-500 to-blue-500",
    },
    {
      id: 2,
      name: "Wellness-N (Freelance)",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center",
      fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23ec4899'/%3E%3Ctext x='50' y='40' fill='white' text-anchor='middle' font-family='Arial' font-size='10' font-weight='bold'%3EWellness%3C/text%3E%3Ctext x='50' y='55' fill='white' text-anchor='middle' font-family='Arial' font-size='12' font-weight='bold'%3EN%3C/text%3E%3Ctext x='50' y='70' fill='white' text-anchor='middle' font-family='Arial' font-size='6'%3E(Freelance)%3C/text%3E%3C/svg%3E",
      color: "from-pink-500 to-red-500",
    },
    {
      id: 3,
      name: "Martial-N (Freelance)",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop&crop=center",
      fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23f59e0b'/%3E%3Ctext x='50' y='40' fill='white' text-anchor='middle' font-family='Arial' font-size='10' font-weight='bold'%3EMartial%3C/text%3E%3Ctext x='50' y='55' fill='white' text-anchor='middle' font-family='Arial' font-size='12' font-weight='bold'%3EN%3C/text%3E%3Ctext x='50' y='70' fill='white' text-anchor='middle' font-family='Arial' font-size='6'%3E(Freelance)%3C/text%3E%3C/svg%3E",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 4,
      name: "Wowzi Co.",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop&crop=center",
      fallback: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%236366f1'/%3E%3Ctext x='50' y='40' fill='white' text-anchor='middle' font-family='Arial' font-size='12' font-weight='bold'%3EWowzi%3C/text%3E%3Ctext x='50' y='60' fill='white' text-anchor='middle' font-family='Arial' font-size='10'%3ECo.%3C/text%3E%3C/svg%3E",
      color: "from-indigo-500 to-purple-500",
    }
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
    <>
         <style>
        {`
          @keyframes float {
            0%, 100% { 
              transform: translate(0, 0) scale(1); 
            }
            33% { 
              transform: translate(30px, -30px) scale(1.1); 
            }
            66% { 
              transform: translate(-20px, 20px) scale(0.9); 
            }
          }

          @keyframes expandWidth {
            from { 
              width: 0; 
            }
            to { 
              width: 100px; 
            }
          }

          @keyframes particleFloat {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.6; 
            }
            50% { 
              transform: translateY(-30px) rotate(180deg); 
              opacity: 1; 
            }
          }

          @keyframes spin {
            0% { 
              transform: rotate(0deg); 
            }
            100% { 
              transform: rotate(360deg); 
            }
          }

          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }

          .form-input:focus {
            outline: none;
            border-color: #ff6b6b;
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(255, 107, 107, 0.2);
          }

          .submit-btn:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(255, 107, 107, 0.4);
          }

          .social-link:hover {
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }

          .client-card:hover .client-image {
            transform: scale(1.1);
            border-color: rgba(255, 255, 255, 0.6);
          }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          @media (max-width: 480px) {
            .contact-section {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
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
    </>
   
  );
}