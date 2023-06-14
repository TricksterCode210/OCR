package hu.szakdolgozat.backend.ocr;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OcrResultConfig
{
	@Bean("ocrResult")
	CommandLineRunner commandLineRunner(
		OcrResultRepository repository
	){
		return args -> {
			OcrResult ocrResult = new OcrResult(
				"teszt projekt",
				2,
				3,
				1,
				null
			);
			
			repository.save(ocrResult);
		};
	}
}
