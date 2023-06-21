import {useEffect, useState} from 'react'
import InputFields from './InputFields'
import Tesseract from 'tesseract.js'
import {Dropdown} from 'primereact/dropdown'
import {Button} from 'primereact/button'
import {InputTextarea} from 'primereact/inputtextarea'

const HomePage = () => {

	const [imageData1, setImageData1] = useState()
	const [imageData2, setImageData2] = useState()
	const [imageData3, setImageData3] = useState()
	const [imageData4, setImageData4] = useState()

	const [ocr1, setOcr1] = useState('')
	const [ocr2, setOcr2] = useState('')
	const [ocr3, setOcr3] = useState('')
	const [ocr4, setOcr4] = useState('')

	const [ocrResult, setOcrResult] = useState('')

	const [selectedLanguage, setSelectedLanguage] = useState()

	const languages = [
		{name: 'Magyar', code: 'hun'},
		{name: 'Angol', code: 'eng'}
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
		e.preventDefault();
		const list = [ocr1, ocr2, ocr3, ocr4]
		await fetch('http://localhost:8080/homePage', {
			method: "POST",
			headers:{"Content-Type":"application/json"},
			body: JSON.stringify(list)
		}).then((response) => {
			console.log(response)
			setOcrResult(response.toString)
		})
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
					<InputFields id={'elso'} ocr={ocr1} imageData={imageData1} setImageData={setImageData1} setOcr={setOcr1}/>
					<InputFields id={'masodik'} ocr={ocr2} imageData={imageData2} setImageData={setImageData2} setOcr={setOcr2}/>
					<InputFields id={'harmadik'} ocr={ocr3} imageData={imageData3} setImageData={setImageData3} setOcr={setOcr3}/>
					<InputFields id={'negyedik'} ocr={ocr4} imageData={imageData4} setImageData={setImageData4} setOcr={setOcr4}/>
					<div className={"result-block"}>
						<Button disabled={!ocr1 || !ocr2 || !ocr3 || !ocr4} label={"OCR eredmény készítés"} id={"ocr-button"} onClick={e => makeResult(e)}/>
					</div>
					<div className={"result-block"}>
						<InputTextarea value={ocrResult} autoResize readOnly id={"ocr-result"}/>
					</div>
				</>
				:
				<p className={'text-center'} style={{color: '#61dafb'}}>Kérem válasszon nyelvet először!</p>}
		</div>
	)
}

export default HomePage