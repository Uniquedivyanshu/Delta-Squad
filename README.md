# GeoMineAI — AI-Powered Geological, Mining & Reporting Platform (Backend)

A modular FastAPI + PostgreSQL backend for a mining/geology document intelligence
platform: user auth, document upload & processing, AI-powered report generation,
and dashboard analytics. Built to plug into a React + Vite frontend.

---

## 1. Project Overview

GeoMineAI lets geology/mining users register, upload documents (PDF, DOCX, TXT,
CSV, XLSX), extract text from them, generate AI-powered summaries and structured
reports, and track everything through a dashboard. The AI layer is abstracted
behind `AIService` so a mock/local implementation works out of the box, and a
real provider (OpenAI, Gemini, a local LLM, ...) can be plugged in later purely
via the `AI_PROVIDER` environment variable.

## 2. Technologies

- Python 3.11+
- FastAPI
- PostgreSQL
- SQLAlchemy 2.0 (declarative, typed `Mapped[...]` columns)
- Pydantic v2 / pydantic-settings
- Alembic (migrations)
- JWT auth (python-jose) + bcrypt password hashing (passlib)
- Uvicorn (ASGI server)
- PyMuPDF, python-docx, pandas, openpyxl (document parsing)
- Pytest + httpx (testing)

## 3. Folder Structure

```
backend/
├── App/
│   ├── main.py                  # FastAPI app, CORS, routers, exception handlers
│   ├── dependencies.py          # get_db-adjacent auth deps (get_current_user, require_roles)
│   ├── exceptions.py            # AppException hierarchy + global exception handlers
│   ├── core/
│   │   ├── config.py            # pydantic-settings Settings (.env driven)
│   │   ├── security.py          # password hashing, JWT create/decode
│   │   └── logging_config.py
│   ├── database/
│   │   ├── connection.py        # engine, SessionLocal, get_db, health check
│   │   ├── base.py              # SQLAlchemy DeclarativeBase
│   │   └── init_db.py           # optional create_all() helper (Alembic is primary)
│   ├── models/                  # user.py, document.py, report.py, processing.py
│   ├── schemas/                 # Pydantic request/response models per domain
│   ├── routers/                 # auth, users, documents, processing, reports, dashboard
│   ├── services/                # business logic: auth, document, report, ai, file
│   ├── utils/                   # file_parser, validators, helpers
│   └── uploads/                 # uploaded files land here (gitignored)
├── alembic/                     # migration environment (env.py reads DATABASE_URL from Settings)
├── tests/                       # pytest suite (uses a separate test DB)
├── requirements.txt
├── .env.example
├── .env                         # local dev env (gitignored)
└── README.md
```

## 4. PostgreSQL Setup

1. Install PostgreSQL 14+ if you don't have it.
2. Create the database and (optionally) a test database:

```powershell
psql -U postgres
CREATE DATABASE geomineai;
CREATE DATABASE geomineai_test;
\q
```

3. Note your username/password — you'll put them in `.env`.

## 5. Python Virtual Environment Setup (Windows PowerShell)

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
```

## 6. Installation

```powershell
pip install -r requirements.txt
```

## 7. Environment Variables

Copy `.env.example` to `.env` and fill in real values (never commit `.env`):

```powershell
copy .env.example .env
```

```env
ENVIRONMENT=development
DEBUG=True

DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/geomineai

SECRET_KEY=generate-a-long-random-string-here
ACCESS_TOKEN_EXPIRE_MINUTES=60

UPLOAD_DIR=App/uploads
MAX_FILE_SIZE_MB=50

AI_PROVIDER=mock
AI_API_KEY=

CORS_ORIGINS=http://localhost:5173
```

Generate a strong `SECRET_KEY`:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

## 8. Database Migration (Alembic)

Alembic reads `DATABASE_URL` from `App.core.config.settings`, so it always
stays in sync with the app's own `.env`.

```powershell
# Generate the initial migration from the models
alembic revision --autogenerate -m "initial migration"

# Apply it
alembic upgrade head
```

Re-run `alembic revision --autogenerate -m "..."` any time you change a model,
then `alembic upgrade head` again.

## 9. How to Run the Backend

```powershell
uvicorn App.main:app --reload
```

The API is served at `http://localhost:8000`.

## 10. API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- Health check: `http://localhost:8000/health`
- DB health check: `http://localhost:8000/health/db`

## 11. API Endpoint List

**Authentication** (`/api/auth`)
- `POST /api/auth/register` — register a new user, returns user + JWT
- `POST /api/auth/login` — login, returns `{access_token, token_type}`
- `GET /api/auth/me` — current authenticated user

**Users** (`/api/users`) — admin only
- `GET /api/users/` — list all users
- `GET /api/users/{user_id}` — get a user

**Documents** (`/api/documents`)
- `POST /api/documents/upload` — multipart upload (`file`, optional `description`)
- `GET /api/documents/` — list/search/filter/paginate (`search`, `file_type`, `status`, `page`, `limit`, `sort_by`, `sort_order`)
- `GET /api/documents/{document_id}` — get one document (incl. extracted text)
- `PUT /api/documents/{document_id}` — update description
- `DELETE /api/documents/{document_id}` — delete document + file
- `GET /api/documents/{document_id}/status` — processing status/progress

**Processing** (`/api/processing`)
- `POST /api/processing/{document_id}/start` — run text-extraction pipeline
- `GET /api/processing/{document_id}/status` — check progress

**Reports** (`/api/reports`)
- `POST /api/reports/generate` — `{document_id, report_type, title?}` → AI-generated report
- `GET /api/reports/` — list reports (paginated, filter by `report_type`)
- `GET /api/reports/{report_id}` — get one report
- `DELETE /api/reports/{report_id}` — delete a report
- `GET /api/reports/{report_id}/download` — download report content as `.md`

**Dashboard** (`/api/dashboard`)
- `GET /api/dashboard/stats` — live counts + recent documents/reports from PostgreSQL

All authenticated endpoints require:
```
Authorization: Bearer <access_token>
```

## 12. Frontend Integration (React + Vite)

Base URL: `http://localhost:8000/api`

Example login + authenticated request:

```javascript
const res = await fetch("http://localhost:8000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const { access_token } = await res.json();

const docs = await fetch("http://localhost:8000/api/documents/", {
  headers: { Authorization: `Bearer ${access_token}` },
});
```

Example upload with `FormData`:

```javascript
const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("description", "Iron ore survey");

await fetch("http://localhost:8000/api/documents/upload", {
  method: "POST",
  headers: { Authorization: `Bearer ${access_token}` }, // do NOT set Content-Type manually
  body: formData,
});
```

Every response follows:
```json
{ "success": true, "message": "...", "data": {} }
```
or
```json
{ "success": false, "message": "...", "error": "SOME_ERROR_CODE" }
```

Make sure `CORS_ORIGINS` in `.env` includes your Vite dev server origin
(`http://localhost:5173` by default).

## 13. Testing Instructions

Tests use a **separate** database (`geomineai_test` by default) so they never
touch your dev data.

```powershell
$env:TEST_DATABASE_URL="postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/geomineai_test"
pytest -v
```

The suite covers: registration, duplicate-email rejection, login (success/failure),
`/auth/me` auth enforcement, document upload (success + invalid type rejection),
document listing/deletion, report generation (success + "not processed yet"
rejection), and dashboard stats shape.

## 14. Troubleshooting

- **`sqlalchemy.exc.OperationalError` / connection refused** — PostgreSQL isn't
  running, or `DATABASE_URL` in `.env` has the wrong host/port/user/password.
  Verify with `psql -U postgres -h localhost`.
- **`password authentication failed for user "postgres"`** — fix the password
  in `DATABASE_URL`; it must match your actual PostgreSQL user.
- **`relation "users" does not exist`** — you haven't run migrations yet: run
  `alembic upgrade head`.
- **Alembic autogenerate produces an empty migration** — make sure
  `App/models/__init__.py` imports every model (it does by default) and that
  `alembic/env.py` is importing `App.models` before `target_metadata` is set.
- **CORS errors in the browser** — confirm `CORS_ORIGINS` in `.env` exactly
  matches your frontend's origin (scheme + host + port), and restart uvicorn
  after changing `.env`.
- **401 Unauthorized on every request** — check the `Authorization: Bearer <token>`
  header is present and the token hasn't expired (`ACCESS_TOKEN_EXPIRE_MINUTES`).
- **413 / "File exceeds maximum allowed size"** — raise `MAX_FILE_SIZE_MB` in `.env`.
- **`ModuleNotFoundError` on startup** — re-activate the venv and re-run
  `pip install -r requirements.txt`.
- **Uploaded file "not found" errors on Windows** — ensure `App/uploads`
  exists (it's created automatically on first upload) and that the process
  has write permission to it.

## 15. Notes on AI Integration

`App/services/ai_service.py` ships with a fully working `MockAIProvider` that
requires no external API key, so the app runs end-to-end out of the box
(`AI_PROVIDER=mock`). To connect a real provider later, implement a class with
the same four methods (`generate_summary`, `extract_geological_information`,
`generate_report`, `answer_question`), register it in `_build_provider()`, and
set `AI_PROVIDER` / `AI_API_KEY` in `.env`. The API key is never returned in
any API response.
