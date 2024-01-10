package hr.fer.progi.interfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.interfer.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

}
