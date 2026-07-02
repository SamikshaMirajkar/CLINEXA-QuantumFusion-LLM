def predict_text(text):
    keywords = ["pain","fever","breathless","irregular"]

    score = 0
    for k in keywords:
        if k in text.lower():
            score += 1

    return score