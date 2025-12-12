# Proyecto React + TypeScript — Formulario y Maquetación de Tarjeta de Crédito

Este proyecto fue creado utilizando **Create React App** con la plantilla de **TypeScript** mediante el comando:

```bash
npx create-react-app --template typescript
```

El objetivo principal es construir la maquetación de una tarjeta de crédito junto con un formulario totalmente funcional que permita enviar los datos al backend para agregar la tarjeta a la base de datos.

---

## 🚀 Características principales

- Maquetación fiel del diseño suministrado.
- Vista dinámica: al editar los campos de la tarjeta, el diseño mostrado se actualiza en tiempo real.
- Validaciones estrictas en todos los campos.
- Muestra de mensajes de error en color rojo cuando un campo no cumple las reglas.
- Cada tarjeta agregada cuenta con un identificador único.

---

## 📁 Estructura del formulario y reglas de negocio

### 🔹 1. Maquetación y validaciones

El formulario cuenta con los siguientes campos, cada uno con sus reglas específicas:

### **a) Todos los campos son requeridos.**

### **b) Los campos interactúan dinámicamente con el diseño de la tarjeta.**

- Número de tarjeta.
- Fecha de vencimiento.
- Nombre del titular.

### **c) Campo Número de tarjeta**

- Solo permite **números**.
- Máximo **16 caracteres**.
- Los cambios se reflejan en la tarjeta.

### **d) Fecha de vencimiento (mm/yy)**

- Formato obligatorio: **mm/yy**.

### **e) Reglas de validación para fecha**

- Mes válido: **01 a 12**.
- Año válido: desde **22** hasta **año actual + 5**.

### **f) Nombre del titular**

- Solo permite **letras** y **letras con tildes**.
- Máximo **20 caracteres**.
- Se actualiza en la tarjeta en tiempo real.

### **g) Mensajes de error**

- En caso de que un campo no sea válido, se debe mostrar un texto en **rojo**, debajo del campo, explicando el motivo de la invalidez.

---

## 🔹 2. Funcionalidad del botón "Agregar tarjeta"

Al pulsar el botón:

### **a) La tarjeta se agrega a un bloque listado**

### **b) Cada tarjeta debe tener un identificador único**

- El identificador se genera con UUID.

### **c) Validación obligatoria antes de agregar**

- Si algún campo no es válido, el sistema muestra los mensajes de error correspondientes debajo de cada campo.
- Si todo es válido, se agrega la tarjeta al listado.

---

## 🔧 Tecnologías utilizadas

- **React**
- **TypeScript**
- **CSS**
- **UUID para generar identificadores únicos**

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone <https://github.com/adrianjose01/credit-card>
```

2. Instalar las dependencias:

```bash
npm install
```

3. Ejecutar el proyecto en modo desarrollo:

```bash
npm start
```

4. Abrir en el navegador:

```
http://localhost:3000
```

---
