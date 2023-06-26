import {useEffect, useState} from 'react'

const ChooseWord = ({
	possibleValues,
	setOcrResult,
	ocrResult,
	size,
	setFinish
}) => {
	const [word1, setWord1] = useState()
	const [word2, setWord2] = useState()
	const [word3, setWord3] = useState()
	const [word4, setWord4] = useState()

	const [counter, setCounter] = useState(0)

	const handleClick = (word) => {
		setOcrResult(ocrResult => ({
			...ocrResult,
			ocrResultFile: {
				...ocrResult.ocrResultFile,
				text: ocrResult.ocrResultFile.text.replace("_____", word)
			}
		}))
		if(size-1>counter) {
			setCounter(counter + 1)
		} else {
			setFinish(true)
		}
	}

	useEffect(() =>{
		setWord1(possibleValues[counter].possibleWords.split(", ")[0])
		setWord2(possibleValues[counter].possibleWords.split(", ")[1])
		setWord3(possibleValues[counter].possibleWords.split(", ")[2])
		setWord4(possibleValues[counter].possibleWords.split(", ")[3])
	}, [counter])

	return <>
		<button id={'number_1'} onClick={() => handleClick(word1)}> {word1}</button>
		<button id={'number_2'} onClick={() => handleClick(word2)} >{word2}</button>
		<button id={'number_3'} onClick={() => handleClick(word3)} >{word3}</button>
		<button id={'number_4'} onClick={() => handleClick(word4)} >{word4}</button>
	</>
}

export default ChooseWord;