import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactPage = styled.div`
  padding-top: 0;
`;

const HeroSection = styled.section`
  min-height: 60vh;
  background: linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6)
  ), url('/assets/images/banner/banner-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroContent = styled(motion.div)`
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: white;
    
    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  .breadcrumb {
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[2]};
    align-items: center;
    margin-top: ${({ theme }) => theme.spacing[4]};
    
    li {
      color: rgba(255, 255, 255, 0.8);
      
      a {
        color: white;
        text-decoration: none;
        
        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
      
      &:not(:last-child)::after {
        content: '/';
        margin-left: ${({ theme }) => theme.spacing[2]};
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

const ContactInfoSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.grey[50]};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const ContactInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const ContactInfoItem = styled(motion.div)`
  background: white;
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
  }
`;

const ContactInfoThumb = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing[6]};
  
  img {
    max-width: 40px;
    height: auto;
    filter: brightness(0) invert(1);
  }
`;

const ContactInfoContent = styled.div`
  h6 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
  
  ul {
    li {
      color: ${({ theme }) => theme.colors.grey[600]};
      line-height: 1.6;
      
      a {
        color: ${({ theme }) => theme.colors.grey[600]};
        text-decoration: none;
        transition: color ${({ theme }) => theme.transitions.base};
        
        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;

const ContactFormSection = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} 0 ${({ theme }) => theme.spacing[24]};
  background: ${({ theme }) => theme.colors.background};
`;

const ContactWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing[12]};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HelloSection = styled(motion.div)`
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['6xl']};
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    transform: rotate(-5deg);
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
    }
  }
`;

const FormContent = styled(motion.div)`
  .para-header {
    margin-bottom: ${({ theme }) => theme.spacing[8]};
    
    h2 {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
      color: ${({ theme }) => theme.colors.secondary};
      margin-bottom: ${({ theme }) => theme.spacing[4]};
    }
    
    p {
      color: ${({ theme }) => theme.colors.grey[600]};
      line-height: 1.7;
    }
  }
`;

const ContactForm = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const FormGroup = styled.div`
  input, textarea {
    width: 100%;
    padding: ${({ theme }) => theme.spacing[4]};
    border: 2px solid ${({ theme }) => theme.colors.grey[200]};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    font-size: ${({ theme }) => theme.fontSizes.base};
    transition: all ${({ theme }) => theme.transitions.base};
    background: ${({ theme }) => theme.colors.background};
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    }
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.grey[400]};
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  justify-self: start;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-self: center;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: ${({ theme }) => theme.colors.success};
  color: white;
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xrgjrnky', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Hide success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        console.error('Form submission failed');
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const contactInfo = [
    {
      title: "Address",
      icon: "/assets/images/contact/01.png",
      details: ["Katsina State, Nigeria"]
    },
    {
      title: "Phone",
      icon: "/assets/images/contact/02.png",
      details: [
        "+234 813 976 9551",
        "+234 8036559220"
      ]
    },
    {
      title: "Email",
      icon: "/assets/images/contact/03.png",
      details: [
        "crystalbluetech@gmail.com",
        "info@armiyau.com"
      ]
    }
  ];

  return (
    <ContactPage>
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1><span>Contact</span> Me</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><span>Contact</span></li>
          </ul>
        </HeroContent>
      </HeroSection>
      
      <ContactInfoSection ref={ref}>
        <Container>
          <ContactInfoGrid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {contactInfo.map((info, index) => (
              <ContactInfoItem key={index} variants={itemVariants}>
                <ContactInfoThumb>
                  <img src={info.icon} alt={info.title} />
                </ContactInfoThumb>
                <ContactInfoContent>
                  <h6>{info.title}</h6>
                  <ul>
                    {info.details.map((detail, idx) => (
                      <li key={idx}>
                        {info.title === 'Phone' ? (
                          <a href={`tel:${detail}`}>{detail}</a>
                        ) : info.title === 'Email' ? (
                          <a href={`mailto:${detail}`}>{detail}</a>
                        ) : (
                          detail
                        )}
                      </li>
                    ))}
                  </ul>
                </ContactInfoContent>
              </ContactInfoItem>
            ))}
          </ContactInfoGrid>
        </Container>
      </ContactInfoSection>
      
      <ContactFormSection>
        <Container>
          <ContactWrapper>
            <HelloSection
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Hello</h2>
            </HelloSection>
            
            <FormContent
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="para-header">
                <h2>Get In Touch</h2>
                <p>
                  Whether you're a scout, coach, media representative, or fellow football enthusiast, 
                  I'd love to hear from you. Let's connect and discuss opportunities, partnerships, 
                  or just share our passion for the beautiful game.
                </p>
              </div>
              
              {isSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  Thank you for your message! I'll get back to you soon.
                </SuccessMessage>
              )}
              
              <ContactForm onSubmit={handleSubmit}>
                <FormGroup>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </SubmitButton>
              </ContactForm>
            </FormContent>
          </ContactWrapper>
        </Container>
      </ContactFormSection>
    </ContactPage>
  );
};

export default Contact;

