import sqlite3

conn = sqlite3.connect("database.db")

# ------------------------------
# 1) Usuarios
# ------------------------------
conn.execute("""
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
conn.execute("""
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
# 3) Horarios disponibles en un destino
# ------------------------------
conn.execute("""
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
# 4) Reservas de usuarios
# ------------------------------
conn.execute("""
CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    destino_id INTEGER,
    horario_id INTEGER,
    estado TEXT,   -- reservado, pagado, cancelado
    fecha_reserva TEXT,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY(destino_id) REFERENCES destinos(id),
    FOREIGN KEY(horario_id) REFERENCES horarios_destino(id)
)
""")

# ------------------------------
# 5) Pagos
# ------------------------------
conn.execute("""
CREATE TABLE IF NOT EXISTS pagos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reserva_id INTEGER,
    monto REAL,
    metodo TEXT,  -- tarjeta, debito, credito, webpay, simulado
    fecha_pago TEXT,
    FOREIGN KEY(reserva_id) REFERENCES reservas(id)
)
""")

# ------------------------------
# 6) Favoritos por usuario (opcional)
# ------------------------------
conn.execute("""
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
conn.execute("""
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
# Insertar destinos reales de ejemplo
# -----------------------------------------------------
destinos = [
    ("Torres del Paine", "Destino icónico de la Patagonia", -51.066, -73.273, 15000, "/img/paine.png", "Magallanes", 1),
    ("Valle del Elqui", "Observación astronómica y cielos despejados", -30.17, -70.53, 8000, "/img/elqui.png", "Coquimbo", 1),
    ("Cajón del Maipo", "Rutas de trekking y naturaleza", -33.633, -70.331, 5000, "/img/cajon2.png", "RM", 1),
    ("Desierto de Atacama", "El lugar más árido del mundo", -23.98, -69.23, 12000, "/img/atacama.png", "Antofagasta", 0),
]

conn.executemany(
    "INSERT INTO destinos(nombre, descripcion, lat, lon, precio, imagen, region, destacado) VALUES (?,?,?,?,?,?,?,?)",
    destinos
)

# -----------------------------------------------------
# Insertar horarios ejemplo
# -----------------------------------------------------
horarios = [
    (1, "2026-01-26", "09:00", 20),
    (1, "2026-01-26", "14:00", 20),
    (2, "2026-02-15", "10:00", 30),
    (3, "2026-02-28", "09:00", 25),
]

conn.executemany(
    "INSERT INTO horarios_destino(destino_id, fecha, hora, cupos) VALUES (?,?,?,?)",
    horarios
)

# -----------------------------------------------------
# Insertar usuario de prueba
# -----------------------------------------------------
conn.execute("""
INSERT INTO usuarios(nombre, email, password, fecha_creacion)
VALUES ("Turista Prueba", "turista@gmail.com", "1234", "2025-10-05")
""")

conn.commit()
conn.close()

print("DATABASE LISTA ✔ con datos iniciales cargados")
