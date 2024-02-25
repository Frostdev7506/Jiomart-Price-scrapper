FROM ghcr.io/puppeteer/puppeteer:21.3.0
# Environment variables for the docker 
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
# set /usr/src/app as the work directory 
WORKDIR /usr/src/app
# copy package.json into the work dir
COPY package*.json ./
# Install all the packages from package.json
RUN npm ci
# Copy source code
COPY . .
# Compile TypeScript to JavaScript
RUN npm run build

# Run the compiled JavaScript with Node.js
CMD [ "node", "dist/app.js" ]