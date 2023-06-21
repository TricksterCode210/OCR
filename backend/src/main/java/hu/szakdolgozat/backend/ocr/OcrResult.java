package hu.szakdolgozat.backend.ocr;

import hu.szakdolgozat.backend.ocrdocument.OcrDocument;
import java.io.File;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class OcrResult
{
	@Id
	@SequenceGenerator(
		name="ocr_sequence",
		sequenceName = "ocr_sequence",
		allocationSize = 1
	)
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "ocr_sequence"
	)
	private Long id;
	private String projectName;
	private Integer numberOfSentence;
	private Integer numberOfWords;
	private double averageWordCount;
	private Integer goodWords;
	private Integer badWords;
	private double resultPercentage;
	@OneToOne
	@JoinColumn(name = "ocr_result_file_id")
	private OcrDocument ocrResultFile;
	
	public OcrResult(String projectName, Integer numberOfSentence, Integer numberOfWords, double averageWordCount, Integer goodWords, Integer badWords, double resultPercentage,
		OcrDocument ocrResultFile)
	{
		this.projectName = projectName;
		this.numberOfSentence = numberOfSentence;
		this.numberOfWords = numberOfWords;
		this.averageWordCount = averageWordCount;
		this.goodWords = goodWords;
		this.badWords = badWords;
		this.resultPercentage = resultPercentage;
		this.ocrResultFile = ocrResultFile;
	}
	
	public OcrResult(Long id, String projectName, Integer numberOfSentence, Integer numberOfWords, double averageWordCount, Integer goodWords, Integer badWords, double resultPercentage,
		OcrDocument ocrResultFile)
	{
		this.id = id;
		this.projectName = projectName;
		this.numberOfSentence = numberOfSentence;
		this.numberOfWords = numberOfWords;
		this.averageWordCount = averageWordCount;
		this.goodWords = goodWords;
		this.badWords = badWords;
		this.resultPercentage = resultPercentage;
		this.ocrResultFile = ocrResultFile;
	}
	
	public OcrResult() {}
	
	public Long getId()
	{
		return id;
	}
	
	public void setId(Long id)
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
	
	public Integer getNumberOfSentence()
	{
		return numberOfSentence;
	}
	
	public void setNumberOfSentence(Integer numberOfSentence)
	{
		this.numberOfSentence = numberOfSentence;
	}
	
	public Integer getNumberOfWords()
	{
		return numberOfWords;
	}
	
	public void setNumberOfWords(Integer numberOfWords)
	{
		this.numberOfWords = numberOfWords;
	}
	
	public double getAverageWordCount()
	{
		return averageWordCount;
	}
	
	public void setAverageWordCount(double averageWordCount)
	{
		this.averageWordCount = averageWordCount;
	}
	
	public OcrDocument getOcrResultFile()
	{
		return ocrResultFile;
	}
	
	public void setOcrResultFile(OcrDocument ocrResultFile)
	{
		this.ocrResultFile = ocrResultFile;
	}
	
	public Integer getGoodWords()
	{
		return goodWords;
	}
	
	public void setGoodWords(Integer goodWords)
	{
		this.goodWords = goodWords;
	}
	
	public Integer getBadWords()
	{
		return badWords;
	}
	
	public void setBadWords(Integer badWords)
	{
		this.badWords = badWords;
	}
	
	public double getResultPercentage()
	{
		return resultPercentage;
	}
	
	public void setResultPercentage(double resultPercentage)
	{
		this.resultPercentage = resultPercentage;
	}
	
	@Override
	public String toString()
	{
		return "OcrResult{" +
			"id=" + id +
			", projectName='" + projectName + '\'' +
			", numberOfSentence=" + numberOfSentence +
			", numberOfWords=" + numberOfWords +
			", averageWordCount=" + averageWordCount +
			", ocrResult=" + ocrResultFile +
			'}';
	}
}
