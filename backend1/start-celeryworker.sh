#!/bin/bash

set -o errexit

set -o nounset

watchmedo auto-restart -d core/ -p "*.py" -- celery -A core worker -n alt-text --pool=solo  --loglevel=info
