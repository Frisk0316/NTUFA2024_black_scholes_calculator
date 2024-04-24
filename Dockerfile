# Use a base image
FROM <base_image>

# Set the working directory
WORKDIR /app

# Copy the entire BLACK_SCHOLES_CALCULATOR directory to the container
COPY requirements.txt ./

# Install any dependencies if required
RUN pip install -r requirements.txt

# Specify the command to run when the container starts
CMD <command_to_start_the_application>