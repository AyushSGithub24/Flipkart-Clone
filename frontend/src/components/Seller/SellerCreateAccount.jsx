import React, { useState } from 'react'
import { ProgressSteps } from "./progress-steps"
import { TestimonialCard } from "./testimonial-card"
import { RegistrationForm } from "./registration-form"
import { BenefitsGrid } from "./benefits-grid"
import { CreatePassword } from './CreatePassword'

function SellerCreateAccount() {
    const [step,setStep]=useState(1);
    const [category, setCategory] = useState("all");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [gstin, setGstin] = useState("");
    const [name,setName]=useState("")
    const value={setStep,category,setCategory,mobile,setMobile,email,setEmail,gstin,setGstin,name,setName};
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="flex justify-center gap-4 mb-8">
          <img
            src={
                'https://static-assets-web.flixcart.com/fk-sp-static/images/onboarding_logo_short_blue.png'}
            alt="Flipkart Logo"
          />
        </div>

        <ProgressSteps currentStep={step} />
        <div className="grid md:grid-cols-2 gap-8 mb-16">
         { step==1 &&  <RegistrationForm value={value}  />}
     
         { step==1 && <div className="space-y-4">
         
          <TestimonialCard />
            <img
              src={
               'https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/banner/register_new_banner_50cr_v3.png'
              }
              alt="Promotional Banner"
              width={'350px'}
              height={'300px'}
              className="rounded-lg"
            /> 
          </div>}
        </div>
        { step==2 &&  <CreatePassword value={value}  /> }
        <BenefitsGrid />
      </div>
    </div>
  )
}





export default SellerCreateAccount