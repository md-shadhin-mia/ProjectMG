package com.example.projectmg.core;


import org.springframework.stereotype.Service;

import java.lang.reflect.ParameterizedType;
import java.util.List;

@Service
public class BaseService<E extends BaseEntity, D> implements CRUDService<E, D> {

    private final BaseRepository<E> repository;
    private final DTOMapper dtoMapper;

    public BaseService(BaseRepository<E> repository) {
        this.repository = repository;
        this.dtoMapper = new DTOMapper();
    }
    /**
     * @param dto
     * @return
     */
    @Override
    public E create(D dto) {
        return repository.save(this.convertForCreate(dto));
//        return null;
    }


    public E convertForCreate(D dto) {
        return (E) dtoMapper.DtoMapToEntity(dto, getEntityClass());
    }

    private Class<?> getEntityClass() {
        return (Class<?>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }

    /**
     * @param dto
     * @return
     */
    @Override
    public E update(Long id,D dto) {
        E entity = repository.findById(id).orElseThrow();
        entity = this.convertForUpdate(dto, entity);
        return repository.save(entity);
    }

    private E convertForUpdate(D dto, E entity) {
        return (E) dtoMapper.DtoMapToEntity(dto, getEntityClass());
    }

    /**
     * @param id
     */
    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    /**
     * @param id
     * @return
     */
    @Override
    public E findById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    /**
     * @return
     */
    @Override
    public List<E> findAll() {
        return repository.findAll();
    }
}
