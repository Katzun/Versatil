package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/saaaileen/versatil-backend/controller"
)

func NewRouter(userController *controller.UserController, taskController *controller.TaskController) {
	router := gin.New()
	router.Use(cors.Default())
	router.SetTrustedProxies([]string{"0.0.0.0:80"})
	router.Use(gin.Logger())
	router.POST("/api/CreateUser", userController.CreateUser)
	router.POST("/api/Login", userController.Login)
	router.POST("/api/CreateTask", taskController.CreateTask)
	router.GET("/api/GetTask", taskController.GetTask)
	router.POST("/api/UpdateTask", taskController.UpdateTask)
	router.POST("/api/DeleteTask", taskController.DeleteTask)
	router.Run("0.0.0.0:8080")
}
