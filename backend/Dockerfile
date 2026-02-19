# Use Node.js official image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend code
COPY . .

# Expose backend port
EXPOSE 3000

# Start server
CMD ["node", "index.js"]
