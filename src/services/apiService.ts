const API_BASE_URL = 'http://localhost:8000/api';
export interface Passenger{
    id:number;
    name:string;
    survived:number;
    pclass:number;
    sex:number;
    age:number|null;
    fare:number|null;
}
export interface StatsOverview{
    total_passengers:number;
    survived:number;
    died:number;
    survival_rate:number;
}
export interface PclassStat{
    pclass:number;
    total:number;
    survived:number;
    survived_rate:number;
}
export interface SexStat{
    total:number;
    survived:number;
    survival_rate:number;
}
export interface SurvivalStats{
    overview:StatsOverview;
    statistics_by_pclass:PclassStat;
    statistics_by_sex:{
        male:SexStat;
        female:SexStat;
    }
}
export class ApiService{
    async getPassengers():Promise<{total:Number;passengers:Passenger[]}>{
        const response = await fetch(`${API_BASE_URL}/passengers/`);
        if (!response.ok) throw new Error("Failed to fetch passengers");
        return response.json();
    }

    async getStats(): Promise<SurvivalStats>{
        const response = await fetch(`${API_BASE_URL}/stats/`);
        if (!response.ok) throw new Error("Failed to fetch stats");
        return response.json();
    }    
}

export const apiService = new ApiService();