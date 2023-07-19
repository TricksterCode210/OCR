package hu.szakdolgozat.backend.ocr;

import hu.szakdolgozat.backend.ocrdocument.OcrDocument;
import hu.szakdolgozat.backend.ocrdocument.OcrDocumentRepository;
import hu.szakdolgozat.backend.possiblevalues.PossibleValues;
import hu.szakdolgozat.backend.possiblevalues.PossibleValuesRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OcrResultConfig
{
	private final OcrDocumentRepository ocrDocumentRepository;
	private final PossibleValuesRepository possibleValuesRepository;
	
	public OcrResultConfig(OcrDocumentRepository ocrDocumentRepository, PossibleValuesRepository possibleValuesRepository)
	{
		this.ocrDocumentRepository = ocrDocumentRepository;
		this.possibleValuesRepository = possibleValuesRepository;
	}
	
	@Bean("ocrResult")
	CommandLineRunner commandLineRunner(
		OcrResultRepository repository
	)
	{
		return args ->
		{
			OcrDocument document = new OcrDocument(
				"teszt",
				"txt",
				"teszt szöveg _____ "
			);
			ocrDocumentRepository.save(document);
			OcrDocument document2 = new OcrDocument(
				"teszt2",
				"txt",
				"teszt szöveg"
			);
			ocrDocumentRepository.save(document2);
			PossibleValues possibleValues = new PossibleValues(
				"teszt projekt",
				"asd, asdw"
			);
			possibleValuesRepository.save(possibleValues);
			OcrResult ocrResult = new OcrResult(
				"teszt projekt",
				1,
				23,
				23.0,
				6,
				17,
				26.0869,
				document,
				List.of(possibleValues)
			);
			
			OcrResult ocrResult2 = new OcrResult(
				"teszt elek projekt",
				3,
				31,
				10.3333,
				30,
				1,
				97.1234,
				document2
			);
			
			repository.saveAll(List.of(ocrResult, ocrResult2));
		};
	}
}
