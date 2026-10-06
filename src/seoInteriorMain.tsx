import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { InteriorSeoPage } from './InteriorSeoPage';

const container = document.getElementById('root')!;
const app = <StrictMode><InteriorSeoPage /></StrictMode>;
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
