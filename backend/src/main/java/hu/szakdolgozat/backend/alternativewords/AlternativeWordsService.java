package hu.szakdolgozat.backend.alternativewords;

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
	
	public List<String> getTop5Words(String word){
		return alternativeWordsRepository.getTop5Words(word);
	}
	
	public void saveWord(String word)
	{
		if(alternativeWordsRepository.getByWord(word) == null)
		{
			word = word.replaceAll("[ \t\n.,]", "");
			AlternativeWords alternativeWords = new AlternativeWords(word);
			alternativeWordsRepository.save(alternativeWords);
		}
	}
}
