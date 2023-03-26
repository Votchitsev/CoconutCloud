# CoconutCloud

Привет! Предлагаю вашему вниманию простое облачное хранилище, реализованное на Django и React. С помощью приложения вы можете: 
* загружать и скачивать файлы из облака
* делиться файлами с другими передавая ссылки на скачивание файлов
* изменять имена файлов, добавлять к ним комментарии
* получать информацию о размере загруженных файлов 

> Проект развёрнут по адресу: http://194.58.121.183/

## Развёртывание проекта локально
Вы можете развернуть проект локально. Для этого проделайте следующие шаги:
1) Склонируйте репозиторий: 
``` 
git clone https://github.com/Votchitsev/CoconutCloud.git 
```
2) Через виртуальное окружение python установите зависимости: 
```
cd CoconutCloud/
```
```
python3 -m venv env
```
```
source env/bin/activate
```
```
pip install -r requirements.txt
```
3) В корне проекта создайте файл `.env` в котором определите необходимые переменные окружения: 
```
SECRET_KEY // секреный ключ django
DEBUG // режим отладки True или False
ALLOWED_HOSTS // допустимые хосты 
DB_NAME // имя базы данных
DB_USER // имя пользователя базы данных
DB_PASSWORD // пароль для доступа к базе данных
DB_HOST // хост базы данных
DB_PORT // порт базы данных
```
4) Создайте базу данных. Важно, чтобы данные совпадали с содержимым файла `.env`
5) Выполните миграции
```
python manage.py migrate
```
6) В директории `frontend/` установите NPM зависимости.
```
npm install
```
7) В файле `frontend/src/api/requests.js` в переменной `BASE_URL` установите url, на который будут отправлятся запросы на сервер. Например: `http://127.0.0.1:8000/api/`
После этого пересоберите бандл фронтенда
```
npm run dev
```
8) Запустите приложение.
```
python manage.py runserver
```
## Структура проекта
Проект основан на Django и включает в себя два приложения:

* coconut_cloud - бэкенд часть проекта, реализованная на django rest framework
* frontend - фронтенд часть проекта, которая реализована на react

Связь фронденда с бекендом осуществляется через шаблон django, находящийся в директории `frontend/templates/frontend/index.html`.

## Создание пользователя, регистрация

### Создание администратора
Создать администратора вы можете с помощью команды `python manage.py createsuperuser`. В проекте не используется стандартный административный раздел django.
Авторизация под администратором происходит через общую форму авторизации для всех пользователей.

> Зайти в административный раздел вы можете по ссылке `http://<адрес сайта>/admin/`. Обычным позователям доступ к разделу ограничен.

Там есть список пользователей с их информацией. Вы можете удалить пользователя или изменить его статус (администратор/пользователь). 
Список файлов других пользователей находится на главной странице.

### Регистрация в приложении

Вы можете зарегистрироватся в приложении через форму регистрации, перейти к которой можно через шапку сайта (справа пункт меню Sign Up), или через конпку 
"Try" на стартовой странице.

Вход в личный кабинет осуществляется через шапку сайта - "Sign In". Для авторизации используются адрес электронной почты и пароль. 

## Основной функционал
### Добавление файла
Добавить файл в хранилище вы можете через кнопку `Add` в нижнем правом углу. Добавление файлов осуществляется по одному.

### Удаление, переименование, загрузка файла. Комментарий
Чтобы управлять файлом вы можете выделить его. После этого внизу появится панель для управления.

**rename** - переименовать файл.

**change comment** - добавить или изменить комментарий.

**download** - загрузить файл.

**get download link** - получение ссылки для скачивания файла третьими лицами. Ссылку можно передать другу, знакомому, коллеге. 
Они могут по ней скачать файл без регистрации.

**delete** - удалить файл.

------------------------





