import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import Layout from '@/Layouts/Layout';

createInertiaApp({
  title: title => `${title} Almoxarifado`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`]
    // This under code is used when you want use a layout in your all pages
    // let page = pages[`./Pages/${name}.jsx`];
    // page.default.layout = page.default.layout || ((page) => <Layout children={page} />);
    // return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})