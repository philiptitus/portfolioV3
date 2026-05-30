import { Metadata } from 'next'
import ContactClient from './contact-client'

export const metadata: Metadata = {
  title: 'Contact – Philip Titus | Software & ML Engineer',
  description: 'Get in touch with Philip Titus — software engineer and ML specialist based in Nairobi, Kenya. Available for freelance projects and collaborations.',
}

export default function ContactPage() {
  return <ContactClient />
}
