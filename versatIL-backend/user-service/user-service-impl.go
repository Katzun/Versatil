package userservice

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/saaaileen/versatil-backend/model"
	userrepository "github.com/saaaileen/versatil-backend/user-repository"
)

type UserServiceImpl struct {
	userrepo userrepository.UserRepository
}

func NewUserService(userrepo userrepository.UserRepository) *UserServiceImpl {
	return &UserServiceImpl{
		userrepo: userrepo,
	}
}

func (u *UserServiceImpl) CreateUser(username, email, password string) (string, error) {
	user := &model.User{
		UserId:   uuid.NewString(),
		Name:     username,
		Email:    email,
		Password: password,
	}
	fmt.Println("user impl create user")
	err := u.userrepo.CreateUser(user)

	if err != nil {
		return "Error", err
	}
	return "Success", nil
}

func (u *UserServiceImpl) UserLogin(email, password string) (model.User, error) {
	user, err := u.userrepo.UserLogin(email, password)
	if err != nil {
		fmt.Println(err)
		return model.User{}, err
	}
	fmt.Println("userid", user.UserId)
	return user, err
}
