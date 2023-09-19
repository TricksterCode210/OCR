package hu.szakdolgozat.backend.vocabulary;

import hu.szakdolgozat.backend.methods.LevensteinDistance;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VocabularyService
{
	private final VocabularyRepository vocabularyRepository;
	
	@Autowired
	public VocabularyService(VocabularyRepository vocabularyRepository)
	{
		this.vocabularyRepository = vocabularyRepository;
	}
	
	public Map<String, Integer> getAlternativeWordsForCompare(String word)
	{
		Map<String, Integer> result = new HashMap<>();
		int counter = 0;
		int distance;
		for (String a : vocabularyRepository.getAll())
		{
			distance = LevensteinDistance.calculate(a, word);
			if (distance <= 2 && counter < 10)
			{
				counter++;
				result.put(a, distance);
			}
		}
		return result;
	}
	
	public void saveWord(String word)
	{
		if (vocabularyRepository.getByWords(word.replaceAll("[( .,\r\n\t)+]", "")) == null)
		{
			word = word.replaceAll("[( .,\r\n\t)+]", "");
			Vocabulary vocabulary = new Vocabulary(word);
			vocabularyRepository.save(vocabulary);
		}
	}
}
