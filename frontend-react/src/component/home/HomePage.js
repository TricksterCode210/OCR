import {useEffect, useState} from 'react'
import InputFields from './InputFields'
import Tesseract from 'tesseract.js'
import {Dropdown} from 'primereact/dropdown'

const HomePage = () => {

	const [imageData1, setImageData1] = useState()
	const [imageData2, setImageData2] = useState()
	const [imageData3, setImageData3] = useState()
	const [imageData4, setImageData4] = useState()

	const [ocr1, setOcr1] = useState('')
	const [ocr2, setOcr2] = useState('')
	const [ocr3, setOcr3] = useState('')
	const [ocr4, setOcr4] = useState('')

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
						onChange={(e => setSelectedLanguage(e.value))}
						options={languages}
						optionLabel={'name'}
						placeholder={'Válasszon nyelvet'}
						className={'w-full md:w-14rem'}
					/>
				</div>
			</div>
			{{selectedLanguage} ? <>
				<InputFields id={'elso'} ocr={ocr1} imageData={imageData1} setImageData={setImageData1}/>
				<InputFields id={'masodik'} ocr={ocr2} imageData={imageData2} setImageData={setImageData2}/>
				<InputFields id={'harmadik'} ocr={ocr3} imageData={imageData3} setImageData={setImageData3}/>
				<InputFields id={'negyedik'} ocr={ocr4} imageData={imageData4} setImageData={setImageData4}/>
			</> : <></>}
		</div>
	)
}

export default HomePage