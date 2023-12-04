# ProjectMG

A full-stack project management application with Spring Boot backend and React frontend, containerized with Podman/Docker.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  React SPA  │────▶│  Spring Boot │────▶│  MySQL 8.0  │
│  (Vite)     │     │  (Java 17)   │     │             │
│  Port 8081  │     │  Port 8081   │     │  Port 3306  │
└─────────────┘     └──────────────┘     └─────────────┘
     Static            REST API              Database
     Assets            + JWT Auth
```

- **Frontend**: React + Vite, built as static assets served by Spring Boot
- **Backend**: Spring Boot 3.0.2, Java 17, Spring Security 6 with JWT
- **Database**: MySQL 8.0 with Hibernate/JPA
- **Containerization**: Podman (Docker-compatible)

## Quick Start

### Option 1: Compose script (recommended)

```bash
./compose.sh up      # Build + start everything
./compose.sh down    # Stop + cleanup
./compose.sh restart # Full rebuild + restart
./compose.sh logs    # Follow logs
./compose.sh status  # Show container status
```

### Option 2: Manual podman commands

```bash
# Start MySQL
podman run -d --name projectmg-mysql \
  --network host \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=example_db \
  -e MYSQL_USER=example_user \
  -e MYSQL_PASSWORD=example_password \
  docker.io/library/mysql:8.0

# Wait 10s for MySQL to initialize, then start backend
podman run -d --name projectmg-backend \
  --network host \
  -e SERVER_PORT=8081 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/example_db \
  -e SPRING_DATASOURCE_USERNAME=example_user \
  -e SPRING_DATASOURCE_PASSWORD=example_password \
  -v $(pwd)/target/projectMG-0.0.1-SNAPSHOT.jar:/app/app.jar \
  docker.io/library/eclipse-temurin:17-jre-alpine \
  java -jar /app/app.jar
```

### Build from source (requires podman)

```bash
# Build frontend + backend jar (no local node/java needed)
podman run --rm -v $(pwd):/app -w /app \
  docker.io/library/maven:3.8.3-openjdk-17 \
  mvn clean package -DskipTests

# Build frontend separately (optional, already included in jar)
podman run --rm -v $(pwd):/app -w /app/frontend \
  docker.io/library/node:18-alpine \
  sh -c "npm install && npm run build"
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login, returns JWT | No |

**Register:**
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123","firstName":"John","lastName":"Doe"}'
```

**Login:**
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -d "username=john&password=pass123" \
  -H "Content-Type: application/x-www-form-urlencoded"
# Returns: {"token":"eyJhbGci..."}
```

### Projects (requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create project |
| GET | `/api/projects/{id}` | Get project |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |

**Authenticated request:**
```bash
TOKEN="eyJhbGci..."
curl -H "Authorization: Bearer $TOKEN" http://localhost:8081/api/projects
```

## Project Structure

```
ProjectMG/
├── src/main/java/com/example/projectmg/
│   ├── ProjectMgApplication.java      # Main entry point
│   ├── SecurityConfig.java            # JWT + Spring Security
│   ├── Controller/
│   │   ├── AuthController.java        # Register/Login
│   │   └── ProjectController.java     # Project CRUD
│   ├── JPA/
│   │   ├── BaseEntity.java            # Base entity (id, createdAt)
│   │   ├── User.java                  # User entity
│   │   ├── UserRepository.java        # User repository
│   │   └── Task.java                  # Task entity
│   ├── goal/
│   │   ├── Goal.java                  # Goal entity
│   │   └── GoalRepository.java        # Goal repository
│   └── Services/
│       └── UserDetailsServiceImpl.java
├── src/main/resources/
│   ├── application.yml                # App config
│   ├── app.key / app.pub              # RSA keys for JWT
│   └── static/                        # Frontend build output
│       ├── index.html
│       └── assets/
├── frontend/                          # React source
│   ├── src/
│   │   ├── App.jsx                    # Routes
│   │   ├── fetcher/index.jsx          # API client
│   │   ├── Pages/LandingPage.jsx      # Landing page
│   │   ├── Pages/Auth/                # Login/Register
│   │   └── sideNavigation.jsx
│   └── package.json
├── Dockerfile                         # Multi-stage build
├── docker-compose.yml                 # Podman/Docker compose
├── compose.sh                         # Podman compose script
└── pom.xml                            # Maven config
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_PORT` | `8080` | App port |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/example_db` | MySQL connection URL |
| `SPRING_DATASOURCE_USERNAME` | `example_user` | MySQL username |
| `SPRING_DATASOURCE_PASSWORD` | `example_password` | MySQL password |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` | Schema management |

## Tech Stack

- **Backend**: Java 17, Spring Boot 3.0.2, Spring Security 6, Hibernate, Nimbus JOSE+JWT
- **Frontend**: React 18, Vite, React Router, Tailwind CSS
- **Database**: MySQL 8.0
- **Build**: Maven 3.8.3, Node 18
- **Runtime**: Eclipse Temurin JRE 17 (Alpine)
- **Containers**: Podman 5.7.0 (Docker-compatible)

## Troubleshooting

**Container won't start:**
```bash
podman logs projectmg-backend
podman logs projectmg-mysql
```

**Reset database:**
```bash
./compose.sh down
./compose.sh up
```

**Port already in use:**
```bash
podman stop projectmg-mysql projectmg-backend
podman rm projectmg-mysql projectmg-backend
# Or use a different port:
SERVER_PORT=9090 ./compose.sh up
```

**Rebuild without cache:**
```bash
./compose.sh down
./compose.sh up
```
