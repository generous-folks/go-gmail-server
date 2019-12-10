build-client: 
	cd client && yarn && yarn build && cd ..

build-server:
	go build

build-server-start:
	make build-server && ./send-email-gmail

build-dev: 
	make build-client && make build-server-start

