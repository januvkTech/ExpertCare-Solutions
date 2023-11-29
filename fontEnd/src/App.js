import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Chat } from './pages/Chat'
import {SetAvatar} from './components/SetAvatar'
import { CompanySelection } from './components/CompanySelection'
import {EmailVerification} from './pages/EmailVerification'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/setAvatar" element={<SetAvatar/>}/>
        <Route path="/company" element={<CompanySelection/>}/>
        <Route path="/verify/:id/:token" element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  )
}
