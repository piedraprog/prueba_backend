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

## Mejoras o Futuras implementaciones

### Implementación de un Servicio de Notificación a través de un Webhook

Para integrar notificaciones en tiempo real con otros sistemas, se ha implementado un servicio de notificación mediante un webhook. Este servicio enviará actualizaciones a un endpoint externo cuando ocurran eventos importantes en la aplicación, como la creación o actualización de evaluaciones.

#### Pasos para Implementar el Servicio de Notificación:

1. **Configurar el Webhook:**
   Define la URL del webhook en las variables de entorno o en un archivo de configuración. Esta URL es el endpoint externo al que se enviarán las notificaciones.

2. **Crear el Servicio de Notificación:**
   Implementa un servicio que se encargue de enviar solicitudes HTTP al webhook. Utiliza una biblioteca como `axios` para realizar las solicitudes POST al endpoint configurado.

3. **Integrar el Servicio en la Aplicación:**
   Llama al servicio de notificación desde los puntos relevantes del flujo de trabajo, por ejemplo, cuando se crea o se actualiza una evaluación. Esto asegurará que se envíen las notificaciones adecuadas a los sistemas externos.

4. **Probar el Webhook:**
   Utiliza herramientas como `ngrok` para exponer el webhook localmente a Internet y realizar pruebas. Verifica que el servicio de notificación esté enviando los datos correctos al endpoint externo.

---

### Implementación de Testing Unitarios e Integrales

Para garantizar la calidad y la estabilidad del código, se han implementado pruebas unitarias e integrales. Estas pruebas ayudan a identificar errores antes de que el código sea desplegado en producción.

#### Pasos para Implementar Testing:

1. **Configurar el Entorno de Pruebas:**
   Instala las herramientas necesarias para realizar pruebas, como `jest` para pruebas unitarias y `supertest` para pruebas de integración. Asegúrate de que las pruebas se ejecuten en un entorno controlado.

2. **Escribir Pruebas Unitarias:**
   Crea pruebas para verificar el comportamiento de funciones y métodos individuales. Asegúrate de que cada componente de la aplicación funcione correctamente en aislamiento.

3. **Escribir Pruebas de Integración:**
   Crea pruebas que verifiquen el funcionamiento de diferentes partes de la aplicación juntas. Estas pruebas deben asegurarse de que los endpoints de la API y los flujos de trabajo completos funcionen como se espera.

4. **Ejecutar y Mantener las Pruebas:**
   Ejecuta las pruebas regularmente para detectar problemas a medida que se realizan cambios en el código. Mantén las pruebas actualizadas con los cambios en la aplicación para asegurar su efectividad.

---

### Implementación de un Flujo de Asignación y Evaluación

El flujo de asignación y evaluación es fundamental para el sistema de evaluación 360 grados. Este flujo define cómo se asignan las evaluaciones a los empleados y cómo se completan y envían.

#### Pasos para Implementar el Flujo de Asignación y Evaluación:

1. **Asignar Evaluaciones:**
   Crea un proceso para asignar evaluaciones a los empleados. Esto puede incluir la creación de una evaluación y la asignación de la misma a un empleado específico.

2. **Completar Evaluaciones:**
   Permite que los empleados completen las evaluaciones asignadas. Esto implica que los empleados respondan a las preguntas y envíen sus respuestas.

3. **Enviar Evaluaciones:**
   Implementa un mecanismo para enviar las evaluaciones completadas. Asegúrate de que las respuestas sean validadas y almacenadas correctamente.

4. **Revisar y Procesar Evaluaciones:**
   Proporciona una forma de revisar y procesar las evaluaciones enviadas. Esto puede incluir la generación de reportes y la visualización de resultados.

---

### Implementación de un Historial de Acciones Globales

Para mantener un registro de todas las acciones importantes dentro del sistema, se ha implementado un historial de acciones globales. Esto permite rastrear y auditar los eventos en la aplicación.

#### Pasos para Implementar el Historial de Acciones:

1. **Definir el Modelo de Historial:**
   Crea un modelo para almacenar los registros de acciones. Este modelo debe incluir información como el tipo de acción, el usuario que realizó la acción, y la fecha y hora del evento.

2. **Registrar Acciones:**
   Implementa un mecanismo para registrar acciones en el historial cada vez que ocurra un evento importante. Asegúrate de capturar toda la información relevante para el seguimiento.

3. **Consultar el Historial:**
   Proporciona una forma de consultar el historial de acciones. Esto puede incluir filtros por tipo de acción, usuario, y fechas específicas.

4. **Auditar el Historial:**
   Revisa periódicamente el historial para asegurar la integridad y la seguridad de los datos. Utiliza el historial para detectar y responder a actividades inusuales o sospechosas.

---
