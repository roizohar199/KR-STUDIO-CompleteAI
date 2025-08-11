web: node --max-old-space-size=1024 server.js
worker: node --max-old-space-size=2048 demucs-worker.js
web-with-worker: concurrently "node --max-old-space-size=1024 server.js" "node --max-old-space-size=2048 demucs-worker.js" 