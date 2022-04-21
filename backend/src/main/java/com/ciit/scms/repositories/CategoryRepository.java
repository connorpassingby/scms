package com.ciit.scms.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ciit.scms.models.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer>{
	List<Category> findByName(String name);
}
