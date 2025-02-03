function CreateAccount() {
    const steps = [
      {
        icon: "👤",
        title: "Register / Login to",
        subtitle: "www.seller.flipkart.com",
      },
      {
        icon: "📄",
        title: "Fill in the GST Document",
        subtitle: "Application Form",
      },
      {
        icon: "📤",
        title: "Submit Enrollment",
        subtitle: "Application",
      },
    ]
  
    return (
        <div className="my-12 px-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your <span className="text-[#2874f0]">Flipkart Seller Account</span>
        </h2>
      
        {/* Main Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <p className="text-lg text-gray-700 mb-6 text-center">
            Creating your Flipkart seller account is a quick process (less than 10 minutes) and requires only 3 documents.
            Follow the steps below to get started and begin selling on Flipkart!
          </p>
      
          {/* GSTIN Section */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Don't have a <span className="text-[#2874f0]">GSTIN</span>?
          </h3>
      
          {/* Steps Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start p-4 rounded-lg bg-gray-100 hover:shadow-md transition-all"
              >
                <span className="text-4xl text-[#2874f0] mr-4">{step.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    )
  }
  
  export default CreateAccount
  
  