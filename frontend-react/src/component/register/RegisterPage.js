import {Link, useNavigate} from 'react-router-dom'
import {Form, Formik} from 'formik'
import {useState} from 'react'
import {Text, VStack} from '@chakra-ui/react'
import CustomInput from '../CustomInput'

const RegisterPage = () => {
	const[email, setEmail] = useState('');
	const[password, setPassword] = useState("");
	const[name, setName] = useState('');
	const[confPassword, setConfPassword] = useState('');
	const[registered, setRegistered] = useState(true);
	const navigator = useNavigate();

	const getIsValidForm = ({name, email, password, confPassword}) => {
		return (
			email &&
			name &&
			password.length >= 8 &&
			confPassword.length >= 8
		);
	};

	const isPasswordEquals = ({password, confPassword}) => {
		return (
			password === confPassword
		)
	}

	const handleSubmit = ({name, email, password}) => {
		const felhasznalo={name, email, password}
		console.log(felhasznalo)
		fetch("http://localhost:8080/register",
			{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(felhasznalo)
			})
			.then(res => res.json())
			.then((result) =>{
				console.log(result)
				if(result === true){
					navigator("/homePage")
				}
				else {
					setRegistered(false)
				}
			})
	};

	return (
		<div className={"authentication-forms"}>
			<h1>Regisztráció</h1>
			<Formik
				enableReinitialize
				initialValues={{name:'', email:'',password:'', confPassword:''}}
				onSubmit={(data) => {
					handleSubmit(data)
				}}
			>
				{({values, handleChange, handleBlur, handleSubmit}) => (
					<Form>
						<VStack>
							<Text className={'error-message'} hidden={registered}>Sikertelen regisztráció! <br/>Az email cím már foglalt</Text>
							<CustomInput
								label={"Neve: "}
								placeholder={"Példa Béla"}
								type={"text"}
								name={"name"}
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<CustomInput
								label={"Email: "}
								placeholder={"peldabela@gmail.com"}
								type={"email"}
								name={"email"}
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<CustomInput
								label={"Jelszó: "}
								placeholder={"Jelszó"}
								type={"password"}
								name={"password"}
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<CustomInput
								label={"Jelszó újra: "}
								placeholder={"Jelszó újra"}
								type={"password"}
								name={"confPassword"}
								value={values.confPassword}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Text className={'error-message'} hidden={isPasswordEquals(values)}>A két jelszó nem egyezik</Text>
							<button disabled={!getIsValidForm(values) || !isPasswordEquals(values)} className={"register-btn"} type="submit">Regisztráció</button>
							<Link to={"/"} className={"form-link"}>Itt tud bejelentkezni</Link>
						</VStack>
					</Form>
				)}

			</Formik>
		</div>
	)
}

export default RegisterPage;