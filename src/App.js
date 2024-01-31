// FrontPage.js
// NewWhiteGB
// KEYSTRING psiz2xk3fr7ndhjp9qrszhul
// SHARED SECRET bvzualmo9i
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import logo1 from './images/NW-GB-Logo-2.png'
import logo2 from './images/Symbol-Circle.png'
import './App.css'

const FrontPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual Etsy API key
        const apiKey = 'YOUR_API_KEY';
        
        // Replace 'YOUR_SHOP_ID' with your actual Etsy shop ID
        const shopId = 'YOUR_SHOP_ID';

        const url = `https://openapi.etsy.com/v2/shops/${shopId}/listings/active?api_key=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the data structure is similar to { results: [product1, product2, ...] }
        setProducts(data.results);
      } catch (error) {
        console.error('Error fetching data from Etsy:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
    <header className="custom-header bg-dark text-light p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {/* Add your first logo here */}
          <img src={logo1} alt="Logo 1" className="custom-logo img-fluid" />
        </div>
        <h1 className="custom-heading text-center">Welcome to New White GB Fashion Store!</h1>
        <div>
          {/* Add your second logo here */}
          <img src={logo2} alt="Logo 2" className="custom-logo img-fluid" />
        </div>
      </div>
    </header>
    <main className="custom-main-container container mt-5">
      <Slider {...settings} className="custom-slider">
        {products.map((product) => (
          <div key={product.id} className="custom-card card">
            {/* Display product information here */}
            <img src={product.image} alt={product.title} className="custom-card-img-top card-img-top" />
            <div className="custom-card-body card-body">
              <h5 className="custom-card-title card-title">{product.title}</h5>
              <p className="custom-card-text card-text">${product.price}</p>
            </div>
          </div>
        ))}
      </Slider>
      </main>
      <footer className="custom-footer bg-dark text-light p-3 text-center">
        <p>For inquiries or support, please contact us at <a href="mailto:info@newwhitegb.com">info@newwhitegb.com</a></p>
        <p>Visit our Etsy store: <a href="https://newwhitegb.etsy.com" target="_blank" rel="noopener noreferrer">New White GB on Etsy</a></p>
      </footer>
  </div>
  );
};

export default FrontPage;
