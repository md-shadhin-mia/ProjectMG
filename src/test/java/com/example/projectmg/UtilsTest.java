package com.example.projectmg;

import lombok.Data;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UtilsTest {

    @Data
    public static class SourceBean {
        private String name;

    }

    @Data
    public static class TargetBean {
        private String name;
    }

    @Test
    public void testCopyNonNullProperties() {
        SourceBean source = new SourceBean();
        source.setName("Source Value");

        TargetBean target = new TargetBean();

        // Call the method to copy non-null properties
        Utils.copyNonNullProperties(source, target);

        // Assert that the non-null property has been copied
        assertEquals("Source Value", target.getName());
    }


}
