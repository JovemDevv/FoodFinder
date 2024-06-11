import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/pages/landing.css';
import logoImg from '../images/FoodFinder.png';

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} className='img1' alt="FoodFinder" />
        <main>
          <h1>Ta com fome?</h1>
          <p>Encontre lugares para matar sua fome</p>
        </main>
        <div className="location">
          <strong>Brasília</strong>
          <span>Distrito Federal</span>
        </div>
        <Link to="/login" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  )
}

export default Landing;
