package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type clientMail struct {
	From    string `json:"from"`
	To      string `json:"to"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

func addStringAndLine(newText string, baseText string) string {
	baseText = baseText + newText + "\r\n"

	return baseText
}

func prepareMessage(message *clientMail) string {
	var finalMessage string

	finalMessage = addStringAndLine("Subject: "+message.Subject, finalMessage)
	finalMessage = addStringAndLine(message.Message, finalMessage)

	return "Cci: YOUR-GMAIL-ADDRESS@gmail.com \r\n" + finalMessage
}

// FormHandler function
func FormHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	var clientBody *clientMail

	// unmarshal in pointer
	err = json.Unmarshal(body, &clientBody)
	if err != nil {
		panic(err)
	}

	mailParams := MailParams{
		from:    clientBody.From,
		to:      clientBody.To,
		message: []byte(prepareMessage(clientBody)),
	}

	err = SendMail(&mailParams)
	if err != nil {
		log.Printf("Send mail failed with %s\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]bool{"ok": true})

}
