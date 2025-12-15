package taskservice

import (
	"github.com/saaaileen/versatil-backend/model"
)

type TaskService interface {
	CreateTask(title, description, status, priority, userid, subtasks string, duedate string, progress int32) (string, error)
	GetTasks(userid string) ([]model.Task, error)
	UpdateTask(id, title, description, status, priority, userid, subtasks string, duedate string, progress int32) (string, error)
	DeleteTask(id string) (string, error)
}
