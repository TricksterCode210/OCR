package hu.szakdolgozat.backend.ocr;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OcrResultRepository extends JpaRepository<OcrResult, Long>
{
	OcrResult getOcrResultByProjectName(String projectName);
	
	List<OcrResult> findAll();
}
