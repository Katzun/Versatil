package userservice

import "github.com/saaaileen/versatil-backend/model"

type UserService interface {
	CreateUser(username, email, password string) (string, error)
	UserLogin(email, password string) (model.User, error)
}
