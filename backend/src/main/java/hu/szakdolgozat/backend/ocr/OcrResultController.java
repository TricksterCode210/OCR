package hu.szakdolgozat.backend.ocr;

import java.io.UnsupportedEncodingException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public List<OcrResult> getOcrResults()
	{
		return ocrResultService.getOcrResults();
	}
	
	@PostMapping(path = "/homePage")
	public OcrResult ocrResultGenerate(@RequestBody List<String> listOfOcrResults) throws UnsupportedEncodingException
	{
		return ocrResultService.ocrResultGenerate(listOfOcrResults);
	}
	
	@PostMapping(path = "/homePage/save")
	public boolean save(@RequestBody OcrResult ocrResult)
	{
		return ocrResultService.save(ocrResult);
	}
	
	@PostMapping(path = "/results/edit")
	public boolean edit(@RequestBody OcrResult ocrResult) {return ocrResultService.edit(ocrResult);}
	
	@DeleteMapping(path = "/results/{resultId}")
	public void deleteResult(@PathVariable("resultId") Long id)
	{
		ocrResultService.deleteResult(id);
	}
	
	@GetMapping(path = "/results/get/{resultId}")
	public OcrResult getUnfinishedOcr(@PathVariable("resultId") Long id) {
		return ocrResultService.getOcrResultById(id);
	}
}
