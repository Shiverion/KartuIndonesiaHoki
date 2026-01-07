# Use Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy app source (node_modules is in .dockerignore so won't overwrite)
COPY . .

# Expose port (Cloud Run uses PORT env variable)
EXPOSE 8080

# Set environment variable for Cloud Run
ENV PORT=8080

# Start the server
CMD ["node", "server.js"]
