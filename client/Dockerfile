# Use an official Node runtime as a parent image
FROM node:18.5.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 5173 for the application to run on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]