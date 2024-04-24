# Use the official Python image as a base
FROM python:3.10.9

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the Python application
CMD ["python3", "main.py"]
