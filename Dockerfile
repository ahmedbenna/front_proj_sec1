# Use an official Node.js runtime as a parent image
FROM node:16

# Set environment variables
ENV API_BASE_URL="http://localhost:3000/"

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents to /app
COPY . .

# Expose port 3333
EXPOSE 3333
RUN npm run build

# Start the Node.js application
CMD ["serve", "-l", "3333", "-s", "build"]