# -------- Build Stage --------
FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o umami-api

# -------- Runtime Stage --------
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/umami-api .

EXPOSE 3001

CMD ["./umami-api"]
