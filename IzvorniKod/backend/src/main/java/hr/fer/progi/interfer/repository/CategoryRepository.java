package hr.fer.progi.interfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import hr.fer.progi.interfer.entity.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
