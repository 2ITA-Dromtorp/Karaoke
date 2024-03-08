# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
# It's not necessary to repeat the /Karaoke destination
WORKDIR /Karaoke

# Copy package.json and package-lock.json (if available) first to leverage Docker cache
# This avoids re-running npm install on every build unless these files change
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files into the working directory
COPY . .

# Build the React application
# If this is a production build, we might want to use the `npm run build` command
# If it is a backend API, we might not need this step at all
RUN npm run build

# If we built a frontend application, this step may not be necessary as we would use a server like nginx or a CDN to serve the static files.
# If it is a backend API, we would proceed to the startup command
# The final image should ideally be based on what the application role is (frontend vs backend)

# Expose the port that the application runs on
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]