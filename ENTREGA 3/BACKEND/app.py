from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime


DB = "database.db"

app = Flask(__name__)
CORS(app)  # permite request desde frontend React / Vue / Angular

bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = "SUPERSECRETO123"  # cambiar luego
jwt = JWTManager(app)


def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

@app.post("/register")
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    nombre = data.get("nombre")

    if not email or not password:
        return jsonify({"error": "email y password son requeridos"}), 400

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")

    try:
        conn = get_db()
        conn.execute("INSERT INTO usuarios (email, password, nombre) VALUES (?, ?, ?)",
                     (email, hashed, nombre))
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": "Usuario creado correctamente"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "El email ya está registrado"}), 409

@app.post("/login")
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = get_db()
    cursor = conn.execute("SELECT * FROM usuarios WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.check_password_hash(user["password"], password):
        token = create_access_token(identity=email)
        return jsonify({"token": token})
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401

@app.get("/perfil")
@jwt_required()
def perfil():
    user_email = get_jwt_identity()

    conn = get_db()
    cursor = conn.execute("SELECT id, email, nombre FROM usuarios WHERE email = ?", (user_email,))
    user = cursor.fetchone()
    conn.close()

    data = dict(user)
    data["avatar"] = "/img/avatar.png"  # ⚡ avatar por defecto desde backend
    
    return jsonify(data)


# ---------------------------
# GET  /destinos
# ---------------------------
@app.get("/destinos")
def get_destinos():
    conn = get_db()
    cursor = conn.execute("SELECT * FROM destinos")
    data = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(data)

# ---------------------------
# GET   /destinos/<id>
# ---------------------------
@app.get("/destinos/<int:id>")
def get_destino(id):
    conn = get_db()
    cursor = conn.execute("SELECT * FROM destinos WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return jsonify(dict(row))
    return jsonify({"error": "Destino no encontrado"}), 404

# ---------------------------
# POST  /destinos
# ---------------------------
@app.post("/destinos")
def crear_destino():
    data = request.json
    required = ["nombre", "descripcion", "lat", "lon", "precio", "imagen", "region", "destacado"]

    if not all(key in data for key in required):
        return jsonify({"error": "Faltan campos"}), 400

    conn = get_db()
    conn.execute("""
        INSERT INTO destinos (nombre, descripcion, lat, lon, precio, imagen, region, destacado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["nombre"], data["descripcion"], data["lat"], data["lon"], data["precio"],
        data["imagen"], data["region"], data["destacado"]
    ))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Destino creado"})

# ---------------------------
# PUT  /destinos/<id>
# ---------------------------
@app.put("/destinos/<int:id>")
def actualizar_destino(id):
    data = request.json
    conn = get_db()

    conn.execute("""
        UPDATE destinos SET
            nombre = ?,
            descripcion = ?,
            lat = ?,
            lon = ?,
            precio = ?,
            imagen = ?,
            region = ?,
            destacado = ?
        WHERE id = ?
    """, (
        data["nombre"], data["descripcion"], data["lat"], data["lon"], data["precio"],
        data["imagen"], data["region"], data["destacado"], id
    ))

    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Destino actualizado"})

# ---------------------------
# DELETE  /destinos/<id>
# ---------------------------
@app.delete("/destinos/<int:id>")
def borrar_destino(id):
    conn = get_db()
    conn.execute("DELETE FROM destinos WHERE id = ?", (id,))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Destino eliminado"})

@app.route("/reservas", methods=["GET"])
def get_reservas():
    conn = get_db()
    cursor = conn.execute("""
        SELECT 
            r.id,
            r.fecha_reserva AS date,
            d.nombre AS title,
            d.region AS location,
            d.imagen AS image
        FROM reservas r
        JOIN destinos d ON r.destino_id = d.id
    """)
    
    data = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(data)

@app.get("/horarios/<int:destino_id>")
def get_horarios(destino_id):
    conn = get_db()
    cursor = conn.execute("""
        SELECT id, fecha, hora, cupos
        FROM horarios_destino
        WHERE destino_id = ?
    """, (destino_id,))
    data = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(data)

# GET /destinos/recomendados
@app.get("/destinos/recomendados")
def destinos_recomendados():
    # Simple heurística: devolver los destacados primero, luego los primeros 6
    conn = get_db()
    cursor = conn.execute("SELECT * FROM destinos ORDER BY destacado DESC LIMIT 8")
    data = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(data)

# POST /reservas
@app.post("/reservas")
@jwt_required(optional=True)  # permitimos reserva como invitado, pero preferimos usuario
def crear_reserva():
    """
    JSON body:
    {
      "destino_id": 1,
      "horario_id": 2,
      "usuario_id": null (optional if token presente),
      "cantidad": 1
    }
    """
    data = request.json or {}
    destino_id = data.get("destino_id")
    horario_id = data.get("horario_id")
    cantidad = int(data.get("cantidad", 1))

    if not destino_id or not horario_id:
        return jsonify({"error": "destino_id y horario_id son requeridos"}), 400

    conn = get_db()
    # verificar horario y cupos
    cursor = conn.execute("SELECT id, cupos FROM horarios_destino WHERE id = ? AND destino_id = ?", (horario_id, destino_id))
    horario = cursor.fetchone()
    if not horario:
        conn.close()
        return jsonify({"error": "Horario no encontrado"}), 404

    if horario["cupos"] < cantidad:
        conn.close()
        return jsonify({"error": "No hay suficientes cupos disponibles"}), 409

    # obtener usuario si hay token
    user_email = None
    try:
        user_email = get_jwt_identity()
    except Exception:
        user_email = None

    usuario_id = None
    if user_email:
        cur2 = conn.execute("SELECT id FROM usuarios WHERE email = ?", (user_email,))
        u = cur2.fetchone()
        usuario_id = u["id"] if u else None

    # crear reserva
    fecha_reserva = datetime.utcnow().isoformat()
    conn.execute("""
        INSERT INTO reservas (usuario_id, destino_id, horario_id, estado, fecha_reserva)
        VALUES (?, ?, ?, ?, ?)
    """, (usuario_id, destino_id, horario_id, "reservado", fecha_reserva))
    # decrementar cupos
    conn.execute("UPDATE horarios_destino SET cupos = cupos - ? WHERE id = ?", (cantidad, horario_id))
    conn.commit()

    # obtener id reserva recien creada
    cursor = conn.execute("SELECT last_insert_rowid() as id")
    rid = cursor.fetchone()["id"]
    conn.close()

    return jsonify({"success": True, "reserva_id": rid, "message": "Reserva creada. Procede al pago."})

# POST /pagos  (simulado)
@app.post("/pagos")
def crear_pago():
    """
    Body:
    {
      "reserva_id": 5,
      "monto": 15000,
      "metodo": "tarjeta"  // en prototipo aceptamos y devolvemos ok
    }
    """
    data = request.json or {}
    reserva_id = data.get("reserva_id")
    monto = data.get("monto")
    metodo = data.get("metodo", "simulado")

    if not reserva_id or not monto:
        return jsonify({"error": "reserva_id y monto son requeridos"}), 400

    conn = get_db()
    # marcar pago y actualizar estado de reserva a "pagado"
    fecha_pago = datetime.utcnow().isoformat()
    conn.execute("INSERT INTO pagos (reserva_id, monto, metodo, fecha_pago) VALUES (?,?,?,?)",
                 (reserva_id, monto, metodo, fecha_pago))
    conn.execute("UPDATE reservas SET estado = ? WHERE id = ?", ("pagado", reserva_id))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Pago simulado OK"})
# ---------------------------
# RUN SERVER
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
