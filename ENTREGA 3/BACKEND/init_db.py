import sqlite3
from flask_bcrypt import Bcrypt
import os



# Crear un bcrypt temporal para encriptar contraseñas iniciales
bcrypt = Bcrypt()

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

# ------------------------------
# 1) Usuarios
# ------------------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nombre TEXT,
    fecha_creacion TEXT
)
""")

# ------------------------------
# 2) Destinos turísticos
# ------------------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS destinos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    descripcion TEXT,
    lat REAL,
    lon REAL,
    precio REAL,
    imagen TEXT,
    region TEXT,
    destacado INTEGER DEFAULT 0
)
""")

# ------------------------------
# 3) Horarios disponibles
# ------------------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS horarios_destino (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    destino_id INTEGER,
    fecha TEXT,
    hora TEXT,
    cupos INTEGER,
    FOREIGN KEY(destino_id) REFERENCES destinos(id)
)
""")

# ------------------------------
# 4) Reservas
# ------------------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    destino_id INTEGER,
    horario_id INTEGER,
    estado TEXT,
    fecha_reserva TEXT,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY(destino_id) REFERENCES destinos(id),
    FOREIGN KEY(horario_id) REFERENCES horarios_destino(id)
)
""")

# ------------------------------
# 5) Pagos
# ------------------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS pagos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reserva_id INTEGER,
    monto REAL,
    metodo TEXT,
    fecha_pago TEXT,
    FOREIGN KEY(reserva_id) REFERENCES reservas(id)
)
""")

# ------------------------------
# 6) Favoritos
# ------------------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS favoritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    destino_id INTEGER,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY(destino_id) REFERENCES destinos(id)
)
""")

# ------------------------------
# 7) Notificaciones
# ------------------------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS notificaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    mensaje TEXT,
    vista INTEGER DEFAULT 0,
    fecha TEXT,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
)
""")

# -----------------------------------------------------
# Insertar destinos ejemplo
# -----------------------------------------------------

destinos = [
    ("Torres del Paine", "Destino icónico de la Patagonia", -51.066, -73.273, 15000, "/img/paine.png", "Magallanes", 1),
    ("Cajón del Maipo", "Rutas de trekking y naturaleza", -33.633, -70.331, 5000, "/img/cajon2.png", "RM", 1),
    ("Desierto de Atacama", "El lugar más árido del mundo", -23.98, -69.23, 12000, "/img/atacama.png", "Antofagasta", 0),
]

cursor.executemany("""
INSERT INTO destinos(nombre, descripcion, lat, lon, precio, imagen, region, destacado) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
""", destinos)

# -----------------------------------------------------
# Insertar horarios ejemplo
# -----------------------------------------------------
horarios = [
    (1, "2026-01-22", "09:00", 20),
    (1, "2026-01-21", "14:00", 20),
    (2, "2026-02-15", "10:00", 30),
    (3, "2026-02-28", "09:00", 25),
]

cursor.executemany("""
INSERT INTO horarios_destino(destino_id, fecha, hora, cupos)
VALUES (?, ?, ?, ?)
""", horarios)

# -----------------------------------------------------
# Insertar usuarios de prueba
# -----------------------------------------------------

usuarios = [
    ("turista@gmail.com", bcrypt.generate_password_hash("1234").decode(), "Jorge López", "2025-10-05"),
    ("ana@gmail.com", bcrypt.generate_password_hash("abcd").decode(), "Ana Martínez", "2025-11-10"),
    ("carlos@gmail.com", bcrypt.generate_password_hash("xyz1").decode(), "Carlos Pérez", "2025-12-01"),
    ("maria@gmail.com", bcrypt.generate_password_hash("pass123").decode(), "María Gómez", "2025-12-15")
]

cursor.executemany("""
INSERT INTO usuarios(email, password, nombre, fecha_creacion)
VALUES (?, ?, ?, ?)
""", usuarios)


reservas = [
    (1, 1, 1, "confirmada", "2025-12-20"),
    (2, 2, 3, "pendiente", "2025-12-22"),
    (3, 3, 4, "cancelada", "2025-12-25"),
]
cursor.executemany("""
INSERT INTO reservas(usuario_id, destino_id, horario_id, estado, fecha_reserva)
VALUES (?, ?, ?, ?, ?)
""", reservas)

conn.commit()
conn.close()

print("DATABASE LISTA ✔ con datos iniciales corregidos y cargados")
print("BD que se creará en:", os.path.abspath("database.db"))
