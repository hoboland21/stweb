FROM alpine

WORKDIR /usr/src/app/angular
RUN apk update  && \
	apk add npm mc  && \
	npm install -g @angular/cli bootstrap && \
	apk add --no-cache tzdata	
ENV TZ=America/LosAngeles
