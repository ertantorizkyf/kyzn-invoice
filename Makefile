# Root Makefile for kyzn-invoice (FE + BE + DB)
# Uses docker-compose file located in ./docker/docker-compose.yml

COMPOSE_FILE = docker/docker-compose.yml

# Start all services (BE, FE, DB) in detached mode
up:
	docker compose -f $(COMPOSE_FILE) up -d

# Start all services in foreground with logs
run:
	docker compose -f $(COMPOSE_FILE) up

# Stop and remove all services
down:
	docker compose -f $(COMPOSE_FILE) down

# Build/rebuild all service images
build:
	docker compose -f $(COMPOSE_FILE) build

# Restart all services (down + up)
restart: down up

# Clean rebuild (no cache, remove old containers & volumes)
rebuild:
	docker compose -f docker/docker-compose.yml down -v --remove-orphans
	docker compose -f docker/docker-compose.yml build --no-cache
	docker compose -f docker/docker-compose.yml up -d

# Rebuild only backend & frontend, keep db intact
rebuild-app:
	docker compose -f docker/docker-compose.yml build --no-cache be fe
	docker compose -f docker/docker-compose.yml up -d be fe

# Rebuild only frontend
rebuild-fe:
	docker compose -f docker/docker-compose.yml build --no-cache fe
	docker compose -f docker/docker-compose.yml up -d fe

# Rebuild only backend
rebuild-be:
	docker compose -f docker/docker-compose.yml build --no-cache be
	docker compose -f docker/docker-compose.yml up -d be