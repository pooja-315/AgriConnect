# <img src="https://github.com/user-attachments/assets/85e383da-be34-4484-bec5-79a2c0a19e16" width="50px">  Agriconnect  

A **fully responsive Smart Farming Application** built with **React.js**, featuring AI-powered crop and fertilizer recommendations, plant disease detection, weather-based dashboard, and a smart assistant – all designed with a clean and user-friendly interface.

## 🔗 Live Demo  

👉 **[Agriconnect](https://farmsmart-2025.web.app/)** 
  
## 🚀 Features  

✅ **Weather Dashboard** – Real-time weather monitoring with smart alerts and predictive farming insights.

✅ **Crop Recommendation** – ML-powered suggestions for optimal crops based on environmental conditions.

✅ **Fertilizer Recommendation** – AI-driven fertilizer recommendations using advanced models.

✅ **Plant Disease Detection** – Computer vision-based plant disease identification using leaf images.

✅ **Agriconnect AI Chatbot** – Intelligent farming assistant powered by Google Gemini AI.

✅ **Smart Marketplace** – Buy seeds and fertilizers with integrated cart system.

✅ **User Authentication** – Secure login and logout functionality.

✅ **Responsive Design** – Works seamlessly on all devices.

<br/>

## 🛠️ Tech Stack  

### Frontend
- **Framework**: React.js with Vite
- **Styling**: CSS Modules with Custom Properties
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API

### Backend
- **Runtime**: Python 3.x
- **Framework**: Flask with CORS
- **AI/ML Libraries**: 
  - Google Generative AI (Gemini)
  - Hugging Face Transformers
  - scikit-learn
  - joblib

### APIs & Services
- **Weather Data**: OpenWeatherMap API
- **AI Chatbot**: Google Gemini AI
- **Disease Detection**: Hugging Face Models
- **Deployment**: Firebase (Frontend), Render (Backend)

### Machine Learning Models
- **Crop Recommendation**: Random Forest Classifier
- **Disease Detection**: ResNet-50 CNN
- **Fertilizer Recommendation**: T5-small NLP Model

<br/>

## 📦 Installation  

Follow these steps to set up the project locally:  

### Frontend Setup

1️⃣ **Clone the repository**  
   ```sh
   git clone https://github.com/pooja-315/AgriConnect.git
   cd AgriConnect/Frontend
   ```

2️⃣ **Install dependencies**
   ```sh
   npm install
   ```

3️⃣ **Start the development server**
   ```sh
   npm run dev
   ```

4️⃣ **Open the project in your browser at:**
   ```sh
   http://localhost:5173
   ```

### Backend Setup

1️⃣ **Navigate to backend directories and install dependencies**
   ```sh
   cd ../Backend/FarmAI
   pip install -r requirements.txt
   ```

2️⃣ **Set up environment variables**
   ```sh
   # Create .env file with your API keys
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```

3️⃣ **Run the backend services**
   ```sh
   python FarmAi.py
   ```

<br/>

## 🌟 Key Features Explained

### 🌤️ Weather Dashboard
- Real-time weather monitoring with location-based data
- Smart alerts for temperature, humidity, and weather conditions
- Predictive insights for farming decisions
- Irrigation and planting recommendations

### 🤖 AI-Powered Recommendations
- **Crop Recommendation**: Uses Random Forest ML model with soil and weather parameters
- **Disease Detection**: ResNet-50 CNN model for plant health analysis
- **Smart Chatbot**: Google Gemini AI tailored for agricultural queries

### 🛒 Marketplace Integration
- Seed and fertilizer catalog with cart functionality
- Price comparison and product details
- Ready for payment gateway integration

<br/>

## 🔮 Future Enhancements

- **Payment Gateway Integration** (Razorpay/PayPal)
- **Multilingual Support** for regional languages
- **Voice Assistant** for hands-free interaction
- **Location-based Contact Directory** for suppliers
- **IoT Sensor Integration** for real-time farm monitoring

<br/>

## 📜 License  
This project is for educational purposes and aims to support sustainable agriculture using AI and technology.  

<br/>

Made with ❤️ by **AgriConnect Team** for smart farming solutions.

