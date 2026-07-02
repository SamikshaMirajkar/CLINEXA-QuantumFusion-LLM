import cv2
import numpy as np
import os

def generate_heatmap(image_path):

    img=cv2.imread(image_path)

    heatmap=cv2.applyColorMap(
        img,
        cv2.COLORMAP_JET
    )

    output=
    "uploads/heatmap.jpg"

    cv2.imwrite(
        output,
        heatmap
    )

    return "http://127.0.0.1:8000/uploads/heatmap.jpg"