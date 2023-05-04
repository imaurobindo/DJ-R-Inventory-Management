import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./HomePage";

const Dashboard = () => {
	const [message, setMessage] = useState('');
	useEffect(() => {
		if (localStorage.getItem('access_token') === null) {
			window.location.href = '/login'
		}
		else {
			(async () => {
				try {
					const { data } = await axios.get(
						'http://localhost:8000/dashboard/', {
						headers: {
							'Content-Type': 'application/json'
						}
					}
					);
					setMessage(data.message);
				} catch (e) {
					console.log('not auth')
				}
			})()
		};
	}, []);
	return (
		<div>
			This is Dashboard<br />
			<HomePage />

		</div>




	);

}

export default Dashboard