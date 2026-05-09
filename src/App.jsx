import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Result from "./pages/Result"
import PublicAudit from "./pages/PublicAudit"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Result />} />
        <Route path="/audit/:slug" element={<PublicAudit />} />
      </Routes>
    </BrowserRouter>
  )
}