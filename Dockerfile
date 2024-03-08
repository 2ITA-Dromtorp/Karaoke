# Use the official lightweight Node.js 18 image.
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy the rest of the application source code
COPY . .

# Build the React application
RUN npm run build

# The application's port.
EXPOSE 3000

# Serve the app using "serve" from the build directory
# First, install the "serve" package globally.
RUN npm install -g serve

# Command to serve the build folder on the specified port
CMD ["serve", "-s", "build", "-l", "3000"]