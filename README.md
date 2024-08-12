# Proyecto de Evaluación 360 Grados

Este proyecto es una API RESTful para un sistema de evaluación 360 grados de empleados remotos, utilizando Node.js, Express, MongoDB, y TypeScript. A continuación se detallan los pasos para configurar e instalar el proyecto.

## Requisitos

- Node.js (v14 o superior)
- npm (o yarn)
- MongoDB

## Instalación y Configuración

1. **Clonar el Repositorio**

   Clona el repositorio desde GitHub:

   ```bash
   git clone https://github.com/piedraprog/prueba_backend.git
   cd tu_repositorio
   ```

2. **Instalar Dependencias**

   Instala las dependencias del proyecto utilizando npm o yarn:

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar Variables de Entorno**

   Copia el archivo de ejemplo `.env.example` a un nuevo archivo `.env` y actualiza las variables de entorno según tus necesidades. Por ejemplo:

   ```env
   MONGODB_URI=mongodb://Localhost/rrhh360
   ACCESS_TOKEN_SECRET=tu_clave_secreta
   PORT=puerto_de_tu_preferencia
   ```

   Asegúrate de reemplazar `tu_clave_secreta` con una clave segura generada para tus tokens.

4. **Ejecutar el Script de Configuración Inicial**

   Corre el script para agregar roles y permisos iniciales, y un usuario admin:

   ```bash
   npm run setup
   # o
   yarn setup
   ```

   Este script configurará los roles (`admin`, `manager`, `employee`) con permisos asociados (`read`, `write`, `delete`) y creará un usuario admin por defecto.
   que esta configurado con las siguientes credenciales

    ```json
    {
        "email":"jose.piedra@example.com",
        "password":"123456"
    }
   ```
    
5. **Iniciar el Servidor**

   Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

   O en modo producción:

   ```bash
   npm start
   # o
   yarn start
   ```

## Flujo de Setup

1. **Inicialización del Proyecto**

   - Clonar el repositorio y navegar al directorio del proyecto.
   - Instalar todas las dependencias necesarias.

2. **Configuración del Entorno**

   - Crear un archivo `.env` para manejar variables sensibles.
   - Configurar la conexión a MongoDB y claves secretas para los tokens.

3. **Ejecutar Configuración Inicial**

   - El script de configuración inicial establece roles, permisos y un usuario admin, asegurando que el sistema tenga una base sólida para comenzar.

4. **Desarrollo y Producción**

   - El servidor puede ser iniciado en modo desarrollo para pruebas o en modo producción para un entorno en vivo.

## Estructura de la API

- **Autenticación**: Manejo de inicio de sesión, registro de usuarios y gestión de tokens.
- **Roles y Permisos**: Definición de roles (`admin`, `manager`, `employee`) y asignación de permisos (`read`, `write`, `delete`).
- **Empleados**: Gestión de información personal y profesional de los empleados.
- **Evaluaciones**: Creación, actualización y gestión de evaluaciones y respuestas.

## Decisiones de Diseño

1. **Separación de Roles y Permisos**:
   - Los roles (`admin`, `manager`, `employee`) se gestionan por separado y tienen permisos específicos asociados para un control más granular del acceso.
   - Los permisos se definen globalmente y se asignan a los roles para simplificar la gestión.

2. **Modelo de Datos**:
   - Los modelos están diseñados para ser flexibles y escalables, permitiendo una fácil integración y extensión en el futuro.
   - El uso de una colección intermedia para preguntas de evaluaciones permite una gestión eficiente de relaciones entre evaluaciones y preguntas.

3. **Configuración Inicial Automatizada**:
   - Un script de configuración inicial asegura que el sistema se inicia con una base de datos preconfigurada, evitando la necesidad de configuración manual posterior.

4. **Manejo de Errores y Respuestas**:
   - La implementación de un `responseFormatter` estandariza las respuestas de la API, facilitando la interpretación y manejo de errores por parte del cliente.

---