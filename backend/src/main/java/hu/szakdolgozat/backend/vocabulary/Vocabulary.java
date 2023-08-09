package hu.szakdolgozat.backend.vocabulary;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "vocabulary_hungarian")
public class Vocabulary
{
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	private String words;
	
	public Vocabulary(String word)
	{
		this.words = word;
	}
	
	public Vocabulary()
	{
	}
	
	public String getWords()
	{
		return words;
	}
	
	public void setWords(String word)
	{
		this.words = word;
	}
	
	@Override
	public String toString()
	{
		return "AlternativeWords{" +
			"id='" + id + '\'' +
			", word='" + words + '\'' +
			'}';
	}
}
