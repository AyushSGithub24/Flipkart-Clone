import React from "react"
import "./Footer.css"

function Footer() {
  const footerSections = [
    {
      title: "ABOUT",
      links: ["Contact Us", "About Us", "Careers", "Flipkart Stories", "Press", "Corporate Information"],
    },
    {
      title: "HELP",
      links: ["Payments", "Shipping", "Cancellation & Returns", "FAQ"],
    },
    {
      title: "CONSUMER POLICY",
      links: [
        "Cancellation & Returns",
        "Terms Of Use",
        "Security",
        "Privacy",
        "Sitemap",
        "Grievance Redressal",
        "EPR Compliance",
      ],
    },
    {
      title: "SOCIAL",
      links: ["Facebook", "Twitter", "YouTube"],
    },
  ]

  return (
    <footer className="footer">
      <div className="container">
        {footerSections.map((section) => (
          <div key={section.title} className="footer-section">
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li key={link}>
                  <a href="/">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>© 2007-{new Date().getFullYear()} Flipkart.com</p>
      </div>
    </footer>
  )
}

export default Footer

