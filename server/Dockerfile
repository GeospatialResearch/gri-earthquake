# syntax=docker/dockerfile:1
FROM python:3-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt
COPY ./ .
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "src.server.app:app"]
