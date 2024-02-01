## 1. Install required dependencies
```bash
$ npm install
```

## 2. Add environment variables
* Create a `.env` file by running the command in the terminal `touch .env`
* Copy the contents of the file `.env.example` to the `.env` file
* Update all environment variables in the `.env` file with the correct values

## 3. Setting Up PostgreSQL Database
1. Install PostgreSQL if you haven't already.
2. Access your PostgreSQL instance through the command line or a GUI tool.
3. Create a new database using the following SQL command:
```sql
 CREATE DATABASE db_name;
```

## 4. Migrations
Before using the application, you must run migrations to create the database structure.
```bash
# Create new migration ($migrationName is a name of migration)
$ npm run migration:create --name=$migrationName

# Run migrations
$ npm run migration:run

# Revert last migration
$ npm run migration:revert
```

## 5. Running the app with Docker Compose
```bash
# Build and start containers (-d - detached mode (run app in background))
$ docker-compose up [-d] --build
```

**Helpful commands:**
```bash
# Stop any container
$ docker compose stop [container name]

# Restart (1 command instead of 2: stop + up) any container
$ docker compose restart [container name]

# stop all containers and remove volumes
$ docker compose down -v

# cleanup Docker (remove containers, volumes, etc)
$ docker compose down -v && docker system prune -af && docker volume prune -f
```

## 6. Running the Nest.js app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 7. Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
