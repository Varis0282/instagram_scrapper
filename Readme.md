# test1 - Instagram Data Fetching and API Integration 🚀

This project is a **Node.js-based Instagram scraper** that fetches the latest post caption and image URL from an Instagram account (e.g., `bbcnews`). It uses **Puppeteer** for web scraping and serves the data through an **Express.js API**.

## **Features**
- ✅ Fetches the **latest Instagram post's caption and image URL**
- ✅ Allows **dynamic usernames** (default: `bbcnews`)
- ✅ Uses **Puppeteer** for web scraping
- ✅ Implements **error handling** for network issues, login pages, and private accounts
- ✅ Provides an **Express API endpoint** to fetch post data

---
## **Tech Stack**
- **Node.js** (Backend)
- **Express.js** (API framework)
- **Puppeteer** (Headless browser automation for scraping)
- **Nodemon** (For development ease)

---
## **Setup Instructions**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Varis0282/instagram_scrapper
cd test1
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Start the Server**
```sh
npm run dev  # Starts server with nodemon
```
or  
```sh
node server.js  # Starts server normally
```

---
## **API Endpoint**
### **🔍 Fetch Latest Instagram Post**
**Endpoint:** `/latest-post`
**Method:** `GET`
**Description:** Fetches the latest post's caption and image from Instagram.

#### **Request Example:**
```sh
curl -X GET "http://localhost:4000/latest-post?username=bbcnews"
```
#### **Response Example:**
```json
{
  "caption": "Breaking news: Major global event...",
  "imageUrl": "https://instagram.com/path-to-image.jpg"
}
```

---
## **Project Structure**
```
📂 test1/
 ├── 📂 node_modules/            # Installed dependencies
 ├── 📜 .gitignore               # Ignoring node_modules and other files
 ├── 📜 instagramScrapper.js      # Puppeteer-based Instagram scraper
 ├── 📜 package.json             # Project dependencies
 ├── 📜 package-lock.json        # Lock file for dependencies
 ├── 📜 server.js                # Express API to fetch Instagram data
 ├── 📜 README.md                # Documentation
```

---
## **Troubleshooting & Common Errors**
### ❌ **Error: "Instagram requires login."**
- Instagram may block automated scraping.
- Try **using a session-based authentication** or a **proxy/VPN**.

### ❌ **Error: "Could not fetch image URL."**
- Instagram may have changed its page structure.
- Ensure Puppeteer is **not being detected** by using proper **headers and user-agents**.

### ❌ **Error: "User not found or account is private."**
- The Instagram account might be **private** or **does not exist**.
- Try using another **public Instagram username**.

---
## **Contributing**
1. Fork this repository  
2. Create a feature branch (`git checkout -b feature-branch`)  
3. Commit your changes (`git commit -m "Added new feature"`)  
4. Push to your branch (`git push origin feature-branch`)  
5. Open a **Pull Request** 🚀  

---
## **License**
This project is **open-source** under the **MIT License**.

---
### **📬 Need Help?**
If you have any questions, feel free to reach out!

💡 **Made with ❤️ by Varis Rajak**

