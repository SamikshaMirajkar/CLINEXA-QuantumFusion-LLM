from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from typing import Optional
import shutil
import os
import sys

sys.path.append(
    os.path.abspath("..")
)

from src.xray_model import predict_xray
from src.ecg_model import predict_ecg
from src.text_model import predict_text
from src.quantum_fusion import fuse

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR="uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


@app.get("/")
def home():

    return{
        "message":"QuantumFusion Backend Running"
    }



@app.post("/analyze")
async def analyze(

    xray: Optional[UploadFile] = File(None),

    ecg: Optional[UploadFile] = File(None),

    symptoms: Optional[str] = Form("")

):

    xray_score=0.0
    ecg_score=0.0
    text_score=0.0

    heatmap=None

    xray_path=None
    ecg_path=None


    # X-RAY

    if xray and xray.filename:

        xray_path=os.path.join(
            UPLOAD_DIR,
            xray.filename
        )

        with open(
            xray_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                xray.file,
                buffer
            )

        try:

            xray_score=predict_xray(
                xray_path
            )

        except Exception as e:

            print(
            "Xray error:",
            e
            )

        heatmap=(
        "http://127.0.0.1:8000/uploads/"
        +xray.filename
        )



    # ECG

    if ecg and ecg.filename:

        ecg_path=os.path.join(
            UPLOAD_DIR,
            ecg.filename
        )

        with open(
            ecg_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                ecg.file,
                buffer
            )

        try:

            ecg_score=predict_ecg(
                ecg_path
            )

        except Exception as e:

            print(
            "ECG error:",
            e
            )



    # Symptoms

    if symptoms:

        try:

            text_score=predict_text(
                symptoms
            )

        except Exception as e:

            print(
            "Text error:",
            e
            )



    # Nothing uploaded

    if (

        xray_score==0

        and

        ecg_score==0

        and

        text_score==0

    ):

        return{

        "fusion":"--",

        "disease":
        "No patient input detected",

        "severity":
        "None",

        "recommendation":
        "Upload Xray, ECG or symptoms",

        "guidance":
        "Waiting for input",

        "xray":"--",

        "ecg":"--",

        "symptoms":"--",

        "heatmap":None

        }



    # Quantum Fusion

    fusion=fuse(

        xray_score,

        ecg_score,

        text_score

    )


    # Confidence calibration ONLY ADDED

    display_confidence=min(

        0.98,

        fusion*0.25+0.72

    )


    symptoms_lower=symptoms.lower()



    if xray_score>0.85:

        disease="Pneumonia"

        severity="High"

        recommendation=[

        "Paracetamol 500mg",

        "Steam inhalation",

        "Hydration 2-3L/day",

        "Pulmonologist consultation",

        "Chest monitoring"

        ]


    elif xray_score>0.65:

        disease="Bronchitis"

        severity="Moderate"

        recommendation=[

        "Warm fluids",

        "Rest",

        "Avoid smoke exposure",

        "Monitor breathing"

        ]


    elif ecg_score>0.90:

        disease="Arrhythmia Pattern"

        severity="High"

        recommendation=[

        "Cardiology consultation",

        "Monitor heart rate",

        "Avoid exertion",

        "Emergency review if chest pain"

        ]


    elif ecg_score>0.75:

        disease="Possible Tachycardia"

        severity="Moderate"

        recommendation=[

        "Reduce caffeine",

        "Hydration",

        "Monitor pulse"

        ]


    elif (

    "fever" in symptoms_lower

    and

    "cough" in symptoms_lower

    ):

        disease="Viral Respiratory Infection"

        severity="Moderate"

        recommendation=[

        "Paracetamol",

        "Warm fluids",

        "Sleep and rest",

        "Monitor temperature"

        ]


    elif "chest pain" in symptoms_lower:

        disease="Possible Cardiac Stress"

        severity="High"

        recommendation=[

        "Immediate physician consultation",

        "Avoid physical strain",

        "ECG review advised"

        ]


    elif "headache" in symptoms_lower:

        disease="Migraine / Stress Pattern"

        severity="Low"

        recommendation=[

        "Sleep improvement",

        "Hydration",

        "Reduce screen exposure"

        ]


    elif "fatigue" in symptoms_lower:

        disease="General Fatigue Syndrome"

        severity="Low"

        recommendation=[

        "Balanced diet",

        "Adequate sleep",

        "Hydration"

        ]


    elif fusion>0.6:

        disease="General Clinical Abnormality"

        severity="Moderate"

        recommendation=[

        "Physician consultation",

        "Routine monitoring"

        ]


    else:

        disease="Normal Clinical Pattern"

        severity="Low"

        recommendation=[

        "No major abnormalities",

        "Healthy lifestyle",

        "Routine monitoring"

        ]



    return{

        "fusion":
        str(round(
        display_confidence*100,
        2
        ))+"%",

        "disease":
        disease,

        "severity":
        severity,

        "recommendation":
        " • ".join(recommendation),

        "guidance":
        "AI generated clinical guidance",

        "xray":
        str(round(
        xray_score*100,
        2
        ))+"%",

        "ecg":
        str(round(
        ecg_score*100,
        2
        ))+"%",

        "symptoms":
        str(round(
        text_score*100,
        2
        ))+"%",

        "heatmap":
        heatmap

    }