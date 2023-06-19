package hu.szakdolgozat.backend.ocr;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class OcrResultController
{
	public final OcrResultService ocrResultService;
	
	@Autowired
	public OcrResultController(OcrResultService ocrResultService)
	{
		this.ocrResultService = ocrResultService;
	}
	
	@GetMapping(path = "/results")
	public List<OcrResult> getOcrResults(){
		return ocrResultService.getOcrResults();
	}
}
