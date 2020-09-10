docker rmi ramesesinc/filipizen-server:0.0.1 -f

docker system prune -f

docker build --build-arg DOCKER_ENV=production -t ramesesinc/filipizen-server:0.0.1 --rm .

