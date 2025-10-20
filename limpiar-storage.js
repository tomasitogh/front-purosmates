// Script para limpiar el localStorage del navegador
// Ejecuta este código en la consola del navegador (F12 -> Console)

console.log('🧹 Limpiando localStorage...');
console.log('Tokens encontrados antes de limpiar:', {
  token: localStorage.getItem('token') ? 'Sí' : 'No',
  user: localStorage.getItem('user') ? 'Sí' : 'No',
  authToken: localStorage.getItem('authToken') ? 'Sí' : 'No'
});

// Limpiar localStorage
localStorage.clear();

console.log('✅ localStorage limpiado correctamente');
console.log('🔄 Recarga la página para ver los cambios (F5)');

// Verificar que está limpio
if (localStorage.length === 0) {
  console.log('✅ Verificado: localStorage está vacío');
} else {
  console.log('⚠️ Advertencia: Aún hay items en localStorage:', localStorage.length);
}
