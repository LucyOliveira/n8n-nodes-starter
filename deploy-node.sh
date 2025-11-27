#Exit immediately if a command fails
set -e

######################################
#step 0: Get Package Name
######################################
#Use Node.js to extract the package name from package.json
PACKAGE_NAME=$(node -p "require('./package.json').name")

if [ -z "$PACKAGE_NAME" ]; then
  echo "Package name not found in package.json"
  exit 1
fi  

#Set the target directory based on the package name
TARGET_DIR="/var/lib/docker/volumes/n8n-docker_n8n_data/_data/custom/node_modules/custom_node/$PACKAGE_NAME"

echo "Package Name: $PACKAGE_NAME"
echo "Target Directory: $TARGET_DIR"

######################################
# Step 1: Building the Node
######################################
echo "Building the node..."
npm run build

######################################
# Step 2: Deploy the build output   
######################################
#Define the source (build output) directory
SOURCE_DIR="./dist"

echo "Deploying the build output from $SOURCE_DIR to $TARGET_DIR..."

#Remove any previous deployment and recreate the target directory
sudo rm -rf "$TARGET_DIR"
sudo mkdir -p "$TARGET_DIR"

#Copy all files from the build output to the target directory
sudo cp -r "$SOURCE_DIR/"* "$TARGET_DIR/"

echo "Deployment completed successfully."

######################################
# Step 3: Restart n8n service
######################################
echo "Restarting n8n service..."
docker compose restart n8n

#Logging for debugging purposes
docker logs -f n8n
echo "n8n service restarted."


