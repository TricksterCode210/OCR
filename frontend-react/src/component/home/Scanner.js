import {useEffect, useState} from 'react'
import {createWorker} from 'tesseract.js'
import {HStack} from '@chakra-ui/react'

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
		<div className="container">
			<div className={'row'}>
				<HStack>
					<div className={'col-3'}>
						<label for={'file_upload'} className={'custom-file-upload'}>Töltse fel a fájlt</label>
						<input
							type="file"
							id={'file_upload'}
							onChange={handleImageChange}
							accept="image/*"
						/>
					</div>
					<div classname={'col-3'}>
						<img src={imageData} alt="Kép" height={'200px'} width={'160px'}/>
					</div>
					<div className={'col-6'}>
						<p>{ocr}</p>
					</div>
				</HStack>
			</div>
		</div>
	)
}

export default Scanner