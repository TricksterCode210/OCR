package hu.szakdolgozat.backend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserController
{
	private final UserService userService;
	
	@Autowired
	public UserController(UserService userService)
	{
		this.userService = userService;
	}
	
	@PostMapping(path = "/")
	public boolean login(@RequestBody UserInfo userInfo1){
		return userService.bejelentkezes(userInfo1);
	}
	
	@PostMapping(path="/register")
	public UserInfo register(@RequestBody UserInfo userInfo1)
	{
		return userService.regisztracio(userInfo1);
	}
}
