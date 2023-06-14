package hu.szakdolgozat.backend.users;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig
{
	@Bean("users")
	CommandLineRunner commandLineRunner(
		UserRepository repository
	){
		return args -> {
			UserInfo u1 = new UserInfo(
				"Dinnyés Dávid",
				"dinnyesd@scriptum.hu",
				"TesztPass12"
			);

			repository.save(u1);
		};
	}
}
