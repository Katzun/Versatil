package model

type GetTaskRequest struct {
	UserId string `json:"userid"`
}

type Task struct {
	Id          string `json:"id"`
	UserId      string `json:"userId"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	DueDate     string `json:"dueDate"`
	Priority    string `json:"priority"`
	Progress    int32  `json:"progress"`
	Subtasks    string `json:"subtasks"`
}

type Subtask struct {
	Id        string `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

type DeleteTaskRequest struct {
	TaskId string `json:"taskid"`
}
