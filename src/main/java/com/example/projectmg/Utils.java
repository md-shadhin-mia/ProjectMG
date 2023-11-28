package com.example.projectmg;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Utils {
    public static void copyNonNullProperties(Object source, Object target) {
        try {
            Class<?> sourceClass = source.getClass();
            Class<?> targetClass = target.getClass();

            for (Method sourceMethod:sourceClass.getMethods()) {
                if (sourceMethod.getName().startsWith("get")) {
                   Object value = sourceMethod.invoke(source);
                   if (value != null ){
                       String name = sourceMethod.getName().substring(3);
                       for (Method targetMethod:targetClass.getMethods()) {
                           if (targetMethod.getName().equals("set"+name)) {
                               targetMethod.invoke(target, value);
                           }
                       }
                   }
                }
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Could not copy non-null properties", e);
        }
    }

    public static boolean isNotDefaultValue(Object value) {
        if (value == null) {
            return false; // Null is considered a default value for reference types
        }

        if (value instanceof Integer) {
            return ((Integer) value) != 0;
        }

        if (value instanceof Long) {
            return ((Long) value) != 0L;
        }

        if (value instanceof Double) {
            return ((Double) value) != 0.0;
        }

        // Add more checks for other numeric types if needed
        // For example, Float, Short, etc.

        // If it's not a recognized numeric type, you may consider it non-default
        return true;
    }
}
