package com.veterinario.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.veterinario.model.Usuario;

@WebFilter("/dashboard.html")
public class AuthenticationFilter implements Filter {
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Inicialización del filtro
    }
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpSession session = httpRequest.getSession(false);
        
        // Verificar si existe una sesión y si hay un usuario logueado
        if (session == null || session.getAttribute("usuario") == null) {
            // Redirigir al login si no hay sesión
            httpResponse.sendRedirect("index.html");
            return;
        }
        
        // Verificar que el usuario sea válido
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        if (usuario == null || usuario.getId() <= 0) {
            // Invalidar sesión y redirigir al login
            session.invalidate();
            httpResponse.sendRedirect("index.html");
            return;
        }
        
        // Si todo está bien, continuar con la petición
        chain.doFilter(request, response);
    }
    
    @Override
    public void destroy() {
        // Limpieza del filtro
    }
}
