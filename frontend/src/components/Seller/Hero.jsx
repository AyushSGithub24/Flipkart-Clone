import Benefits from "./Benifits"


function Hero() {
  return (
    <div className="container mx-auto px-4 py-8" style={{ margin:"10px 0 0 0", background:"white", width:"100%"}}>
      <div className="bg-[url(https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/banner/Desktop_sell.webp)] w-full flex flex-col md:flex-row items-center justify-between">

        <div className="">
          <br />
          <br />
          <br />
          <h1 className="text-4xl font-medium mb-8">Sell Online with Flipkart</h1>
          <br />
          <br />
          <br />
          <Benefits />
        </div>
        {/* <div className="md:w-1/2 flex justify-end">
          <img
            src={`https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/banner/Desktop_sell.webp`}
            alt="Sellers"
            className="w-full max-w-lg h-auto"
          />
        </div> */}
      </div>
    </div>
  )
}

export default Hero

