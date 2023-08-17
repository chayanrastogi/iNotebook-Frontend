import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from 'react';


function App() {

  const [ alert, setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      mess:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    },2000);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;