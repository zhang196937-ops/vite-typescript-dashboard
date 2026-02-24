import csv
import os
from .models import Passenger

def load_titanic_data():
    # path to csv file.
    csv_path = os.path.join('data','titanic.csv')
    #clear existing data
    Passenger.objects.all().delete()
    #read csv and create passengers
    with open(csv_path,'r',encoding='utf-8') as file:
        reader = csv.DictReader(file)

        for row in reader:
            Passenger.objects.create(
                survived=row['Survived'],
                pclass=row['Pclass'],
                name=row['Name'],
                sex=row['Sex'],
                age=float(row['Age']) if row['Age'] else None,
                sibsp=int(row['SibSp']),
                parch=int(row['Parch']),
                fare=float(row['Fare']) if row['Fare'] else None,
                embarked=row['Embarked'] if row['Embarked'] else None
            )
    print(f"Loaded {Passenger.objects.count()} passengers!")

if __name__=="__main__":
    load_titanic_data()
              