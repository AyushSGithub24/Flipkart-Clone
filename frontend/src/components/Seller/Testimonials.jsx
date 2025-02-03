import { useEffect, useState } from "react"

const testimonials = [
  {
    name: "Striver",
    image: "https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/sellers/Raju_yellow.webp",
    text: "On Flipkart, your listings are live in less than 2 hours and you can start selling anywhere in India. I started my business with 3 products, and today I own 3 brands and have also created employment opportunities for my family and team of 25.",
  },
  {
    name:"Dinesh Kumar Rajpurohit",
    image:"https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/sellers/Dinesh_yellow.webp",
    text:"On Flipkart, your listings are live in less than 2 hours and you can start selling anywhere in India. I started my business with 3 products, and today I own 3 brands and have also created employment opportunities for my family and team of 25."
  },{
    image:"https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/sellers/Vinay_Garg_yellow.webp",
    name:"Vinay Garg",
    text:"When moving from offline to online business, our aim was to sell 300 orders per month. Today, we sell  more than 700 orders per day and this has been possible because of the growth features on the Flipkart seller dashboard, Flipkart Ads and regular payments."
  }
  // Add more testimonials as needed
]

function Testimonials() {
  const [currentIndex, setcurrentIndex] = useState(0)
   useEffect(() => {
      const interval = setInterval(() => {
        goToNext();
      }, 3000);
  
      return () => clearInterval(interval); // Clear interval on component unmount
    }, [currentIndex]);
  
    // Go to the previous slide
    const goToPrevious = () => {
      const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
      setcurrentIndex(newIndex);
    };
  
    // Go to the next slide
    const goToNext = () => {
      const newIndex = (currentIndex + 1) % testimonials.length;
      setcurrentIndex(newIndex);
    };

  return (
    <div className="my-12 px-4">
    {/* Title */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-semibold">
        <span className="text-[#2874f0]">Seller Success</span> Stories
      </h2>
    </div>

    {/* Testimonial Card */}
    <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center max-w-3xl mx-auto">
      <div className="relative w-full flex items-center justify-between">
        {/* Left Button */}
        <button
          onClick={goToPrevious}
          className="text-4xl text-gray-400 hover:text-[#2874f0] transition-colors"
        >
          &#8249;
        </button>

        {/* Testimonial Content */}
        <div className="flex  items-center animate-fadeIn ">
          <img
            src={testimonials[currentIndex].image || "/placeholder.svg"}
            alt={testimonials[currentIndex].name}
            className="w-30 h-30 rounded-full border-4 border-[#2874f0] mb-4 shadow-md"
            style={{margin:"10px"}}
          />
          <div>
          <h3 className="font-bold text-lg mb-2">{testimonials[currentIndex].name}</h3>
          <p className="text-gray-600 text-sm"  style={{marginRight:"10px"}}>{testimonials[currentIndex].text}</p>
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={goToNext}
          className="text-4xl text-gray-400 hover:text-[#2874f0] transition-colors"
        >
          &#8250;
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-[#2874f0] w-3" : "bg-gray-300"
            } transition-all`}
          ></div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Testimonials

