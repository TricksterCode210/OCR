import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {useEffect, useState} from 'react'

const ResultTable = () => {
	const [results, setResults] = useState()

	const downloadFile = () => {
		<a href={results.ocrResult}>teszt</a>
	}


	useEffect(() => {
		fetch("http://localhost:8080/results")
			.then(res => res.json())
			.then(res => {
				setResults(res)
				console.log(res)
			})
	}, [])

	return <>
		<DataTable value={results} id={"result-table"}>
			<Column field={'projectName'} header={"Projekt név"}/>
			<Column field={'numberOfSentence'} header={"Mondatok száma"}/>
			<Column field={'numberOfWords'} header={"Szavak száma"}/>
			<Column field={'averageWordCount'} header={"Szavak mondatonként"}/>
			<Column field={'ocrResult'} header={"OCR eredmény"}/>
		</DataTable>
	</>
}

export default ResultTable;
