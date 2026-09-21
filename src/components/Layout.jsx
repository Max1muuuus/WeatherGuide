import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" end className="brand-link">
            Weather
          </NavLink>

          <nav className="main-nav" aria-label="Основна навігація">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Головна
            </NavLink>
            <NavLink
              to="/forecast"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Прогноз
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Історія
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="page-shell">
        <div className="container">
          <Outlet />
        </div>
      </main>

    </>
  )
}

export default Layout
