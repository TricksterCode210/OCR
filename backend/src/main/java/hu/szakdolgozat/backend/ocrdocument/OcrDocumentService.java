package hu.szakdolgozat.backend.ocrdocument;

import java.util.stream.Stream;
import org.springframework.util.StringUtils;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class OcrDocumentService
{
	@Autowired
	private OcrDocumentRepository ocrDocumentRepository;
	
	public OcrDocument store(MultipartFile file) throws IOException{
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		OcrDocument ocrDocument = new OcrDocument(fileName, file.getContentType(), file.getBytes());
		
		return ocrDocumentRepository.save(ocrDocument);
	}
	
	public OcrDocument getFile(String id) {
		return ocrDocumentRepository.findById(id).get();
	}
	
	public Stream<OcrDocument> getAllFiles()
	{
		return ocrDocumentRepository.findAll().stream();
	}
}
