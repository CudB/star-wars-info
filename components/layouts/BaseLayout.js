import React from 'react';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import PropTypes from 'prop-types';


const BaseLayout = (props) => {

  const { className, children } = props

  return (
    <div className="layout-container">
      <Header />
      <main className={`cover ${className}`}>
        <div className="wrapper">
          {children}
        </div>
        <Footer />
      </main>

    </div>
  )
}

BaseLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element
};

export default BaseLayout;