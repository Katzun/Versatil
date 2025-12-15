package userrepository

import (
	"errors"
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

func (u *RepositoryImpl) CreateUser(user *model.User) error {
	fmt.Println("creating user")
	err := u.db.Create(user).Error
	if err != nil {
		fmt.Println("error in creating user, with error : ", err)
	}
	return err
}

func (u *RepositoryImpl) UserLogin(email, password string) (model.User, error) {
	fmt.Println("Getting user creds")
	var user model.User
	err := u.db.Where("email = ?", email).First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("User not found with corresponding email")
			return model.User{}, err
		}
		fmt.Println("Database error")
		return model.User{}, err
	}

	if user.Password != password {
		fmt.Println("Wrong password")
		return model.User{}, fmt.Errorf("wrong password")
	}

	fmt.Println(user)

	return user, err
}
