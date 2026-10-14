# Spa Veterinario (demo)

Prototipo de interfaz web para gestionar una clínica veterinaria y spa de mascotas, hecho con Next.js, React y TypeScript. Este repositorio contiene el **frontend**; no incluye backend ni base de datos.

## Módulos de la interfaz

- **Mascotas:** registro y administración de las mascotas de un cliente.
- **Citas:** solicitud y gestión de citas médicas o de spa.
- **Historial médico:** consulta de diagnósticos, tratamientos y vacunas.
- **Pagos:** pantalla del proceso de pago.
- **Perfil de usuario.**
- **Panel (dashboard)** con acceso por rol (cliente, doctor y administrador).

## Tecnologías

Next.js · React · TypeScript · Tailwind CSS · shadcn/ui · JavaScript

## Instalación

```bash
git clone https://github.com/pagarcia22/Spa_Veterinario.git
cd Spa_Veterinario
pnpm install      # o: npm install
pnpm dev          # o: npm run dev
```

Abre `http://localhost:3000`.

## Estado del proyecto

Prototipo de práctica. El control de roles del inicio de sesión es solo de demostración y no es seguro para producción.

## Próximos pasos

- Backend con API REST y base de datos MySQL.
- Autenticación real con contraseñas cifradas y tokens.
- Módulos de inventario, facturación y reportes.
