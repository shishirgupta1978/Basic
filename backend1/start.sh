#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset
python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput
python manage.py runserver 0.0.0.0:8000
#gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers=4 --timeout=100000