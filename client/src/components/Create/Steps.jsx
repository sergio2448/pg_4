import React, { useState } from "react"

import ChevronDots from "./ChevronDots"

function Steps({currentStep, setCurrentStep, pages, setPages}) {
  
  return (
    <div className="pt-4 mb-12">
      <div className="w-11/12 mx-auto">
        <ChevronDots
          steps={["Paso 1", "Paso 2", "Carga Imagenes", "Publica!"]}
          currentStep={currentStep}
          onStepClick={step => setCurrentStep(step)}
        />
      </div>
    </div>
  )
}

export default Steps