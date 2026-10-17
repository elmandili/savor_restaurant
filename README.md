# SAVOR Restaurant

A Flask application for the SAVOR restaurant website. The page includes the restaurant menu, story, and a reservation request form.

## Run locally

Requirements: Python 3.10 or newer.

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Open <http://127.0.0.1:5000> in a browser. On macOS or Linux, activate the environment with `source .venv/bin/activate`.

## Hosting configuration

The settings below are suitable for a Python web-service host such as Render. Connect the Git repository and create a **Web Service** with these values:

| Setting | Value |
| --- | --- |
| Runtime / environment | Python |
| Root directory | Repository root (leave blank if the host treats blank as the repository root; otherwise use `.`) |
| Build command | `pip install -r requirements.txt` |
| Start command | `waitress-serve --host=0.0.0.0 --port=$PORT app:app` |
| Health check path, if requested | `/` |
| Environment variables | None required |

Waitress is a production WSGI server that works on Windows, macOS, and Linux. Do not use `python app.py` as the production start command; it starts Flask's development server.

If deploying from a subdirectory in a monorepo, set the root directory to that subdirectory (the one containing `app.py` and `requirements.txt`). Keep the build and start commands the same.

## Project layout

```text
.
|-- app.py
|-- requirements.txt
|-- static/
|   |-- script.js
|   `-- style.css
`-- templates/
    `-- index.html
```

Flask serves the page from `templates/index.html` and its CSS and JavaScript from `static/`.

## Reservation form notes

The form validates and acknowledges reservation requests, but this version does not save reservations to a database, send confirmation emails, or connect to a booking service. Add and configure those services before treating submissions as confirmed bookings.
