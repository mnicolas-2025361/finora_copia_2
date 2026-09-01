# Finora 

Aplicación web para el **control y administración de gastos personales**.

Finora permite a los usuarios registrarse, iniciar sesión y posteriormente administrar sus finanzas desde una interfaz web moderna.

El proyecto está desarrollado utilizando **Angular, TypeScript, Node.js, Express y PostgreSQL**.

---

##  Descripción

Finora nace como un proyecto académico orientado al desarrollo de una aplicación web escalable para el control de gastos.

El sistema cuenta con autenticación de usuarios mediante **JWT**, almacenamiento de contraseñas utilizando **bcrypt** y una base de datos PostgreSQL.

Actualmente el proyecto cuenta con:

* Registro de usuarios
* Inicio de sesión
* Autenticación mediante JWT
* Roles de usuario
* Usuario administrador predeterminado
* Conexión con PostgreSQL
* Frontend desarrollado con Angular
* Backend desarrollado con Node.js + Express
* Navegación entre Login, Register y Home
* Diseño responsive
* Interfaz personalizada para Finora

---

# Tecnologías utilizadas

## Frontend

* Angular
* TypeScript
* HTML5
* CSS3
* Angular Forms
* Angular Router
* RxJS

## Backend

* Node.js
* Express
* TypeScript
* JWT
* bcrypt
* PostgreSQL
* pg

## Herramientas

* pnpm
* Git
* GitHub
* Visual Studio Code

---

#  Estructura del proyecto

```text
Finora/
│
├── apps/
│   │
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── database.ts
│   │   │   │
│   │   │   ├── controllers/
│   │   │   │   └── auth.controller.ts
│   │   │   │
│   │   │   ├── models/
│   │   │   │   └── user.model.ts
│   │   │   │
│   │   │   ├── routes/
│   │   │   │   └── auth.routes.ts
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   │
│   │   │   ├── server.ts
│   │   │   └── app.ts
│   │   │
│   │   ├── dist/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── frontend/
│       ├── src/
│       │   └── app/
│       │       ├── pages/
│       │       │   ├── login/
│       │       │   ├── register/
│       │       │   └── home/
│       │       │
│       │       ├── services/
│       │       │   └── auth.ts
│       │       │
│       │       ├── app.ts
│       │       ├── app.html
│       │       └── app.css
│       │
│       ├── angular.json
│       ├── package.json
│       └── tsconfig.json
│
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

# Base de datos

El proyecto utiliza **PostgreSQL**.

La tabla principal utilizada actualmente es:

```sql
users
```

## Estructura de usuarios

```text
users
│
├── id
├── name
├── email
├── password
├── role
└── created_at
```

Los roles disponibles son:

```text
USER
ADMIN
```

Las contraseñas **no se almacenan directamente** en la base de datos.

Antes de guardarlas se utiliza `bcrypt` para generar un hash seguro.

---

#  Autenticación

Finora utiliza **JSON Web Tokens (JWT)** para manejar las sesiones.

Cuando un usuario inicia sesión correctamente, el backend devuelve:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 2,
    "name": "Marcos",
    "email": "marcos@gmail.com",
    "role": "USER"
  }
}
```

El frontend almacena el token en:

```text
localStorage
```

Utilizando:

```text
token
```

También se almacena la información básica del usuario:

```text
user
```

---

#  Usuarios para probar

## Administrador

El sistema crea automáticamente un administrador cuando se inicia el backend si todavía no existe.

```text
Nombre:
Administrador

Correo:
admin@finora.com

Contraseña:
Admin123

Rol:
ADMIN
```

###  Importante

Estas credenciales son únicamente para pruebas/desarrollo.

En producción se debe utilizar una contraseña más segura y no guardar credenciales directamente en el código.

---

## Usuario normal

También puedes crear usuarios desde la pantalla:

```text
Register
```

Por ejemplo:

```text
Nombre:
Marcos

Correo:
marcos@gmail.com

Contraseña:
123456
```

Después de registrarse, el usuario tendrá:

```text
Rol: USER
```

---

#  Rutas del Backend

El backend funciona actualmente en:

```text
http://localhost:3000
```

Las rutas de autenticación se encuentran bajo:

```text
/api/auth
```

## Registrar usuario

```http
POST /api/auth/register
```

### Body

```json
{
  "name": "Marcos",
  "email": "marcos@gmail.com",
  "password": "123456"
}
```

### Respuesta

```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": 2,
    "name": "Marcos",
    "email": "marcos@gmail.com",
    "role": "USER"
  }
}
```

---

## Iniciar sesión

```http
POST /api/auth/login
```

### Body

```json
{
  "email": "marcos@gmail.com",
  "password": "123456"
}
```

### Respuesta

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 2,
    "name": "Marcos",
    "email": "marcos@gmail.com",
    "role": "USER"
  }
}
```

---

#  Rutas del Frontend

Angular funciona actualmente en:

```text
http://localhost:4200
```

Las principales rutas son:

```text
/login
/register
/home
```

## Login

```text
http://localhost:4200/login
```

Permite iniciar sesión utilizando un correo y contraseña registrados.

---

## Register

```text
http://localhost:4200/register
```

Permite crear una nueva cuenta de usuario.

---

## Home

```text
http://localhost:4200/home
```

Pantalla principal de la aplicación después de iniciar sesión.

---

#  Instalación

## 1. Clonar el proyecto

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar al proyecto:

```bash
cd Finora
```

---

#  Instalar dependencias

Desde la raíz del proyecto:

```bash
pnpm install
```

---

#  Configurar PostgreSQL

Crear una base de datos para Finora.

Por ejemplo:

```text
finora
```

Después configurar las variables de entorno del backend.

Archivo:

```text
apps/backend/.env
```

Ejemplo:

```env
PORT=3000

DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/finora

JWT_SECRET=una_clave_secreta_para_desarrollo
```

###  Importante

El archivo `.env` **no debe subirse a GitHub**.

Debe agregarse al `.gitignore`:

```text
.env
```

---

#  Ejecutar el Backend

Entrar al backend:

```bash
cd apps/backend
```

Instalar dependencias:

```bash
pnpm install
```

Compilar TypeScript:

```bash
pnpm build
```

Iniciar:

```bash
pnpm start
```

Si todo funciona correctamente aparecerá algo similar a:

```text
Base de datos conectada
El administrador ya existe
Backend iniciado en http://localhost:3000
```

---

# Ejecutar el Frontend

Abrir otra terminal.

Entrar al frontend:

```bash
cd apps/frontend
```

Instalar dependencias:

```bash
pnpm install
```

Ejecutar Angular:

```bash
pnpm start
```

También puede utilizarse:

```bash
ng serve
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

---

# Ejecutar todo el proyecto

Se recomienda utilizar **dos terminales**.

### Terminal 1 — Backend

```bash
cd apps/backend
pnpm build
pnpm start
```

### Terminal 2 — Frontend

```bash
cd apps/frontend
pnpm start
```

Después abrir:

```text
http://localhost:4200
```

---

#  Pruebas

## Prueba 1 — Administrador

Ir a:

```text
http://localhost:4200/login
```

Ingresar:

```text
Correo: admin@finora.com
Contraseña: Admin123
```

El usuario debería iniciar sesión con:

```text
Rol: ADMIN
```

---

## Prueba 2 — Crear usuario

Ir a:

```text
http://localhost:4200/register
```

Ingresar:

```text
Nombre: Marcos
Correo: marcos@gmail.com
Contraseña: 123456
Confirmar contraseña: 123456
```

Después de registrarse, se puede iniciar sesión utilizando esas credenciales.

---

## Prueba 3 — Login

Utilizar:

```text
Correo: marcos@gmail.com
Contraseña: 123456
```

Si las credenciales son correctas, Angular guarda el JWT y redirecciona a:

```text
/home
```

---

#  Seguridad

Actualmente Finora utiliza:

* bcrypt para contraseñas
* JWT para autenticación
* Variables de entorno para secretos
* Roles `USER` y `ADMIN`
* Validación de datos en el backend

En futuras versiones se recomienda implementar:

* Refresh tokens
* Expiración configurable de sesiones
* Guards de Angular
* Middleware de autenticación
* Middleware de autorización por rol
* Validaciones más completas
* Protección contra ataques de fuerza bruta
* HTTPS en producción
* CORS configurado para producción
* Variables de entorno separadas para desarrollo y producción

---

#  Diseño

La interfaz de Finora está diseñada para transmitir una sensación de:

* Finanzas
* Organización
* Seguridad
* Simplicidad
* Modernidad

La identidad visual utiliza principalmente:

```text
Verde → Finanzas / crecimiento
Oscuro → Seguridad / confianza
Blanco → Limpieza / simplicidad
Morado → Elementos secundarios
```

Las pantallas principales mantienen una identidad visual consistente:

```text
Login
   ↓
Register
   ↓
Home
```

---

#  Arquitectura

El backend utiliza una separación por responsabilidades:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Database
```

### Routes

Define los endpoints disponibles.

Ejemplo:

```text
POST /register
POST /login
```

### Controllers

Reciben las solicitudes HTTP y devuelven las respuestas.

### Services

Contienen la lógica de negocio.

Ejemplo:

```text
registerUser()
loginUser()
```

### Database

Se encarga de la comunicación con PostgreSQL.

---

#  Próximas funcionalidades

El objetivo del proyecto es convertir Finora en una aplicación completa de control financiero.

Las siguientes funcionalidades pueden agregarse:

## Gastos

* Crear gasto
* Editar gasto
* Eliminar gasto
* Consultar gastos
* Filtrar gastos
* Categorizar gastos

## Categorías

* Alimentación
* Transporte
* Entretenimiento
* Educación
* Salud
* Hogar
* Otros

## Ingresos

* Registrar ingresos
* Editar ingresos
* Eliminar ingresos

## Dashboard

Mostrar:

```text
Ingresos
Gastos
Balance
Ahorros
```

Además de gráficos para visualizar los gastos.

## Presupuestos

Permitir al usuario establecer límites:

```text
Alimentación → Q 500
Transporte → Q 300
Entretenimiento → Q 200
```

Y mostrar cuánto presupuesto queda disponible.

---

#  Roadmap

```text
[✓] Configuración inicial del proyecto
[✓] Backend con Express
[✓] Conexión PostgreSQL
[✓] Modelo de usuarios
[✓] Registro de usuarios
[✓] Login
[✓] bcrypt
[✓] JWT
[✓] Roles USER / ADMIN
[✓] Usuario administrador
[✓] Frontend Angular
[✓] Página Login
[✓] Página Register
[✓] Página Home
[✓] Navegación entre páginas
[✓] Diseño visual de Finora

[ ] CRUD de gastos
[ ] CRUD de ingresos
[ ] Categorías
[ ] Dashboard financiero
[ ] Gráficos
[ ] Presupuestos
[ ] Historial de movimientos
[ ] Guards de autenticación
[ ] Permisos por rol
[ ] Perfil de usuario
[ ] Configuración
```

---

#  Proyecto

**Nombre:** Finora

**Tipo:** Aplicación web de control de gastos

**Arquitectura:** Frontend + Backend + Base de datos

**Frontend:** Angular + TypeScript

**Backend:** Node.js + Express + TypeScript

**Base de datos:** PostgreSQL

**Autenticación:** JWT + bcrypt

---

#  Estado actual

El sistema cuenta actualmente con una base funcional de autenticación.

El flujo principal es:

```text
Usuario
   │
   ▼
Register
   │
   ▼
PostgreSQL
   │
   ▼
Login
   │
   ▼
JWT
   │
   ▼
Home
```

La siguiente etapa del desarrollo consiste en implementar el **módulo de gastos**, que será el núcleo principal de Finora.
