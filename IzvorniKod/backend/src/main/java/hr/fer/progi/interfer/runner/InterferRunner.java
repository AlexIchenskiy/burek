package hr.fer.progi.interfer.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import hr.fer.progi.interfer.entity.Category;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.repository.CategoryRepository;
import hr.fer.progi.interfer.repository.UserRepository;

@Component
public class InterferRunner implements ApplicationRunner {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Value("${admin.mail}")
    private String mail;
	
	@Value("${admin.pass}")
    private String pass;
	
    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (userRepository.existsByEmail(mail))
			return;
		
		User admin = new User();	
		admin.setFirstName("System");
		admin.setLastName("");
		admin.setEmail(mail);
		admin.setPassword(passwordEncoder.encode(pass));
		admin.setEnabled(true);
		admin.setRole(UserRole.ADMIN);
		userRepository.save(admin);

		Category trending = new Category();
		trending.setName("trending");
		trending.setArticleCount(0);
		categoryRepository.save(trending);
		

    }
}
