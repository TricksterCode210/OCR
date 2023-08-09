package hu.szakdolgozat.backend.vocabulary;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, String>
{
	@Query(value = "SELECT v.words FROM Vocabulary v")
	List<String> getAll();
	Vocabulary getByWords(String word);
}
