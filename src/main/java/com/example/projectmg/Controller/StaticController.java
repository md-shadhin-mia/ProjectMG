package com.example.projectmg.Controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.NoSuchElementException;

@Controller
@Order(Integer.MAX_VALUE)
public class StaticController {

    @GetMapping("/hello")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("hi! Shadhin");
    }
   /* private final ResourceLoader resourceLoader;

    @Value("${spring.web.resources.static-locations:classpath:/static/}")
    private String[] staticResourcePaths;

    public StaticController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @GetMapping("/{filename:.+}")
    @ResponseBody
    public Resource getStaticResource(@PathVariable String filename) {
        for (String path : staticResourcePaths) {
            Resource resource = resourceLoader.getResource(path + filename);
            if (resource.exists())
                return resource;
            else{
                resource = resourceLoader.getResource(path + "index.html");
                if(resource.exists())
                    return resource;
            }
        }
        throw new NoSuchElementException();
    }*/
}
