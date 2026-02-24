from django.db import models

# Create your models here.
class Passenger(models.Model):
    passage_id = models.AutoField(primary_key=True)
    survived=models.IntegerField()
    pclass = models.IntegerField()
    name=models.CharField(max_length=100)
    sex=models.CharField(max_length=10)
    age=models.FloatField(null=True,blank= True)
    sibsp=models.IntegerField(default=0)
    parch=models.IntegerField(default=0)
    fare=models.FloatField(null=True,blank=True)
    embarked=models.CharField(max_length=1,null=True,blank=True)
    # class Meta = settings for this model
    #Just tells Django: "Name the database table passengers, not analytics_passenger"
    class Meta:
        db_table="passengers"
    def __str__(self):
        return self.name
                              
