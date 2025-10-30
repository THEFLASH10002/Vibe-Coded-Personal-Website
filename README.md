# Vibe Coded — Personal Website

A Flask-powered personal website to showcase Kenneth's experience as a software engineer. The app ships with a modern landing page, projects portfolio, about section, résumé placeholder, and contact info. Static styling is provided via a custom CSS theme.

## Getting Started

Create and activate a Python virtual environment, install dependencies, and start the dev server:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The site will be available at <http://127.0.0.1:5000>. Flask's debug mode is enabled for live reloads.

## Customization

- Update contact links and quick stats in `templates/index.html:8`.
- Tailor the projects in `templates/projects.html:8`.
- Replace placeholder copy across `templates/about.html`, `templates/resume.html`, and `templates/contact.html`.
- Drop a PDF résumé into `static/documents/resume.pdf` to serve it at `/resume`.
- Tweak the visual style in `static/css/style.css`.

## Project Structure

```
Vibe-Coded-Personal-Website/
├── app.py
├── requirements.txt
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── projects.html
│   ├── about.html
│   ├── resume.html
│   └── contact.html
└── static/
    ├── css/style.css
    └── documents/
```
