// import { Route, Routes } from "react-router-dom";
// import Landing from "./Landing";
// import { Login, Signup, Home } from "./Pages";
// import  from "./pages/Home";

///////////////////////////////////
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";

function App() {
	return (
		// <div className="App">
		//   <Routes>
		//     <Route path="/" element={<Landing />} />
		//     <Route path="/dashboard" element={<Home />} />
		//     <Route path="/login" element={<Login />} />
		//     <Route path="/signup" element={<Signup />} />
		//   </Routes>
		// </div>
		<>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home/>} />
				<Route exact path="/products" element={<Products/>} />
				<Route exact path="/products/:id" element={<Product/>} />
				<Route exact path="/cart" element={<Cart/>} />
			</Routes>
		</>
	);
}

export default App;
