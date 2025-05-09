#!/bin/bash

# Install dependencies if not already installed
pip3 install -r requirements.txt

# Run the FastAPI application using uvicorn
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload