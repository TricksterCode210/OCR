import {useEffect, useState} from 'react'
import {InputTextarea} from 'primereact/inputtextarea'
import {Button} from 'primereact/button'
import {useNavigate} from 'react-router-dom'
import ChooseWord from '../home/ChooseWord'
import {Form, Formik} from 'formik'
import {VStack} from '@chakra-ui/react'
import CustomInput from '../CustomInput'

const FinishResult = () => {
	const url = window.location.pathname.split('/')[2]
	const [ocrResult, setOcrResult] = useState(null)
	const [finish, setFinish] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const navigate = useNavigate()

	const [counter, setCounter] = useState(0)

	const handleSubmit = async (ocrData) => {
		await setOcrResult(ocrResult => ({
			...ocrResult,
			possibleValues:{
				...ocrResult.possibleValues.splice(0, counter)
			}
		}))
		fetch('http://localhost:8080/results/edit', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(ocrData)
		})
			.then(res => res.json())
			.then((result) => {
				if (result === true) {
					navigate("/results")
				} else {
					setErrorMessage('Váratlan hiba történt')
				}
			})
	}

	useEffect(() => {
		fetch(`http://localhost:8080/results/get/${url}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then((result) => {
					console.log(result)
					setOcrResult(result)
				}
			)
	}, [])

	return (
		<div>
			<InputTextarea
				value={ocrResult?.ocrResultFile?.text}
				autoResize={ocrResult?.ocrResultFile?.text}
				readOnly={ocrResult?.possibleValues?.length > 0 && !finish}
				id={'ocr-result'}/>
			<div className={'result-block'}>
				{(ocrResult?.possibleValues?.length > 0 && !finish) ?
					<ChooseWord
						setOcrResult={setOcrResult}
						ocrResult={ocrResult}
						setFinish={setFinish}
						counter={counter}
						setCounter={setCounter}
					/> : <></>
				}
			</div>
			<div className={'result-block'}>
				<Formik
					enableReinitialize
					initialValues={ocrResult}
					onSubmit={(data) => {
						handleSubmit(data)
					}}
				>
					{({values, handleChange, handleBlur, handleSubmit}) => (
						<Form>
							<VStack>
								{errorMessage ? <>{errorMessage}</> : <></>}
								<CustomInput
									className={'m-1'}
									label={'Projekt név: '}
									type={'text'}
									name={'projectName'}
									readOnly
									value={values?.projectName}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<CustomInput
									className={'m-1'}
									label={'Fájl neve: '}
									type={'text'}
									name={'ocrResultFile.name'}
									value={values?.ocrResultFile?.name}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<button disabled={values?.projectName === '' || values?.ocrResultFile?.name === ''} className={'register-btn'} type="submit">Mentés</button>
								<Button label={'Vissza'} severity={'info'} onClick={() => {navigate('/results')}}/>
							</VStack>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default FinishResult