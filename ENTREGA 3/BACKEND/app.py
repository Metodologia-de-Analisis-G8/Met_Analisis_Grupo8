from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


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

    if user and user["password"] == password:
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

    return jsonify(dict(user))

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


# ---------------------------
# RUN SERVER
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
