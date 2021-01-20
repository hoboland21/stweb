
if [ ! -d "stweb" ] ;then
/usr/local/bin/python /usr/local/bin/django-admin  startproject stweb
fi
cd stweb
./manage.py makemigrations --noinput
./manage.py  migrate

./manage.py runserver 0.0.0.0:8000



#cd /usr/src/app/stweb
#uwsgi --ini   uwsgi.ini 
