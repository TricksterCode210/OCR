import {HStack} from "@chakra-ui/react";
import {Button} from 'primereact/button'

const InputFields = ({
    id,
    ocr,
    imageData,
    setImageData,
    setOcr
}) => {

    function handleImageChange(e) {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const reader = new FileReader()
        reader.onloadend = () => {
            const imageDataUri = reader.result
            setImageData(imageDataUri)
        }
        reader.readAsDataURL(file)
    }

    const deleteResults = () => {
        setImageData(null)
        setOcr('')
    }

    return(
        <div className="container-fluid mt-5 mb-5 border border-info rounded-4">
            <div className={'row m-0'}>
                <HStack>
                    <div className={'col-4'}>
                        <label htmlFor={`file_upload_${id}`} className={'custom-file-upload'}>Töltse fel a fájlt</label>
                        <input
                            type="file"
                            id={`file_upload_${id}`}
                            onChange={(e) => {handleImageChange(e)}}
                            accept="image/*"
                        />
                        <Button label={"Törlés"} className={'delete-button'} onClick={e => deleteResults()}/>
                    </div>
                    <div className={'col-4'}>
                        <img src={imageData} hidden={!imageData} height={"70%"} width={"70%"} alt="Kép"/>
                    </div>
                    <div className={'col-4'}>
                       <pre className={'ocr-text'}>{ocr}</pre>
                    </div>
                </HStack>
            </div>
        </div>
    )
}

export default InputFields;