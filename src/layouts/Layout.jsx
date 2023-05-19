import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/layout.css'

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <Header />
      <main>
        
          <Outlet />
        
      </main>
      <Footer />
    </div>
  )
}