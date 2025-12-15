package taskrepository

import "github.com/saaaileen/versatil-backend/model"

type TaskRepository interface {
	CreateTask(task *model.Task) error
	GetTasks(userid string) ([]model.Task, error)
	UpdateTask(task *model.Task) error
	DeleteTask(id string) error
}
