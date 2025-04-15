import React from "react"
import "./Navigation.css"

function Navigation() {
  const categories = [
    "Electronics",
    "TVs & Appliances",
    "Men",
    "Women",
    "Baby & Kids",
    "Home & Furniture",
    "Sports, Books & More",
    "Flights",
    "Offer Zone",
  ]

  return (
    <nav className="category-nav">
      <div className="container">
        <ul>
          {categories.map((category,idx) => (
            <li key={idx}>
              <button>{category}</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

