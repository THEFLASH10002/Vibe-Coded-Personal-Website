from datetime import datetime
from pathlib import Path

from flask import Flask, render_template, send_from_directory


def create_app() -> Flask:
    app = Flask(__name__)

    @app.context_processor
    def inject_globals():
        return {"current_year": datetime.now().year}

    @app.route("/")
    def home():
        return render_template("index.html")

    @app.route("/projects")
    def projects():
        return render_template("projects.html")

    @app.route("/about")
    def about():
        return render_template("about.html")

    @app.route("/resume")
    def resume():
        # Serve a static resume file if it exists; otherwise show a placeholder page.
        resume_path = Path(app.root_path) / "static" / "documents" / "resume.pdf"
        if resume_path.exists():
            return send_from_directory(resume_path.parent, resume_path.name)
        return render_template("resume.html")

    @app.route("/contact")
    def contact():
        return render_template("contact.html")

    return app


if __name__ == "__main__":
    create_app().run(debug=True)
