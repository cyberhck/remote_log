FROM mhart/alpine-node:latest

MAINTAINER cyberhck gautam.nishchal@gmail.com

WORKDIR /app
ADD . .

RUN rm Dockerfile && rm -Rf .git && cd client && npm install && cd ../server && npm install

EXPOSE 8080 9999
CMD ["sh", "start.sh"]
