package com.veterinario.model;

import java.sql.Timestamp;

public class Usuario {
    private int id;
    private String nombre;
    private String email;
    private String password;
    private String telefono;
    private String direccion;
    private String rol;
    private Timestamp fechaRegistro;
    private boolean activo;
    
    // Constructor vacío
    public Usuario() {}
    
    // Constructor completo
    public Usuario(int id, String nombre, String email, String password, 
                   String telefono, String direccion, String rol, 
                   Timestamp fechaRegistro, boolean activo) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.direccion = direccion;
        this.rol = rol;
        this.fechaRegistro = fechaRegistro;
        this.activo = activo;
    }
    
    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    
    public Timestamp getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(Timestamp fechaRegistro) { this.fechaRegistro = fechaRegistro; }
    
    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }
}
