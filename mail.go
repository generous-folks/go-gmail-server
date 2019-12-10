package main

import (
	"log"
	"net/smtp"
)

// smtpServer data to smtp server.
type smtpServer struct {
	host string
	port string
}

// Address URI to smtp server.
func (s *smtpServer) Address() string {
	return s.host + ":" + s.port
}

// MailParams contains from, to and message properties
type MailParams struct {
	from    string
	to      string
	message []byte
}

// SendMail sends an email from norsys account
func SendMail(mailParams *MailParams) (err error) {
	// Sender data.
	from := "YOUR-GMAIL-ADDRESS@gmail.com"
	password := "YOUR-GMAIL-PASSWORD"

	// smtp server configuration.
	smtpServer := smtpServer{host: "smtp.gmail.com", port: "587"}

	// Authentication.
	auth := smtp.PlainAuth("", from, password, smtpServer.host)

	// Sending email.
	err = smtp.SendMail(smtpServer.Address(), auth, from, []string{mailParams.to}, mailParams.message)

	log.Print("Email processed")

	return err
}
