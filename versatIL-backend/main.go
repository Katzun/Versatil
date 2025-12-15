package main

import (
	"github.com/saaaileen/versatil-backend/controller"
	databaseconnection "github.com/saaaileen/versatil-backend/database-connection"
	"github.com/saaaileen/versatil-backend/router"
	taskrepository "github.com/saaaileen/versatil-backend/task-repository"
	taskservice "github.com/saaaileen/versatil-backend/task-service"
	userrepository "github.com/saaaileen/versatil-backend/user-repository"
	userservice "github.com/saaaileen/versatil-backend/user-service"
)

func main() {
	db := databaseconnection.ConnectDatabase()
	userrepo := userrepository.NewUserRepository(db)
	service := userservice.NewUserService(userrepo)
	usercontroller := controller.NewUserController(service)
	tasrepo := taskrepository.NewUserRepository(db)
	taskservice := taskservice.NewUserService(tasrepo)
	taskcontroller := controller.NewTaskController(taskservice)
	router.NewRouter(usercontroller, taskcontroller)
}
