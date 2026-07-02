import matplotlib.pyplot as plt
from PIL import Image
import numpy as np
import os


def generate_heatmap(image_path):

    img = Image.open(image_path).convert("RGB")

    arr = np.array(img)

    heat = arr.mean(axis=2)

    plt.figure(figsize=(6,6))

    plt.imshow(heat, cmap='jet')

    plt.axis('off')

    save_path = "static/heatmaps/heatmap.png"

    plt.savefig(save_path, bbox_inches='tight')

    plt.close()

    return save_path