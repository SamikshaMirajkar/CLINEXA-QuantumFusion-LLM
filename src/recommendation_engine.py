def get_recommendation(score):

    if score > 0.75:
        return {
            "disease": "Severe Pneumonia Risk",
            "recommendation": "Immediate clinical consultation recommended.",
            "dosage": "Paracetamol 650mg (general advisory only)."
        }

    elif score > 0.45:
        return {
            "disease": "Moderate Respiratory Abnormality",
            "recommendation": "Monitor symptoms and consult physician.",
            "dosage": "Hydration and prescribed antibiotics if clinically advised."
        }

    else:
        return {
            "disease": "Low Risk / Normal",
            "recommendation": "Continue healthy monitoring.",
            "dosage": "No medication required."
        }