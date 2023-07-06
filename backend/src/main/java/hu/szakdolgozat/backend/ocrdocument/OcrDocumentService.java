package hu.szakdolgozat.backend.ocrdocument;

import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OcrDocumentService
{
	private final OcrDocumentRepository ocrDocumentRepository;
	
	@Autowired
	public OcrDocumentService(OcrDocumentRepository ocrDocumentRepository)
	{
		this.ocrDocumentRepository = ocrDocumentRepository;
	}
	
	public OcrDocument getFile(String id)
	{
		return ocrDocumentRepository.findById(id).get();
	}
	
	public Stream<OcrDocument> getAllFiles()
	{
		return ocrDocumentRepository.findAll().stream();
	}
}
