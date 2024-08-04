from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Set the directory containing your static files
STATIC_DIR = 'web-mobile'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_static(path):
    if path != "" and os.path.exists(os.path.join(STATIC_DIR, path)):
        return send_from_directory(STATIC_DIR, path)
    else:
        return send_from_directory(STATIC_DIR, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=8000)