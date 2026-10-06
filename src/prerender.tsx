import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { InteriorSeoPage } from './InteriorSeoPage';
export function render(page: string) {
 return renderToString(<React.StrictMode>{page === 'interior' ? <InteriorSeoPage /> : <App page={page} />}</React.StrictMode>);
}
