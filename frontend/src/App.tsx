import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import AppHeader from '@shared/components/Layout/Header'
import HomePage from './pages/HomePage'
import { ProductsPage } from '@features/Products/pages/ProductsPage'

const { Content, Footer } = Layout

// ❌ PROBLEMA: No error boundaries para manejar crashes
// ❌ PROBLEMA: No loading states globales
// ❌ PROBLEMA: No configuración de rutas protegidas
// ❌ PROBLEMA: No lazy loading de rutas
// ❌ PROBLEMA: No configuración de SEO (meta tags, etc.)
const App: React.FC = () => {
  return (
    <Router>
      {/* ❌ PROBLEMA: Layout muy básico sin responsiveness avanzada */}
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        
        {/* ❌ PROBLEMA: Content padding hardcodeado sin responsiveness */}
        <Content style={{ padding: '24px 50px' }}>
          {/* ❌ PROBLEMA: No error boundary wrapper para rutas */}
          {/* ❌ PROBLEMA: No loading fallback para suspense */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            {/* TODO: /products/:id, /cart, /checkout, /orders, /login, /register */}
            {/* TODO Day 3: /cart, /checkout, /orders */}
            {/* TODO Day 4: /login, /register, /profile */}
            {/* TODO Day 5: /admin/* (protected routes) */}
            
            {/* ❌ PROBLEMA: No 404 route */}
            {/* ❌ PROBLEMA: No catch-all route */}
          </Routes>
        </Content>
        
        {/* ❌ PROBLEMA: Footer muy básico sin links útiles */}
        <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
          E-commerce Evolution ©2024 - Learning Project
          {/* ❌ PROBLEMA: No footer links (Privacy, Terms, etc.) */}
          {/* ❌ PROBLEMA: No social media links */}
          {/* ❌ PROBLEMA: No newsletter signup */}
        </Footer>
      </Layout>
    </Router>
  )
}

export default App
