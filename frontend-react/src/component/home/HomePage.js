import Scanner from './Scanner'

const HomePage = () => {
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
			</div>
			<Scanner/>
		</div>
	)
}

export default HomePage