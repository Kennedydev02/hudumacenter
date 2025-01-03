# Use a lightweight Nginx image
FROM nginx:alpine

# Copy your built SPA files into the Nginx default directory
COPY . /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose 1  the port Nginx listens on
EXPOSE 8080

# Command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]