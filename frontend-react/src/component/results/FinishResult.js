import {useEffect, useState} from 'react'
import {InputTextarea} from 'primereact/inputtextarea'
import {Button} from 'primereact/button'
import {useNavigate} from 'react-router-dom'

const FinishResult = () => {
	const url = window.location.pathname.split("/")[2];
	const [ocrResult, setOcrResult] = useState()
	const [finish, setFinish] = useState(false)

	const navigate = useNavigate()

	useEffect(()=>{
		console.log(url)
		fetch(`http://localhost:8080/results/get/${url}`, {
			method: 'GET'
		})
			.then(res=>res.json())
			.then((result)=>{
					console.log(result)
					setOcrResult(result);
				}
			)
	},[])

	useEffect(() => {
		console.log(ocrResult)
	}, [ocrResult])

	return(
		<div>
			<InputTextarea
				value={ocrResult?.ocrResultFile?.text}
				autoResize
				readOnly={ocrResult?.possibleValues?.length > 0 && !finish}
				id={'ocr-result'}/>
			<Button label={"Vissza"} severity={"info"} onClick={() => {navigate("/results")}}/>
		</div>
	)
}

export default FinishResult