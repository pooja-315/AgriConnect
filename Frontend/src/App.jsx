import React from 'react'
import './App.css'
import HomePage from './Pages/HomePage/HomePage'
import BuySeedPage from './Pages/BuySeedPage/BuySeedPage'
import CropRecommenderPage from './Pages/CropRecommenderPage/CropRecommenderPage'
import FarmAIPage from './Pages/FarmAIPage/FarmAIPage'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DiseaseDetectionPage from './Pages/DiseaseDetectionPage/DiseaseDetectionPage'
import CartPage from './Pages/CartPage/CartPage'
import NotificationPage from './Pages/NotificationPage/NotificationPage'
import FertilizersPage from './Pages/FertilizersPage/FertilizersPage'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './Pages/DashboardPage/DashboardPage'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ProtectedRoute>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/buy-seeds' element={<BuySeedPage />} />
            <Route path='/crop-recommender' element={<CropRecommenderPage />} />
            <Route path='/fertilizers' element={<FertilizersPage />} />
            <Route path='/smart-farm-ai' element={<FarmAIPage />} />
            <Route path='/disease-detection' element={<DiseaseDetectionPage />}/>
            <Route path='/notification' element={<NotificationPage />} />
            <Route path='/cart' element={<CartPage />}/>
          </Routes>
        </ProtectedRoute>
      </Router>
    </AuthProvider>
  )
}

export default App