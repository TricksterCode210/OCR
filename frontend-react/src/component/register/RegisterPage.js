import {Link} from 'react-router-dom'

const RegisterPage = () => {
	return (
		<>
			<h1>Regisztráció</h1>
			<Link to={"/"} element={<RegisterPage/>}>Teszt</Link>
		</>
	)
}

export default RegisterPage