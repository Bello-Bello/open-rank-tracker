FROM python:3.7

WORKDIR /usr/src/app

COPY . .

ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1
RUN pip install --no-cache-dir -r requirements.txt
