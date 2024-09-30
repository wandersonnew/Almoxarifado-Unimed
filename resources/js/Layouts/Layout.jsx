import { Link } from '@inertiajs/react'

export default function Layout({ children }) {
  return (
    <main>
      <header>
        <Link href="/" className='nav-link'>Home</Link>
        <Link href="/about"  className='nav-link'>About</Link>
        <Link href="/contact"  className='nav-link'>Contact</Link>
      </header>
      <article>{children}</article>
    </main>
  )
}