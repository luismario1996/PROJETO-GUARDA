from flask import Flask, render_template, request, redirect, session, url_for, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "super_seguro_123"

# ========================
# CRIAR BANCO
# ========================
def criar_banco():
    conn = sqlite3.connect("banco.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT UNIQUE,
        senha TEXT
    )
    """)

    conn.commit()
    conn.close()

criar_banco()

# ========================
# LOGIN
# ========================
@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        usuario = request.form["usuario"]
        senha = request.form["senha"]

        conn = sqlite3.connect("banco.db")
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM usuarios WHERE usuario=?", (usuario,))
        user = cursor.fetchone()
        conn.close()

        if user and check_password_hash(user[2], senha):
            session["usuario"] = usuario
            return redirect("/home")
        else:
            flash("Usuário ou senha inválidos")

    return render_template("login.html")

# ========================
# CADASTRO
# ========================
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        usuario = request.form["usuario"]
        senha = request.form["senha"]

        senha_hash = generate_password_hash(senha)

        try:
            conn = sqlite3.connect("banco.db")
            cursor = conn.cursor()

            cursor.execute(
                "INSERT INTO usuarios (usuario, senha) VALUES (?, ?)",
                (usuario, senha_hash)
            )

            conn.commit()
            conn.close()

            flash("Usuário criado com sucesso!")
            return redirect("/")

        except:
            flash("Usuário já existe!")

    return render_template("register.html")

# ========================
# PÁGINA PROTEGIDA
# ========================
@app.route("/home")
def home():
    if "usuario" in session:
        return render_template("index.html", usuario=session["usuario"])
    return redirect("/")

# ========================
# LOGOUT
# ========================
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

app.run(debug=True)
