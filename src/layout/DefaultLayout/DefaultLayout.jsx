import React from 'react';
import { Route } from 'react-router-dom'

import Header from '../../components/Header';
import Footer from '../../components/Footer';


import './styles.css'

function DefaultLayout({ component: Component, ...props }) {
  return (
    <Route 
      {...props} 
      render={ (routeProps) =>(
        <div >
          <Header {...routeProps} />
          <div className="main container">
            <Component {...routeProps}/>
          </div>
          <Footer />
        </div>
        )} 
    />
  );
}

export default DefaultLayout;
