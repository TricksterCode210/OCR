package hu.szakdolgozat.backend.alternativewords;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AlternativeWordsRepository extends JpaRepository<AlternativeWords, String>
{
	@Query(value = "SELECT a FROM AlternativeWords a")
	List<AlternativeWords> getAll();
	AlternativeWords getByWord(String word);
}
