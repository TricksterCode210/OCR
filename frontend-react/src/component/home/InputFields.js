import {HStack} from '@chakra-ui/react'
import {Button} from 'primereact/button'
import {Dropdown} from 'primereact/dropdown'
import {useState} from 'react'

const InputFields = ({
	id,
	ocr,
	imageData,
	setImageData,
	setOcr
}) => {
	const [selectedOption, setSelectedOption] = useState()
	const options = [
		{name: 'Txt fájl', code: 'text/plain'},
		{name: 'Kép', code: 'image/*'}
	]

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

	function handleTextChange(e) {
		e.preventDefault();
		if(!e.target.files[0])
		{
			return
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target.result;
			setOcr(text)
			setImageData(null)
		};
		reader.readAsText(e.target.files[0]);
	}

	const deleteResults = () => {
		setImageData(null)
		setOcr('')
	}

	return (
		<div className="container-fluid mt-5 mb-5 border border-info rounded-4">
			<div className={'row'}>
				<HStack>
					<div className={'col-3'}>
						<Dropdown
							value={selectedOption}
							id={'option-selector'}
							onChange={(e => setSelectedOption(e.value))}
							options={options}
							optionLabel={'name'}
							placeholder={'Válassza ki a formátumot'}
							className={'w-full md:w-14rem'}
						/>
						<label htmlFor={`file_upload_${id}`} className={'custom-file-upload'} hidden={!selectedOption}>Töltse fel a fájlt</label>
						<input
							type="file"
							id={`file_upload_${id}`}
							onChange={(e) => {
								selectedOption?.name === 'Kép' ? handleImageChange(e) : handleTextChange(e)
							}}
							accept={selectedOption?.code}
						/>
						<Button label={'Törlés'} severity={'danger'} hidden={!ocr} className={'me-3'} onClick={e => deleteResults()}/>
					</div>
					<div className={'col-3'}>
						<img src={imageData} hidden={!imageData} height={'70%'} width={'70%'} alt="Kép"/>
					</div>
					<div className={'col-6'}>
						<pre className={'ocr-text'}>{ocr}</pre>
					</div>
				</HStack>
			</div>
		</div>
	)
}

export default InputFields