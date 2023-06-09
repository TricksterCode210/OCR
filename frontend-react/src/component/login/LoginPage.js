import {Link} from 'react-router-dom'
import RegisterPage from '../register/RegisterPage'

const LoginPage = () => {
	return (
		<>
			<h1>Bejelentkezés</h1>
			<Link to={"/register"} element={<RegisterPage/>}>Teszt</Link>
		</>
	)
}

export default LoginPage