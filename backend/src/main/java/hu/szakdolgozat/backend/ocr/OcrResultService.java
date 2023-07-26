package hu.szakdolgozat.backend.ocr;

import hu.szakdolgozat.backend.ocrdocument.OcrDocument;
import hu.szakdolgozat.backend.ocrdocument.OcrDocumentRepository;
import hu.szakdolgozat.backend.possiblevalues.PossibleValues;
import hu.szakdolgozat.backend.possiblevalues.PossibleValuesRepository;
import java.text.BreakIterator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OcrResultService
{
	private final OcrResultRepository ocrResultRepository;
	private final OcrDocumentRepository ocrDocumentRepository;
	private final PossibleValuesRepository possibleValuesRepository;
	
	@Autowired
	public OcrResultService(OcrResultRepository ocrResultRepository, OcrDocumentRepository ocrDocumentRepository, PossibleValuesRepository possibleValuesRepository)
	{
		this.ocrResultRepository = ocrResultRepository;
		this.ocrDocumentRepository = ocrDocumentRepository;
		this.possibleValuesRepository = possibleValuesRepository;
	}
	
	public List<OcrResult> getOcrResults()
	{
		return ocrResultRepository.findAll();
	}
	
	public int calculate(String x, String y)
	{
		int[][] dp = new int[x.length() + 1][y.length() + 1];
		
		for (int i = 0; i <= x.length(); i++)
		{
			for (int j = 0; j <= y.length(); j++)
			{
				if (i == 0)
				{
					dp[i][j] = j;
				}
				else if (j == 0)
				{
					dp[i][j] = i;
				}
				else
				{
					dp[i][j] = min(dp[i - 1][j - 1]
							+ costOfSubstitution(x.charAt(i - 1), y.charAt(j - 1)),
						dp[i - 1][j] + 1,
						dp[i][j - 1] + 1);
				}
			}
		}
		return dp[x.length()][y.length()];
	}
	
	public int costOfSubstitution(char a, char b)
	{
		return a == b ? 0 : 1;
	}
	
	public int min(int... numbers)
	{
		return Arrays.stream(numbers)
			.min().orElse(Integer.MAX_VALUE);
	}
	
	public String comparingSentences(OcrResult result, List<String> needToCompare)
	{
		StringBuilder ocrResult = new StringBuilder();
		List<List<String>> splittedSentences = new ArrayList<>();
		List<PossibleValues> possibleValuesList = new ArrayList<>();
		
		int longestSentence = 0;
		int dif = 0;
		for (int i = 0; i < needToCompare.size(); i++)
		{
			if (needToCompare.get(i) != null)
			{
				splittedSentences.add(List.of(needToCompare.get(i).split("[ \t\n]")));
				if (longestSentence < needToCompare.get(i).split("[ \t\n]").length)
				{
					longestSentence = i - dif;
				}
			}
			else
			{
				dif++;
			}
		}
		int x = 0;
		String word = "";
		for (int wordIndex = 0; wordIndex < splittedSentences.get(longestSentence).size(); wordIndex++)
		{
			boolean first = true;
			Map<String, Integer> hasonlitasMap = new HashMap<>();
			for (int i = 0; i < splittedSentences.size(); i++)
			{
				for (int j = 0; j < splittedSentences.size(); j++)
				{
					if (i != j && splittedSentences.get(i).size() > wordIndex)
					{
						int tav = Integer.MAX_VALUE;
						for (int wordIndexDifference = -3; wordIndexDifference <= 3; wordIndexDifference++)
						{
							if (wordIndex + wordIndexDifference >= 0 && splittedSentences.get(j).size() > wordIndex + wordIndexDifference)
							{
								x = calculate(splittedSentences.get(i).get(wordIndex), splittedSentences.get(j).get(wordIndex + wordIndexDifference));
								if (tav > x)
								{
									tav = x;
									word = splittedSentences.get(j).get(wordIndex + wordIndexDifference);
								}
								if (tav == 0)
								{
									break;
								}
							}
						}
						if (hasonlitasMap.get(word) == null)
						{
							hasonlitasMap.put(word, 1);
						}
						else
						{
							hasonlitasMap.put(word, hasonlitasMap.get(word) + 1);
						}
					}
				}
			}
			
			String temp = "";
			int max = 0;
			for (String key : hasonlitasMap.keySet())
			{
				if (hasonlitasMap.size() == 1)
				{
					result.setGoodWords(result.getGoodWords() + 1);
					temp = key + " ";
					break;
				}
				if (first)
				{
					result.setBadWords(result.getBadWords() + 1);
					first = false;
				}
				if (max < hasonlitasMap.get(key))
				{
					max = hasonlitasMap.get(key);
					temp = key + " ";
					continue;
				}
				if (max == hasonlitasMap.get(key))
				{
					temp = "_____ ";
				}
			}
			if (temp.equals("_____ "))
			{
				String possibilities = hasonlitasMap.keySet().stream().collect(Collectors.joining(", ", "", ""));
				possibleValuesList.add(new PossibleValues("", possibilities));
			}
			ocrResult.append(temp);
		}
		List<PossibleValues> tempList = result.getPossibleValues();
		tempList.addAll(possibleValuesList);
		result.setPossibleValues(tempList);
		return ocrResult.toString();
	}
	
	public OcrResult ocrResultGenerate(List<String> listOfOcrResults)
	{
		StringBuilder ocrResult = new StringBuilder();
		OcrResult result = new OcrResult();
		OcrDocument ocrDocument = new OcrDocument();
		result.setGoodWords(0);
		result.setBadWords(0);
		List<Map<Integer, String>> szoveg = new ArrayList<>();
		int counter = 1;
		for (String ocrElem : listOfOcrResults)
		{
			Map<Integer, String> mondat = new HashMap<>();
			BreakIterator bi = BreakIterator.getSentenceInstance(Locale.forLanguageTag("hu"));
			bi.setText(ocrElem);
			
			int start = 0;
			int end = 0;
			while ((end = bi.next()) != BreakIterator.DONE)
			{
				mondat.put(counter, ocrElem.substring(start, end));
				counter++;
				start = end;
			}
			counter = 1;
			szoveg.add(mondat);
		}
		
		int most_sentences = 0;
		for (Map<Integer, String> x : szoveg)
		{
			if (most_sentences < x.size())
			{
				most_sentences = x.size();
			}
		}
		
		for (int i = 1; i <= most_sentences; i++)
		{
			List<String> osszehasonlitas = new ArrayList<>();
			for (int j = 0; j < szoveg.size(); j++)
			{
				if (szoveg.get(j) != null)
				{
					osszehasonlitas.add(szoveg.get(j).get(i));
				}
			}
			ocrResult.append(comparingSentences(result, osszehasonlitas));
		}
		ocrDocument.setText(ocrResult.toString().replace("\n ", "\n"));
		result.setOcrResultFile(ocrDocument);
		return result;
	}
	
	public boolean nameAlreadyInUse(String projectName)
	{
		return ocrResultRepository.getOcrResultByProjectName(projectName) == null;
	}
	
	public boolean save(OcrResult entity)
	{
		OcrDocument ocrDocument = new OcrDocument(
			entity.getOcrResultFile().getName().toLowerCase().replace(" ", "_"),
			entity.getOcrResultFile().getType(),
			entity.getOcrResultFile().getText()
		);
		for (PossibleValues possibleValue : entity.getPossibleValues())
		{
			possibleValue.setProjectName(entity.getProjectName());
			possibleValuesRepository.save(possibleValue);
		}
		int sentenceCounter = 0;
		BreakIterator bi = BreakIterator.getSentenceInstance(Locale.forLanguageTag("hu"));
		bi.setText(entity.getOcrResultFile().getText());
		while (bi.next() != BreakIterator.DONE)
		{
			sentenceCounter++;
		}
		entity.setNumberOfSentence(sentenceCounter);
		entity.setNumberOfWords(entity.getOcrResultFile().getText().split("[ \t]").length);
		entity.setAverageWordCount((double) entity.getNumberOfWords() / entity.getNumberOfSentence());
		int difference = entity.getNumberOfWords()-entity.getGoodWords()-entity.getBadWords();
		entity.setGoodWords(entity.getGoodWords()+difference);
		entity.setResultPercentage((double) entity.getGoodWords() / entity.getNumberOfWords() * 100);
		ocrDocument.setText(ocrDocument.getText().replace("\n ", "\n"));
		ocrDocumentRepository.save(ocrDocument);
		OcrResult ocrResult = new OcrResult(
			entity.getProjectName(),
			entity.getNumberOfSentence(),
			entity.getNumberOfWords(),
			entity.getAverageWordCount(),
			entity.getGoodWords(),
			entity.getBadWords(),
			entity.getResultPercentage(),
			ocrDocument,
			entity.getPossibleValues()
		);
		ocrResultRepository.save(ocrResult);
		return true;
	}
	
	public boolean edit(OcrResult ocrResult)
	{
		ocrResultRepository.deleteById(ocrResult.getId());
		possibleValuesRepository.deleteByProjectName(ocrResult.getProjectName());
		ocrDocumentRepository.deleteById(ocrResult.getOcrResultFile().getId());
		save(ocrResult);
		return true;
	}
	
	public void deleteResult(Long id)
	{
		boolean exists = ocrResultRepository.existsById(id);
		if (!exists)
		{
			throw new IllegalStateException("Nem létezik");
		}
		OcrResult ocrResult = ocrResultRepository.getOcrResultById(id);
		ocrResultRepository.deleteById(id);
		possibleValuesRepository.deleteByProjectName(ocrResult.getProjectName());
		ocrDocumentRepository.deleteById(ocrResult.getOcrResultFile().getId());
	}
	
	public OcrResult getOcrResultById(Long id)
	{
		return ocrResultRepository.getOcrResultById(id);
	}
}
