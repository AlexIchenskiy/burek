package hr.fer.progi.interfer.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.NotificationPostDTO;
import hr.fer.progi.interfer.dto.request.NotificationReportDTO;
import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.Comment;
import hr.fer.progi.interfer.entity.Notification;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.CommentRepository;
import hr.fer.progi.interfer.repository.NotificationRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.NotificationPostService;
import jakarta.validation.Valid;

@Service
public class NotificationPostServiceImpl implements NotificationPostService{
	
	@Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private ArticleRepository articleRepository;
    
    @Autowired
    private CommentRepository commentRepository;
    
    @Value("${admin.mail}")
    private String mail;

	@Override
	public ResponseEntity<?> send(String authorizationHeader, @Valid NotificationPostDTO notificationDetails) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User sender = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		
		if (sender == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user information");
        if (sender.getRole() == UserRole.STUDENT)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authorized to send notifications");
        
        List<Notification> notifications = new ArrayList<>();
        for(String user : notificationDetails.getTo()) {
        	Notification newNotification = new Notification();
        	
        	newNotification.setFrom(sender);
        	if (!userRepository.existsByEmail(user))
        		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User " + user + "does not exist");
        	newNotification.setTo(Set.of(userRepository.findByEmail(user)));
        	newNotification.setSubject(notificationDetails.getSubject());
        	newNotification.setContent(notificationDetails.getContent());
        	newNotification.setDateSent(Timestamp.from(Instant.now()));
        	newNotification.setSeen(false);
        	
        	notifications.add(newNotification);
        }

        notificationRepository.saveAll(notifications);
        
        return ResponseEntity.status(HttpStatus.OK).body("Notification sent");
	}

	@Override
	public ResponseEntity<?> reportArticle(String authorizationHeader,
			@Valid NotificationReportDTO notificationDetails) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User sender = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		List<User> receivers = userRepository.findByRole(UserRole.MODERATOR);
		Article article;
		try {
			article = articleRepository.findById(notificationDetails.getId()).get();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong article id");
		}
		
		Notification newNotification = new Notification();
		newNotification.setFrom(userRepository.findByEmail(mail));
		newNotification.setTo(Set.copyOf(receivers));
		
		newNotification.setSubject("Obavijest moderatorima: Prijavljeni članak na pregledu");
		newNotification.setContent(String.format(
			    "Primljena je prijava od strane korisnika %s u vezi članka s sljedećim detaljima:\n\n" +
			    "- **Naslov članka:** %s\n" +
			    "- **Autor članka:** %s\n" +
			    "- **Kategorija članka:** %s\n\n" +
			    "- **Tagovi:** %s\n\n" +
			    "Razlog prijave: %s\n\n" +
			    "Molimo vas da pregledate navedeni članak i poduzmete odgovarajuće korake:\n\n" +
			    "1. **Ukloniti članak:** Ako primijetite kršenje pravila zajednice ili prisutnost neprikladnih informacija.\n\n" +
			    "2. **Zanemariti prijavu:** Ukoliko utvrdite da članak ne krši pravila ili ako je prijava neosnovana.\n\n" +
			    "U slučaju potrebe, kontaktirajte korisnika na %s za dodatne informacije.\n\n" +
			    "Hvala na vašem angažmanu i brzoj reakciji.\n\n" +
			    "S poštovanjem,\nSustav za prijavu sadržaja",
			    sender.getFirstName() + " " + sender.getLastName(), 
			    article.getTitle(),
			    article.getAuthor().getFirstName() + " " + article.getAuthor().getLastName(), 
			    article.getCategory(), 
			    article.getTags(),
			    notificationDetails.getReason(),
			    article.getAuthor().getEmail()
			));
		newNotification.setDateSent(Timestamp.from(Instant.now()));
		newNotification.setSeen(false);
		newNotification.setReportId(article.getId());
			
		notificationRepository.save(newNotification);
		
		return ResponseEntity.status(HttpStatus.OK).body("Report sent");
	}

	@Override
	public ResponseEntity<?> reportComment(String authorizationHeader,
			@Valid NotificationReportDTO notificationDetails) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User sender = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		List<User> receivers = userRepository.findByRole(UserRole.MODERATOR);
		Comment comment;
		try {
			comment= commentRepository.findById(notificationDetails.getId()).get();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong comment id");
		}
		Notification newNotification = new Notification();
		newNotification.setFrom(userRepository.findByEmail(mail));
		newNotification.setTo(Set.copyOf(receivers));
		
		newNotification.setSubject("Obavijest moderatorima: Prijavljeni članak na pregledu");
		newNotification.setContent(String.format(
			   "Primljena je prijava od strane korisnika %s u vezi komentara s sljedećim detaljima:\n\n" +
			   "- **Autor komentara:** %s\n" +
			   "- **Tekst komentara:** %s\n\n" +
			   "Razlog prijave: %s\n\n" +
			   "Molimo vas da pregledate navedeni komentar i poduzmete odgovarajuće korake:\n\n" +
			   "1. **Ukloniti komentar:** Ako primijetite kršenje pravila zajednice ili prisutnost neprikladnih informacija.\n\n" +
			   "2. **Zanemariti prijavu:** Ukoliko utvrdite da komentar ne krši pravila ili ako je prijava neosnovana.\n\n" +
			   "U slučaju potrebe, kontaktirajte korisnika %s za dodatne informacije.\n\n" +
			   "Hvala na vašem angažmanu i brzoj reakciji.\n\n" +
			   "S poštovanjem,\nSustav za prijavu sadržaja",
			    sender.getFirstName() + " " + sender.getLastName(), 
			    article.getAuthor().getFirstName() + " " + comment.getAuthor().getLastName(), 
			    comment.getContent(), 
			    notificationDetails.getReason(),
			    article.getAuthor().getEmail()
			));
		newNotification.setDateSent(Timestamp.from(Instant.now()));
		newNotification.setSeen(false);
		newNotification.setReportId(comment.getId());
		
		notificationRepository.save(newNotification);
		
		return ResponseEntity.status(HttpStatus.OK).body("Report sent");
	}

}
