import { BrowserRouter,Routes,Route } from "react-router-dom";

import PatientInfo from "./pages/PatientInfo";
import Home from "./pages/Home";
import Report from "./pages/Report";

function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<PatientInfo/>}
/>

<Route
path="/upload"
element={<Home/>}
/>

<Route
path="/report"
element={<Report/>}
/>

</Routes>

</BrowserRouter>

)

}

export default App