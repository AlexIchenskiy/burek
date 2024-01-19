/*
package hr.fer.progi.interfer.repository;

import hr.fer.progi.interfer.entity.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.rules.ExpectedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSave() {
        var user = User
                .builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@fer.hr")
                .password("password")
                .role(UserRole.STUDENT)
                .build();

        var savedUser = userRepository.save(user);

        assertNotNull(savedUser);
        assertTrue(savedUser.getId() > 0);
    }

    @Test
    public void testFindAll() {
        var user = User
                .builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@fer.hr")
                .password("password")
                .role(UserRole.STUDENT)
                .build();
        var user2 = User
                .builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe2@fer.hr")
                .password("password")
                .role(UserRole.STUDENT)
                .build();

        userRepository.save(user);
        userRepository.save(user2);

        List<User> userList = userRepository.findAll();

        assertNotNull(userList);
        assertEquals(2, userList.size());
    }

    @Test
    public void testDuplicateEmail() {
        var user = User
                .builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@fer.hr")
                .password("password")
                .role(UserRole.STUDENT)
                .build();
        var user2 = User
                .builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@fer.hr")
                .password("password")
                .role(UserRole.STUDENT)
                .build();

        userRepository.save(user);

        var thrown = false;

        try {
            userRepository.save(user2);
        } catch (DataIntegrityViolationException e) {
            thrown = true;
        }

        assertTrue(thrown);
    }

    @Test
    public void testFindById() {
        var user = User
                .builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@fer.hr")
                .password("password")
                .role(UserRole.STUDENT)
                .build();

        userRepository.save(user);

        var userFetched = userRepository.findById(user.getId());

        userFetched.orElseThrow();
    }

    @Test
    void testExistsByEmail() {
        var email = "john.doe@fer.hr";

        var user = User
                .builder()
                .firstName("John")
                .lastName("Doe")
                .email(email)
                .password("password")
                .role(UserRole.STUDENT)
                .build();

        userRepository.save(user);

        assertTrue(userRepository.existsByEmail(email));
    }

    @Test
    void testFindByRole() {
        var role = UserRole.STUDENT;

        var user = User
                .builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@fer.hr")
                .password("password")
                .role(role)
                .build();

        userRepository.save(user);

        var userList = userRepository.findByRole(role);

        assertFalse(userList.isEmpty());
    }
}
*/