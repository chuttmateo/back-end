package tpigrupo2.bacend.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.repository.IUserRepository;

@Service
public class UserService implements UserDetailsService {
    private IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByusername(username).orElseThrow(()->new UsernameNotFoundException("el usuario no existe"));
    }
}
