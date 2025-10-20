import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isLogin) {
            // Login usando el AuthContext mejorado
            if (!email || !password) {
                alert('Completa email y contraseña');
                return;
            }

            try {
                const result = await authLogin(email, password);

                if (result.success) {
                    alert('¡Login exitoso!');
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
                    alert(result.error || 'Error en el login');
                }
            } catch (error) {
                console.error('Error de red:', error);
                alert('Error de red. ¿Está levantado el backend en localhost:8080?');
            }
        } else {
            // Register
            if (!name || !lastname || !email || !password) {
                alert('Completa nombre, apellido, email y contraseña');
                return;
            }
            
            // Validación de nombre
            if (name.length < 2) {
                alert('El nombre debe tener al menos 2 caracteres');
                return;
            }
            if (name.length > 50) {
                alert('El nombre no puede tener más de 50 caracteres');
                return;
            }
            
            // Validación de apellido
            if (lastname.length < 2) {
                alert('El apellido debe tener al menos 2 caracteres');
                return;
            }
            if (lastname.length > 50) {
                alert('El apellido no puede tener más de 50 caracteres');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor ingresa un email válido');
                return;
            }
            if (email.length > 100) {
                alert('El email no puede tener más de 100 caracteres');
                return;
            }
            
            // Validación de contraseña
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            if (password.length > 100) {
                alert('La contraseña no puede tener más de 100 caracteres');
                return;
            }
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            try {
                console.log('Enviando registro con:', { firstname: name, lastname: lastname, email, role: 'USER' });
                
                const res = await fetch('http://localhost:8080/api/v1/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstname: name,
                        lastname: lastname,
                        email: email,
                        password: password,
                        role: 'USER',
                    }),
                });

                console.log('Respuesta status:', res.status);

                if (!res.ok) {
                    let errorMessage = 'Error en el registro';
                    try {
                        const errorData = await res.json();
                        console.error('Error del servidor:', errorData);
                        
                        if (res.status === 409 || errorMessage.toLowerCase().includes('duplicate') || 
                            errorMessage.toLowerCase().includes('already exists')) {
                            errorMessage = 'El email o nombre de usuario ya está registrado. Por favor usa otro.';
                        } else if (res.status === 400) {
                            errorMessage = errorData.message || 'Datos inválidos. Verifica la información ingresada.';
                        } else if (res.status === 500) {
                            errorMessage = 'El email o nombre de usuario ya existe. Por favor usa otro.';
                        }
                    } catch {
                        try {
                            const text = await res.text();
                            console.error('Error del servidor (text):', text);
                            if (text.toLowerCase().includes('duplicate') || 
                                text.toLowerCase().includes('constraint') ||
                                text.toLowerCase().includes('unique')) {
                                errorMessage = 'El email o nombre de usuario ya está registrado.';
                            } else {
                                errorMessage = text || errorMessage;
                            }
                        } catch {
                            console.error('No se pudo leer el error del servidor');
                        }
                    }
                    
                    alert(errorMessage);
                    return;
                }

                let data = {};
                try { 
                    data = await res.json();
                    console.log('Registro exitoso:', data);
                } catch (e) {
                    console.log('Respuesta sin JSON, asumiendo éxito');
                }

                if (data.access_token) {
                    // Si el registro devuelve un token, hacer login automático
                    const result = await authLogin(email, password);
                    if (result.success) {
                        alert('¡Registro exitoso! Has sido logueado automáticamente.');
                        onClose();
                        navigate('/');
                    }
                } else {
                    alert('¡Registro exitoso! Por favor inicia sesión.');
                    setIsLogin(true);
                }

                // Limpiar formulario
                setName('');
                setLastname('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } catch (error) {
                console.error('Error de red:', error);
                alert('Error de red. ¿Está levantado el backend en localhost:8080?');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl flex max-w-5xl w-full max-h-[90vh] overflow-hidden relative">
                {/* Logo en esquina superior izquierda */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                    <img 
                        src="/images/logo-icon.png" 
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
                        src="/images/mate-auth.png" 
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
                                className="w-full bg-[#2d5d52] text-white py-3 rounded-lg font-semibold hover:bg-[#2d5d52]/90 transition-colors shadow-md hover:shadow-lg"
                            >
                                {isLogin ? 'Log In' : 'Registrarse'}
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
