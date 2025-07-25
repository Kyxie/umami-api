package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"umami-api/middleware"
	"umami-api/routes"
)

func main() {
	// Default Ports
	port := "3001"

	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())

	if err := r.SetTrustedProxies(nil); err != nil {
		log.Fatalf("Failed to set trusted proxies: %v", err)
	}

	// CORS
	r.Use(middleware.CORSMiddleware())

	// Routes
	routes.RegisterProxyRoutes(r)
	routes.RegisterScriptRoutes(r)

	// Run
	r.Run(":" + port)
}
