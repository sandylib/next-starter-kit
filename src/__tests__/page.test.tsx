import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../app/[locale]/(main)/page'
import ContactPage from '../app/[locale]/(main)/contact/page'

describe('Home page', () => {
  it('renders the welcome heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders getting started steps', () => {
    render(<Home />)
    expect(screen.getByText('gettingStarted')).toBeInTheDocument()
  })

  it('renders resource links', () => {
    render(<Home />)
    expect(screen.getByText('links.nextjs')).toBeInTheDocument()
    expect(screen.getByText('links.shadcn')).toBeInTheDocument()
  })
})

describe('Contact page', () => {
  it('renders the contact page heading', () => {
    render(<ContactPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the contact form fields', () => {
    render(<ContactPage />)
    expect(screen.getByPlaceholderText('John')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'submit' })).toBeInTheDocument()
  })
})
