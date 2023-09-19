package hu.szakdolgozat.backend.alternatives;

import java.util.List;
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
	private String distances;
	
	public AlternativeWords(String projectName, String alternativeWords, String distances)
	{
		this.projectName = projectName;
		this.alternativeWords = alternativeWords;
		this.distances = distances;
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
	
	public String getDistances()
	{
		return distances;
	}
	
	public void setDistances(String distances)
	{
		this.distances = distances;
	}
}
