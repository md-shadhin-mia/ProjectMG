package com.example.projectmg.core;

import java.util.List;

public interface CRUDService<E, D> {
    public E create(D entity);
    public E update(Long id,D dto);
    public void delete(Long id);
    public E findById(Long id);
    public List<E> findAll();
}
