import {useEffect, useState} from 'react'
import {createWorker} from 'tesseract.js'

const Scanner = () => {
	const [ocr, setOcr] = useState('')
	const [imageData, setImageData] = useState(null)
	const worker = createWorker({
		logger: (m) => {
			console.log(m)
		}
	})
	const convertImageToText = async () => {
		if (!imageData) {
			return
		}
		await (await worker).load()
		await (await worker).loadLanguage('hun')
		await (await worker).initialize('hun')
		const {
			data: {text}
		} = await (await worker).recognize(imageData, {rotateAuto: true})
		setOcr(text)
	}

	useEffect(() => {
		convertImageToText()
	}, [imageData])

	function handleImageChange(e) {
		const file = e.target.files[0]
		if (!file) {
			return
		}
		const reader = new FileReader()
		reader.onloadend = () => {
			const imageDataUri = reader.result
			console.log({imageDataUri})
			setImageData(imageDataUri)
		}
		reader.readAsDataURL(file)
	}

	return (
		<div className="App">
			<div>
				<input
					type="file"
					name=""
					id="input_image_"
					onChange={handleImageChange}
					accept="image/*"
				/>
			</div>
			<div className="display-flex">
				<img src={imageData} alt="" srcset=""/>
				<p>{ocr}</p>
			</div>
		</div>
	);
}

export default Scanner;