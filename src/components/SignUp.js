import React, { useState, useEffect } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";

function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		document.title = `Sign Up | FitIn`;
	}, []);

	return (
		<div className="formCenter">
			<form onSubmit={""} className="formFields">
				<div className="formField">
					<label className="formFieldLabel" htmlFor="name">
						Full Name
					</label>
					<input type="text" id="name" className="formFieldInput" placeholder="Enter your full name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>
				<div className="formField">
					<label className="formFieldLabel" htmlFor="email">
						E-Mail Address
					</label>
					<input type="email" id="email" className="formFieldInput" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="formField">
					<label className="formFieldLabel" htmlFor="password">
						Password
					</label>
					<input type="password" id="password" className="formFieldInput" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>

				<div className="formField">
					<button className="formFieldButton">Sign Up</button>
					<br />
					<label className="formFieldCheckboxLabel">
						By signing up, you agree to the
						<a href="null" className="formFieldTermsLink">
							Terms of Service
						</a>
					</label>
					<div className="formAuthText">
						Already have an account?{" "}
						<Link to="/login" className="formFieldLink">
							Sign In
						</Link>
					</div>
				</div>

				<div className="socialMediaButtons">
					<div className="googleButton">
						<GoogleLoginButton onClick={() => alert("Hello")} />
					</div>
				</div>
			</form>
		</div>
	);
}

export default SignUp;
