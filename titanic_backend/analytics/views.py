from django.http import JsonResponse
from analytics.models import Passenger

def passenger_list(request):
    #get all passengers from database
    passengers = Passenger.objects.all()
    #convert to list of dictionaries.
    data=[]
    for p in passengers:
        data.append(
            {
                'id':p.passage_id,
                'name':p.name,
                'survived':p.survived,
                'class':p.pclass,
                'sex':p.sex,
                'age':p.age,
                'fare':p.fare
            }
        )
    #return all passengers.    
    return JsonResponse(
        {
            'total':len(data),
            'passengers':data
        }
    )

def survival_stats(request):
    #Get all passengers.
    passengers=Passenger.objects.all()
    #calculate statistics
    total = passengers.count() #all passengers 891
    survived=passengers.filter(survived=1).count() # all alive
    died=total - survived # all died
    survived_rate = round(survived / total * 100, 2)
    #by class
    pclass_stats = []
    for cabinet in [1,2,3]:
        pclass_total = passengers.filter(pclass=cabinet).count() # total for every pclass
        pclass_survived = passengers.filter(pclass=cabinet,survived=1).count()
        pclass_survived_rate = round(pclass_survived / pclass_total * 100,2)
        pclass_stats.append(
            {
                'pclass':cabinet,
                'total':pclass_total,
                'survived':pclass_survived,
                'survival_rate':pclass_survived_rate
            }
        )
    #by sex
    male_total=passengers.filter(sex='male').count()
    male_survived = passengers.filter(sex='male',survived=1).count()
    female_total=passengers.filter(sex='female').count()
    female_survived = passengers.filter(sex='female',survived=1).count()
    return JsonResponse (
        {
            'overview':{
                'total_passengers':total,
                'survived':survived,
                'died':died,
                'survival_rate':survived_rate
            },
            'statistic_by_pclass':pclass_stats,
            'statistic_by_gender': {
                'male': {
                    'total': male_total,
                    'survived': male_survived,
                    'survival_rate': round(male_survived / male_total * 100, 2) if male_total > 0 else 0
                },
                'female': {
                    'total': female_total,
                    'survived': female_survived,
                    'survival_rate': round(female_survived / female_total * 100, 2) if female_total > 0 else 0
                }
            }
        }        
    )