# ProjectMG — MVP Guide

Project management web application with Spring Boot 3 backend (JPA, Security, OAuth2) and React/Vite frontend, backed by MySQL.

## Current Status

**Implemented:**
- Spring Boot 3.0.2 backend scaffold with dependencies: data-jpa, security, web, oauth2-resource-server, mysql-connector, lombok, springdoc-openapi
- Docker Compose with MySQL and spring-app services
- React frontend (`frontend/`) with Vite, Tailwind CSS, React Router — includes App.jsx with pages directory, auth protection, reducers, actions, fetchers
- Frontend has Layout, SideNavigation, TopNavigation components
- Maven profile `prod` copies frontend dist into backend static resources
- Node setup via frontend-maven-plugin (commented out)

**Missing:**
- Backend source code (`src/main/java/`) is minimal — no actual models, repositories, controllers, or services
- No entity classes (Project, Task, User, etc.)
- No security configuration (JWT/OAuth2 resource server not configured)
- No REST API endpoints
- Frontend pages are mostly empty shells
- No database schema/migrations
- No tests
- `frontend-maven-plugin` is commented out — frontend build is manual

## MVP Tasks

### 1. Design Database Schema
Based on the frontend structure (projects, tasks, auth), create entities:
```java
@Entity public class User {
    @Id @GeneratedValue(strategy=UUID) private UUID id;
    private String email, passwordHash, name;
}

@Entity public class Project {
    @Id @GeneratedValue(strategy=UUID) private UUID id;
    private String name, description;
    @ManyToOne private User owner;
    @ManyToMany private Set<User> members;
}

@Entity public class Task {
    @Id @GeneratedValue(strategy=UUID) private UUID id;
    private String title, description, status; // todo, in_progress, done
    private int priority;
    @ManyToOne private Project project;
    @ManyToOne private User assignee;
    private LocalDate dueDate;
}
```

### 2. Create Spring Boot Backend
- **UserController**: `POST /api/auth/register`, `POST /api/auth/login`
- **ProjectController**: `GET/POST /api/projects`, `GET/PUT/DELETE /api/projects/{id}`
- **TaskController**: `GET/POST /api/projects/{id}/tasks`, `PUT/DELETE /api/tasks/{id}`
- Implement JWT token provider using `spring-security-oauth2-jose`
- Configure `SecurityFilterChain` with JWT authentication filter

### 3. Configure Security
```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) {
    http.csrf().disable()
        .sessionManagement().sessionCreationPolicy(STATELESS)
        .and()
        .authorizeHttpRequests()
        .requestMatchers("/api/auth/**").permitAll()
        .anyRequest().authenticated()
        .and()
        .oauth2ResourceServer().jwt();
    return http.build();
}
```

### 4. Connect Frontend to Backend
- Update `frontend/src/fetcher/` to make API calls to backend
- Set up React Context or Redux for auth state management
- Wire up login/signup forms to `/api/auth/` endpoints
- Wire up project list view to `/api/projects`
- Wire up task board to `/api/projects/{id}/tasks`

### 5. Database Configuration
- Update `docker-compose.yml` with proper database credentials
- Create `schema.sql` or use JPA `ddl-auto=update`
- Configure `application.properties` for MySQL connection

### 6. Build Pipeline
- Uncomment and fix the `frontend-maven-plugin` in pom.xml's prod profile
- Or add a Makefile/npm script that:
  1. `cd frontend && npm run build`
  2. `cd .. && mvn clean package -Pprod`

### 7. Testing
- Test auth flow: register → login → get JWT → access protected endpoints
- Test CRUD for projects and tasks
- Test frontend-backend integration with `docker-compose up`

### Run Commands
```bash
# Start MySQL
docker-compose up mysql -d

# Build and run backend
./mvnw spring-boot:run

# In another terminal, run frontend
cd frontend && npm run dev
```
