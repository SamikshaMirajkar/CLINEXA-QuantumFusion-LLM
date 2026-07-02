import {useState} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import {motion} from "framer-motion";

import {
FaHeartbeat,
FaXRay,
FaBrain,
FaMicroscope,
FaNotesMedical,
FaUser,
FaCheckCircle,
FaTimesCircle
} from "react-icons/fa";

import {GiDna1} from "react-icons/gi";
import {MdMonitorHeart} from "react-icons/md";
import {BsCpu} from "react-icons/bs";


function Floating({
icon,
top,
left,
size,
color
}){

return(

<motion.div

animate={{
y:[0,-40,0,25,0],
rotate:[0,20,-20,0]
}}

transition={{
duration:6,
repeat:Infinity
}}

style={{

position:"absolute",
top,
left,
fontSize:size,
opacity:.75,
color,
zIndex:1

}}

>

{icon}

</motion.div>

)

}



function UploadOrb({

title,
icon,
onChange

}){

return(

<motion.div

whileHover={{
scale:1.08
}}

style={{

height:"280px",

borderRadius:"50%",

background:
"rgba(255,255,255,.35)",

backdropFilter:
"blur(30px)",

display:"flex",

flexDirection:"column",

justifyContent:"center",

alignItems:"center",

boxShadow:
"0 0 80px rgba(255,87,34,.5)",

border:
"3px solid rgba(255,255,255,.45)"

}}

>

<div
style={{
fontSize:"60px",
color:"#e65100"
}}
>

{icon}

</div>

<h2
style={{
color:"#5d4037"
}}
>

{title}

</h2>


<input

type="file"

onChange={(e)=>

onChange(
e.target.files[0]
)

}

/>

</motion.div>

)

}



function Home(){

const navigate=useNavigate()

const {state}=useLocation()

const patientData=state || {}


const [xray,setXray]=useState(null)

const [ecg,setEcg]=useState(null)

const [symptoms,setSymptoms]=useState("")

const [loading,setLoading]=useState(false)



const analyzePatient=async()=>{


if(

!xray &&
!ecg &&
!symptoms.trim()

){

alert(
"Please upload X-ray, ECG or symptoms"
)

return

}


setLoading(true)


const formData=
new FormData()


if(xray){

formData.append(
"xray",
xray
)

}


if(ecg){

formData.append(
"ecg",
ecg
)

}


formData.append(
"symptoms",
symptoms
)


try{


const response=
await fetch(

"http://127.0.0.1:8000/analyze",

{

method:"POST",

body:formData

}

)

const data=
await response.json()

setLoading(false)


navigate(

"/report",

{

state:{

...data,

...patientData,

userSymptoms:symptoms

}

}

)

}

catch{

setLoading(false)

alert(
"Backend not connected"
)

}

}



return(

<div

style={{

minHeight:"100vh",

padding:"40px",

overflow:"hidden",

position:"relative",

background:
"linear-gradient(135deg,#FFF7D6,#FFE082,#FFD54F,#FBC02D)"

}}

>


<Floating
icon={<GiDna1/>}
top="5%"
left="5%"
size="140px"
color="#ff6f00"
/>

<Floating
icon={<FaBrain/>}
top="10%"
left="82%"
size="120px"
color="#e65100"
/>

<Floating
icon={<BsCpu/>}
top="70%"
left="10%"
size="110px"
color="#ff8f00"
/>

<Floating
icon={<MdMonitorHeart/>}
top="55%"
left="85%"
size="120px"
color="#f57c00"
/>

<Floating
icon={<FaMicroscope/>}
top="38%"
left="35%"
size="100px"
color="#ff6f00"
/>

<Floating
icon={<FaHeartbeat/>}
top="82%"
left="60%"
size="120px"
color="#ef6c00"
/>



<div
style={{
position:"relative",
zIndex:5,
width:"95%",
maxWidth:"1600px",
margin:"0 auto"
}}

>


<h1

style={{

textAlign:"center",

fontSize:"70px",

color:"#5d4037",

fontWeight:"bold"

}}

>

C L I N E X A

</h1>


<p

style={{

textAlign:"center",

fontSize:"18px",

color:"#6d4c41",

marginBottom:"25px"

}}

>

Intelligent Clinical Upload Center

</p>



<motion.div

style={{

padding:"25px",

marginBottom:"40px",

borderRadius:"30px",

background:
"rgba(255,255,255,.25)",

backdropFilter:
"blur(20px)",

boxShadow:
"0 0 40px rgba(255,193,7,.4)",

textAlign:"center"

}}

>

<h2>

<FaUser/>

 Patient Information

</h2>


{

patientData.photo &&

<img

src={patientData.photo}

style={{

width:"140px",

height:"140px",

borderRadius:"50%",

objectFit:"cover",

margin:"20px auto",

display:"block",

border:
"5px solid #ff9800",

boxShadow:
"0 0 30px rgba(255,87,34,.7)"

}}

/>

}


<p><b>Name:</b> {patientData.name||"--"}</p>

<p><b>Patient ID:</b> {patientData.patientID||"--"}</p>

<p><b>Age:</b> {patientData.age||"--"}</p>

<p><b>Gender:</b> {patientData.gender||"--"}</p>

<p><b>Blood Group:</b> {patientData.bloodGroup||"--"}</p>

<p><b>Contact:</b> {patientData.contact||"--"}</p>

</motion.div>



<div

style={{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(450px,1fr))",

gap:"50px"

}}

>

<UploadOrb

title="Chest X-Ray"

icon={<FaXRay/>}

onChange={setXray}

/>


<UploadOrb

title="ECG Image"

icon={<FaHeartbeat/>}

onChange={setEcg}

/>

</div>



<div
style={{
marginTop:"20px"
}}
>

<p>

{xray?

<><FaCheckCircle color="green"/> X-Ray Uploaded</>

:

<><FaTimesCircle color="red"/> X-Ray Missing</>

}

</p>


<p>

{ecg?

<><FaCheckCircle color="green"/> ECG Uploaded</>

:

<><FaTimesCircle color="red"/> ECG Missing</>

}

</p>

</div>



<motion.div

style={{

marginTop:"45px",

padding:"35px",

borderRadius:"35px",

background:
"rgba(255,255,255,.32)",

backdropFilter:"blur(30px)"

}}

>

<h2>

<FaNotesMedical/>

Symptoms Analyzer

</h2>


<textarea

rows="6"

value={symptoms}

onChange={(e)=>

setSymptoms(
e.target.value
)

}

placeholder=
"Fever, cough, chest pain..."

style={{

width:"100%",
padding:"18px",
marginTop:"20px",
borderRadius:"20px",
border:"none"

}}

/>

</motion.div>



<motion.button

onClick={
analyzePatient
}

whileHover={{
scale:1.05
}}

style={{

marginTop:"35px",

width:"100%",

padding:"24px",

fontSize:"26px",

fontWeight:"bold",

border:"none",

borderRadius:"30px",

cursor:"pointer",

color:"black",

background:
"linear-gradient(135deg,#FFD54F,#FFA000,#FF6F00,#E53935)"

}}

>

{

loading ?

"Analyzing Clinical Intelligence..."

:

"Analyze Patient Intelligence Fusion"

}

</motion.button>


</div>

</div>

)

}

export default Home