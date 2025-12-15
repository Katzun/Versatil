package taskrepository

import (
	"fmt"

	"github.com/saaaileen/versatil-backend/model"
	"gorm.io/gorm"
)

type RepositoryImpl struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *RepositoryImpl {
	return &RepositoryImpl{
		db: db,
	}
}

func (u *RepositoryImpl) CreateTask(task *model.Task) error {
	fmt.Println("creating user")
	err := u.db.Create(task).Error
	if err != nil {
		fmt.Println("error in creating user, with error : ", err)
	}
	return err
}

func (u *RepositoryImpl) GetTasks(userid string) ([]model.Task, error) {
	fmt.Println("Getting all tasks")
	var tasks []model.Task
	err := u.db.Where("user_id = ?", userid).Find(&tasks).Error

	if err != nil {
		fmt.Println("Error retrieving tasks from database:", err)
		return nil, err
	}

	return tasks, nil
}

func (u *RepositoryImpl) UpdateTask(task *model.Task) error {
	fmt.Println("updating task with ID:", task.Id)

	updateData := map[string]interface{}{
		"title":       task.Title,
		"description": task.Description,
		"status":      task.Status,
		"due_date":    task.DueDate,
		"priority":    task.Priority,
		"progress":    task.Progress,
		"subtasks":    task.Subtasks,
	}

	err := u.db.Model(&model.Task{}).Where("id = ?", task.Id).Updates(updateData).Error

	if err != nil {
		fmt.Println("error in updating task, with error:", err)
		return err
	}

	fmt.Println("task updated successfully")
	return nil
}

func (u *RepositoryImpl) DeleteTask(id string) error {
	fmt.Println("deletting task with id", id)
	err := u.db.Where("id = ?", id).Delete(&model.Task{}).Error
	if err != nil {
		fmt.Println(err)
	}
	return err
}
