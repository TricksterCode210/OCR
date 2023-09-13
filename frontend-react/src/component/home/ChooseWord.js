import {useEffect, useState} from 'react'
import {HStack, VStack} from '@chakra-ui/react'
import {Button} from 'primereact/button'

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

	const [alternative1, setAlternative1] = useState()
	const [alternative2, setAlternative2] = useState()
	const [alternative3, setAlternative3] = useState()
	const [alternative4, setAlternative4] = useState()
	const [alternative5, setAlternative5] = useState()

	const [replaceWord, setReplaceWord] = useState()

	const handleClick = (word) => {
		setOcrResult(ocrResult => ({
			...ocrResult,
			ocrResultFile: {
				...ocrResult.ocrResultFile,
				text: ocrResult.ocrResultFile.text.replace('_____ ', word === undefined ? '' : word + ' ')
			}
		}))
		setCounter(counter => counter + 1)
	}

	const customInput = (value) => {
		const splittedWords = ocrResult?.ocrResultFile.text.split(' ')
		const x = splittedWords.indexOf('_____')
		setOcrResult(ocrResult => ({
			...ocrResult,
			ocrResultFile: {
				...ocrResult.ocrResultFile,
				text: ocrResult.ocrResultFile.text.replace((x!==0 ? `${splittedWords[x - 1]} ` : ``) + `${splittedWords[x]}` + (splittedWords[x+1] !== undefined ? ` ${splittedWords[x + 1]}` : ``), replaceWord)
			}
		}))
		setCounter(counter => counter + 1)
	}

	useEffect(() => {
		const splittedWords = ocrResult?.ocrResultFile.text.split(' ')
		const x = splittedWords.indexOf('_____')
		if (x === 0) {
			setReplaceWord(`${splittedWords[x]} ${splittedWords[x + 1]}`)
		} else if (splittedWords[x+1] === undefined)
		{
			setReplaceWord(`${splittedWords[x - 1]} ${splittedWords[x]}`)
		}
		else {
			setReplaceWord(`${splittedWords[x - 1]} ${splittedWords[x]} ${splittedWords[x + 1]}`)
		}
	}, [ocrResult])

	useEffect(() => {
		if (counter >= ocrResult.possibleValues.length) {
			setFinish(true)
		}
		if (ocrResult.possibleValues.length > counter) {
			setWord1(ocrResult.possibleValues[counter].possibleWords.split(', ')[0])
			setWord2(ocrResult.possibleValues[counter].possibleWords.split(', ')[1])
			setWord3(ocrResult.possibleValues[counter].possibleWords.split(', ')[2])
			setWord4(ocrResult.possibleValues[counter].possibleWords.split(', ')[3])
			setAlternative1(ocrResult.alternatives[counter].alternativeWords.split(', ')[0])
			setAlternative2(ocrResult.alternatives[counter].alternativeWords.split(', ')[1])
			setAlternative3(ocrResult.alternatives[counter].alternativeWords.split(', ')[2])
			setAlternative4(ocrResult.alternatives[counter].alternativeWords.split(', ')[3])
			setAlternative5(ocrResult.alternatives[counter].alternativeWords.split(', ')[4])
		}
	}, [counter])

	return <>
		{counter < ocrResult.possibleValues.length ? <>
			<VStack>
				<p style={{borderTop: 'solid 1px white', padding: 'small'}}>Helyettesítő szavak:</p>
				<HStack style={{alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
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
					<button id={'no_match'} className={'choose-none-btn'} onClick={() => handleClick(undefined)}>"Egyik sem"</button>
				</HStack>
				{alternative1 || alternative2 ? <><p style={{borderTop: 'solid 1px white', padding: 'small'}}>Alternatív szavak:</p>
					<HStack style={{alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
						{alternative1 ?
							<button id={'alternative_1'} className={'choose-btn'} onClick={() => handleClick(alternative1)}> {alternative1}</button> : <></>
						}
						{alternative2 ?
							<button id={'alternative_2'} className={'choose-btn'} onClick={() => handleClick(alternative2)}>{alternative2}</button> : <></>
						}
						{alternative3 ?
							<button id={'alternative_3'} className={'choose-btn'} onClick={() => handleClick(alternative3)}>{alternative3}</button> : <></>
						}
						{alternative4 ?
							<button id={'alternative_4'} className={'choose-btn'} onClick={() => handleClick(alternative4)}>{alternative4}</button> : <></>
						}
						{alternative5 ?
							<button id={'alternative_4'} className={'choose-btn'} onClick={() => handleClick(alternative5)}>{alternative5}</button> : <></>
						}
					</HStack> </> : <></>}
				<HStack>
					<div className={'form-labels'}>
						<label style={{fontSize: 'x-large'}}>Helyettesítő szöveg: </label>
					</div>
					<div className={'form-inputs'}>
						<input
							type={'text'}
							id={'replace_missing_field'}
							value={replaceWord}
							onChange={(e) => setReplaceWord(e.target.value)}
						/>
					</div>
				</HStack>
				<HStack style={{alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
					<Button label={'Helyettesítés'} severity={'info'} onClick={() => customInput(replaceWord)}/>
				</HStack>
			</VStack>
		</> : <></>
		}
	</>
}

export default ChooseWord