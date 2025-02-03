import { Link } from "react-router-dom"

function Header() {
    return (
      <>
        <header className="bg-white shadow-sm " style={{height:'60px',alignContent:"center"}}>
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-8">
                <Link to={"/seller"}>
              <img
                src="https://static-assets-web.flixcart.com/fk-sp-static/images/flipkart_logo_color_revamp.svg"
                alt="Flipkart Seller Hub"
                className="h-8"
              />
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <div className="group relative">
                  <a href="#" className="text-gray-700 hover:text-flipkart-blue flex items-center">
                    Sell Online
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
                <div className="group relative">
                  <a href="#" className="text-gray-700 hover:text-flipkart-blue flex items-center">
                    Fees and Commission
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
                <div className="group relative">
                  <a href="#" className="text-gray-700 hover:text-flipkart-blue flex items-center">
                    Grow
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
                <div className="group relative">
                  <a href="#" className="text-gray-700 hover:text-flipkart-blue flex items-center">
                    Learn
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
                <a href="#" className="text-gray-700 hover:text-flipkart-blue">
                  Shopsy
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-flipkart-blue">
                Login
              </a>
              <a href="#" className="bg-[#FFE11C] text-black px-6 py-2 font-medium hover:bg-yellow-300">
                Start Selling
              </a>
            </div>
          </div>
        </header>
      </>
    )
  }
  
  export default Header
  
  