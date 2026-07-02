from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet


def generate_report(result_dict):

    path = "static/reports/clinical_report.pdf"

    doc = SimpleDocTemplate(path)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph("QuantumFusion Clinical Report", styles['Title'])
    )

    elements.append(Spacer(1,12))

    for key, value in result_dict.items():

        elements.append(
            Paragraph(f"<b>{key}</b>: {value}", styles['BodyText'])
        )

        elements.append(Spacer(1,10))

    doc.build(elements)

    return path