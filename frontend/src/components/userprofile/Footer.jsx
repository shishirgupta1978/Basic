import React from 'react';

export const Footer = (props) => {
  return (
    <>{props.data.footnote &&
      <footer className='footer'> 
      <p className="text-center">
        {props.data.footnote}</p>
    </footer>}
    </>
  )
}

