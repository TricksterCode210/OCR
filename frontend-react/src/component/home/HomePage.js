import Scanner from './Scanner'
import {useState} from 'react'
import {Dropdown} from 'primereact/dropdown'

const HomePage = () => {
	// const [selectedLanguage, setSelectedLanguage] = useState()
	// const languages = [
	// 	{name: 'Magyar', code: 'hun'},
	// 	{name: 'Angol', code: 'eng'}
	// ]

	const [ocr1, setOcr1] = useState('')
	const [ocr2, setOcr2] = useState('')
	const [ocr3, setOcr3] = useState('')
	const [ocr4, setOcr4] = useState('')

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
				{/*<div className={'col-3'}>*/}
				{/*	<label htmlFor={'language_selector'}></label>*/}
				{/*	<Dropdown*/}
				{/*		value={selectedLanguage}*/}
				{/*		id={'language_selector'}*/}
				{/*		onChange={(e) => setSelectedLanguage(e.value)}*/}
				{/*		options={languages}*/}
				{/*		optionLabel={'name'}*/}
				{/*		optionValue={'code'}*/}
				{/*		placeholder={'Válasszon nyelvet'}*/}
				{/*		className={''}*/}
				{/*		readOnly={!selectedLanguage}*/}
				{/*	/>*/}
				{/*</div>*/}
			</div>
			{/*<div hidden={!selectedLanguage}>*/}
				<Scanner id={'elso'} ocr={ocr1} setOcr={setOcr1} />
				<Scanner id={'masodik'} ocr={ocr2} setOcr={setOcr2}/>
				<Scanner id={'harmadik'} ocr={ocr3} setOcr={setOcr3}/>
				<Scanner id={'negyedik'} ocr={ocr4} setOcr={setOcr4}/>
			{/*</div>*/}
		</div>
	)
}

export default HomePage