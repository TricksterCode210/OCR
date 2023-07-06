package hu.szakdolgozat.backend.ocrdocument;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OcrDocumentRepository extends JpaRepository<OcrDocument, String>
{

}
