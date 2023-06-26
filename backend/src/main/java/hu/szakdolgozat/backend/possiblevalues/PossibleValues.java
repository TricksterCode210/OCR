package hu.szakdolgozat.backend.possiblevalues;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "possible_values")
public class PossibleValues
{
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	private String projectName;
	private Integer positionOfValues;
	private String possibleValues;
}
