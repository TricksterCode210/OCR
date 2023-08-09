package hu.szakdolgozat.backend.alternatives;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class AlternativeWords
{
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	private String projectName;
	private String alternativeWords;
	
	public AlternativeWords(String projectName, String alternativeWords)
	{
		this.projectName = projectName;
		this.alternativeWords = alternativeWords;
	}
	
	public AlternativeWords()
	{
	}
	
	public void setId(String id)
	{
		this.id = id;
	}
	
	public String getProjectName()
	{
		return projectName;
	}
	
	public void setProjectName(String projectName)
	{
		this.projectName = projectName;
	}
	
	public String getAlternativeWords()
	{
		return alternativeWords;
	}
	
	public void setAlternativeWords(String alternativeWords)
	{
		this.alternativeWords = alternativeWords;
	}
}
