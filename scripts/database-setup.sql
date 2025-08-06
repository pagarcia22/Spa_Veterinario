-- Crear base de datos
CREATE DATABASE IF NOT EXISTS spa_veterinario;
USE spa_veterinario;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    rol ENUM('cliente', 'doctor', 'admin') NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de mascotas
CREATE TABLE mascotas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(30) NOT NULL,
    raza VARCHAR(50),
    edad INT,
    peso DECIMAL(5,2),
    color VARCHAR(30),
    propietario_id INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (propietario_id) REFERENCES usuarios(id)
);

-- Tabla de citas
CREATE TABLE citas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mascota_id INT,
    doctor_id INT,
    cliente_id INT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'completada', 'cancelada') DEFAULT 'pendiente',
    notas TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id),
    FOREIGN KEY (doctor_id) REFERENCES usuarios(id),
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id)
);

-- Tabla de registros médicos
CREATE TABLE registros_medicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mascota_id INT,
    doctor_id INT,
    fecha DATE NOT NULL,
    tipo ENUM('consulta', 'vacunacion', 'cirugia', 'tratamiento', 'emergencia') NOT NULL,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT NOT NULL,
    medicamentos TEXT,
    notas TEXT,
    costo DECIMAL(10,2) NOT NULL,
    estado ENUM('completado', 'en_progreso', 'programado') DEFAULT 'completado',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id),
    FOREIGN KEY (doctor_id) REFERENCES usuarios(id)
);

-- Tabla de pagos
CREATE TABLE pagos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT,
    registro_medico_id INT,
    monto DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'pagado', 'vencido') DEFAULT 'pendiente',
    metodo_pago VARCHAR(50),
    numero_transaccion VARCHAR(100),
    fecha_vencimiento DATE,
    fecha_pago TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
    FOREIGN KEY (registro_medico_id) REFERENCES registros_medicos(id)
);

-- Limpiar datos existentes
DELETE FROM pagos;
DELETE FROM registros_medicos;
DELETE FROM citas;
DELETE FROM mascotas;
DELETE FROM usuarios;

-- Insertar usuarios EXACTOS según especificación
INSERT INTO usuarios (nombre, email, password, telefono, direccion, rol) VALUES
('Cliente Prueba', 'cliente@prueba.com', 'password123', '+1234567890', 'Avenida Cliente 123', 'cliente'),
('Doctor Prueba', 'doctor@prueba.com', 'password123', '+1234567891', 'Calle Doctor 456', 'doctor'),
('Admin Prueba', 'admin@prueba.com', 'password123', '+1234567892', 'Oficina Admin 789', 'admin');

-- Insertar mascotas para el cliente
INSERT INTO mascotas (nombre, especie, raza, edad, peso, color, propietario_id) VALUES
('Max', 'Perro', 'Golden Retriever', 3, 28.50, 'Dorado', 1), -- Cliente Prueba
('Luna', 'Gato', 'Siamés', 2, 4.20, 'Gris y blanco', 1), -- Cliente Prueba
('Rocky', 'Perro', 'Bulldog Francés', 5, 12.80, 'Negro', 1); -- Cliente Prueba

-- Insertar citas
INSERT INTO citas (mascota_id, doctor_id, cliente_id, fecha, hora, servicio, estado, notas) VALUES
(1, 2, 1, '2024-01-16', '10:00:00', 'Consulta General', 'confirmada', 'Revisión rutinaria de Max'),
(2, 2, 1, '2024-01-17', '15:30:00', 'Vacunación', 'pendiente', 'Vacuna anual para Luna'),
(3, 2, 1, '2024-01-18', '09:00:00', 'Cirugía Menor', 'pendiente', 'Extracción de masa en Rocky');

-- Insertar registros médicos
INSERT INTO registros_medicos (mascota_id, doctor_id, fecha, tipo, diagnostico, tratamiento, medicamentos, notas, costo) VALUES
(1, 2, '2024-01-15', 'consulta', 'Otitis externa leve en oído derecho', 'Limpieza auricular y aplicación de gotas antibióticas', 'Otomax gotas - 1 gota cada 12 horas por 7 días', 'Control en 1 semana. Evitar que se moje las orejas.', 85.00),
(2, 2, '2024-01-12', 'vacunacion', 'Vacunación preventiva anual', 'Aplicación de vacuna múltiple (DHPP) y antirrábica', 'No requiere medicación', 'Próxima vacunación en 12 meses. Mascota en excelente estado.', 65.00),
(3, 2, '2024-01-10', 'cirugia', 'Lipoma benigno en flanco izquierdo', 'Extirpación quirúrgica de masa tumoral', 'Amoxicilina 250mg - 1 tableta cada 12 horas por 10 días\nTramadol 50mg - 1/2 tableta cada 8 horas por 5 días', 'Retirar puntos en 10 días. Mantener herida limpia y seca.', 350.00);

-- Insertar pagos
INSERT INTO pagos (cliente_id, registro_medico_id, monto, estado, fecha_vencimiento) VALUES
(1, 1, 85.00, 'pendiente', '2024-02-15'), -- Cliente Prueba
(1, 2, 65.00, 'pagado', '2024-01-20'), -- Cliente Prueba
(1, 3, 350.00, 'pendiente', '2024-02-10'); -- Cliente Prueba

-- Mostrar información de usuarios para referencia
SELECT '=== USUARIOS DE PRUEBA SISTEMA VETERINARIO ===' as info;
SELECT 
    CONCAT('Email: ', email, ' | Contraseña: password123 | Rol: ', UPPER(rol), ' | Nombre: ', nombre) as 'CREDENCIALES DE ACCESO'
FROM usuarios 
ORDER BY 
    CASE rol 
        WHEN 'cliente' THEN 1 
        WHEN 'doctor' THEN 2 
        WHEN 'admin' THEN 3 
    END;

SELECT '=== REGLAS DE ACCESO ===' as info;
SELECT 'IMPORTANTE: Cada usuario SOLO puede acceder con su rol correspondiente' as regla;
SELECT 'cliente@prueba.com -> SOLO puede seleccionar ROL: Cliente' as regla_cliente;
SELECT 'doctor@prueba.com -> SOLO puede seleccionar ROL: Doctor' as regla_doctor;
SELECT 'admin@prueba.com -> SOLO puede seleccionar ROL: Admin' as regla_admin;
