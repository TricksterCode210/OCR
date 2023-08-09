package hu.szakdolgozat.backend.vocabulary;

import hu.szakdolgozat.backend.methods.LevensteinDistance;
import java.util.ArrayList;
import java.util.List;
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
	
	public List<String> getAlternativeWordsForCompare(String word)
	{
		List<String> result = new ArrayList<>();
		int counter = 0;
		for (String a : vocabularyRepository.getAll())
		{
			if (LevensteinDistance.calculate(a, word) <= 2 && counter < 5)
			{
				counter++;
				result.add(a);
			}
		}
		return result;
	}
	
	public void saveWord(String word)
	{
		if (vocabularyRepository.getByWords(word.replaceAll("[( .,\r\n\t)+]", "")) == null)
		{
			word = word.replaceAll("[( .,\n\t)+]", "");
			Vocabulary vocabulary = new Vocabulary(word);
			vocabularyRepository.save(vocabulary);
		}
	}
}
