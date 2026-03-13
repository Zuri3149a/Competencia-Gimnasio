-- 1. Insertar Membresías
INSERT INTO membresias (nombre) VALUES 
('Plan Mensual Básico'), 
('Plan Trimestral'), 
('Plan Anual VIP'), 
('Pase Diario');

-- 2. Insertar Equipos
INSERT INTO equipos (nombre, capacidad, estado) VALUES 
('Caminadora Pro-Form', '150kg', 'Activo'),
('Rack de Pesas Olímpicas', '500kg', 'Activo'),
('Bicicleta de Spinning', '120kg', 'Mantenimiento'),
('Máquina de Prensa de Piernas', '300kg', 'Activo');

-- 3. Insertar Usuarios (Clientes)
INSERT INTO usuarios (nombre_completo, ci, direccion, celular, correo, quien_atendio) VALUES 
('Juan Perez', '1234567 LP', 'Av. Arce #123', '70011223', 'juan.perez@email.com', 'Admin Principal'),
('Maria Garcia', '7654321 CB', 'Calle Junin #45', '71122334', 'maria.g@email.com', 'Recepcionista'),
('Carlos Rodriguez', '9876543 SC', 'Anillo 3, Edif. Los Pinos', '72233445', 'carlos.r@email.com', 'Admin Principal');

-- 4. Insertar Entrenadores
INSERT INTO entrenadores (nombres, apellidos, especialidad, celular, correo, ci, edad, designacion) VALUES 
('Roberto', 'Sánchez', 'Fisicoculturismo', '75566778', 'roberto.coach@gym.com', '4567890', 34, 'Entrenador Senior'),
('Laura', 'Méndez', 'Crossfit y Cardio', '76677889', 'laura.coach@gym.com', '5678901', 28, 'Instructora Turno Mañana');

-- 5. Insertar Ayudantes
INSERT INTO ayudantes (nombre_completo, ci, direccion, ocupacion, correo, sueldo) VALUES 
('Pedro Alcorta', '3344556', 'Barrio Lindo', 'Limpieza y Apoyo', 'pedro.a@gym.com', 2500.00);

-- 6. Suscripciones (Relacionando usuarios con membresías)
INSERT INTO suscripciones_membresia (id_usuario, id_membresia, fecha_inicio, fecha_fin, estado) VALUES 
(1, 1, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month', 'Activa'),
(2, 3, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '11 months', 'Activa');

-- 7. Clases
INSERT INTO clases (nombre, horario, capacidad, id_entrenador, tipo_curso) VALUES 
('Zumba Inicial', 'Lunes y Miércoles 08:00', 20, 2, 'Grupal'),
('Levantamiento de Potencia', 'Martes y Jueves 18:00', 10, 1, 'Especializado');

-- 8. Asistencias (Simulando entradas de hoy)
INSERT INTO asistencias (id_usuario) VALUES (1), (2);