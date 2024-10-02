import { Link } from '@inertiajs/react'

export default function Layout({ children }) {
  return (
    <main>
      <header>
        <nav>
          <Link href="/" className='nav-link'>Home</Link>
          <Link href="/about"  className='nav-link'>About</Link>
          <Link href="/users"  className='nav-link'>Usuários</Link>
        </nav>
      </header>
      <article>{children}</article>
    </main>
  )
}