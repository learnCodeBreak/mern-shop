import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { addToCart, removeFromCart } from "../redux/action";

const Cart = () => {
	const state = useSelector((state) => state.handleCart);
    console.log("Cart state ",state)

	const dispatch = useDispatch();
	const addProductToCart = (product) => {
		dispatch(addToCart(product));
	};
	const removeProductFromCart = (product) => {
		dispatch(removeFromCart(product));
	};

	const [cartProducts, setCartProducts] = useState([]);
	const [orderProducts, setOrderProducts] = useState([]);
	const [totalOrderValue, setTotalOrderValue] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setCartProducts(state);

		const prepareOrderProducts = () => {
			let op = [];
			if (state.length === 0) op = [];
			else
				op = state.map((x) => {
					return {
						id: x.id,
						itemName: x.title,
						quantity: x.qty,
						price: x.price,
						total: x.qty * x.price,
					};
				});
			setOrderProducts(op);
            getTotalOrderValue();
		setLoading(false);
		};
		const getTotalOrderValue = async () => {
			console.log("OP ", orderProducts);
			let sum = 0;
			if (orderProducts.length === 0) sum = 0;
			else sum = orderProducts.reduce((acc, product) => acc + product.total, 0);
			setTotalOrderValue(sum);
		};

		prepareOrderProducts();
		

		// const getTotalOrderValue = async () => {
		// 	return new Promise((resolve, reject) => {
		// 		try {
		// 			console.log("OP ", orderProducts);
		// 			let sum = 0;
		// 			if (orderProducts.length === 0) sum = 0;
		// 			else
		// 				sum = orderProducts.reduce(
		// 					(acc, product) => acc + product.total,
		// 					0
		// 				);
		// 			setTotalOrderValue(sum);
		// 			resolve("Total sum got setteled");
		// 		} catch (error) {
		// 			reject("Something wrong while preparing total sum " + error);
		// 		}
		// 	});
		// };

		// .then((data) => {
		// 	console.log("1. " + data);
		// 	getTotalOrderValue().then((data2) => {
		// 		console.log("2. " + data2);
		// 		setLoading(false);
		// 	});
		// })
		// .catch((error) => {
		// 	console.log("Error: ", error);
		// 	setOrderProducts([]);
		// 	setTotalOrderValue(0);
		// 	setLoading(false);
		// });
	}, [state]);

	const ShowCartProduct = () => {
		return (
			<>
				{cartProducts.map((product) => {
					return (
						<div key={product.id} className="d-flex flex-row align-item-center">
							<div className="mb-2 w-25">
								<img
									src={product.thumbnail}
									className="rounded mx-auto d-block img-thumbnail"
									alt={product.title}
								/>
							</div>
							<div className="p-2 w-50 text-start">
								<p className="fw-bold">{product.title}</p>
								<div className="">
									<button
										className="btn btn-sm btn-outline-dark me-3"
										onClick={() => addProductToCart(product)}>
										<i className="fa fa-plus"></i>
									</button>
									<button
										className="btn btn-sm btn-outline-dark"
										onClick={() => removeProductFromCart(product)}>
										<i className="fa fa-minus"></i>
									</button>
								</div>
							</div>
							<div className="p-2 w-25 text-end">
								<p className="fw-bold">Qty.</p>
								<p className="">{product.qty}</p>
							</div>
						</div>
					);
				})}
			</>
		);
	};

	const OrderSummary = () => {
		return (
			<>
				{orderProducts.map((product) => {
					return (
						<div key={product.id} className="d-flex flex-row">
							<div className="p-2 w-50 text-start">
								<p className="fw-bold my-0 py-0">{product.itemName}</p>
								<p className="my-0 py-0">
									{product.quantity}x{product.price}
								</p>
							</div>
							<div className="p-2 w-50 text-end">
								<p className="fw-bold">{product.total}</p>
							</div>
						</div>
					);
				})}
			</>
		);
	};

	const LoadingOne = () => {
		return (
			<>
				<div className="d-flex flex-row mb-2">
					<Skeleton height={100} width={100} style={{ marginRight: 8 }} />
					<Skeleton height={100} width={500} />
				</div>
				<div className="d-flex flex-row">
					<Skeleton height={100} width={100} style={{ marginRight: 8 }} />
					<Skeleton height={100} width={500} />
				</div>
			</>
		);
	};
	const LoadingTwo = () => {
		return (
			<>
				<div className="d-flex flex-row my-2">
					<Skeleton height={100} width={200} />
				</div>
			</>
		);
	};

	return (
		<div className="container mt-4 px-4 shadow-none p-3 mb-5 bg-light rounded">
			<div className="d-flex flex-row">
				{/* shopping cart */}
				<div className="card w-75 p-2 me-1">
					<h5 className="card-header">Shopping cart</h5>
					<div className="card-body">
						{loading ? (
							<LoadingOne />
						) : cartProducts.length > 0 ? (
							<ShowCartProduct />
						) : (
							<div className="text-center">
								<h4 className="text-dark">Your cart is empty</h4>
								<NavLink to="/products" className="btn btn-dark ms-2 px-3 py-2">
									Go to Products
								</NavLink>
							</div>
						)}
					</div>
				</div>

				{/* order summary */}
				<div className="card w-25 p-2 ms-1">
					<h5 className="card-header text-center">Order Summary</h5>
					<div className="card-body m-0 p-0">
						{loading ? (
							<LoadingTwo />
						) : orderProducts.length > 0 ? (
							<OrderSummary />
						) : (
							<p className="lead text-center text-dark mt-3">
								Please add products to your cart
							</p>
						)}
						{loading ? (
							<LoadingTwo />
						) : orderProducts.length > 0 ? (
							<div className="d-flex flex-row bg-dark text-light mt-3 rounded">
								<div className="p-2 w-50 text-start">
									<p className="fw-bold">Total</p>
								</div>
								<div className="p-2 w-50 text-end">
									<p className="fw-bold">{totalOrderValue}</p>
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
