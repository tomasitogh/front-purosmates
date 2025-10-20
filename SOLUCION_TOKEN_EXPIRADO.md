## 🔧 Solución al Error de Token Expirado

### Problema
El backend está recibiendo un token JWT expirado del frontend. El error muestra:
```
JWT expired 443296964 milliseconds ago at 2025-10-14T20:46:06.000Z
```

### Solución Inmediata

**Opción 1: Desde la Consola del Navegador (MÁS RÁPIDO)**
1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña "Console"
3. Ejecuta este comando:
```javascript
localStorage.clear()
```
4. Recarga la página (F5)

**Opción 2: Desde Application Storage**
1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña "Application" (o "Aplicación")
3. En el panel izquierdo, expande "Local Storage"
4. Haz clic en `http://localhost:5173`
5. Elimina todas las entradas (especialmente `token`, `user`, `authToken`)
6. Recarga la página (F5)

### ¿Por qué pasó esto?

El token JWT que tenías guardado en el localStorage expiró hace 5 días (el 14 de octubre). El frontend estaba intentando enviar ese token expirado al backend en las peticiones, causando el error.

### Cambios que hice para prevenir esto:

✅ **AuthContext actualizado**: Ahora verifica automáticamente si el token está expirado al cargar la aplicación y lo limpia si es necesario.

✅ **ShopPage actualizado**: Ya NO envía el token para ver productos (no es necesario para usuarios no autenticados).

✅ **Mejor manejo de logout**: Ahora limpia completamente el localStorage.

### Después de limpiar el localStorage:

1. **Para navegar como usuario normal**: Simplemente recarga la página, los productos se cargarán sin necesidad de autenticación.

2. **Para acceder al panel admin**:
   - Haz clic en "Login"
   - Ingresa las credenciales del admin
   - Obtendrás un token nuevo y válido

### Credenciales de Administrador

Según mencionaste, el usuario admin en la base de datos tiene:
- **Username/Email**: admin (o podría ser un email como `admin@purosmates.com`)
- **Password**: 123456

**Nota importante**: Si el endpoint espera un email, asegúrate de verificar en la base de datos cuál es el email exacto del usuario admin.

### Verificar el usuario admin en la base de datos

Puedes ejecutar esta query en MySQL:
```sql
SELECT * FROM user WHERE role = 'ADMIN';
```

Esto te mostrará el email exacto que debes usar para hacer login.

### ¿Todo funciona ahora?

Después de limpiar el localStorage:
- ✅ Los productos se cargarán correctamente en la página principal
- ✅ Podrás navegar sin errores
- ✅ Podrás hacer login y acceder al panel admin
- ✅ Los nuevos tokens no expirarán por 1 hora (configurado en el backend)
