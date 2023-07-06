import {useEffect, useState} from 'react'

const ChooseWord = ({
	setOcrResult,
	ocrResult,
	setFinish
}) => {
	const [word1, setWord1] = useState()
	const [word2, setWord2] = useState()
	const [word3, setWord3] = useState()
	const [word4, setWord4] = useState()

	const handleClick = (word) => {
		setOcrResult(ocrResult => ({
			...ocrResult,
			ocrResultFile: {
				...ocrResult.ocrResultFile,
				text: ocrResult.ocrResultFile.text.replace('_____', word)
			},
			possibleValues: ocrResult.possibleValues.splice(0, 1)
		}))
		if (ocrResult.possibleValues.length < 1) {
			setFinish(true)
		}
		setWords()
	}

	const setWords = () => {
		if(ocrResult.possibleValues.length > 0) {
			setWord1(ocrResult.possibleValues[0].possibleWords.split(', ')[0])
			setWord2(ocrResult.possibleValues[0].possibleWords.split(', ')[1])
			setWord3(ocrResult.possibleValues[0].possibleWords.split(', ')[2])
			setWord4(ocrResult.possibleValues[0].possibleWords.split(', ')[3])
		}
	}

	useEffect(() => {
		setWords()
	}, [])

	return <>
		<button id={'number_1'} className={'choose-btn'} onClick={() => handleClick(word1)}> {word1}</button>
		{word1 !== word2 && word2 !== undefined ?
			<button id={'number_2'} className={'choose-btn'} onClick={() => handleClick(word2)}>{word2}</button> : <></>
		}
		{word1 !== word3 && word2 !== word3 && word3 !== undefined ?
			<button id={'number_3'} className={'choose-btn'} onClick={() => handleClick(word3)}>{word3}</button> : <></>
		}
		{word1 !== word4 && word2 !== word4 && word3 !== word4 ?
			<button id={'number_4'} className={'choose-btn'} onClick={() => handleClick(word4)}>{word4}</button> : <></>
		}
	</>
}

export default ChooseWord