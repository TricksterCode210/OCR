package hu.szakdolgozat.backend.ocr;

import hu.szakdolgozat.backend.ocrdocument.OcrDocument;
import hu.szakdolgozat.backend.ocrdocument.OcrDocumentRepository;
import java.io.UnsupportedEncodingException;
import java.text.BreakIterator;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OcrResultService
{
	private final OcrResultRepository ocrResultRepository;
	private final OcrDocumentRepository ocrDocumentRepository;
	
	@Autowired
	public OcrResultService(OcrResultRepository ocrResultRepository, OcrDocumentRepository ocrDocumentRepository)
	{
		this.ocrResultRepository = ocrResultRepository;
		this.ocrDocumentRepository = ocrDocumentRepository;
	}
	
	public List<OcrResult> getOcrResults()
	{
		return ocrResultRepository.findAll();
	}
	
	public OcrResult compareWords(Map<Integer, List<String>> needToCompare, OcrResult result) throws UnsupportedEncodingException
	{
		StringBuilder ocrText = new StringBuilder();
		int goodWord = 0;
		int badWord = 0;
		for(List<String> words : needToCompare.values())
		{
			Map<String, Integer> hasonlitas = new HashMap<>();
			for(int i = 0; i<words.size(); i++)
			{
				if(hasonlitas.get(words.get(i)) == null)
					hasonlitas.put(words.get(i), 1);
				else
					hasonlitas.put(words.get(i), hasonlitas.get(words.get(i)) + 1);
			}
			int max = 0;
			String word = "";
			boolean first = true;
			for(String key : hasonlitas.keySet())
			{
				if(hasonlitas.size()==1)
				{
					goodWord++;
					word = key + " ";
					break;
				}
				if(first)
				{
					badWord++;
					first=false;
				}
				if(max < hasonlitas.get(key)){
					max = hasonlitas.get(key);
					word= key + " ";
					continue;
				}
				if(max == hasonlitas.get(key))
				{
					word = "_____ ";
				}
			}
			ocrText.append(word);
		}
		result.setGoodWords(goodWord);
		result.setBadWords(badWord);
		result.setResultPercentage((double) goodWord/(goodWord+badWord)*100);
		result.setNumberOfWords(needToCompare.values().size());
		result.setAverageWordCount((double) result.getNumberOfWords()/result.getNumberOfSentence());
		OcrDocument document = new OcrDocument(
			"eredmény",
			"txt",
			ocrText.toString().getBytes("UTF-8"),
			ocrText.toString()
		);
		result.setOcrResultFile(document);
		return result;
	}
	
	public OcrResult ocrResultGenerate(List<String> listOfOcrResults) throws UnsupportedEncodingException
	{
		OcrResult result = new OcrResult();
		Map<Integer, List<String>> szovegek = new HashMap<>();
		int counter = 1;
		result.setProjectName("Teszt példa");
		for(String ocrElem : listOfOcrResults)
		{
			BreakIterator bi = BreakIterator.getSentenceInstance(Locale.forLanguageTag("hu"));
			bi.setText(ocrElem);
			List<String> sentences = new ArrayList<>();
			
			int start = 0;
			int end = 0;
			while((end = bi.next()) != BreakIterator.DONE)
			{
				sentences.add(ocrElem.substring(start, end));
				start = end;
			}
			List<String> szavak = new ArrayList<>(List.of(ocrElem.split(" ")));
			result.setNumberOfSentence(sentences.size());
			szovegek.put(counter, szavak);
			counter++;
		}
		
		Map<Integer, List<String>> osszehasonlitoMap = new HashMap<>();
		List<String> szoLehetosegek;
		int szoindex = 0;
		
		for(int i = 0; i< szovegek.get(1).size(); i++)
		{
			szoLehetosegek = new ArrayList<>();
			for(int j = 1; j<= szovegek.size(); j++)
			{
				szoLehetosegek.add(szovegek.get(j).get(i));
			}
			osszehasonlitoMap.put(szoindex, szoLehetosegek);
			szoindex++;
		}
		
		result = compareWords(osszehasonlitoMap, result);
		return result;
	}
	
	public void save(OcrResult entity)
	{
		OcrDocument ocrDocument = new OcrDocument(
			entity.getOcrResultFile().getName(),
			entity.getOcrResultFile().getType(),
			entity.getOcrResultFile().getData(),
			entity.getOcrResultFile().getText()
		);
		ocrDocumentRepository.save(ocrDocument);
		OcrResult ocrResult = new OcrResult(
			entity.getProjectName(),
			entity.getNumberOfSentence(),
			entity.getNumberOfWords(),
			entity.getAverageWordCount(),
			entity.getGoodWords(),
			entity.getBadWords(),
			entity.getResultPercentage(),
			ocrDocument
		);
		ocrResultRepository.save(ocrResult);
	}
}
