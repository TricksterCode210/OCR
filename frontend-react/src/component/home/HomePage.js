import {useEffect, useState} from 'react'
import InputFields from './InputFields'
import Tesseract from 'tesseract.js'
import {Dropdown} from 'primereact/dropdown'
import {Button} from 'primereact/button'
import {InputTextarea} from 'primereact/inputtextarea'
import {Form, Formik} from 'formik'
import CustomInput from '../CustomInput'
import {VStack} from '@chakra-ui/react'
import ChooseWord from './ChooseWord'
import {Checkbox} from 'primereact/checkbox'

const HomePage = () => {

	const [imageData1, setImageData1] = useState()
	const [imageData2, setImageData2] = useState()
	const [imageData3, setImageData3] = useState()
	const [imageData4, setImageData4] = useState()

	const [ocr1, setOcr1] = useState(null)
	const [ocr2, setOcr2] = useState(null)
	const [ocr3, setOcr3] = useState(null)
	const [ocr4, setOcr4] = useState(null)

	const [blockVisible, setBlockVisible] = useState(false)

	const [finish, setFinish] = useState(false)

	const [ocrData, setOcrData] = useState()

	const [selectedLanguage, setSelectedLanguage] = useState()

	const [errorMessage, setErrorMessage] = useState()

	const [counter, setCounter] = useState(0)

	const languages = [
		{name: 'Magyar', code: 'hun'},
		{name: 'Angol', code: 'eng'},
		{name: 'Német', code: 'deu'},
		{name: 'Francia', code: 'fra'}

	]

	const convertImageToText = async (imageData, setOcr) => {
		if (!imageData) {
			return
		}
		Tesseract.recognize(imageData, selectedLanguage.code)
			.then(result => {
				setOcr(result.data.text)
			})
			.catch(err => console.error(err))
	}

	const makeResult = async (e) => {
		setCounter(0)
		e.preventDefault()
		const list = [ocr1, ocr2];
		if(ocr3 !== null)
		{
			list.push(ocr3)
		}
		if(ocr4 !== null)
		{
			list.push(ocr4)
		}
		await fetch('http://localhost:8080/homePage', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(list)
		}).then(result => result.json())
			.then((result) => {
				console.log(result)
				setOcrData(result)
				setFinish(false)
			})
	}

	const handleSubmit = (ocrData) => {
		fetch(`http://localhost:8080/homePage/${ocrData.projectName}/`, {
			method: 'GET'
		}).then((res) => res.json())
			.then(async (result) => {
				if (result === true) {
					await setOcrData(ocrResult => ({
						...ocrResult,
						possibleValues: {
							...ocrResult.possibleValues.splice(0, counter)
						}
					}))
					fetch('http://localhost:8080/homePage/save', {
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify(ocrData)
					})
						.then(res => res.json())
						.then((result) => {
							if (result === true) {
								setOcrData(null)
								setOcr1('')
								setOcr2('')
								setOcr3('')
								setOcr4('')
								setImageData1()
								setImageData2()
								setImageData3()
								setImageData4()
							} else {
								setErrorMessage('Váratlan hiba történt')

							}
						})
				} else {
					setErrorMessage('Ez a név már foglalt')
				}
			})
	}

	const deleteResult = () => {
		setOcrData(null)
		setCounter(0)
	}

	useEffect(() => {
		convertImageToText(imageData1, setOcr1)
	}, [imageData1, selectedLanguage])

	useEffect(() => {
		convertImageToText(imageData2, setOcr2)
	}, [imageData2, selectedLanguage])

	useEffect(() => {
		convertImageToText(imageData3, setOcr3)
	}, [imageData3, selectedLanguage])

	useEffect(() => {
		convertImageToText(imageData4, setOcr4)
	}, [imageData4, selectedLanguage])

	const changeOcrResult = (e) => {
		setOcrData(ocrResult => ({
			...ocrResult,
			ocrResultFile: {
				...ocrResult.ocrResultFile,
				text: e.target.value
			}
		}))
	}

	const onVisibilityChange = (e) => {
		setBlockVisible(e.checked)
	}

	return (
		<div className={'container-fluid scanners'}>
			<div className={'row'}>
				<div className={'col-3'}>
					<p>Input gomb</p>
				</div>
				<div className={'col-3'}>
					<p>Kép</p>
				</div>
				<div className={'col-3'}>
					<p>OCR eredmény</p>
				</div>
				<div className={'col-3'}>
					<Dropdown
						value={selectedLanguage}
						id={'language-selector'}
						onChange={(e => setSelectedLanguage(e.value))}
						options={languages}
						optionLabel={'name'}
						placeholder={'Válasszon nyelvet'}
						className={'w-full md:w-14rem'}
					/>
				</div>
			</div>
			{selectedLanguage !== undefined ?
				<>
					<div hidden={blockVisible}>
						<InputFields id={'elso'} ocr={ocr1} imageData={imageData1} setImageData={setImageData1} setOcr={setOcr1}/>
						<InputFields id={'masodik'} ocr={ocr2} imageData={imageData2} setImageData={setImageData2} setOcr={setOcr2}/>
						<InputFields id={'harmadik'} ocr={ocr3} imageData={imageData3} setImageData={setImageData3} setOcr={setOcr3}/>
						<InputFields id={'negyedik'} ocr={ocr4} imageData={imageData4} setImageData={setImageData4} setOcr={setOcr4}/>
						<div className={'result-block'}>
							<Button disabled={!ocr1 || (!ocr2 && !ocr3 && !ocr4)} label={'OCR eredmény készítés'} id={'ocr-button'} onClick={e => makeResult(e)}/>
						</div>
					</div>
					<div className={'result-block'}>
						<p>Eltüntetné a módosító felületet?</p>
						<Checkbox type={'checkbox'} id={'visibility-check'} name={'visibility'} style={{margin: '1rem', position:'center'}} checked={blockVisible} onChange={onVisibilityChange}/>
					</div>
					<div className={'result-block'} hidden={ocrData === null}>
						<InputTextarea
							value={ocrData?.ocrResultFile?.text}
							autoResize={ocrData?.ocrResultFile?.text}
							readOnly={ocrData?.possibleValues?.length > 0 && !finish}
							id={'ocr-result'}
							onChange={changeOcrResult}/>
					</div>
					{
						(ocrData) ?
							<div>
								<div className={'result-block'}>
									{(ocrData.possibleValues?.length > 0 && !finish) ?
										<ChooseWord
											setOcrResult={setOcrData}
											ocrResult={ocrData}
											setFinish={setFinish}
											counter={counter}
											setCounter={setCounter}
										/> : <></>
									}
								</div>
								<div className={'result-block mt-5'}>
									<Formik
										enableReinitialize
										initialValues={ocrData}
										onSubmit={(data) => {
											handleSubmit(data)
										}}
									>
										{({values, handleChange, handleBlur}) => (
											<Form>
												<VStack style={{border: 'solid 1px white', borderRadius: '15px', paddingLeft: '2rem'}}>
													{errorMessage ? <>{errorMessage}</> : <></>}
													<CustomInput
														className={'m-1'}
														label={'Projekt név: '}
														type={'text'}
														name={'projectName'}
														value={values.projectName}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
													<CustomInput
														className={'m-1'}
														label={'Fájl neve: '}
														type={'text'}
														name={'ocrResultFile.name'}
														value={values.ocrResultFile?.name}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
													<button disabled={values.projectName === null || values.ocrResultFile?.name === null} className={'register-btn'} type="submit">Mentés</button>
													<Button className={'mb-3'} label={'Eldobás'} onClick={deleteResult}/>
												</VStack>
											</Form>
										)}
									</Formik>
								</div>
							</div>
							: <></>
					}
				</>
				:
				<p className={'text-center'} style={{color: '#61dafb'}}>Kérem válasszon nyelvet először!</p>}
		</div>
	)
}

export default HomePage