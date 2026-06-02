import qrcode
import os
from datetime import datetime

# URL que quieres convertir en QR
url = "https://bar-portalon.vercel.app"

# Obtener la ruta del script actual
ruta_script = os.path.dirname(os.path.abspath(__file__))

# Crear carpeta con la fecha del día (formato: 02_06_2026)
fecha = datetime.now().strftime("%d_%m_%Y")
ruta_carpeta = os.path.join(ruta_script, fecha)

# Crear la carpeta si no existe
os.makedirs(ruta_carpeta, exist_ok=True)

# Crear el objeto QR
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

# Generar la imagen
img = qr.make_image(fill_color="black", back_color="white")

# Ruta final del archivo
ruta_archivo = os.path.join(ruta_carpeta, "codigo_qr.png")

# Guardar como PNG
img.save(ruta_archivo)

print(f"QR generado y guardado en: {ruta_archivo}")
