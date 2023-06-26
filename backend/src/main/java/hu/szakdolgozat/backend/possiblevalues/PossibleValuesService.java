package hu.szakdolgozat.backend.possiblevalues;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PossibleValuesService
{
	private final PossibleValuesRepository possibleValuesRepository;
	
	@Autowired
	public PossibleValuesService(PossibleValuesRepository possibleValuesRepository)
	{
		this.possibleValuesRepository = possibleValuesRepository;
	}
}
