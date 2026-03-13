-- 1. TABLAS CATÁLOGO (Sin llaves foráneas dependientes)

-- Almacena los tipos de paquetes (Ej. Paquete Completo, Horario Fijo)[cite: 62].
CREATE TABLE membresias (
    id_membresia SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Inventario físico de máquinas y pesas[cite: 7].
CREATE TABLE equipos (
    id_equipo SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    capacidad VARCHAR(50),
    estado VARCHAR(50) DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Mantenimiento', 'Baja'))
);

-- 2. TABLAS DE PERSONAS

-- Registro principal de los clientes (socios) del gimnasio[cite: 18, 40].
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    ci VARCHAR(20),
    direccion TEXT,
    celular VARCHAR(20) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    foto_url TEXT,
    observaciones TEXT,
    quien_atendio VARCHAR(100),
    estado VARCHAR(20) DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Inactivo')),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Personal encargado de las clases y rutinas[cite: 121, 122].
CREATE TABLE entrenadores (
    id_entrenador SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    celular VARCHAR(20) NOT NULL,
    correo VARCHAR(150) UNIQUE,
    ci VARCHAR(20) NOT NULL,
    edad INT,
    designacion VARCHAR(100),
    foto_url TEXT,
    estado VARCHAR(20) DEFAULT 'Activo'
);

-- Personal de apoyo o administrativo[cite: 157, 172, 174].
CREATE TABLE ayudantes (
    id_ayudante SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150) NOT NULL,
    ci VARCHAR(20) NOT NULL,
    direccion TEXT,
    ocupacion VARCHAR(100),
    correo VARCHAR(150),
    sueldo DECIMAL(10, 2),
    foto_url TEXT,
    estado VARCHAR(20) DEFAULT 'Activo'
);

-- 3. TABLAS OPERACIONALES Y TRANSACCIONALES

-- Relaciona a un usuario con su plan contratado en el tiempo[cite: 59, 64].
CREATE TABLE suscripciones_membresia (
    id_suscripcion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_membresia INT NOT NULL REFERENCES membresias(id_membresia),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Vencida')),
    CONSTRAINT chk_fechas CHECK (fecha_fin >= fecha_inicio)
);

-- Registro de pagos y recibos digitales[cite: 76, 78].
CREATE TABLE comprobantes (
    id_comprobante SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10, 2) NOT NULL,
    concepto VARCHAR(255) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    estado_pago VARCHAR(20) DEFAULT 'Pagado' CHECK (estado_pago IN ('Pagado', 'Anulado'))
);

-- Control de entradas y salidas de los socios[cite: 106, 110].
CREATE TABLE asistencias (
    id_asistencia SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gestión de las sesiones y clases programadas[cite: 10].
CREATE TABLE clases (
    id_clase SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    horario VARCHAR(100) NOT NULL,
    capacidad INT NOT NULL,
    id_entrenador INT REFERENCES entrenadores(id_entrenador) ON DELETE SET NULL,
    tipo_curso VARCHAR(100)
);

-- Tabla intermedia para saber qué usuarios asisten a qué clases[cite: 10].
CREATE TABLE inscripciones_clase (
    id_clase INT NOT NULL REFERENCES clases(id_clase) ON DELETE CASCADE,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_clase, id_usuario)
);

-- Control de turnos para el personal (entrenadores y ayudantes)[cite: 6].
CREATE TABLE horarios_personal (
    id_horario SERIAL PRIMARY KEY,
    id_entrenador INT REFERENCES entrenadores(id_entrenador) ON DELETE CASCADE,
    id_ayudante INT REFERENCES ayudantes(id_ayudante) ON DELETE CASCADE,
    dia_semana VARCHAR(15) NOT NULL,
    turno VARCHAR(50) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    -- Aseguramos que el horario pertenezca a un entrenador O a un ayudante, no a ambos ni a ninguno.
    CONSTRAINT chk_personal_asignado CHECK (
        (id_entrenador IS NOT NULL AND id_ayudante IS NULL) OR 
        (id_entrenador IS NULL AND id_ayudante IS NOT NULL)
    )
);