package userrepository

import "github.com/saaaileen/versatil-backend/model"

type UserRepository interface {
	CreateUser(user *model.User) error
	UserLogin(email, password string) (model.User, error)
}
