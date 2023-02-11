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
            BeanInfo beanInfo = Introspector.getBeanInfo(source.getClass());
            PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
            for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
                Method readMethod = propertyDescriptor.getReadMethod();
                Method writeMethod = propertyDescriptor.getWriteMethod();
                if (readMethod != null && writeMethod != null) {
                    Object value = readMethod.invoke(source);
                    if (value != null) {
                        writeMethod.invoke(target, value);
                    }
                }
            }
        } catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
            // handle the exception
        }
    }

}
