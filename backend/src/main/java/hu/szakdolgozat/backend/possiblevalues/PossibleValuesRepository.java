package hu.szakdolgozat.backend.possiblevalues;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PossibleValuesRepository extends JpaRepository<PossibleValues, String>
{
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM PossibleValues p WHERE p.projectName = :projectName")
	void deleteByProjectName(@Param("projectName")String projectName);
}
