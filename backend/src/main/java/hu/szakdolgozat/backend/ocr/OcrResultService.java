package hu.szakdolgozat.backend.ocr;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OcrResultService
{
	private final OcrResultRepository ocrResultRepository;
	
	@Autowired
	public OcrResultService(OcrResultRepository ocrResultRepository)
	{
		this.ocrResultRepository=ocrResultRepository;
	}
	
	public List<OcrResult> getOcrResults()
	{
		return ocrResultRepository.findAll();
	}
}