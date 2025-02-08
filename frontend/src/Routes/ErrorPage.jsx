import React from 'react';

function ErrorPage() {
  return (
    <>
     {/* Header Section */}
     <header className="w-full bg-blue-600 py-4 flex justify-center">
     <img
       className="w-36"
       src="http://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fk-logo_9fddff.png"
       alt="Flipkart Logo"
     />
     </header>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     

      {/* Error Message Section */}
      <div className="text-center p-6">
        <img
          className="w-full max-w-lg mx-auto"
          src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png"
          alt="Error 500"
        />
        <h2 className="text-xl font-semibold text-gray-700 mt-4">
          Unfortunately, the page you are looking for has been moved or deleted.
        </h2>
        <a
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition"
        >
          GO TO HOMEPAGE
        </a>
      </div>
    </div>
    </>
  );
}

export default ErrorPage;