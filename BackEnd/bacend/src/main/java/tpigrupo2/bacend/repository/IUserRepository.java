package tpigrupo2.bacend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import tpigrupo2.bacend.model.User;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByusername(String username);
}
