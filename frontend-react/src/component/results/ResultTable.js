import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {useEffect, useState} from 'react'
import {Button} from 'primereact/button'
import {Link} from 'react-router-dom'

const ResultTable = (rowData) => {
	const [results, setResults] = useState()

	const downloadFile = (rowData) => {
		const file = new Blob([String.fromCharCode('0xFEFF'), rowData.ocrResultFile?.text], {type: 'text/plain'})
		return <a href={URL.createObjectURL(file)} download={rowData.ocrResultFile?.name + '.txt'}>Letöltés</a>
	}

	const deleteResult = async (id) => {
		fetch(`http://localhost:8080/results/${id}`, {
			method: 'DELETE'
		}).then(() => {
			window.location.reload()
		})
	}

	// const finishOcr = () => {
	//
	// }

	const buttonGroup = (rowData) => {
		return <div className={"row me-3"}>
			<div className={rowData.possibleValues.length > 0 ? "col-6" : "col-12"}>
			<Button label={'Törlés'} severity={'danger'} onClick={() => deleteResult(rowData.id)}/>
			</div>
			{rowData.possibleValues.length > 0 ?
				<div className={"col-6"}>
					<Link to={`${rowData.id}`}><Button label={'Befejezés'} severity={'info'}/></Link>
				</div>:
				<></>
			}
		</div>
	}

	const averageWordCountTemplate = (rowData) => {
		return <>{rowData.averageWordCount.toFixed(4)}</>
	}

	const resultPercentageTemplate = (rowData) => {
		return <>{rowData.resultPercentage.toFixed(4)} %</>
	}

	useEffect(() => {
		fetch('http://localhost:8080/results')
			.then(res => res.json())
			.then(res => {
				res.map(x => console.log(x))
				setResults(res)
			})
	}, [])

	return <>
		<DataTable value={results} id={'result-table'}>
			<Column field={'button-group'} header={''} body={buttonGroup}/>
			<Column field={'projectName'} header={'Projekt név'}/>
			<Column field={'numberOfSentence'} header={'Mondatok száma'}/>
			<Column field={'numberOfWords'} header={'Szavak száma'}/>
			<Column field={'averageWordCount'} header={'Szavak mondatonként'} body={averageWordCountTemplate}/>
			<Column field={'goodWords'} header={'Helyesen olvasott szavak száma'}/>
			<Column field={'badWords'} header={'Helytelenül olvasott szavak száma'}/>
			<Column field={'resultPercentage'} header={'Helyességi arány'} body={resultPercentageTemplate}/>
			<Column field={'ocrResult'} header={'OCR eredmény'} body={(rowData) => downloadFile(rowData)}/>
		</DataTable>
	</>
}

export default ResultTable
