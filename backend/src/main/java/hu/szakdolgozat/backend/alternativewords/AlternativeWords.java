package hu.szakdolgozat.backend.alternativewords;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "alternative_words")
public class AlternativeWords
{
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	private String word;
	
	public AlternativeWords(String word)
	{
		this.word = word;
	}
	
	public AlternativeWords()
	{
	}
	
	public String getWord()
	{
		return word;
	}
	
	public void setWord(String word)
	{
		this.word = word;
	}
	
	@Override
	public String toString()
	{
		return "AlternativeWords{" +
			"id='" + id + '\'' +
			", word='" + word + '\'' +
			'}';
	}
}
