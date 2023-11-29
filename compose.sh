#!/bin/bash
set -e

ACTION="${1:-up}"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

mysql_name="projectmg-mysql"
backend_name="projectmg-backend"

stop_and_remove() {
  echo "==> Stopping containers..."
  podman stop "$mysql_name" "$backend_name" 2>/dev/null || true
  podman rm "$mysql_name" "$backend_name" 2>/dev/null || true
  echo "==> Removing volumes..."
  podman volume rm projectmg_mysql_data 2>/dev/null || true
}

start_mysql() {
  echo "==> Starting MySQL..."
  podman run -d --name "$mysql_name" \
    --network host \
    -e MYSQL_ROOT_PASSWORD=rootpass \
    -e MYSQL_DATABASE=example_db \
    -e MYSQL_USER=example_user \
    -e MYSQL_PASSWORD=example_password \
    -v projectmg_mysql_data:/var/lib/mysql \
    docker.io/library/mysql:8.0
  echo "==> Waiting for MySQL to be ready..."
  for i in $(seq 1 30); do
    if podman exec "$mysql_name" mysqladmin ping -h localhost -u root -prootpass --silent 2>/dev/null; then
      echo "==> MySQL is ready"
      return 0
    fi
    sleep 1
  done
  echo "==> MySQL startup timed out"
  exit 1
}

build_and_start_backend() {
  echo "==> Building jar (frontend + backend)..."
  podman run --rm -v "$PROJECT_DIR":/app -w /app \
    docker.io/library/maven:3.8.3-openjdk-17 \
    mvn clean package -DskipTests -q

  echo "==> Starting Spring Boot..."
  podman run -d --name "$backend_name" \
    --network host \
    -e SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/example_db \
    -e SPRING_DATASOURCE_USERNAME=example_user \
    -e SPRING_DATASOURCE_PASSWORD=example_password \
    -e SERVER_PORT=8081 \
    -e SPRING_JPA_HIBERNATE_DDL_AUTO=update \
    -v "$PROJECT_DIR/target/projectMG-0.0.1-SNAPSHOT.jar":/app/app.jar \
    docker.io/library/eclipse-temurin:17-jre-alpine \
    java -jar /app/app.jar

  echo "==> Waiting for Spring Boot..."
  for i in $(seq 1 30); do
    if curl -s -o /dev/null -w '' http://localhost:8080/ 2>/dev/null; then
      echo "==> Spring Boot is ready at http://localhost:8080"
      return 0
    fi
    sleep 1
  done
  echo "==> Spring Boot startup timed out (may still be starting)"
}

show_status() {
  echo ""
  echo "=== Container Status ==="
  podman ps -a --filter "name=$mysql_name" --filter "name=$backend_name" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
  echo ""
  echo "=== Endpoints ==="
  echo "  Frontend:  http://localhost:8081/"
  echo "  Register:  POST http://localhost:8081/api/auth/register"
  echo "  Login:     POST http://localhost:8081/api/auth/login"
}

case "$ACTION" in
  up)
    stop_and_remove
    start_mysql
    build_and_start_backend
    show_status
    ;;
  down)
    stop_and_remove
    echo "==> All stopped and removed"
    ;;
  restart)
    stop_and_remove
    start_mysql
    build_and_start_backend
    show_status
    ;;
  logs)
    podman logs -f "$2" 2>/dev/null || podman logs -f "$mysql_name" "$backend_name"
    ;;
  status)
    show_status
    ;;
  *)
    echo "Usage: $0 {up|down|restart|logs|status}"
    exit 1
    ;;
esac
