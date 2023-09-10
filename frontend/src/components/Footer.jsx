import React from 'react';
import '../assets/styles/Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved. Contact: shishirgupta2011@gmail.com</p>
      </div>
    </footer>

  )
}


