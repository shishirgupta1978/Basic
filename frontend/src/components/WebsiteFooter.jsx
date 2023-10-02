import React from 'react';

export const WebsiteFooter = (props) => {
  return (
    <>{props.data.footnote &&
      <footer className='footer'> 
      <p className="text-center">
        {props.data.footnote}</p>
    </footer>}
    </>
  )
}

