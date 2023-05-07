import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./HomePage";
import UserProfile from "./UserProfile";
import AdminProfile from "./AdminProfile";
import Dashboard from "../pages/Dashboard";

const AdminDashboard = () => {
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
			<br />
			<AdminProfile />
			<Dashboard />

			
			
			

		</div>




	);

}

export default AdminDashboard;