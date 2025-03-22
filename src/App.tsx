import Checkout from "./app/pages/Checkout";
import { Route, Routes } from "react-router-dom";
import MainPage from "./app/pages/MainPage";
import Layout from "./app/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path=":category" element={<MainPage />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
