package com.example.projectmg.core;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;

import static com.example.projectmg.Utils.isNotDefaultValue;

public class DTOMapper {

    public Object DtoMapToEntity(Object source, Class<?> targetClass) {
        try {
            Object target = targetClass.getDeclaredConstructor().newInstance();
            return this.DtoMapToEntity(source, target);
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Dto Create Failed", e);
        }
    }

    /**
     * Generates a function comment for the given function body.
     *
     * @param  source  the source object
     * @param  target  the target object
     * @return         the target object after mapping from the source object
     *
     *
     * This code snippet is a method named DtoMapToEntity that takes in two objects, source and target, and maps the
     * values from the source object to the corresponding fields in the target object. It does this by using reflection
     * to iterate through the methods of the source object and check if they are getter methods. If a getter method is
     * found, the corresponding setter method in the target object is invoked to set the value. It also handles mapping
     * of lists and special cases where the method names end with "Id" or "Ids". Finally, the target object is returned.
     */
    public Object DtoMapToEntity(Object source, Object target) {
        try {
            Class<?> sourceClass = source.getClass();
            Class<?> targetClass = target.getClass();
            for (Method sourceMethod : sourceClass.getMethods()) {
                if (sourceMethod.getName().startsWith("get") || sourceMethod.getName().startsWith("is")) {
                    Object value = sourceMethod.invoke(source);
                    if (isNotDefaultValue(value)) {
                        //check if is method name end with Id or Ids
                        if (sourceMethod.getName().endsWith("Id") || sourceMethod.getName().endsWith("Ids")) {
                            //remove get and id or ids from method name to get filed name
                            String fieldName = sourceMethod.getName().substring(3, sourceMethod.getName().length() - (sourceMethod.getName().endsWith("Id") ? 2 : 3));
                            for (Method targetMethod : targetClass.getMethods()) {
                                if (targetMethod.getName().equals("set" + fieldName)) {
                                    Field paramField = getFiled(targetClass, fieldName);
//                                    System.out.println();
                                    Class<?> parameterClass = paramField.getType();
                                    if(List.class.isAssignableFrom(parameterClass)) {
                                        //get type of list from parameterClass
//                                        System.out.println(.getName());
                                        Class<?> parameterType = ((Class<?>)((ParameterizedType)paramField.getGenericType()).getActualTypeArguments()[0]);


                                        List<Object> list = new ArrayList<>();
                                        //
                                        for (Object sourceId : (List<Object>) value) {
                                            Object parameterValue = parameterType.getDeclaredConstructor().newInstance();
                                            for (Method parameterMethod : parameterValue.getClass().getMethods()) {
                                                if (parameterMethod.getName().equals("setId")) {
                                                    parameterMethod.invoke(parameterValue, sourceId);
                                                }
                                            }
                                            list.add(parameterValue);
                                        }
                                        targetMethod.invoke(target, list);
                                    }else {
                                        Object parameterValue = parameterClass.getDeclaredConstructor().newInstance();
                                        for (Method parameterMethod : parameterClass.getMethods()) {
                                            if (parameterMethod.getName().equals("setId")) {
                                                parameterMethod.invoke(parameterValue, value);
                                            }
                                        }
                                        targetMethod.invoke(target, parameterValue);
                                    }
                                }
                            }
                        } else {
                            String name = sourceMethod.getName().substring(sourceMethod.getName().startsWith("is") ? 2 : 3);
                            for (Method targetMethod : targetClass.getMethods()) {
                                if (targetMethod.getName().equals("set" + name)) {
                                    targetMethod.invoke(target, value);
                                }
                            }

                        }
                    }
                }
            }
            return target;
        } catch (Exception e) {
            throw new IllegalArgumentException("Dto Create Failed", e);
        }
    }

    private Field getFiled(Class<?> targetClass, String fieldName) {
        Class<?> clazz = targetClass;
        String x = (fieldName.charAt(0)+"").toLowerCase()+fieldName.substring(1);

        while (clazz != Object.class) {
            for(Field field : clazz.getDeclaredFields()) {

                if(field.getName().equals(x)) {
                    return field;
                }
            }
            clazz = clazz.getSuperclass();
        }
        return null;
    }

}
