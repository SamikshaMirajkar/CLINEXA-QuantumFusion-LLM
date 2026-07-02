import {useLocation,useNavigate} from "react-router-dom"
import {useEffect} from "react"
import {motion} from "framer-motion"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

import {
FaArrowLeft,
FaUserMd
} from "react-icons/fa"

function Report(){

const navigate=useNavigate()

const {state}=useLocation()

const result=state || {}

useEffect(()=>{

if(result?.disease){

const speech=
new SpeechSynthesisUtterance(

`Clinical analysis completed.

Disease detected: ${result.disease}.

Confidence score: ${result.fusion}.

Severity level: ${result.severity}.

Recommended clinical guidance:

${result.recommendation}.`

)

speech.rate=.9

speech.pitch=1

speech.volume=1

window.speechSynthesis.cancel()

window.speechSynthesis.speak(
speech
)

}

return()=>{

window.speechSynthesis.cancel()

}

},[])

const section={

background:"#10212f",
color:"white",
padding:"8px",
fontWeight:"bold"

}


const downloadReport=()=>{

const input=
document.getElementById(
"clinicalReport"
)

html2canvas(
input,
{
scale:2
}
)

.then((canvas)=>{

const img=
canvas.toDataURL(
"image/png"
)

const pdf=
new jsPDF(
"p",
"mm",
"a4"
)

const width=210

const height=
(canvas.height*width)
/canvas.width


pdf.addImage(
img,
"PNG",
0,
0,
width,
height
)

pdf.save(
"CLINEXA_Clinical_Report.pdf"
)

})

}



return(

<div

style={{

minHeight:"100vh",

padding:"40px",

background:
"linear-gradient(135deg,#e3f2fd,#bbdefb,#90caf9)"

}}

>


<h1

style={{

textAlign:"center",

fontSize:"60px",

fontWeight:"bold",

color:"#0d47a1"

}}

>

C L I N E X A

</h1>


<p

style={{

textAlign:"center",

color:"#1565c0"

}}

>

Clinical Dashboard

</p>



<div

style={{

padding:"35px",

marginTop:"30px",

background:
"rgba(255,255,255,.6)",

backdropFilter:
"blur(20px)",

borderRadius:"35px",

boxShadow:
"0 0 40px rgba(25,118,210,.25)"

}}

>

<button

onClick={()=>
navigate("/upload")
}

style={{

padding:"15px",

border:"none",

borderRadius:"20px",

background:"#1565c0",

color:"white"

}}

>

<FaArrowLeft/>

 Back

</button>



<div
style={{
textAlign:"center"
}}
>

{result.photo &&

<img

src={result.photo}

style={{

width:"130px",

height:"130px",

borderRadius:"50%",

objectFit:"cover",

marginTop:"20px",

border:
"5px solid #1976d2"

}}

/>

}

<h2>{result.name}</h2>

<p>

Patient ID:
{result.patientID}

</p>

</div>



<div

style={{

display:"grid",

gridTemplateColumns:
"1fr 1fr 1fr",

gap:"25px",

marginTop:"35px"

}}

>

<div style={card}>

<div
style={{
fontSize:"28px",
fontWeight:"bold",
color:"#0d47a1"
}}
>
Disease
</div>

<h2
style={{
color:"#e65100",
fontWeight:"bold",
fontSize:"34px"
}}
>
{result.disease}
</h2>

</div>



<div style={card}>

<div
style={{
fontSize:"28px",
fontWeight:"bold",
color:"#0d47a1"
}}
>
Confidence
</div>

<h2
style={{
color:"#2e7d32",
fontWeight:"bold",
fontSize:"34px"
}}
>
{result.fusion}
</h2>

</div>



<div style={card}>

<div
style={{
fontSize:"28px",
fontWeight:"bold",
color:"#0d47a1"
}}
>
Severity
</div>

<h2
style={{
color:"#c62828",
fontWeight:"bold",
fontSize:"34px"
}}
>
{result.severity}
</h2>

</div>

</div>

<div
style={{
marginTop:"35px"
}}
>

<h2>

<FaUserMd/>

 Recommendation

</h2>

<p>

{result.recommendation}

</p>

</div>



<div
style={{
marginTop:"30px"
}}
>

<h2>
Heatmap
</h2>

{

result.heatmap ?

<img

src={result.heatmap}

style={{

width:"100%",

borderRadius:"20px"

}}

/>

:

<div>

No Heatmap Generated

</div>

}

</div>



<button

onClick={
downloadReport
}

style={{

marginTop:"35px",

width:"100%",

padding:"22px",

fontSize:"22px",

border:"none",

borderRadius:"25px",

background:
"linear-gradient(90deg,#1976d2,#42a5f5)",

color:"white",

cursor:"pointer"

}}

>

📄 Download Clinical Report

</button>

</div>




<div

style={{
position:"absolute",
left:"-9999px"
}}

>

<div

id="clinicalReport"

style={{

width:"850px",

background:"#fffef8",

padding:"25px",

fontFamily:"Arial",

borderTop:"12px solid #c8e6df",

borderBottom:"12px solid #c8e6df"

}}

>

<div
style={{
display:"flex",
alignItems:"center",
gap:"20px"
}}
>

<div

style={{

width:"100px",
height:"100px",
borderRadius:"50%",
background:"#1976d2",
display:"flex",
justifyContent:"center",
alignItems:"center",
color:"white",
fontWeight:"bold"

}}
>

CLINEXA

</div>

<div>

<h1
style={{
margin:0,
color:"#2c4a4a"
}}
>

CLINEXA CLINICAL SYSTEM

</h1>

<p style={{margin:0}}>
Advanced Clinical Diagnostics
</p>

<p style={{margin:0}}>
Bangalore Medical Intelligence Center
</p>

</div>

</div>

<hr/>

<h1
style={{
textAlign:"center",
color:"#2c4a4a"
}}
>

MEDICAL DIAGNOSTIC REPORT

</h1>


<table
width="100%"
style={{
background:"#f3efe7",
padding:"10px"
}}
>

<tr>

<td>
<b>Report ID:</b>
CNX-{result.patientID}
</td>

<td>
<b>Date:</b>
{new Date().toLocaleDateString()}
</td>

<td>
<b>Time:</b>
{new Date().toLocaleTimeString()}
</td>

</tr>

</table>

<br/>


<div style={section}>
PATIENT INFORMATION
</div>


<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"flex-start",

gap:"20px",

marginTop:"15px"

}}

>


<div style={{flex:3}}>

<table
width="100%"
cellPadding="8"
border="1"
style={{
borderCollapse:"collapse"
}}
>

<tr>
<td><b>Patient Name</b></td>
<td>{result.name||"--"}</td>
</tr>

<tr>
<td><b>Age/Gender</b></td>
<td>{result.age||"--"}/{result.gender||"--"}</td>
</tr>

<tr>
<td><b>Blood Group</b></td>
<td>{result.bloodGroup||"--"}</td>
</tr>

<tr>
<td><b>Contact</b></td>
<td>{result.contact||"--"}</td>
</tr>

</table>

</div>



<div
style={{
flex:1,
textAlign:"center"
}}
>

{result.photo &&

<img

src={result.photo}

style={{

width:"120px",
height:"120px",
borderRadius:"50%",
objectFit:"cover",
border:"4px solid #64b5f6"

}}

/>

}

<p><b>Patient Photo</b></p>

</div>

</div>

<br/>


<div style={section}>
VITAL SIGNS
</div>

<table
width="100%"
cellPadding="8"
border="1"
style={{
borderCollapse:"collapse"
}}
>

<tr>
<td>Fusion Score</td>
<td>{result.fusion}</td>
</tr>

<tr>
<td>XRay </td>
<td>{result.xray}</td>
</tr>

<tr>
<td>ECG </td>
<td>{result.ecg}</td>
</tr>

<tr>
<td>Symptoms </td>
<td>{result.symptoms}</td>
</tr>

</table>

<br/>


<div style={section}>
CLINICAL OBSERVATIONS
</div>

<table
width="100%"
cellPadding="8"
border="1"
style={{
borderCollapse:"collapse"
}}
>

<tr>
<td><b>Symptoms</b></td>
<td>{result.userSymptoms}</td>
</tr>

<tr>
<td><b>Diagnosis</b></td>

<td style={{color:"red"}}>

<b>

{result.disease}

</b>

</td>

</tr>

</table>

<br/>


<div
style={{
display:"flex",
gap:"20px"
}}
>

<div style={{flex:1}}>

<div style={section}>
DOCTOR'S IMPRESSION
</div>

<div
style={{
border:"1px solid #ccc",
height:"130px",
padding:"10px"
}}
>

AI Severity:
{result.severity}

<br/><br/>

Patient stable.
Clinical review recommended.

</div>

</div>


<div style={{flex:1}}>

<div style={section}>
PRESCRIPTION / RECOMMENDATION
</div>

<div
style={{
border:"1px solid #ccc",
height:"130px",
padding:"10px"
}}
>

☑ {result.recommendation}

<br/>

☑ Specialist consultation

<br/>

☑ Follow-up after 2 days

</div>

</div>

</div>

<br/><br/>


<div

style={{

display:"flex",
justifyContent:"space-between",
alignItems:"center"

}}

>

<div>

Consultant Signature

<br/><br/><br/>

Dr.CLINEXA 

<br/>

Clinical Specialist

</div>


<div

style={{

width:"110px",
height:"110px",
border:"2px dashed #64b5f6",
borderRadius:"50%",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontWeight:"bold",
textAlign:"center"

}}

>

CLINEXA

<br/>

OFFICIAL

<br/>

SEAL

</div>

</div>

</div>

</div>

</div>

)

}

const card={

padding:"25px",

borderRadius:"25px",

background:
"rgba(255,255,255,.8)",

textAlign:"center"

}

export default Report