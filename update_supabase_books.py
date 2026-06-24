import re
import json
import urllib.request
import os

# CONFIGURACIÓN
SUPABASE_URL = "https://wcrfbhbgbhmpytbwfqlx.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcmZiaGJnYmhtcHl0YndmcWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NTQzNTMsImV4cCI6MjA5NjIzMDM1M30.Y2YP_XVx_5cLvPCyM714rgniebZ_fpHvCgZcs60fXb8"

script_dir = os.path.dirname(os.path.abspath(__file__))
app_js_path = os.path.join(script_dir, "app.js")

print("Leyendo app.js para extraer DEFAULT_BOOKS...")

with open(app_js_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extraer el bloque de DEFAULT_BOOKS = [ ... ]
match = re.search(r"const DEFAULT_BOOKS = \[(.*?)\];", content, re.DOTALL)
if not match:
    print("❌ No se encontró DEFAULT_BOOKS en app.js")
    exit(1)

array_content = match.group(1)

# Buscar los objetos individuales { id: ..., title: ..., ... }
book_objects = []
# Expresión regular para capturar objetos JSON sencillos en JS
pattern = re.compile(r"\{([^{}]+)\}")
for m in pattern.finditer(array_content):
    obj_str = m.group(1)
    # Parsear propiedades del objeto
    book = {}
    # id
    id_m = re.search(r'id:\s*["\'](.*?)["\']', obj_str)
    if id_m: book["id"] = id_m.group(1)
    
    # title
    title_m = re.search(r'title:\s*["\'](.*?)["\']', obj_str)
    if title_m: book["title"] = title_m.group(1)
    
    # subject
    subject_m = re.search(r'subject:\s*["\'](.*?)["\']', obj_str)
    if subject_m: book["subject"] = subject_m.group(1)
    
    # grade
    grade_m = re.search(r'grade:\s*["\'](.*?)["\']', obj_str)
    if grade_m: book["grade"] = grade_m.group(1)
    
    # price
    price_m = re.search(r'price:\s*([\d.]+)', obj_str)
    if price_m: book["price"] = float(price_m.group(1))
    
    # retailPrice
    retailPrice_m = re.search(r'retailPrice:\s*([\d.]+)', obj_str)
    if retailPrice_m: book["retailPrice"] = float(retailPrice_m.group(1))
    
    # publisher
    publisher_m = re.search(r'publisher:\s*["\'](.*?)["\']', obj_str)
    if publisher_m: book["publisher"] = publisher_m.group(1)
    
    # required
    required_m = re.search(r'required:\s*(true|false)', obj_str)
    if required_m: book["required"] = (required_m.group(1) == "true")
    
    if "id" in book:
        # Asegurar compatibilidad de base de datos renombrando a snake_case
        book_db = {
            "id": book.get("id"),
            "title": book.get("title"),
            "subject": book.get("subject"),
            "grade": book.get("grade"),
            "price": book.get("price"),
            "publisher": book.get("publisher"),
            "required": book.get("required", False)
        }
        if "retailPrice" in book and book["retailPrice"] is not None:
            book_db["retail_price"] = book["retailPrice"]
        book_objects.append(book_db)

print(f"Se han extraído {len(book_objects)} libros de app.js")

# Subir a Supabase
url = f"{SUPABASE_URL}/rest/v1/books"
headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates"
}

# Realizar la petición POST para hacer UPSERT
req = urllib.request.Request(url, data=json.dumps(book_objects).encode("utf-8"), headers=headers, method="POST")
try:
    with urllib.request.urlopen(req) as response:
        print("✅ Catálogo sincronizado y actualizado con éxito en Supabase.")
except Exception as e:
    print(f"❌ Error al subir a Supabase: {e}")
