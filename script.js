// ⚠️ Reemplazá esto con tus datos de Supabase
const supabase = supabase.createClient(
    'https://zkokwhyzbcevdxsqwvcs.supabase.co', // URL del proyecto
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprb2t3aHl6YmNldmR4c3F3dmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NDMyNzcsImV4cCI6MjA2MTExOTI3N30.7nf1Aqj-OZixZXXtawIQ6aNYD_xEIK-QQO_fKxGfTvY'              // Clave pública (anon)
  );
  
  // ✅ DESPUÉS: usarlo con eventos
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mensaje = document.getElementById('mensaje');
  
    const { data, error } = await supabase.auth.signUp({ email, password });
  
    if (error) {
      mensaje.textContent = 'Error: ' + error.message;
      return;
    }
  
    const user = data.user;
  
    const { error: errorPerfil } = await supabase
      .from('profiles')
      .insert([{ id: user.id, nombre, apellido }]);
  
    if (errorPerfil) {
      mensaje.textContent = 'Error al guardar perfil: ' + errorPerfil.message;
    } else {
      mensaje.textContent = 'Registro exitoso.';
    }
  });  