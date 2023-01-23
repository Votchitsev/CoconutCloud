from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin


class UserManager(BaseUserManager):
    def _create_user(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError('No email specified')

        if not username:
            raise ValueError('No username specified')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            **extra_fields
        )

        user.set_password(password)

        user.save(using = self._db)

        return user
    
    def create_user(self, email, username, password):
        return self._create_user(email, username, password)

    def create_superuser(self, email, username, password):
        return self._create_user(email, username, password, is_staff = True, is_superuser = True)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key = True, unique = True)
    username = models.CharField(max_length = 50, unique = True)
    email = models.EmailField(max_length = 100, unique = True)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email


class File(models.Model):
    id = models.AutoField(primary_key = True, unique = True)
    user_id = models.ForeignKey(User, on_delete = models.CASCADE)
    storage_file_name = models.CharField(unique = True, max_length = 50)
    native_file_name = models.CharField(unique = True, max_length = 50)
    public_download_id = models.CharField(unique = True, max_length=50)

    file = models.FileField(upload_to='storage/', blank=True)
