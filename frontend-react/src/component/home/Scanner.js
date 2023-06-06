import {useEffect, useState} from 'react'
import {createWorker} from 'tesseract.js'
import {HStack} from '@chakra-ui/react'

const Scanner = ({
	id,
	ocr,
	setOcr
	//lanuage
}) => {
	const [imageData, setImageData] = useState(null)
	const worker = createWorker()

	const convertImageToText = async () => {
		if (!imageData) {
			return
		}
		await (await worker).loadLanguage("hun") // Ide kéne a language
		await (await worker).initialize("hun")
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
			setImageData(imageDataUri)
		}
		reader.readAsDataURL(file)
	}

	return (
		<div className="container-fluid mt-5 mb-5 border border-info rounded-4">
			<div className={'row'}>
				<HStack>
					<div className={'col-3 '}>
						<label htmlFor={`file_upload_${id}`} className={'custom-file-upload'}>Töltse fel a fájlt</label>
						<input
							type="file"
							id={`file_upload_${id}`}
							onChange={(e) => {handleImageChange(e)}}
							accept="image/*"
						/>
					</div>
					<div className={'col-3'}>
						<img src={imageData} hidden={!imageData} height={"100%"} width={"100%"} alt="Kép"/>
					</div>
					<div className={'col-6'}>
						<p className={"ocr-result"}>{ocr}</p>
					</div>
				</HStack>
			</div>
		</div>
	)
}

export default Scanner