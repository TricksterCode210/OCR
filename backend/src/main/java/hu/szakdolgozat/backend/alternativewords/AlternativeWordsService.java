package hu.szakdolgozat.backend.alternativewords;

import hu.szakdolgozat.backend.methods.LevensteinDistance;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlternativeWordsService
{
	private final AlternativeWordsRepository alternativeWordsRepository;
	
	@Autowired
	public AlternativeWordsService(AlternativeWordsRepository alternativeWordsRepository)
	{
		this.alternativeWordsRepository = alternativeWordsRepository;
	}
	
	public List<AlternativeWords> getAlternativeWordsForCompare(String word)
	{
		List<AlternativeWords> result = new ArrayList<>();
		int counter = 0;
		for (AlternativeWords a : alternativeWordsRepository.getAll())
		{
			if (LevensteinDistance.calculate(a.getWord(), word) <= 2 && counter < 5)
			{
				counter++;
				result.add(a);
			}
		}
		return result;
	}
	
	public void saveWord(String word)
	{
		if (alternativeWordsRepository.getByWord(word.replaceAll("[( .,\r\n\t)+]", "")) == null)
		{
			word = word.replaceAll("[( .,\n\t)+]", "");
			AlternativeWords alternativeWords = new AlternativeWords(word);
			alternativeWordsRepository.save(alternativeWords);
		}
	}
}
