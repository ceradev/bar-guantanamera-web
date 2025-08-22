import type React from "react"
import { Link } from "react-router-dom"

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-2">Bar Cafeteria Guantanamera</h3>
            <p className="text-sm text-gray-300 mb-4 font-medium">23 años a su servicio</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
          <ul className="list-none">
            <li className="mb-2">
              <Link to="/">Home</Link>
            </li>
            <li className="mb-2">
              <Link to="/menu">Menu</Link>
            </li>
            <li className="mb-2">
              <Link to="/about">About</Link>
            </li>
            <li className="mb-2">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          <p className="mb-2">Address: 123 Main St, Anytown, USA</p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p>Email: info@barcafeteria.com</p>
        </div>
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h3 className="text-lg font-semibold text-white mb-4">Social Media</h3>
          <ul className="list-none">
            <li className="mb-2">
              <a href="https://facebook.com/barcafeteria" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li className="mb-2">
              <a href="https://instagram.com/barcafeteria" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li className="mb-2">
              <a href="https://twitter.com/barcafeteria" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
