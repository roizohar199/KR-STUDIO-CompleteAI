#!/bin/bash

# Build Docker image for KR-STUDIO CompleteAI
echo "🚀 Building KR-STUDIO CompleteAI Docker image..."

# Clean up old images
echo "🧹 Cleaning up old images..."
docker system prune -f

# Build the image
echo "🔨 Building image..."
docker build -f Dockerfile.simple -t kr-studio-completeai:latest .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🐳 Image: kr-studio-completeai:latest"
    
    # Show image info
    echo "📊 Image details:"
    docker images kr-studio-completeai:latest
    
    # Optional: run container
    echo ""
    echo "🚀 To run the container:"
    echo "docker run -p 10000:10000 kr-studio-completeai:latest"
    echo ""
    echo "🔧 Or use docker-compose:"
    echo "docker-compose up -d"
    
else
    echo "❌ Build failed!"
    exit 1
fi
