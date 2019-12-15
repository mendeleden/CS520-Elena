#!/bin/bash
echo "launching personalized container for CS520 Final"
# docker run --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -it -v /Users/Eden/Desktop/Fall\ 2019/CS\ 377/CS377/p5-student/:/mnt/files mcorner/os377:latest bash

docker run --rm -it -p 8000:8000 --expose 8000 -v "$PWD":/home/jovyan/work cs520/final:v3 /bin/bash