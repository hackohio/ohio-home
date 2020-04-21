# OHI/O Homepage
![Deployment Status](https://github.com/hackohio/ohio-home/workflows/Homepage-site%20S3%20Deployment/badge.svg)  
Welcome to the official website for OHI/O, an organization working to foster a tech culture at the Ohio State University.

# How to contribute to the homepage
- Store assets for the homepage specifically in the assets folder
- You may want to run a local testing server if you're working with absolute paths

**Folder Structure**:  
root: Contains the main HTML pages and files.  
assets: Contains all the project assets such as CSS, JS, PDFs, and images.

**Deployment**:  
The website is deployed using a simple GitHub actions workflow using AWS's S3 CLI.
- The script is setup to deploy the repo into the root directory
- It uses the `--excludes` filter to avoid overwriting the other event subfolders
- If there are new event pages added, add their subfolders to the list of filters