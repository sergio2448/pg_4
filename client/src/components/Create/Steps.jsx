import React, { useState } from "react"

import ChevronDots from "./ChevronDots"

function Steps({ currentStep, setCurrentStep, pages, setPages }) {

    return (
        <div className="pt-4 mb-12">
            <div className="w-11/12 mx-auto">
                <ChevronDots
                    steps={["Step1", "Step2", "Step3", "Step4"]}
                    currentStep={currentStep}
                    onStepClick={step => setCurrentStep(step)}
                />
            </div>
        </div>
    )
}

export default Steps