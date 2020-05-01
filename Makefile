start: ## run using env
	cp .env.example .env
	docker-compose -f docker-compose.yml up --build --force-recreate --remove-orphans

debug: ## run using dev env
	cp .env.example .env
	docker-compose -f docker-compose.local.yml up --build --force-recreate --remove-orphans

check: ## check if all correct
	docker-compose -f docker-compose.local.yml config

build: ## build docker image
	docker build . --no-cache --tag=autobot

run: ## run docker container
	cp .env.example .env
	docker run --env-file=.env -p 4000:4000/tcp autobot:latest
