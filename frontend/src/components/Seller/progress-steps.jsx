export function ProgressSteps({ currentStep = 1 }) {
    const steps = [
      { title: "EMAIL ID & GST", id: 1 },
      { title: "PASSWORD CREATION", id: 2 },
    //   { title: "ONBOARDING DASHBOARD", id: 3 },
    ]
  
    return (
      <div className="flex items-center justify-center max-w-3xl mx-auto mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.id <= currentStep ? "border-blue-600 text-blue-600" : "border-gray-300 text-gray-300"
                }`}
              >
                {step.id <= currentStep ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span className={`ml-2 text-sm ${step.id <= currentStep ? "text-blue-600" : "text-gray-500"}`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-24 h-0.5 mx-2 ${step.id < currentStep ? "bg-blue-600" : "bg-gray-300"}`} />
            )}
          </div>
        ))}
      </div>
    )
  }
  
  