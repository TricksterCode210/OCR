package hu.szakdolgozat.backend.alternatives;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlternativeWordsRepository extends JpaRepository<AlternativeWords, String>
{
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM AlternativeWords a WHERE a.projectName = :projectName")
	void deleteByProjectName(@Param("projectName") String projectName);
}
