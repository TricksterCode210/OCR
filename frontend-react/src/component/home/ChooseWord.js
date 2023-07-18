import {useEffect, useState} from 'react'

const ChooseWord = ({
	setOcrResult,
	ocrResult,
	setFinish,
	counter,
	setCounter
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
			}
		}))
		setCounter(counter => counter + 1)
	}

	const noMatchClick = () => {
		setOcrResult(ocrResult => ({
			...ocrResult,
			ocrResultFile: {
				...ocrResult.ocrResultFile,
				text: ocrResult.ocrResultFile.text.replace('_____ ', '')
			}
		}))
		setCounter(counter => counter + 1)
	}

	useEffect(() => {
		if (counter >= ocrResult.possibleValues.length) {
			setFinish(true)
		}
		if (ocrResult.possibleValues.length > counter) {
			setWord1(ocrResult.possibleValues[counter].possibleWords.split(', ')[0])
			setWord2(ocrResult.possibleValues[counter].possibleWords.split(', ')[1])
			setWord3(ocrResult.possibleValues[counter].possibleWords.split(', ')[2])
			setWord4(ocrResult.possibleValues[counter].possibleWords.split(', ')[3])
		}
	}, [counter])

	return <>
		{counter < ocrResult.possibleValues.length ? <>
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
			<button id={'no_match'} className={'choose-btn'} style={{color: 'red'}} onClick={() => noMatchClick()}>"Egyik sem"</button>
		</>:<></>
		}
	</>
}

export default ChooseWord