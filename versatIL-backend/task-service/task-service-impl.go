package taskservice

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/saaaileen/versatil-backend/model"
	taskrepository "github.com/saaaileen/versatil-backend/task-repository"
)

type TaskServiceImpl struct {
	taskrepo taskrepository.TaskRepository
}

func NewUserService(userrepo taskrepository.TaskRepository) *TaskServiceImpl {
	return &TaskServiceImpl{
		taskrepo: userrepo,
	}
}

func (u *TaskServiceImpl) CreateTask(title, description, status, priority, userid, subtasks string, duedate string, progress int32) (string, error) {
	user := &model.Task{
		Id:          uuid.NewString(),
		UserId:      userid,
		Title:       title,
		Description: description,
		Status:      status,
		DueDate:     duedate,
		Priority:    priority,
		Progress:    progress,
		Subtasks:    subtasks,
	}
	fmt.Println("create task in service")
	err := u.taskrepo.CreateTask(user)

	if err != nil {
		return "Error", err
	}
	return "Success", nil
}

func (u *TaskServiceImpl) GetTasks(userid string) ([]model.Task, error) {
	user, err := u.taskrepo.GetTasks(userid)
	if err != nil {
		fmt.Println(err)
		return []model.Task{}, err
	}
	return user, err
}

func (u *TaskServiceImpl) UpdateTask(id, title, description, status, priority, userid, subtasks string, duedate string, progress int32) (string, error) {
	user := &model.Task{
		Id:          id,
		UserId:      userid,
		Title:       title,
		Description: description,
		Status:      status,
		DueDate:     duedate,
		Priority:    priority,
		Progress:    progress,
		Subtasks:    subtasks,
	}
	fmt.Println("update task")
	err := u.taskrepo.UpdateTask(user)

	if err != nil {
		return "Error", err
	}
	return "Success", nil
}

func (u *TaskServiceImpl) DeleteTask(id string) (string, error) {
	err := u.taskrepo.DeleteTask(id)

	if err != nil {
		return "Error", err
	}
	return "Success", nil
}
