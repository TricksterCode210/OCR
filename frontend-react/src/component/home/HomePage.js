import {useEffect, useState} from 'react'
import InputFields from "./InputFields";
import {createWorker} from "tesseract.js";

const HomePage = () => {

	const [imageData1, setImageData1] = useState()
	const [imageData2, setImageData2] = useState()
	const [imageData3, setImageData3] = useState()
	const [imageData4, setImageData4] = useState()

	const [ocr1, setOcr1] = useState('')
	const [ocr2, setOcr2] = useState('')
	const [ocr3, setOcr3] = useState('')
	const [ocr4, setOcr4] = useState('')

	const worker = createWorker()

	const convertImageToText = async (imageData, setOcr) => {
		if (!imageData) {
			return
		}
		await (await worker).loadLanguage("hun") // Ide kéne a language
		await (await worker).initialize("hun")
		const {
			data: {text}
		} = await (await worker).recognize(imageData, {rotateAuto: true})
		setOcr(text)
		await (await worker).terminate()
	}

	useEffect(()=>{
		convertImageToText(imageData1, setOcr1)
	}, [imageData1])

	useEffect(()=>{
		convertImageToText(imageData2, setOcr2)
	}, [imageData2])

	useEffect(()=>{
		convertImageToText(imageData3, setOcr3)
	}, [imageData3])

	useEffect(()=>{
		convertImageToText(imageData4, setOcr4)
	}, [imageData4])


	return (
		<div className={'container-fluid scanners'}>
			<div className={'row'}>
				<div className={'col-3'}>
					<p>Input gomb</p>
				</div>
				<div className={'col-3'}>
					<p>Kép</p>
				</div>
				<div className={'col-6'}>
					<p>OCR eredmény</p>
				</div>

			</div>
			<InputFields id={"elso"} ocr={ocr1} imageData={imageData1} setImageData={setImageData1}/>
			<InputFields id={"masodik"} ocr={ocr2} imageData={imageData2} setImageData={setImageData2}/>
			<InputFields id={"harmadik"} ocr={ocr3} imageData={imageData3} setImageData={setImageData3}/>
			<InputFields id={"negyedik"} ocr={ocr4} imageData={imageData4} setImageData={setImageData4}/>
		</div>
	)
}

export default HomePage