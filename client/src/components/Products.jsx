import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const Products = () => {
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState(data);
	const [loading, setLoading] = useState(false);
	let componentMounted = true;

	useEffect(() => {
		const getProducts = async () => {
			setLoading(true);
			const response = await fetch(
				"https://dummyjson.com/products?skip=0&limit=100"
			);
			if (componentMounted) {
				let responseJson = await response.clone().json();
				let Products = responseJson.products;
				let filteredProducts = [...Products];
				setData(Products);
				setFilter(filteredProducts);
				setLoading(false);
			}

			return () => {
				componentMounted = false;
			};
		};

		getProducts();
	}, []);

	const Loading = () => {
		return (
			<>
				<div className="col-md-3">
					<Skeleton height={350} />
				</div>
				<div className="col-md-3">
					<Skeleton height={350} />
				</div>
				<div className="col-md-3">
					<Skeleton height={350} />
				</div>
				<div className="col-md-3">
					<Skeleton height={350} />
				</div>
			</>
		);
	};

	const filterProduct = (cat) => {
		let updatedList = data.filter((p) => {
			switch (cat) {
				case "men":
					if (
						["mens-shirts", "mens-shoes", "mens-watches"].includes(p.category)
					) {
						return p;
					}
					break;
				case "women":
					if (
						[
							"tops",
							"womens-dresses",
							"womens-shoes",
							"womens-watches",
							"womens-bags",
							"womens-jewellery",
							"sunglasses",
						].includes(p.category)
					) {
						return p;
					}

					break;
				case "electronics":
					if (["smartphones", "laptops", "lighting"].includes(p.category)) {
						return p;
					}
					break;
				case "groceries":
					if (["groceries"].includes(p.category)) {
						return p;
					}
					break;
				case "automotive":
					if (["automotive", "motorcycle"].includes(p.category)) {
						return p;
					}
					break;
				case "home-decor":
					if (["home-decoration", "furniture"].includes(p.category)) {
						return p;
					}
					break;
				case "skincare":
					if (["fragrances", "skincare"].includes(p.category)) {
						return p;
					}
					break;
				default:
					return p;
					break;
			}
		});
		setFilter(updatedList);
	};

	const ShowProducts = () => {
		return (
			<>
				<div className="buttons d-flex justify-content-center mb-5 pb-5">
					<button
						className="btn btn-outline-dark me-2"
						onClick={() => setFilter(data)}>
						All
					</button>
					<button
						className="btn btn-outline-dark me-2"
						onClick={() => filterProduct("men")}>
						Men
					</button>
					<button
						className="btn btn-outline-dark me-2"
						onClick={() => filterProduct("women")}>
						Women
					</button>
					<button
						className="btn btn-outline-dark me-2"
						onClick={() => filterProduct("electronics")}>
						Electronics
					</button>
					<button
						className="btn btn-outline-dark me-2"
						onClick={() => {
							filterProduct("groceries");
						}}>
						Groceries
					</button>
					<button
						className="btn btn-outline-dark me-2"
						onClick={() => {
							filterProduct("automotive");
						}}>
						Automotive
					</button>
					<button
						className="btn btn-outline-dark me-2"
						onClick={() => {
							filterProduct("home-decor");
						}}>
						Home Decor
					</button>
					<button
						className="btn btn-outline-dark me-2"
						onClick={() => {
							filterProduct("skincare");
						}}>
						Skincare
					</button>
				</div>
				{filter.length > 0 ? (
					filter.map((product) => {
						return (
							<div className="col-md-4 mb-4" key={product.id}>
								<div className="card h-100 text-center p-4">
									<img
										src={product.thumbnail}
										className="card-img-top"
										alt={product.title}
										height="250px"
									/>
									<div className="card-body">
										<h5 className="card-title mb-0">{product.title}</h5>
										<p className="card-text lead fw-bold">
											Price {product.price} Rs.
										</p>
										<p className="card-text lead text-danger">
											discount {product.discountPercentage} %
										</p>
										<NavLink
											to={`/products/${product.id}`}
											className="btn btn-outline-dark">
											Buy Now
										</NavLink>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className="col-md-12 mb-4">
						<p className="card-text lead text-primary">
							Opps! No product available.
						</p>
					</div>
				)}
			</>
		);
	};

	return (
		<div>
			<div className="container my-5 py-5">
				<div className="row">
					<div className="col-12 mb-5">
						<h1 className="display-6 fw-bolder text-center">Latest Products</h1>
						<hr />
					</div>
				</div>
				<div className="row justify-content-center">
					{loading ? <Loading /> : <ShowProducts />}
				</div>
			</div>
		</div>
	);
};

export default Products;
