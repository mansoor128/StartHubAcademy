# Step 1: Use official Node.js 20 image as the base image
FROM node:20-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all project files to the container
COPY . .

# Step 6: Build the NestJS app
RUN npm run build

# Step 7: Expose the application port (default is 3000)
EXPOSE 3000

# Step 8: Command to run the application
CMD ["npm", "run", "start:prod"]
