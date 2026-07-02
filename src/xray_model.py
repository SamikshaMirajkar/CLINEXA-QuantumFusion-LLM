import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os


device=torch.device("cpu")


BASE_DIR=os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


MODEL_PATH=os.path.join(
    BASE_DIR,
    "models",
    "best_xray_model.pth"
)


model=models.resnet18(
    pretrained=False
)

model.fc=nn.Linear(
    model.fc.in_features,
    2
)


model.load_state_dict(

    torch.load(
        MODEL_PATH,
        map_location=device
    )

)


model.eval()


transform=transforms.Compose([

    transforms.Resize(
        (224,224)
    ),

    transforms.Grayscale(
        num_output_channels=3
    ),

    transforms.ToTensor()

])



def predict_xray(path):

    img=Image.open(
        path
    ).convert(
        "RGB"
    )


    x=transform(
        img
    ).unsqueeze(
        0
    )


    with torch.no_grad():

        out=model(x)

        probs=torch.softmax(
            out,
            dim=1
        )


    pneumonia_score=probs[0][1].item()

    return pneumonia_score