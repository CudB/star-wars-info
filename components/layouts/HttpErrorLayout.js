import React from 'react';
import BaseLayout from './BaseLayout';
import BasePage from '../BasePage';

const HttpErrorLayout = () => {
  return (
    <BaseLayout>
      <BasePage>
        <div className='http-error'>
          <h1>Oops! :(</h1>
          <p>Something went wrong with our hyperdrive systems.</p>
        </div>
      </BasePage>
    </BaseLayout >
  )
}

export default HttpErrorLayout;