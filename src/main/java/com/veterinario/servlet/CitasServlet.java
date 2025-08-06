package com.veterinario.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.veterinario.util.DatabaseConnection;
import com.veterinario.model.Cita;

@WebServlet("/citas")
public class CitasServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String usuarioId = request.getParameter("usuario_id");
        String rol = request.getParameter("rol");
        
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = buildCitasQuery(rol);
            PreparedStatement stmt = conn.prepareStatement(sql);
            
            if ("cliente".equals(rol)) {
                stmt.setString(1, usuarioId);
            } else if ("doctor".equals(rol)) {
                stmt.setString(1, usuarioId);
            }
            
            ResultSet rs = stmt.executeQuery();
            List<Cita> citas = new ArrayList<>();
            
            while (rs.next()) {
                Cita cita = new Cita();
                cita.setId(rs.getInt("id"));
                cita.setMascotaNombre(rs.getString("mascota_nombre"));
                cita.setPropietario(rs.getString("propietario"));
                cita.setDoctor(rs.getString("doctor"));
                cita.setFecha(rs.getDate("fecha"));
                cita.setHora(rs.getTime("hora"));
                cita.setServicio(rs.getString("servicio"));
                cita.setEstado(rs.getString("estado"));
                cita.setNotas(rs.getString("notas"));
                
                citas.add(cita);
            }
            
            Gson gson = new Gson();
            response.getWriter().write(gson.toJson(citas));
            
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "INSERT INTO citas (mascota_id, doctor_id, cliente_id, fecha, hora, servicio, notas) VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            
            stmt.setInt(1, Integer.parseInt(request.getParameter("mascota_id")));
            stmt.setInt(2, Integer.parseInt(request.getParameter("doctor_id")));
            stmt.setInt(3, Integer.parseInt(request.getParameter("cliente_id")));
            stmt.setString(4, request.getParameter("fecha"));
            stmt.setString(5, request.getParameter("hora"));
            stmt.setString(6, request.getParameter("servicio"));
            stmt.setString(7, request.getParameter("notas"));
            
            int result = stmt.executeUpdate();
            
            if (result > 0) {
                response.getWriter().write("{\"success\": true, \"message\": \"Cita creada exitosamente\"}");
            } else {
                response.getWriter().write("{\"success\": false, \"message\": \"Error al crear la cita\"}");
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"success\": false, \"message\": \"Error del servidor\"}");
        }
    }
    
    private String buildCitasQuery(String rol) {
        String baseQuery = "SELECT c.*, m.nombre as mascota_nombre, u1.nombre as propietario, u2.nombre as doctor " +
                          "FROM citas c " +
                          "JOIN mascotas m ON c.mascota_id = m.id " +
                          "JOIN usuarios u1 ON c.cliente_id = u1.id " +
                          "JOIN usuarios u2 ON c.doctor_id = u2.id ";
        
        if ("cliente".equals(rol)) {
            return baseQuery + "WHERE c.cliente_id = ? ORDER BY c.fecha DESC, c.hora DESC";
        } else if ("doctor".equals(rol)) {
            return baseQuery + "WHERE c.doctor_id = ? ORDER BY c.fecha DESC, c.hora DESC";
        } else {
            return baseQuery + "ORDER BY c.fecha DESC, c.hora DESC";
        }
    }
}
