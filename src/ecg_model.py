import torch
import torch.nn as nn
import numpy as np
import os
from PIL import Image

device=torch.device("cpu")


BASE_DIR=os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

MODEL_PATH=os.path.join(
    BASE_DIR,
    "models",
    "best_ecg_model.pth"
)



class ECGNet(nn.Module):

    def __init__(self):

        super().__init__()

        self.conv1=nn.Conv1d(
            1,
            16,
            5
        )

        self.conv2=nn.Conv1d(
            16,
            32,
            5
        )

        self.pool=nn.MaxPool1d(2)

        self.fc1=nn.Linear(
            32*72,
            64
        )

        self.fc2=nn.Linear(
            64,
            2
        )


    def forward(self,x):

        x=self.pool(
            torch.relu(
                self.conv1(x)
            )
        )

        x=self.pool(
            torch.relu(
                self.conv2(x)
            )
        )

        x=x.view(
            x.size(0),
            -1
        )

        x=torch.relu(
            self.fc1(x)
        )

        return self.fc2(x)



model=ECGNet()

model.load_state_dict(

    torch.load(
        MODEL_PATH,
        map_location=device
    )

)

model.eval()



def predict_ecg(path):


    try:

        img=Image.open(
            path
        ).convert(
            "L"
        )


        img=img.resize(
            (300,1)
        )


        arr=np.array(
            img
        ).flatten()


        arr=arr.astype(
            np.float32
        )/255.0


        x=torch.tensor(
            arr
        ).unsqueeze(
            0
        ).unsqueeze(
            0
        )


        with torch.no_grad():

            out=model(x)

            probs=torch.softmax(
                out,
                dim=1
            )


        abnormal_score=probs[0][1].item()

        return abnormal_score


    except Exception as e:

        print(
        "ECG error:",
        e
        )

        return 0.0