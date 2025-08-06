package com.veterinario.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.veterinario.util.DatabaseConnection;
import com.veterinario.model.Usuario;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String rolSeleccionado = request.getParameter("rol");
        
        // Validación de entrada
        if (email == null || email.trim().isEmpty() || 
            password == null || password.trim().isEmpty() || 
            rolSeleccionado == null || rolSeleccionado.trim().isEmpty()) {
        
            String jsonResponse = new Gson().toJson(
                new LoginResponse(false, "Todos los campos son obligatorios", null));
            response.getWriter().write(jsonResponse);
            return;
        }
        
        // VALIDACIÓN ULTRA-ESTRICTA: Mapeo fijo email -> rol
        String rolEsperado = getRolEsperadoPorEmail(email.trim().toLowerCase());
        
        if (rolEsperado == null) {
            String jsonResponse = new Gson().toJson(
                new LoginResponse(false, "Email no autorizado en el sistema", null));
            response.getWriter().write(jsonResponse);
            return;
        }
        
        // BLOQUEO TOTAL: El rol seleccionado DEBE ser exactamente el esperado
        if (!rolEsperado.equals(rolSeleccionado)) {
            String mensaje = String.format(
                "🚫 ACCESO DENEGADO 🚫\n\n" +
                "El email '%s' está registrado como '%s'.\n" +
                "No puedes acceder como '%s'.\n\n" +
                "⚠️ SOLO puedes usar tu rol asignado: %s",
                email, getRoleLabel(rolEsperado), getRoleLabel(rolSeleccionado), getRoleLabel(rolEsperado)
            );
            
            // Log del intento de acceso no autorizado
            System.out.println("🚨 INTENTO DE ACCESO NO AUTORIZADO:");
            System.out.println("   Email: " + email);
            System.out.println("   Rol esperado: " + rolEsperado);
            System.out.println("   Rol intentado: " + rolSeleccionado);
            System.out.println("   Timestamp: " + new java.util.Date());
            
            String jsonResponse = new Gson().toJson(
                new LoginResponse(false, mensaje, null));
            response.getWriter().write(jsonResponse);
            return;
        }
        
        try (Connection conn = DatabaseConnection.getConnection()) {
            // Buscar usuario por email, contraseña Y rol (triple validación)
            String sql = "SELECT * FROM usuarios WHERE email = ? AND password = ? AND rol = ? AND activo = TRUE";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, email.trim().toLowerCase());
            stmt.setString(2, password);
            stmt.setString(3, rolEsperado); // Usar el rol esperado, no el seleccionado
            
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                // Crear objeto usuario
                Usuario usuario = new Usuario();
                usuario.setId(rs.getInt("id"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setEmail(rs.getString("email"));
                usuario.setTelefono(rs.getString("telefono"));
                usuario.setDireccion(rs.getString("direccion"));
                usuario.setRol(rs.getString("rol"));
                
                // Crear sesión
                HttpSession session = request.getSession();
                session.setAttribute("usuario", usuario);
                session.setMaxInactiveInterval(30 * 60); // 30 minutos
                
                // Log de acceso exitoso
                System.out.println("✅ LOGIN EXITOSO:");
                System.out.println("   Usuario: " + usuario.getNombre());
                System.out.println("   Email: " + email);
                System.out.println("   Rol: " + usuario.getRol());
                System.out.println("   Timestamp: " + new java.util.Date());
                
                String jsonResponse = new Gson().toJson(
                    new LoginResponse(true, "¡Acceso autorizado! Bienvenido " + usuario.getNombre(), usuario));
                response.getWriter().write(jsonResponse);
                
            } else {
                // Credenciales incorrectas
                System.out.println("❌ LOGIN FALLIDO - Credenciales incorrectas:");
                System.out.println("   Email: " + email);
                System.out.println("   Timestamp: " + new java.util.Date());
                
                String jsonResponse = new Gson().toJson(
                    new LoginResponse(false, "Email o contraseña incorrectos", null));
                response.getWriter().write(jsonResponse);
            }
            
        } catch (SQLException e) {
            System.err.println("💥 ERROR DE BASE DE DATOS:");
            System.err.println("   Mensaje: " + e.getMessage());
            System.err.println("   Email intentado: " + email);
            e.printStackTrace();
            
            String jsonResponse = new Gson().toJson(
                new LoginResponse(false, "Error del servidor. Intente nuevamente.", null));
            response.getWriter().write(jsonResponse);
        }
    }
    
    /**
     * Mapeo FIJO y ESTRICTO de emails a roles
     * Este método define qué rol DEBE tener cada email
     */
    private String getRolEsperadoPorEmail(String email) {
        switch (email) {
            case "cliente@prueba.com":
                return "cliente";
            case "doctor@prueba.com":
                return "doctor";
            case "admin@prueba.com":
                return "admin";
            default:
                return null; // Email no autorizado
        }
    }
    
    private String getRoleLabel(String rol) {
        switch (rol) {
            case "cliente": return "Cliente";
            case "doctor": return "Doctor";
            case "admin": return "Administrador";
            default: return rol;
        }
    }
    
    private class LoginResponse {
        private boolean success;
        private String message;
        private Usuario usuario;
        
        public LoginResponse(boolean success, String message, Usuario usuario) {
            this.success = success;
            this.message = message;
            this.usuario = usuario;
        }
        
        // Getters y setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public Usuario getUsuario() { return usuario; }
        public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    }
}
