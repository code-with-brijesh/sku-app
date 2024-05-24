from django.apps import AppConfig


class SkusConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'skus'

    def ready(self):
        # Makes sure all signal handlers are connected
        from skus import handlers  # noqa
