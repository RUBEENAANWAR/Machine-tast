import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAppStore } from '../store/useAppStore';

// Demo credentials for fallback when Firebase is not configured
const DEMO_USER = {
  uid: 'demo-user-001',
  email: 'admin@healthsync.com',
  displayName: 'Dr. Admin User',
  photoURL: null,
};

export function useAuth() {
  const { setUser, logout: storeLogout, setAuthLoading } = useAppStore();
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<void> => {
    setAuthLoading(true);

    // Demo mode fallback
    if (!auth || email === 'admin@healthsync.com') {
      await new Promise((r) => setTimeout(r, 1000)); // simulate network
      if (email === 'admin@healthsync.com' && password === 'Admin@123') {
        setUser(DEMO_USER);
        navigate('/dashboard');
        return;
      }
      setAuthLoading(false);
      throw new Error('Invalid credentials. Use admin@healthsync.com / Admin@123');
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setAuthLoading(false);
      throw new Error(err.message || 'Login failed');
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    if (!auth) {
      // Demo mode
      await new Promise((r) => setTimeout(r, 800));
      setUser({ ...DEMO_USER, displayName: 'Google Demo User' });
      navigate('/dashboard');
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      });
      navigate('/dashboard');
    } catch (err: any) {
      throw new Error(err.message || 'Google login failed');
    }
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    storeLogout();
    navigate('/login');
  };

  return { login, loginWithGoogle, logout };
}
