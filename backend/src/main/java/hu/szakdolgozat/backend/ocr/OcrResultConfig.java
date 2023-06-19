package hu.szakdolgozat.backend.ocr;

import java.io.File;
import java.nio.file.Path;
import java.util.List;
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
				new File("C:\\Users\\DinnyesD\\IdeaProjects\\OCR\\backend\\src\\main\\resources\\documents\\ocr_result_teszt.txt")
			);
			
			OcrResult ocrResult2 = new OcrResult(
				"teszt elek projekt",
				2,
				7,
				3.5,
				new File("C:\\Users\\DinnyesD\\IdeaProjects\\OCR\\backend\\src\\main\\resources\\documents\\ocr_result_teszt.txt")
			);
			
			repository.saveAll(List.of(ocrResult, ocrResult2));
		};
	}
}
