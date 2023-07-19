package hu.szakdolgozat.backend.possiblevalues;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class PossibleValues
{
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	private String projectName;
	private String possibleWords;
	
	public PossibleValues(String projectName, String possibleWords)
	{
		this.projectName = projectName;
		this.possibleWords = possibleWords;
	}
	
	public PossibleValues()
	{
	
	}
	
	public String getProjectName()
	{
		return projectName;
	}
	
	public void setProjectName(String projectName)
	{
		this.projectName = projectName;
	}
	
	public String getPossibleWords()
	{
		return possibleWords;
	}
	
	public void setPossibleWords(String possibleWords)
	{
		this.possibleWords = possibleWords;
	}
}
