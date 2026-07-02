import pennylane as qml

dev = qml.device("default.qubit", wires=3)

@qml.qnode(dev)
def circuit(a, b, c):
    qml.RX(a, wires=0)
    qml.RY(b, wires=1)
    qml.RZ(c, wires=2)

    qml.CNOT(wires=[0,1])
    qml.CNOT(wires=[1,2])

    return qml.expval(qml.PauliZ(0))

def fuse(a, b, c):
    return float(circuit(a, b, c))