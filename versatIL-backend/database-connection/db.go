package databaseconnection

import (
	"fmt"
	"os"

	"github.com/saaaileen/versatil-backend/model"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDatabase() *gorm.DB {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")

	dbURL := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable connect_timeout=10", host, user, password, dbname, port)
	fmt.Printf("Attempting to connect to database: %s\n", dbURL)

	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	err = db.AutoMigrate(
		&model.User{},
		&model.Task{},
	)

	if err != nil {
		panic(err)
	}
	fmt.Print("SUCCESSFULLY CONNECTED TO DATABASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	return db
}
