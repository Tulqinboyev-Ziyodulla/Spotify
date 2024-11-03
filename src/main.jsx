import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { CodeContext } from './context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CodeContext>
            <App />
        </CodeContext>
    </BrowserRouter>
)
