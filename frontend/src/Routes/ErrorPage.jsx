import React from 'react'

function ErrorPage() {
    return (
      <>
        {/* Header Section */}
        <div style={{ backgroundColor: "#2874f0", height: "78px", textAlign: "center" }}>
          <div style={{ width: "100%", margin: "0 auto", paddingTop: "2px", textAlign: "left" }}>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <img
                width="149"
                src="http://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fk-logo_9fddff.png"
                alt="Flipkart Logo"
                style={{ border: "none", filter: "invert(0)" }}
              />
            </div>
          </div>
        </div>
  
        {/* Error Message Section */}
        <div style={{ textAlign: "center", fontSize: "14px", padding: "20px" }}>
          <div>
            <img
              style={{ width: "450px", maxWidth: "100%", filter: "invert(0)" }}
              src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png"
              alt="Error 500"
            />
            <div style={{ fontSize: "1.3em", paddingTop: "10px", marginBottom: "35px" }}>
              Unfortunately, the page you are looking for has been moved or deleted.
            </div>
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "#2874f0",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              GO TO HOMEPAGE
            </a>
          </div>
        </div>
      </>
    );
  }

export default ErrorPage