import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {useEffect, useState} from 'react'

const ResultTable = (rowData) => {
	const [results, setResults] = useState()

	const downloadFile = (rowData) => {
		const file = new Blob([String.fromCharCode("0xFEFF"), rowData.ocrResultFile?.text], {type: 'text/plain'});
		return <a href={URL.createObjectURL(file)} download={rowData.ocrResultFile?.name + ".txt"}>Letöltés</a>
	}


	useEffect(() => {
		fetch("http://localhost:8080/results")
			.then(res => res.json())
			.then(res => {
				setResults(res)
			})
	}, [])

	return <>
		<DataTable value={results} id={"result-table"}>
			<Column field={'projectName'} header={"Projekt név"}/>
			<Column field={'numberOfSentence'} header={"Mondatok száma"}/>
			<Column field={'numberOfWords'} header={"Szavak száma"}/>
			<Column field={'averageWordCount'} header={"Szavak mondatonként"}/>
			<Column field={'goodWords'} header={"Helyesen olvasott szavak száma"}/>
			<Column field={'badWords'} header={"Helytelenül olvasott szavak száma"}/>
			<Column field={'resultPercentage'} header={"Helyességi arány"}/>
			<Column field={'ocrResult'} header={"OCR eredmény"} body={(rowData) => downloadFile(rowData)}/>
		</DataTable>
	</>
}

export default ResultTable;
