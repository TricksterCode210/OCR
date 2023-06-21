package hu.szakdolgozat.backend.ocr;

import hu.szakdolgozat.backend.ocrdocument.OcrDocument;
import java.io.UnsupportedEncodingException;
import java.text.BreakIterator;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	
	
	@PostMapping(path = "/homePage")
	public OcrResult ocrResultGenerate(@RequestBody List<String> listOfOcrResults) throws UnsupportedEncodingException
	{
		return ocrResultService.ocrResultGenerate(listOfOcrResults);
	}
}
