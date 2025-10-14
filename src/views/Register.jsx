import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    role: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    if (!form.username || !form.email || !form.password) {
      alert("Completa usuario, email y contraseña");
      return;
    }
    if (form.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (form.password !== form.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        alert(text || "Error en el registro");
        return;
      }

      let data = {};
      try { data = await res.json(); } catch {}

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("¡Registro OK! Token guardado.");
      } else {
        alert("¡Registro OK! Ahora podés iniciar sesión.");
      }

      setForm({ username: "", email: "", password: "", confirm: "", role: "USER" });
    } catch {
      alert("Error de red. ¿Está levantado el backend?");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-5">Crear cuenta</h1>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Pepe"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="...@gmail.com"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Repetir contraseña</label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Rol</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <button
            onClick={handleClick}
            className="w-full bg-black text-white rounded-lg py-2 hover:opacity-90 active:opacity-80"
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

