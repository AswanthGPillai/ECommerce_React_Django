# React - Django Project Setup

### 1. Install Virtual Environment

```bash
pip install virtualenv
```

### 2. Create Virtual Environment

```bash
virtualenv env_name
```

### 3. Activate Virtual Environment

```bash
env_name\scripts\activate
```

### 4. Install Django

```bash
pip install django
```

### 5. Create Django Project

```bash
django-admin startproject project_name .
```

### 6. Run Django Server

```bash
py manage.py runserver
```

---

# Django Application Setup

### 7. Create `views.py` and `models.py`

Create these files inside your application folder.

#### `views.py`

```python
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from server.models import *
```

#### `models.py`

```python
from django.db import models
```

### 8. Configure `urls.py`

Remove the unwanted/default lines from `urls.py` and add the required URL patterns for your application.

Example:

```python
from django.urls import path
from . import views

urlpatterns = [
    path("district/", views.district),
]
```

### 9. Add Application to `INSTALLED_APPS`

Open:

```text
settings.py
```

Add your application name to `INSTALLED_APPS`.

Example:

```python
INSTALLED_APPS = [
    # ...
    "server",
]
```

---

# Database / Models Setup

### 10. Create and Apply Migrations

After creating your models, run the following commands in order.

#### Create migrations

```bash
py manage.py makemigrations
```

If you want to specify a particular app:

```bash
py manage.py makemigrations project_name
```

#### Apply migrations

```bash
py manage.py migrate
```

---

# Connect Django with Frontend

### 11. Install CORS Package

```bash
pip install django-cors-headers
```

Open `settings.py` and make the following changes.

#### 1. Add `corsheaders` to `INSTALLED_APPS`

```python
INSTALLED_APPS = [
    # ...
    "corsheaders",
]
```

#### 2. Add `CorsMiddleware` to `MIDDLEWARE`

```python
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    # ...
]
```

#### 3. Allow frontend requests

For development, you can allow all origins:

```python
CORS_ALLOW_ALL_ORIGINS = True
```

Or, preferably, allow only your React development server:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

After changing `settings.py`, restart the Django server:

```bash
py manage.py runserver
```
