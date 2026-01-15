import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Admin Routes - No navbar/footer */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Public Routes - With navbar/footer */}
                <Route path="/*" element={
                    <>
                        <Navbar />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/courses" element={<Courses />} />
                                <Route path="/courses/:slug" element={<CourseDetail />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                            </Routes>
                        </main>
                        <Footer />
                    </>
                } />
            </Routes>
        </Router>
    )
}

export default App
