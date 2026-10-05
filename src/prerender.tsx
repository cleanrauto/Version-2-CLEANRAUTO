import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { InteriorSeoPage } from './InteriorSeoPage';

export function render(page: 'home' | 'interior') {
  return renderToString(<React.StrictMode>{page === 'interior' ? <InteriorSeoPage /> : <App />}</React.StrictMode>);
}
