'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X } from 'lucide-react'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'

const NAV_LINKS = [
  { label: 'About',     href: '/#about' },
  { label: 'Projects',  href: '/#projects' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact',   href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
      style={{ borderBottom: scrolled ? '1px solid var(--border)' : 'none' }}
    >
      <div className="container-xl flex items-center justify-between" style={{ height: '64px' }}>
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl"
          style={{ fontFamily: 'var(--font-dm-serif)', color: 'var(--text-primary)', textDecoration: 'none' }}
        >
          <span className="text-gradient">KA</span>
          <span style={{ color: 'var(--text-muted)' }}>.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = link.href.startsWith('/#')
              ? pathname === '/'
              : pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            title="Search"
            className="hidden md:flex"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'border-color 150ms ease, color 150ms ease',
            }}
          >
            <Search size={15} />
          </Link>

          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>

          <a
            href="mailto:aboladekasope@gmail.com"
            className="hidden md:inline-flex btn-outline"
            style={{ padding: '7px 16px', fontSize: '13px' }}
          >
            Hire Me
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden', borderTop: '1px solid var(--border)' }}
            className="glass"
          >
            <div className="container-xl py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'background 150ms ease, color 150ms ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ThemeSwitcher />
                <Link href="/search" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  <Search size={15} />
                </Link>
              </div>
              <a
                href="mailto:aboladekasope@gmail.com"
                className="btn-outline"
                style={{ padding: '10px 16px', textAlign: 'center', justifyContent: 'center' }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
