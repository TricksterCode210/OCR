package hu.szakdolgozat.backend.users;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
	private final UserRepository userRepository;
	
	@Autowired
	public UserService(UserRepository userRepository)
	{
		this.userRepository = userRepository;
	}
	
	public boolean bejelentkezes(UserInfo u1)
	{
		List<UserInfo> userInfos = userRepository.findAll();
		for (UserInfo userInfo : userInfos)
		{
			if (
				userInfo.getEmail().equals(u1.getEmail()) &&
					userInfo.getPassword().equals(u1.getPassword())
			)
			{
				return true;
			}
		}
		return false;
	}
	
	public boolean regisztracio(UserInfo u1)
	{
		List<UserInfo> userInfos = userRepository.findAll();
		for (UserInfo userInfo : userInfos)
		{
			if (userInfo.getEmail().equals(u1.getEmail()))
			{
				return false;
			}
		}
		userRepository.save(u1);
		return true;
	}
}
