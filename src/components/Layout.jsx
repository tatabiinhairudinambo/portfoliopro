import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import BackToTop from './BackToTop'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="page">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <BackToTop />
    </div>
  )
}