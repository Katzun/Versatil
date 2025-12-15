package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/saaaileen/versatil-backend/model"
	userservice "github.com/saaaileen/versatil-backend/user-service"
)

type UserController struct {
	userService userservice.UserService
}

func NewUserController(userService userservice.UserService) *UserController {
	return &UserController{
		userService: userService,
	}
}

func (u *UserController) CreateUser(context *gin.Context) {
	var userRequest model.User
	err := context.ShouldBindBodyWithJSON(&userRequest)
	// fmt.Println("user request: ", err)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Request",
		})
		return
	}

	message, err := u.userService.CreateUser(userRequest.Name, userRequest.Email, userRequest.Password)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "Error",
		})
		return
	}
	context.JSON(http.StatusOK, gin.H{
		"message": message,
	})

}

func (u *UserController) Login(context *gin.Context) {
	var userRequest model.User
	err := context.ShouldBindBodyWithJSON(&userRequest)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Request",
		})
		return
	}

	message, err := u.userService.UserLogin(userRequest.Email, userRequest.Password)
	if err != nil {
		fmt.Println("controller ", err)
		if err.Error() == "wrong password" {
			context.JSON(http.StatusUnauthorized, gin.H{
				"message": "wrong password",
			})
			return
		}
		context.JSON(http.StatusUnauthorized, gin.H{
			"message": "user not found",
		})
		return
	}
	userJSON, marshalErr := json.Marshal(message)
	if marshalErr != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to marshal user data",
		})
		return
	}
	fmt.Println(userJSON)
	context.JSON(http.StatusOK, gin.H{
		"message": "Success",
		"user":    string(userJSON),
	})

}
