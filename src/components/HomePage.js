import React from 'react';
import {Link} from 'react-router';
import {Hola} from 'react-semi-theme';

const HomePage = () => {
  return (
    <div>
      <h1>React Slingshotss</h1>
        <Hola />
      <h2>Get Started</h2>
      <ol>
        <li>Review the <Link to="fuel-savings">demo app</Link></li>
        <li>Remove the demo and start coding: npm run remove-demo</li>
      </ol>
    </div>
  );
};

export default HomePage;
