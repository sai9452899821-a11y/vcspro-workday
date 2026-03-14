// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { MethodologyPage, AboutPage, ContactPage } from './pages/InnerPages';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <Routes>
        <Route path="/"            element={<HomePage />}       />
        <Route path="/services"    element={<ServicesPage />}   />
        <Route path="/methodology" element={<MethodologyPage />} />
        <Route path="/about"       element={<AboutPage />}      />
        <Route path="/contact"     element={<ContactPage />}    />
        <Route path="/blog"        element={<BlogPage />}       />
        <Route path="/blog/:slug"  element={<BlogPostPage />}   />
        <Route path="*"            element={<NotFoundPage />}   />
      </Routes>
      <Footer />
    </>
  );
}
