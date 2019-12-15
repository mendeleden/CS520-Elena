
#!/bin/bash
echo "launching container on AWS"

docker run --rm -it -p 8000:8000 --expose 8000 -v "$PWD":/home/jovyan/work gboeing/osmnx:latest /bin/bash