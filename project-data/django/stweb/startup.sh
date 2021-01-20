[uwsgi]
enable-threads=True
chdir=/usr/src/app/django/mcsap
module=stweb.wsgi:application 
master=True
pidfile=/tmp/.pid 
socket = :9000
processes=5
uid = daemon
pid = daemon
vacuum=True
stats= 127.0.0.1:9191