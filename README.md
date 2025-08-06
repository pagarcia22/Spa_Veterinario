

# 🐾 Spa Veterinario

## 📄 Descripción

Sistema web tipo SPA para gestión de servicios veterinarios y de spa. Permite interacción entre **tres roles de usuario**:

* **Cliente:** administra sus mascotas, solicita citas médicas o de spa, genera proformas y consulta historial clínico.
* **Doctor (Veterinario):** registra diagnósticos, tratamientos, controla vacunas, utiliza un módulo de vademécum (medicamentos por síntoma/especie).
* **Administrador:** gestiona usuarios, servicios, productos, inventario, compras, facturación, promociones y reportes.
---

## 📦 Tecnologías

* **Frontend:** JavaScript (framework tipo React/Vue/Angular o vanilla JS SPA)
* **Backend:** PHP o Node.js (por ejemplo), con base de datos MySQL
* **Autenticación y roles:** sistemas de login/registro con control por rol
* **Interfaz responsive** y funcionalidades 24/7 para clientes 
---

## 🧩 Módulos y funcionalidades

### Seguridad y usuarios

* Registro / login
* Roles: cliente, doctor, administrador
* Asignación de permisos según rol

### Cliente

* Registro y edición de datos personales
* Registro de mascotas (varias por cliente)
* Solicitud y cancelación de citas para spa o veterinaria
* Visualización de historial clínico y vacunas
* Generación de proformas de servicios o productos

### Doctor (Veterinario)

* Acceso al historial clínico de las mascotas
* Registro de diagnósticos y tratamientos
* Control de vacunas por paciente
* Uso del módulo de vademécum (busca medicamento según síntomas y tipo de mascota)

### Administrador

* Gestión de usuarios, roles y seguridad
* Administración de servicios y spa (alta/baja/edición)
* Gestión de compras, proveedores e inventario
* Facturación de ventas y productos, devoluciones incluidas
* Creación y gestión de promociones online
* Reportes personalizados: citas, mascotas atendidas, vacunas, usuarios, ingresos, etc. 

---

## 🛠 Instalación y despliegue

1. Clonar el repositorio
2. Instalar dependencias (frontend/backend)
3. Crear base de datos SQL (usuarios, mascotas, citas, servicios, facturación, inventario, etc.)
4. Configurar variables de entorno para conexión BD y autenticación
5. Ejecutar migraciones y seeders para datos iniciales
6. Levantar backend y frontend (servidor local o contenedor Docker)
7. Acceder en el navegador e iniciar sesión con rol administrador

---

## 🔧 Ejemplo de rutas (API REST)

| Endpoint             | Método              | Rol requerido         | Descripción                                  |
| -------------------- | ------------------- | --------------------- | -------------------------------------------- |
| `/api/auth/register` | POST                | —                     | Registro de usuario                          |
| `/api/auth/login`    | POST                | —                     | Inicio de sesión                             |
| `/api/mascotas`      | GET/POST/PUT/DELETE | Cliente / Admin       | CRUD mascotas                                |
| `/api/citas`         | GET/POST/DELETE     | Cliente / Doc / Admin | Gestión de citas                             |
| `/api/historial`     | GET/POST            | Doc / Cliente         | Histórico clínico                            |
| `/api/vademecum`     | GET                 | Doc                   | Búsqueda de medicamentos por síntoma/especie |
| `/api/productos`     | CRUD                | Admin                 | Gestión de productos/inventario              |
| `/api/facturacion`   | GET/POST            | Admin / Cliente       | Venta, devolución, consulta facturas         |
| `/api/reportes/*`    | GET                 | Admin / Doc           | Datos estadísticos, vacunas, ventas          |


---

## 🎯 Buenas prácticas y recomendaciones

* Usa **metodología ágil** (como XP o Scrum) para iterar según feedback del cliente/usuario
* Aplica **control estrictos de roles y permisos** para proteger datos sensibles
* Implementa **pruebas de usabilidad e interfaz** y encuestas de satisfacción durante las fases de desarrollo 
* Considera añadir **facturación electrónica** si el proyecto está en Colombia u otra región donde sea obligatoria 

---

## 📝 Licencia

* Bajo la licencia Paola Garcia
---



