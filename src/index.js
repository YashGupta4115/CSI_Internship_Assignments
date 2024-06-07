import App from "./App"
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

const Index = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

}

const root = createRoot(document.getElementById('root'));
root.render(<Index />)