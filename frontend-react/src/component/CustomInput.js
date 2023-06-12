import {useField} from 'formik'
import {HStack} from '@chakra-ui/react'

function CustomInput ({label, classNameLabel ,...props}) {

	const [field, meta] = useField(props);

	return (
		<HStack className={"row-data"}>
			<div className={"form-labels"}>
				<label className={classNameLabel} >{label}</label>
			</div>
			<div className={"form-inputs"}>
				<input {...field}{...props}/>
			</div>
		</HStack>
	);
};

export default CustomInput;