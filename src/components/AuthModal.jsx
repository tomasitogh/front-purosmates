import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../redux/authSlice';
import toast from 'react-hot-toast';

function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login: authLogin } = useAuth();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isLogin) {
            // Login usando el AuthContext mejorado
            if (!email || !password) {
                toast.error('Completa email y contraseña');
                return;
            }

            try {
                const result = await authLogin(email, password);

                if (result.success) {
                    toast.success('¡Login exitoso!');
                    onClose();
                    
                    // Redirigir según el rol
                    if (result.user.role === 'ADMIN') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                    
                    // Limpiar campos
                    setEmail('');
                    setPassword('');
                } else {
                    toast.error(result.error || 'Error en el login');
                }
            } catch (error) {
                console.error('Error de red:', error);
                toast.error('Error de red. ¿Está levantado el backend en localhost:8080?');
            }
        } else {
            // Register
            if (!name || !lastname || !email || !password) {
                toast.error('Completa nombre, apellido, email y contraseña');
                return;
            }
            
            // Validación de nombre
            if (name.length < 2) {
                toast.error('El nombre debe tener al menos 2 caracteres');
                return;
            }
            if (name.length > 50) {
                toast.error('El nombre no puede tener más de 50 caracteres');
                return;
            }
            
            // Validación de apellido
            if (lastname.length < 2) {
                toast.error('El apellido debe tener al menos 2 caracteres');
                return;
            }
            if (lastname.length > 50) {
                toast.error('El apellido no puede tener más de 50 caracteres');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error('Por favor ingresa un email válido');
                return;
            }
            if (email.length > 100) {
                toast.error('El email no puede tener más de 100 caracteres');
                return;
            }
            
            // Validación de contraseña
            if (password.length < 6) {
                toast.error('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            if (password.length > 100) {
                toast.error('La contraseña no puede tener más de 100 caracteres');
                return;
            }
            if (password !== confirmPassword) {
                toast.error('Las contraseñas no coinciden');
                return;
            }

            try {
                console.log('Enviando registro con:', { firstname: name, lastname: lastname, email, role: 'USER' });
                
                await dispatch(registerUser({
                    firstname: name,
                    lastname: lastname,
                    email: email,
                    password: password
                })).unwrap();

                console.log('Registro exitoso');

                // Intentar login automático
                const result = await authLogin(email, password);
                if (result.success) {
                    toast.success('¡Registro exitoso! Has sido logueado automáticamente.');
                    onClose();
                    navigate('/');
                } else {
                    toast.success('¡Registro exitoso! Por favor inicia sesión.');
                    setIsLogin(true);
                }

                // Limpiar formulario
                setName('');
                setLastname('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } catch (error) {
                console.error('Error en registro:', error);
                
                let errorMessage = 'Error en el registro';
                if (error.message) {
                    if (error.message.toLowerCase().includes('duplicate') || 
                        error.message.toLowerCase().includes('already exists') ||
                        error.message.toLowerCase().includes('constraint') ||
                        error.message.toLowerCase().includes('unique')) {
                        errorMessage = 'El email o nombre de usuario ya está registrado. Por favor usa otro.';
                    } else if (error.message.toLowerCase().includes('400')) {
                        errorMessage = 'Datos inválidos. Verifica la información ingresada.';
                    } else {
                        errorMessage = error.message;
                    }
                }
                toast.error(errorMessage);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl flex max-w-5xl w-full max-h-[90vh] overflow-hidden relative">
                {/* Logo en esquina superior izquierda */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                    <img 
                        src="src/assets/logo-purosmates.png" 
                        alt="Puros Mates" 
                        className="w-8 h-8"
                    />
                    <span className="text-xl font-bold text-[#2d5d52]">Puros Mates</span>
                </div>

                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Imagen lateral - 30% */}
                <div className="w-[30%] bg-gradient-to-br from-[#2d5d52]/10 to-[#2d5d52]/20 hidden md:flex items-center justify-center">
                    <img 
                        src="src/assets/fondo-tandil.webp" 
                        alt="Mate" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Formulario - 70% */}
                <div className="w-full md:w-[70%] p-12 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full mt-8">
                        <h2 className="text-3xl font-bold text-[#2d5d52] mb-3">
                            {isLogin ? '¡Bienvenido a Puros Mates!' : '¡Creá tu cuenta!'}
                        </h2>
                        <p className="text-gray-600 mb-8">
                            {isLogin 
                                ? 'Para acceder a tus compras te pedimos que ingreses con tu cuenta.'
                                : 'Registrate para poder realizar tus compras y acceder a todas las funcionalidades.'}
                        </p>

                        <div className="space-y-5">
                            {/* Nombre */}
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Tu nombre"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5d52] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            )}

                            {/* Apellido */}
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Apellido
                                    </label>
                                    <input
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        placeholder="Tu apellido"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5d52] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5d52] focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Contraseña */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5d52] focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Confirmar contraseña (solo en registro) */}
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirmar Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d5d52] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            )}

                            {/* Olvidaste contraseña (solo en login) */}
                            {isLogin && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="text-sm text-[#2d5d52] hover:text-[#2d5d52]/80 hover:underline"
                                    >
                                        ¿Olvidaste la contraseña?
                                    </button>
                                </div>
                            )}

                            {/* Botón principal */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-[#2d5d52] text-white py-3 rounded-lg font-semibold hover:bg-[#2d5d52]/90 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Procesando...' : (isLogin ? 'Log In' : 'Registrarse')}
                            </button>

                            {/* Línea divisoria */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">or</span>
                                </div>
                            </div>

                            {/* Toggle Login/Register */}
                            <div className="text-center">
                                <p className="text-gray-600">
                                    {isLogin ? '¿No tenés una cuenta? ' : '¿Ya tenés una cuenta? '}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="text-[#2d5d52] hover:text-[#2d5d52]/80 font-semibold hover:underline"
                                    >
                                        {isLogin ? 'Registrate' : 'Iniciá sesión'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
