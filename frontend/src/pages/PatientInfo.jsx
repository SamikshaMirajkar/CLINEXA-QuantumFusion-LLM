import {useState,useRef} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import Webcam from "react-webcam";

import {
FaHeartbeat,
FaBrain,
FaCamera,
FaUser
} from "react-icons/fa";

import {GiDna1} from "react-icons/gi";



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
y:[0,-30,0],
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

opacity:.5,

color

}}

>

{icon}

</motion.div>

)

}



function PatientInfo(){

const navigate=useNavigate()

const webcamRef=useRef(null)


const patientID=
"PT-"+Math.floor(
10000+
Math.random()*90000
)



const [name,setName]=useState("")
const [age,setAge]=useState("")
const [gender,setGender]=useState("")
const [bloodGroup,setBloodGroup]=useState("")
const [contact,setContact]=useState("")
const [photo,setPhoto]=useState(null)



const capturePhoto=()=>{

const imageSrc=

webcamRef.current.getScreenshot()

setPhoto(
imageSrc
)

}



const proceed=()=>{

navigate(

"/upload",

{

state:{

name,

age,

gender,

bloodGroup,

contact,

patientID,

photo

}

}

)

}



return(

<div

style={{

minHeight:"100vh",

padding:"40px",

overflow:"hidden",

position:"relative",

background:
"linear-gradient(135deg,#7f0000,#b71c1c,#d32f2f,#ff5252)"

}}

>


<Floating
icon={<GiDna1/>}
top="10%"
left="8%"
size="140px"
color="#ffcdd2"
/>

<Floating
icon={<FaHeartbeat/>}
top="70%"
left="80%"
size="120px"
color="#ffcdd2"
/>

<Floating
icon={<FaBrain/>}
top="20%"
left="85%"
size="110px"
color="#ffcdd2"
/>



<div

style={{

width:"95%",

maxWidth:"1600px",

margin:"auto",

padding:"40px",

borderRadius:"35px",

background:
"rgba(255,255,255,.18)",

backdropFilter:
"blur(30px)",

boxShadow:
"0 0 70px rgba(255,255,255,.2)"

}}



>

<h1

style={{

fontSize:"75px",

textAlign:"center",

fontWeight:"bold",

color:"white"

}}

>

C L I N E X A

</h1>


<p

style={{

textAlign:"center",

color:"#ffeaea",

fontSize:"18px"

}}

>

Intelligent Clinical Analysis System

</p>



<motion.div

style={{

padding:"25px",

borderRadius:"25px",

marginTop:"20px",

textAlign:"center",

background:
"rgba(255,255,255,.15)",

backdropFilter:
"blur(20px)"

}}

>

<h2
style={{
color:"white"
}}
>

<FaCamera/>

 Live Patient Capture

</h2>


{

!photo ?

<>

<Webcam

audio={false}

ref={webcamRef}

screenshotFormat="image/jpeg"

style={{

width:"100%",

marginTop:"15px",

borderRadius:"25px",

border:
"4px solid rgba(255,255,255,.4)"

}}

/>


<button

onClick={capturePhoto}

style={{

marginTop:"20px",

padding:"16px",

width:"100%",

border:"none",

borderRadius:"20px",

fontSize:"18px",

background:
"linear-gradient(90deg,#ff8a80,#ff1744)",

color:"white",

cursor:"pointer"

}}

>

📸 Capture Patient Photo

</button>

</>

:

<>

<img

src={photo}

style={{

marginTop:"20px",

width:"170px",

height:"170px",

borderRadius:"50%",

objectFit:"cover",

border:
"4px solid white"

}}

/>

<button

onClick={()=>
setPhoto(null)
}

style={{

marginTop:"15px",

padding:"15px",

width:"100%",

border:"none",

borderRadius:"20px",

background:
"linear-gradient(90deg,#ef5350,#c62828)",

color:"white"

}}

>

Retake Photo

</button>

</>

}

</motion.div>




<h2
style={{
color:"white",
marginTop:"25px"
}}
>

<FaUser/>

 Patient Information

</h2>



<input
placeholder="Patient Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={inputStyle}
/>


<input
placeholder="Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
style={inputStyle}
/>



<select

value={gender}

onChange={(e)=>
setGender(
e.target.value
)
}

style={inputStyle}

>

<option style={{color:"black"}}>

Select Gender

</option>

<option style={{color:"black"}}>

Female

</option>

<option style={{color:"black"}}>

Male

</option>

<option style={{color:"black"}}>

Other

</option>

</select>



<select

value={bloodGroup}

onChange={(e)=>
setBloodGroup(
e.target.value
)
}

style={inputStyle}

>

<option style={{color:"black"}}>

Select Blood Group

</option>

<option style={{color:"black"}}>A+</option>
<option style={{color:"black"}}>A-</option>

<option style={{color:"black"}}>B+</option>
<option style={{color:"black"}}>B-</option>

<option style={{color:"black"}}>AB+</option>
<option style={{color:"black"}}>AB-</option>

<option style={{color:"black"}}>O+</option>
<option style={{color:"black"}}>O-</option>

</select>



<input
placeholder="Contact"
value={contact}
onChange={(e)=>setContact(e.target.value)}
style={inputStyle}
/>



<div

style={{

padding:"18px",

borderRadius:"20px",

marginTop:"15px",

background:
"rgba(255,255,255,.2)",

color:"white"

}}

>

Patient ID:

{patientID}

</div>



<button

onClick={proceed}

style={{

marginTop:"30px",

width:"100%",

padding:"22px",

fontSize:"22px",

border:"none",

borderRadius:"25px",

background:
"linear-gradient(90deg,#ff8a80,#ff1744)",

color:"white",

cursor:"pointer"

}}

>

Continue →

</button>

</div>

</div>

)

}


const inputStyle={

width:"100%",

padding:"18px",

marginTop:"15px",

border:"none",

borderRadius:"18px",

background:
"rgba(255,255,255,.25)",

color:"white",

fontSize:"16px",

outline:"none"

}

export default PatientInfo