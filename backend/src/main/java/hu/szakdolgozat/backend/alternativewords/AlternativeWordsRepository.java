package hu.szakdolgozat.backend.alternativewords;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AlternativeWordsRepository extends JpaRepository<AlternativeWords, String>
{
	@Query(value = "SELECT a.word FROM AlternativeWords a WHERE difference(a.word, :param) > 2")
	List<String> getTop5Words(@Param("param") String word);
	
	AlternativeWords getByWord(String word);
}
