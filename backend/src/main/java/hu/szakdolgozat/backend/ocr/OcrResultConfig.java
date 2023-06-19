package hu.szakdolgozat.backend.ocr;

import hu.szakdolgozat.backend.ocrdocument.OcrDocument;
import hu.szakdolgozat.backend.ocrdocument.OcrDocumentRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OcrResultConfig
{
	private final OcrDocumentRepository ocrDocumentRepository;
	
	public OcrResultConfig(OcrDocumentRepository ocrDocumentRepository)
	{
		this.ocrDocumentRepository = ocrDocumentRepository;
	}
	
	@Bean("ocrResult")
	CommandLineRunner commandLineRunner(
		OcrResultRepository repository
	){
		return args -> {
			OcrDocument document = new OcrDocument(
				"teszt",
				"txt",
				"teszt szöveg".getBytes("UTF-8")
			);
			ocrDocumentRepository.save(document);
			OcrResult ocrResult = new OcrResult(
				"teszt projekt",
				2,
				3,
				1,
				document
			);
			
			OcrResult ocrResult2 = new OcrResult(
				"teszt elek projekt",
				2,
				7,
				3.5,
				document
			);
			
			repository.saveAll(List.of(ocrResult, ocrResult2));
		};
	}
}
