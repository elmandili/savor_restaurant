from datetime import date, time
import re

from flask import Flask, render_template, request

app = Flask(__name__)

GUEST_OPTIONS = ("1", "2", "3", "4", "5", "6", "7+")
EMAIL_PATTERN = re.compile(r"[^@\s]+@[^@\s]+\.[^@\s]+")


@app.route("/", methods=["GET", "POST"])
def home():
    form_data = {}
    feedback = None
    status_code = 200

    if request.method == "POST":
        form_data = request.form
        name = form_data.get("name", "").strip()
        email = form_data.get("email", "").strip()
        reservation_date = form_data.get("date", "").strip()
        reservation_time = form_data.get("time", "").strip()
        guests = form_data.get("guests", "")
        notes = form_data.get("notes", "").strip()
        errors = []

        if not name or len(name) > 100:
            errors.append("Enter your name (up to 100 characters).")
        if (
            len(email) > 254
            or not EMAIL_PATTERN.fullmatch(email)
        ):
            errors.append("Enter a valid email address.")
        if len(notes) > 500:
            errors.append("Special requests must be 500 characters or fewer.")
        if guests not in GUEST_OPTIONS:
            errors.append("Select a valid number of guests.")

        try:
            parsed_date = date.fromisoformat(reservation_date)
            if parsed_date < date.today():
                errors.append("Choose today or a future date.")
        except ValueError:
            errors.append("Enter a valid reservation date.")

        try:
            parsed_time = time.fromisoformat(reservation_time)
        except ValueError:
            errors.append("Enter a valid reservation time.")

        if errors:
            feedback = {"message": " ".join(errors), "type": "error"}
            status_code = 400
        else:
            formatted_date = parsed_date.strftime("%a, %b %d").replace(" 0", " ")
            formatted_time = parsed_time.strftime("%I:%M %p").lstrip("0")
            first_name = name.split()[0]
            feedback = {
                "message": (
                    f"Thanks, {first_name}! Your reservation request for "
                    f"{guests} guest(s) on {formatted_date} at {formatted_time} "
                    "has been received."
                ),
                "type": "success",
            }
            form_data = {}

    return (
        render_template(
            "index.html",
            today=date.today().isoformat(),
            form_data=form_data,
            feedback=feedback,
        ),
        status_code,
    )


if __name__ == "__main__":
    app.run()
