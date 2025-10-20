# Panel de Administración - Puros Mates

## Implementación Completada ✅

Se ha implementado exitosamente el panel de administración para el proyecto Puros Mates con las siguientes características:

### Características Implementadas:

#### 1. **Sistema de Autenticación con Roles**
- ✅ Contexto de autenticación (`AuthContext`) que maneja:
  - Login con JWT
  - Logout
  - Persistencia de sesión en localStorage
  - Detección automática de rol de usuario (USER/ADMIN)
  - Función `isAdmin()` para verificar permisos

#### 2. **Página de Login** (`/login`)
- ✅ Formulario de autenticación
- ✅ Validación de credenciales
- ✅ Redirección automática según rol:
  - Admin → `/admin`
  - Usuario regular → `/`
- ✅ Manejo de errores
- ✅ Diseño consistente con el resto de la aplicación

#### 3. **Panel de Administración** (`/admin`)
- ✅ Vista protegida (solo accesible para administradores)
- ✅ Gestión completa de productos:
  - **Crear** nuevos productos
  - **Editar** productos existentes
  - **Eliminar** productos
  - **Ver todos** los productos
- ✅ Filtrado por categorías (reutiliza el componente `FilterTabs`)
- ✅ Formulario de producto con campos:
  - Nombre
  - Descripción
  - Precio
  - Stock (visible solo para admin)
  - Categoría
- ✅ Modal para crear/editar productos
- ✅ Diseño responsive
- ✅ Diseño consistente con el resto de la aplicación

#### 4. **Enrutamiento**
- ✅ React Router implementado
- ✅ Rutas protegidas con `ProtectedRoute`
- ✅ Navbar actualizado con enlaces dinámicos:
  - Muestra "Panel Admin" solo para usuarios administradores
  - Botón de login/logout según estado de autenticación

#### 5. **Backend - Endpoints Agregados**
- ✅ `PUT /products/{id}` - Actualizar producto
- ✅ `DELETE /products/{id}` - Eliminar producto
- ✅ Métodos agregados en `ProductService`:
  - `updateProduct()`
  - `deleteProduct()`

### Estructura de Archivos Creados/Modificados:

```
front-purosmates/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx (actualizado con roles y JWT)
│   ├── views/
│   │   ├── LoginPage.jsx (nuevo)
│   │   └── AdminPanel.jsx (nuevo)
│   ├── components/
│   │   ├── ProtectedRoute.jsx (nuevo)
│   │   └── Navbar.jsx (actualizado con links a admin)
│   └── App.jsx (actualizado con Router y rutas)

back-purosmates/
└── src/main/java/com/uade/tpo/demo/
    ├── controllers/products/
    │   └── ProductController.java (agregados PUT y DELETE)
    └── service/
        └── ProductService.java (agregados métodos update y delete)
```

## Cómo Probar

### 1. **Iniciar el Backend**
```bash
cd back-purosmates/back-purosmates
./mvnw spring-boot:run
```

El backend debe estar corriendo en `http://localhost:8080`

### 2. **Iniciar el Frontend**
```bash
cd front-purosmates
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### 3. **Credenciales de Administrador**
Según lo indicado, en la base de datos ya existe un usuario administrador:
- **Email/Username**: admin
- **Password**: 123456

**IMPORTANTE**: El endpoint de autenticación espera un email, así que las credenciales deberían ser:
- **Email**: admin@purosmates.com (o el email configurado en la BD)
- **Password**: 123456

### 4. **Flujo de Prueba**

#### Como Usuario Regular:
1. Visita `http://localhost:5173`
2. Navega por los productos
3. Usa los filtros de categorías
4. Agrega productos al carrito

#### Como Administrador:
1. Haz clic en "Login" en el navbar
2. Ingresa las credenciales de administrador
3. Serás redirigido automáticamente a `/admin`
4. En el panel de administración puedes:
   - Ver todos los productos con su stock
   - Filtrar productos por categoría
   - Crear un nuevo producto (botón verde "+ Agregar Producto")
   - Editar un producto existente (botón azul "Editar")
   - Eliminar un producto (botón rojo "Eliminar")
5. El navbar mostrará "🔧 Panel Admin" solo para administradores

### 5. **Probar Creación de Producto**
1. En el panel admin, clic en "+ Agregar Producto"
2. Completa el formulario:
   - Nombre: "Mate de Cerámica Premium"
   - Descripción: "Mate artesanal de cerámica"
   - Precio: 25000
   - Stock: 50
   - Categoría: Selecciona "Mates"
3. Clic en "Crear Producto"
4. El producto aparecerá en la lista

### 6. **Probar Edición de Producto**
1. Selecciona un producto y clic en "Editar"
2. Modifica los campos (ej: cambiar stock)
3. Clic en "Actualizar Producto"
4. Los cambios se reflejarán inmediatamente

### 7. **Probar Eliminación**
1. Selecciona un producto y clic en "Eliminar"
2. Confirma la eliminación
3. El producto desaparecerá de la lista

## Notas Importantes

### Stock de Productos
- El campo `stock` es visible y editable solo en el panel de administración
- Los usuarios regulares NO ven el stock en la vista de tienda
- Cuando se haga una compra (funcionalidad futura), el stock se disminuirá automáticamente

### Autenticación JWT
- El token JWT se almacena en localStorage
- La sesión persiste entre recargas de página
- El rol del usuario se extrae del token JWT
- El token se envía en el header Authorization para todas las peticiones protegidas

### Endpoints del Backend
- `GET /products` - Ver todos los productos (público)
- `POST /products` - Crear producto (solo ADMIN)
- `PUT /products/{id}` - Actualizar producto (solo ADMIN)
- `DELETE /products/{id}` - Eliminar producto (solo ADMIN)
- `GET /categories` - Ver categorías (público)
- `POST /api/v1/auth/authenticate` - Login

### Categorías
El sistema espera que existan categorías en la base de datos. Las categorías típicas son:
- Mates
- Bombillas
- Accesorios

Si no existen, necesitas crearlas usando el endpoint de categorías o directamente en la base de datos.

## Próximos Pasos / Mejoras Futuras

1. **Gestión de Imágenes**:
   - Implementar upload de imágenes de productos
   - Integrar con un servicio de almacenamiento (AWS S3, Cloudinary, etc.)

2. **Validaciones Mejoradas**:
   - Validación de formularios más robusta
   - Feedback visual mejorado

3. **Gestión de Stock**:
   - Integrar disminución automática de stock al procesar pedidos
   - Alertas de stock bajo

4. **Paginación**:
   - Agregar paginación en el panel admin si hay muchos productos

5. **Búsqueda**:
   - Agregar barra de búsqueda de productos por nombre

6. **Dashboard**:
   - Estadísticas de ventas
   - Productos más vendidos
   - Alertas de stock

## Solución de Problemas

### Error de CORS
Si experimentas errores de CORS, asegúrate de que el backend tenga configurado CORS para aceptar peticiones desde `http://localhost:5173`.

### Error 401 Unauthorized
Verifica que:
- El token JWT se esté enviando correctamente
- El usuario tenga rol de ADMIN en la base de datos
- El token no haya expirado

### Categorías no aparecen
Verifica que existan categorías en la base de datos. El endpoint GET /categories debe devolver datos.

### Usuario admin no puede acceder
Asegúrate de que:
- El usuario en la BD tenga `role = 'ADMIN'`
- El email sea correcto
- La contraseña esté hasheada correctamente en la BD

## Contacto
Para cualquier duda o problema, por favor contacta al equipo de desarrollo.
