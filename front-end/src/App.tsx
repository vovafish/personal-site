import { HashRouter, Route, Routes } from 'react-router-dom';

import NavBar from './NavBar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import ProjectListPage from './pages/ProjectListPage';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound';
// import PrivateRoute from './auth/PrivateRoute';
import VerifyEmailPage from './pages/VerifyEmailPage';
import PasswordResetPage from './pages/PasswordResetPage';
import AskmeFail from './pages/AskmeFail';
import AskmeSuccess from './pages/AskmeSuccess';
import ContactForm from './pages/AskMe';
import Policy from './pages/Policy';

export function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/please-verify" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:passwordResetCode"
          element={<PasswordResetPage />}
        />
        <Route
          path="/verify-email/:verificationString"
          element={<EmailVerificationPage />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/askme" element={<ContactForm />} />
        <Route path="/askme-fail" element={<AskmeFail />} />
        <Route path="/askme-success" element={<AskmeSuccess />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

export default WrappedApp;
