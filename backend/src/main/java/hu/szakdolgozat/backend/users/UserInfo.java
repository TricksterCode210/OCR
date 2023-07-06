package hu.szakdolgozat.backend.users;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class UserInfo
{
	@Id
	@SequenceGenerator(
		name = "users_sequence",
		sequenceName = "users_sequence",
		allocationSize = 1
	)
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "users_sequence"
	)
	private Long id;
	private String name;
	private String email;
	private String password;
	
	public UserInfo(Long id, String name, String email, String password)
	{
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	public UserInfo(String name, String email, String password)
	{
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	public UserInfo()
	{
	}
	
	public Long getId()
	{
		return id;
	}
	
	public void setId(Long id)
	{
		this.id = id;
	}
	
	public String getName()
	{
		return name;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}
	
	public String getEmail()
	{
		return email;
	}
	
	public void setEmail(String email)
	{
		this.email = email;
	}
	
	public String getPassword()
	{
		return password;
	}
	
	public void setPassword(String password)
	{
		this.password = password;
	}
	
	@Override
	public String toString()
	{
		return "User{" +
			"id=" + id +
			", name='" + name + '\'' +
			", username='" + email + '\'' +
			", password='" + password + '\'' +
			'}';
	}
}
