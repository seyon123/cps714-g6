import React from "react";
import "./SocialSearchBar.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
function SocialSearchBar({ posts }) {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className="w-100 mt-3 searchBar position-relative">
			<input
				className="form-control"
				type="text"
				placeholder=" Search for a post..."
				value={searchTerm}
				onChange={(event) => {
					setSearchTerm(event.target.value);
				}}
			/>
			{searchTerm ? (
				<AiFillCloseCircle size={25} className="searchIcon d-flex align-items-center position-absolute" onClick={() => setSearchTerm("")} />
			) : (
				<FaSearch size={25} className="searchIcon d-flex align-items-center position-absolute" />
			)}
			<div className="resultsContainer mt-2 rounded">
				{posts
					.filter((val) => {
						if (searchTerm === "") {
							return "";
						} else if (val.description.toLowerCase().includes(searchTerm.toLowerCase()) || val.tags.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
							return val;
						}
						return null;
					})
					.map((val, key) => {
						return (
							<div key={key} className="resultItem d-flex align-content-center align-items-center">
								<img width="40px" className="resultImage m-1 rounded-1" src={val?.image} alt={val?.description} />
								<p>{val?.description}</p>
							</div>
						);
					})}
			</div>
		</div>
	);
}
export default SocialSearchBar;
