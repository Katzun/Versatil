package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/saaaileen/versatil-backend/model"
	taskservice "github.com/saaaileen/versatil-backend/task-service"
)

type TaskController struct {
	userService taskservice.TaskService
}

func NewTaskController(userService taskservice.TaskService) *TaskController {
	return &TaskController{
		userService: userService,
	}
}

func (u *TaskController) CreateTask(context *gin.Context) {
	var userRequest model.Task
	err := context.ShouldBindBodyWithJSON(&userRequest)
	fmt.Println(err)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Request",
		})
		return
	}

	message, err := u.userService.CreateTask(userRequest.Title, userRequest.Description, userRequest.Status, userRequest.Priority, userRequest.UserId, userRequest.Subtasks, userRequest.DueDate, userRequest.Progress)
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

func (u *TaskController) GetTask(context *gin.Context) {
	userid := context.Query("userid")
	if userid == "" {
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "userid is required",
		})
		return
	}

	message, err := u.userService.GetTasks(userid)
	if err != nil {
		fmt.Println("controller ", err)
		if err.Error() == "wrong password" {
			context.JSON(http.StatusUnauthorized, gin.H{
				"message": "wrong password",
			})
			return
		}
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "Error",
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

	context.JSON(http.StatusOK, gin.H{
		"message": "Success",
		"task":    string(userJSON),
	})

}

func (u *TaskController) UpdateTask(context *gin.Context) {
	var userRequest model.Task
	err := context.ShouldBindBodyWithJSON(&userRequest)
	fmt.Println(err)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Request",
		})
		return
	}

	message, err := u.userService.UpdateTask(userRequest.Id, userRequest.Title, userRequest.Description, userRequest.Status, userRequest.Priority, userRequest.UserId, userRequest.Subtasks, userRequest.DueDate, userRequest.Progress)
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

func (u *TaskController) DeleteTask(context *gin.Context) {
	var taskReq model.DeleteTaskRequest
	err := context.ShouldBindBodyWithJSON(&taskReq)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Request",
		})
		return
	}

	message, err := u.userService.DeleteTask(taskReq.TaskId)
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
