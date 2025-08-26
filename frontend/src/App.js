import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { 
  Ship, 
  Shield, 
  Globe, 
  Truck, 
  Zap, 
  Factory,
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Star
} from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${API}/inquiries`, formData);
      setSubmitStatus({
        type: 'success',
        message: response.data.message
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit inquiry. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-container">
              <Ship className="logo-icon" />
              <div className="brand-text">
                <h1>SEAWORTH TRADERS</h1>
                <span>Global Procurement & Trading</span>
              </div>
            </div>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
            <button onClick={() => scrollToSection('team')} className="nav-link">Team</button>
            <button onClick={() => scrollToSection('customers')} className="nav-link">Customers</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            <Button onClick={() => scrollToSection('contact')} className="get-quote-btn">Get Quote</Button>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              SEAWORTH<br />
              <span className="highlight">TRADERS</span>
            </h1>
            <p className="hero-subtitle">
              Your trusted partner in global procurement, defense solutions,<br />
              and industrial trading since 2020
            </p>
            <div className="hero-buttons">
              <Button onClick={() => scrollToSection('services')} className="primary-btn">
                Explore Services
              </Button>
              <Button onClick={() => scrollToSection('contact')} variant="outline" className="secondary-btn">
                Get Quote
              </Button>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <h3>4+</h3>
              <p>Years of Excellence</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Successful Projects</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Satisfied Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="fade-in-up">About Us</h2>
              <p className="about-intro fade-in-up">
                The Firm established in Feb 2020, "SEA WORTH TRADERS" to deal in variety of services, 
                i.e. Global Procurement, Local Trading, Cleaning services, Source finding, all kind of 
                Repairing works, Generator Installation and Maintenance Services.
              </p>
              <p className="fade-in-up">
                SWT organizes, manages and transacts its trading business, both with local and its 
                overseas associates, dexterously and ingeniously using its network of information, 
                manpower, know-how, and experience. It has viable financial resources at its disposal 
                to monitor, conduct and identify all projects falling in its dynamic and independent 
                operational sphere of diverse nature.
              </p>
              <div className="about-features">
                <div className="feature-item slide-in-left">
                  <Globe className="feature-icon" />
                  <h4>Global Reach</h4>
                  <p>International suppliers and partners</p>
                </div>
                <div className="feature-item slide-in-left">
                  <Shield className="feature-icon" />
                  <h4>Defense Expertise</h4>
                  <p>Specialized military equipment</p>
                </div>
                <div className="feature-item slide-in-left">
                  <Factory className="feature-icon" />
                  <h4>Industrial Solutions</h4>
                  <p>Complete industrial services</p>
                </div>
              </div>
            </div>
            <div className="about-image fade-in-right">
              <img src="https://customer-assets.emergentagent.com/job_global-procurement/artifacts/73s1vz1i_3%20%282%29.jpg" alt="Yellow Truck Transportation" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title fade-in-up">Our Services</h2>
          <p className="section-subtitle fade-in-up">
            We offer a comprehensive range of services to meet your industrial and defense needs
          </p>
          
          <div className="services-grid">
            <Card className="service-card hover-lift">
              <div className="service-icon">
                <Factory />
              </div>
              <CardContent>
                <h3>Chemicals</h3>
                <p>We offer a diverse range of chemicals sourced globally to meet our clients' specific needs</p>
                <img src="https://images.unsplash.com/photo-1629447388369-760612337eff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY2hlbWljYWxzfGVufDB8fHx8MTc1NjEzNzc1N3ww&ixlib=rb-4.1.0&q=85" alt="Industrial Chemicals" className="service-image" />
              </CardContent>
            </Card>

            <Card className="service-card hover-lift">
              <div className="service-icon">
                <Shield />
              </div>
              <CardContent>
                <h3>Defense Store</h3>
                <p>We specialize in critical military equipment, including chaff and flare countermeasures.</p>
                <img src="https://images.unsplash.com/photo-1726168166503-0b57ad445ecd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxkZWZlbnNlJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3NTYxMzg3MTN8MA&ixlib=rb-4.1.0&q=85" alt="Fighter Jet Defense Technology" className="service-image" />
              </CardContent>
            </Card>

            <Card className="service-card hover-lift">
              <div className="service-icon">
                <Globe />
              </div>
              <CardContent>
                <h3>Global Procurement</h3>
                <p>Our team expertly sources equipment and materials from international suppliers, optimizing your supply chain.</p>
                <img src="https://images.unsplash.com/photo-1518527989017-5baca7a58d3c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHw0fHxsb2dpc3RpY3N8ZW58MHx8fHwxNzU2MTM3NzczfDA&ixlib=rb-4.1.0&q=85" alt="Maritime Shipping" className="service-image" />
              </CardContent>
            </Card>

            <Card className="service-card hover-lift">
              <div className="service-icon">
                <Truck />
              </div>
              <CardContent>
                <h3>Logistics Solutions</h3>
                <p>Innovative packaging and transportation services for heavy equipment and specialized cargo</p>
                <img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxsb2dpc3RpY3N8ZW58MHx8fHwxNzU2MTM3NzczfDA&ixlib=rb-4.1.0&q=85" alt="Container Port" className="service-image" />
              </CardContent>
            </Card>

            <Card className="service-card hover-lift">
              <div className="service-icon">
                <Zap />
              </div>
              <CardContent>
                <h3>Power Generation</h3>
                <p>Comprehensive installation, maintenance, and repair services for industrial generators.</p>
                <img src="https://images.unsplash.com/photo-1509390144018-eeaf65052242?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxnZW5lcmF0b3JzfGVufDB8fHx8MTc1NjEzNzc2OXww&ixlib=rb-4.1.0&q=85" alt="Power Generation" className="service-image" />
              </CardContent>
            </Card>

            <Card className="service-card hover-lift">
              <div className="service-icon">
                <Factory />
              </div>
              <CardContent>
                <h3>Garments Sector</h3>
                <p>Tailored manufacturing of equipment for military and industrial applications, meeting precise specifications.</p>
                <img src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxtYW51ZmFjdHVyaW5nfGVufDB8fHx8MTc1NjEzNzc3OHww&ixlib=rb-4.1.0&q=85" alt="Manufacturing" className="service-image" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team">
        <div className="container">
          <h2 className="section-title fade-in-up">Our Team</h2>
          <p className="section-subtitle fade-in-up">
            Our team is driven by a shared commitment to excellence and innovation
          </p>
          
          <div className="team-wrapper">
            <div className="team-member-block ceo-block">
              <Card className="team-card-enhanced slide-in-left">
                <div className="team-image-wrapper">
                  <div className="team-image">
                    <img src="https://customer-assets.emergentagent.com/job_6e66290e-f957-44d9-86d6-9b2221d21bd6/artifacts/g6icb4jr_noman%20niazi.jpg" alt="Noman Khan Niazi" />
                  </div>
                  <div className="team-badge ceo-badge">CEO</div>
                </div>
                <CardContent className="team-content-enhanced">
                  <h3>Noman Khan Niazi</h3>
                  <p className="position-title">Chief Executive Officer</p>
                  <p className="team-desc">
                    Noman Khan brings a wealth of expertise with 20+ years in the industry. 
                    Their strategic thinking and dedication to excellence have been crucial in 
                    driving our company's success and expanding our global presence.
                  </p>
                  <div className="experience-years">20+ Years Experience</div>
                </CardContent>
              </Card>
            </div>

            <div className="team-member-block md-block">
              <Card className="team-card-enhanced slide-in-right">
                <div className="team-image-wrapper">
                  <div className="team-image">
                    <img src="https://customer-assets.emergentagent.com/job_6e66290e-f957-44d9-86d6-9b2221d21bd6/artifacts/evstogm2_muhammad%20shafique.jpg" alt="Muhammad Shafique" />
                  </div>
                  <div className="team-badge md-badge">MD</div>
                </div>
                <CardContent className="team-content-enhanced">
                  <h3>Muhammad Shafique</h3>
                  <p className="position-title">Managing Director</p>
                  <p className="team-desc">
                    With over 30+ years of industry experience, Mohammad Shafique has been 
                    instrumental in shaping our company's vision and growth strategy. Their 
                    innovative approach and leadership skills have helped establish our position as a market leader.
                  </p>
                  <div className="experience-years">30+ Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section id="customers" className="customers">
        <div className="container">
          <h2 className="section-title fade-in-up">Our Prime Customers</h2>
          <p className="section-subtitle fade-in-up">
            We greatly value our partnership and are committed to delivering exceptional support
          </p>
          
          <div className="customers-grid">
            <Card className="customer-card hover-lift">
              <div className="customer-logo">
                <div className="army-logo">
                  <img
              src="/images/pakistan-army.png"
              alt="Pakistan Army"
              className="customer-logo-img"
            />
                </div>
              </div>
              <CardContent>
                <h3>Pakistan Army</h3>
                <p>Pakistan Army has consistently praised our defense garments for their durability and comfort, ensuring safety without compromising on mobility.</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star filled" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="customer-card hover-lift">
              <div className="customer-logo">
                <img src="https://customer-assets.emergentagent.com/job_global-procurement/artifacts/aj725esq_navy%20logo.png" alt="Pakistan Navy" className="customer-logo-img" />
              </div>
              <CardContent>
                <h3>Pakistan Navy</h3>
                <p>Pakistan Navy appreciates the quality of our helmets, highlighting their lightweight design and robust protection for personnel in high-risk areas.</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star filled" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="customer-card hover-lift">
              <div className="customer-logo">
                <img src="https://customer-assets.emergentagent.com/job_global-procurement/artifacts/u0f0tseu_pia%20logo.png" alt="Pakistan International Airlines" className="customer-logo-img" />
              </div>
              <CardContent>
                <h3>Pakistan International Airlines</h3>
                <p>Pakistan International Airlines is satisfied with our chemical solutions, recognizing their effectiveness and adherence to safety standards in hazardous environments.</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star filled" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="customer-card hover-lift">
              <div className="customer-logo">
                <img src="https://customer-assets.emergentagent.com/job_global-procurement/artifacts/sv7b9hcm_airforce%20logo.png" alt="Pakistan Air Force" className="customer-logo-img" />
              </div>
              <CardContent>
                <h3>Pakistan Air Force</h3>
                <p>Pakistan Airforce has found our generators to be reliable in critical situations, providing essential power with minimal downtime.</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star filled" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="customer-card hover-lift">
              <div className="customer-logo">
                <img src="https://customer-assets.emergentagent.com/job_global-procurement/artifacts/3xlukfpm_POF%20logo.jpg" alt="Pakistan Ordinance Factory" className="customer-logo-img" />
              </div>
              <CardContent>
                <h3>Pakistan Ordinance Factory</h3>
                <p>Pakistan Ordinance Factory values our comprehensive range of defense products, noticing that they meet all operational requirements effectively.</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star filled" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title fade-in-up">Contact Us</h2>
          <p className="section-subtitle fade-in-up">
            We value open communication and are dedicated to addressing your inquiries promptly
          </p>
          
          <div className="contact-content">
            <div className="contact-info slide-in-left">
              <h3>Get In Touch</h3>
              
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <h4>Our Location</h4>
                  <p>PLOT NO.278-A, 2ND FLOOR, GATE NO.05,<br />
                     STREET NO.2, QUAID-E-AZAM TRUCK<br />
                     STAND, HAWKSBAY ROAD, KARACHI</p>
                </div>
              </div>

              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <h4>Contact/WhatsApp Us</h4>
                  <p>(+92) 320-200-1183<br />
                     (+92) 331-702-8970</p>
                </div>
              </div>

              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <h4>Send your message</h4>
                  <p>info@seaworthtraders.com</p>
                </div>
              </div>

              <div className="contact-item">
                <Clock className="contact-icon" />
                <div>
                  <h4>Our Working Hours</h4>
                  <p>Mon-Sat 8:00 AM to 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-form slide-in-right">
              <Card>
                <CardContent>
                  <h3>Send an Inquiry</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                      <ChevronRight className="btn-icon" />
                    </Button>

                    {submitStatus && (
                      <div className={`status-message ${submitStatus.type}`}>
                        {submitStatus.message}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo-container">
                <Ship className="logo-icon" />
                <div className="brand-text">
                  <h3>SEAWORTH TRADERS</h3>
                  <span>Global Procurement & Trading</span>
                </div>
              </div>
              <p>Your trusted partner in global procurement, defense solutions, and industrial trading since 2020.</p>
            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <button onClick={() => scrollToSection('about')}>About Us</button>
              <button onClick={() => scrollToSection('services')}>Services</button>
              <button onClick={() => scrollToSection('team')}>Team</button>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Info</h4>
              <p><Phone className="inline-icon" /> (+92) 320-200-1183</p>
              <p><Mail className="inline-icon" /> info@seaworthtraders.com</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 SEAWORTH TRADERS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;