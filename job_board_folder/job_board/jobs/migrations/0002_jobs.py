from django.db import migrations

def create_data(apps, schema_editor):
    Student = apps.get_model('jobs', 'Job')
    Student(title="Java Developer", email="joe@email.com", phone="00000000", description="Looking for Java Developer in New Jersey").save()

class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]