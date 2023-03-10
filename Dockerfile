FROM python:3.7-slim-buster

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD ["python3", "app.py"]