import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <h1 className="logo-text">LUXE</h1>
          <span className="logo-subtitle">Premium Jewelry</span>
        </div>
        <nav className="nav">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
            }}
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('products');
            }}
            className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
          >
            Collections
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('about');
            }}
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
          >
            About
          </a>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('contact');
            }}
            className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

// Hero Section Component
const Hero = ({ setCurrentPage }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Timeless Elegance</h1>
        <p className="hero-subtitle">Discover our exquisite collection of premium jewelry, crafted for those who appreciate luxury and sophistication</p>
        <button 
          className="hero-button"
          onClick={() => setCurrentPage('products')}
        >
          Explore Collection
        </button>
      </div>
      <div className="hero-image">
        <img 
          src="https://images.unsplash.com/photo-1720686615374-ea04dac6a66e" 
          alt="Luxury Jewelry" 
          className="hero-img"
        />
      </div>
    </section>
  );
};

// Product Details Modal Component
const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleInquiry = () => {
    alert(`Thank you for your interest in ${product.name}! We will contact you shortly with more information.`);
  };

  const handleAddToCart = () => {
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          <div className="modal-images">
            <div className="main-image">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="modal-product-image"
              />
            </div>
            <div className="model-image">
              <img 
                src={product.model_image_url} 
                alt={`${product.name} worn by model`} 
                className="modal-model-image"
              />
            </div>
          </div>
          
          <div className="modal-details">
            <div className="product-header">
              <h2 className="modal-product-name">{product.name}</h2>
              <span className="modal-product-category">{product.category}</span>
              {product.is_featured && (
                <span className="modal-featured-badge">Featured</span>
              )}
            </div>
            
            <div className="modal-price">${product.price.toLocaleString()}</div>
            
            <div className="product-description-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="material-details-section">
              <h3>Material Details</h3>
              <div className="material-grid">
                <div className="material-item">
                  <span className="material-label">Material</span>
                  <span className="material-value">{product.material_details?.material || 'N/A'}</span>
                </div>
                <div className="material-item">
                  <span className="material-label">Gemstones</span>
                  <span className="material-value">{product.material_details?.gemstones || 'N/A'}</span>
                </div>
                <div className="material-item">
                  <span className="material-label">Weight</span>
                  <span className="material-value">{product.material_details?.weight || 'N/A'}</span>
                </div>
                <div className="material-item">
                  <span className="material-label">Origin</span>
                  <span className="material-value">{product.material_details?.origin || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="inquiry-button" onClick={handleInquiry}>
                Send Inquiry
              </button>
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Card Component with Enhanced Hover Effects
const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="product-image product-image-main"
        />
        <img 
          src={product.model_image_url} 
          alt={`${product.name} worn by model`} 
          className="product-image product-image-model"
        />
        {product.is_featured && (
          <span className="featured-badge">Featured</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price.toLocaleString()}</div>
        <button 
          className="product-button"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ featuredProducts, onViewDetails, setCurrentPage }) => {
  return (
    <div className="page">
      <Hero setCurrentPage={setCurrentPage} />
      
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Collection</h2>
          <p className="section-subtitle">Handpicked pieces that embody luxury and craftsmanship</p>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section">
        <div className="container">
          <div className="brand-content">
            <h2 className="brand-title">Crafted for Perfection</h2>
            <p className="brand-text">
              Each piece in our collection is meticulously crafted by master artisans using the finest materials. 
              From ethically sourced diamonds to premium gold, every detail reflects our commitment to excellence.
            </p>
            <button 
              className="brand-button"
              onClick={() => setCurrentPage('about')}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Products Page Component
const ProductsPage = ({ products, onViewDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Our Collections</h1>
        
        <div className="category-filters">
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">About LUXE</h1>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded with a passion for exceptional craftsmanship, LUXE has been creating timeless jewelry pieces 
              for discerning clients who appreciate the finer things in life. Our journey began with a simple mission: 
              to create jewelry that transcends trends and becomes cherished heirlooms.
            </p>
            
            <h2>Our Craftsmanship</h2>
            <p>
              Every piece in our collection is meticulously handcrafted by master artisans with decades of experience. 
              We use only the finest materials - ethically sourced diamonds, premium gold, and sterling silver - 
              ensuring each creation meets our exacting standards.
            </p>
            
            <h2>Our Values</h2>
            <ul className="values-list">
              <li>Excellence in every detail</li>
              <li>Ethical sourcing and sustainability</li>
              <li>Timeless design philosophy</li>
              <li>Exceptional customer service</li>
              <li>Craftsmanship heritage</li>
            </ul>
            
            <h2>Why Choose LUXE?</h2>
            <p>
              When you choose LUXE, you're not just purchasing jewelry - you're investing in a legacy. 
              Each piece tells a story of dedication, artistry, and uncompromising quality that will be 
              treasured for generations to come.
            </p>
          </div>
          
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1658729565278-7c09292d7184" 
              alt="Luxury Jewelry Craftsmanship" 
              className="about-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitMessage('Thank you for your message. We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <h3>Visit Our Showroom</h3>
                <p>123 Luxury Avenue<br />New York, NY 10001</p>
              </div>
              
              <div className="contact-item">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              
              <div className="contact-item">
                <h3>Email</h3>
                <p>info@luxejewelry.com</p>
              </div>
              
              <div className="contact-item">
                <h3>Hours</h3>
                <p>Mon - Fri: 10AM - 7PM<br />Sat: 10AM - 6PM<br />Sun: 12PM - 5PM</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-textarea"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="form-submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitMessage && (
                <p className="submit-message">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize sample data first
        await axios.post(`${API}/init-data`);
        
        // Fetch all products
        const productsResponse = await axios.get(`${API}/products`);
        setProducts(productsResponse.data);
        
        // Fetch featured products
        const featuredResponse = await axios.get(`${API}/products/featured`);
        setFeaturedProducts(featuredResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading luxury...</p>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage featuredProducts={featuredProducts} onViewDetails={handleViewDetails} setCurrentPage={setCurrentPage} />;
      case 'products':
        return <ProductsPage products={products} onViewDetails={handleViewDetails} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage featuredProducts={featuredProducts} onViewDetails={handleViewDetails} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <ProductDetailsModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;