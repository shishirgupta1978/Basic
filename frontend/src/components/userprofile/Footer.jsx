import React from 'react';
import '../../assets/styles/Footer.scss';

export const Footer = (props) => {
  return (
    <>{props.footnote &&
    <footer className="footer">
      <div className="footer-content">
        <p>{props.footnote}</p>
      </div>
    </footer>}
    </>
  )
}


