import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {useEffect, useState} from 'react'

const ResultTable = (rowData) => {
	const [results, setResults] = useState()

	const downloadTxtFile = (rowData) => {

		if(rowData) {
			const element = document.createElement("a");
			const file = new Blob(rowData.ocrResultFile?.data.toString(), {type: 'text/plain'});
			element.href = URL.createObjectURL(file);
			element.download = rowData.ocrResultFile?.name + ".txt";
			document.body.appendChild(element); // Required for this to work in FireFox
			element.click();
		}
	}

	const downloadFile = (rowData) => {
		return <button onClick={downloadTxtFile}>Download txt</button>
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
			<Column field={'ocrResult'} header={"OCR eredmény"} body={downloadFile}/>
		</DataTable>
	</>
}

export default ResultTable;
