/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, User, ArrowRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@weclubsindia.org", "contact@weclubsindia.org"],
      color: "purple"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
      color: "pink"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 9 AM - 6 PM", "Saturday: 10 AM - 4 PM"],
      color: "pink"
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-pink-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Playfair+Display:wght@400;700;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .playfair {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-6">
            GET IN TOUCH
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent playfair">
              Contact
            </span>
            <br />
            <span className="text-gray-800 playfair">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto font-light">
            We'd love to hear from you. Reach out and let's make a difference together.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100 text-center">
                <div className={`w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 playfair">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="inline-block bg-pink-100 text-pink-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
                  SEND MESSAGE
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 playfair">
                  Let's Connect
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-600 focus:outline-none transition-colors bg-white"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-600 focus:outline-none transition-colors bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-600 focus:outline-none transition-colors bg-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-600 focus:outline-none transition-colors bg-white"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-purple-600" size={20} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-600 focus:outline-none transition-colors bg-white resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map 
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100">
                <div className="h-64 bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">District Office</p>
                    <p className="text-sm opacity-90">Chembur, Mumbai</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 playfair">Our Location</h3>
                  <p className="text-gray-600 mb-4">
                    Visit us at our district office in Chembur, Mumbai. We're always happy to welcome visitors and discuss how you can be part of our mission.
                  </p>
                  <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    Get Directions
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>*/}

              {/* Social Media */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 playfair">Follow Us</h3>
                <p className="text-gray-600 mb-4">
                  Stay connected with us on social media for updates, events, and inspiring stories.
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold transition-colors"
                      >
                        <IconComponent size={20} />
                        <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4 playfair">Need Immediate Help?</h3>
                <p className="mb-6 opacity-90">
                  For urgent matters, please call us directly or send an email. We're here to help!
                </p>
                <div className="space-y-3">
                  <a href="tel:+919876543210" className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">+91 98765 43210</span>
                  </a>
                  <a href="mailto:info@weclubsindia.org" className="flex items-center gap-3 bg-white/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">info@weclubsindia.org</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-linear-to-b from-transparent to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 playfair">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How can I join a WE Club?",
                answer: "You can contact us through the form above, call us directly, or visit one of our club meetings. We welcome all women who share our passion for service and empowerment."
              },
              {
                question: "What are the membership requirements?",
                answer: "Membership is open to all women who are committed to our mission of service and community empowerment. There are no specific educational or professional requirements."
              },
              {
                question: "How can I volunteer for projects?",
                answer: "You can volunteer by contacting your local club or reaching out to us through this contact form. We have various projects throughout the year that need volunteers."
              },
              {
                question: "Can I donate to support your projects?",
                answer: "Yes! We welcome donations to support our various community projects. Please contact us for more information on how to contribute."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 playfair">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join us in our mission to empower women and transform communities. We're always looking for passionate individuals to join our movement.
              </p>
              <button className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
                Join Our Movement
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <img src="/images/WE-emblem.png" />
            </div>
            <div>
              <p className="font-bold text-lg">WE Clubs of India</p>
              <p className="text-sm text-gray-400">District 323 A2</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">Women - Epitome of Service</p>
          <p className="text-sm text-gray-500">© 2025 WE - Women Epitome of Service. All rights reserved.</p>
        </div>
      </footer>


    </div>
  );
};

export default ContactPage;

