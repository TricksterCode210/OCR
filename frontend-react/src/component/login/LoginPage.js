import {useState} from 'react'
import {Form, Formik} from 'formik'
import {Text, VStack} from '@chakra-ui/react'
import CustomInput from '../CustomInput'
import {Link, useNavigate} from 'react-router-dom'

const LoginPage = () => {
	const [loggedIn, setLoggedIn] = useState(true)
	const navigator = useNavigate()

	const getIsValidForm = ({email, password}) => {
		return email && password.length >= 8
	}

	const handleSubmit = ({email, password}) => {
		const felhasznalo = {email, password}
		fetch('http://localhost:8080/',
			{
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(felhasznalo)
			})
			.then(res => res.json())
			.then((result) => {
				if (result === true) {
					navigator('/homePage')
				} else {
					setLoggedIn(false)
				}
			})
	}

	return (
		<div className={'authentication-forms'}>
			<h1>Bejelentkezés</h1>
			<Formik
				enableReinitialize
				initialValues={{email: '', password: ''}}
				onSubmit={(data) => {
					handleSubmit(data)
				}}
			>
				{({values, handleChange, handleBlur, handleSubmit}) => (
					<Form>
						<VStack>
							<Text className={'error-message'} hidden={loggedIn}>Sikertelen bejelentkezés! <br/>Hibás email vagy jelszó</Text>
							<CustomInput
								label={'Email: '}
								placeholder={'peldabela@gmail.com'}
								type={'email'}
								name={'email'}
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<CustomInput
								label={'Jelszó: '}
								placeholder={'Jelszó'}
								type={'password'}
								name={'password'}
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<button disabled={!getIsValidForm(values)} className={'login-btn'} type="submit">Bejelentkezés</button>
							<Link to={'/register'} className={'form-link'}>Itt tud regisztrálni</Link>
						</VStack>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default LoginPage