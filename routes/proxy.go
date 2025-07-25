package routes

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func RegisterProxyRoutes(r *gin.Engine) {
	r.GET("/proxy", func(c *gin.Context) {
		startAt := c.Query("startAt")
		endAt := c.Query("endAt")

		umamiURL := os.Getenv("UMAMI_URL")
		websiteID := os.Getenv("UMAMI_WEBSITE_ID")
		token := os.Getenv("UMAMI_TOKEN")

		url := umamiURL + "/api/websites/" + websiteID + "/stats/?startAt=" + startAt + "&endAt=" + endAt

		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			log.Println("Proxy request creation failed:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "proxy failed"})
			return
		}

		req.Header.Set("Authorization", "Bearer "+token)
		req.Header.Set("User-Agent", "umami-proxy/1.0")
		req.Header.Set("Accept", "application/json")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Println("Proxy fetch error:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "proxy failed"})
			return
		}
		defer resp.Body.Close()

		contentType := resp.Header.Get("Content-Type")
		body, _ := io.ReadAll(resp.Body)

		if resp.StatusCode != http.StatusOK || contentType == "" || !isJSON(contentType) {
			log.Printf("Invalid response from Umami [%d] [%s]: %s\n", resp.StatusCode, contentType, string(body))
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid response from Umami"})
			return
		}

		var data map[string]interface{}
		if err := json.Unmarshal(body, &data); err != nil {
			log.Println("JSON parse failed:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "parse failed"})
			return
		}

		c.JSON(http.StatusOK, data)
	})
}

func isJSON(contentType string) bool {
	return contentType == "application/json" || len(contentType) >= 16 && contentType[:16] == "application/json"
}
