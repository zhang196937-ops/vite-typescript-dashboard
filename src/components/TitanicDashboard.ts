import { apiService,type SurvivalStats } from "../services/apiService";

export class TitanicDashboard{
    container:HTMLElement;
    stats:SurvivalStats|null = null;
    constructor(containerSelector : string){
        const element = document.querySelector(containerSelector);
        if(!element) throw new Error("Container not found");
        this.container = element as HTMLElement;
        this.init();
    }
    private async init():Promise<void>{
        this.renderLoading();
        try{
            this.stats = await apiService.getStats();
            this.render();
        }catch(error){
            this.renderError(error as Error);
        }
    }
    private renderLoading():void{
        this.container.innerHTML = "<div class='loading'>Loading Titani data...</div>";
    }
    private renderError(error:Error): void{
        this.container.innerHTML = `<div class='error'>Error: ${error.message}</div>`;
    }
    private  render(): void{
        if(!this.stats) return;
        const { overview, statistic_by_pclass,statistic_by_gender} = this.stats;
        this.container.innerHTML = `
            <div class="titanic-dashboard">
                <h2>Titanic Survival Analysis</h2>
                <div class="stats-overview">
                    <h3>Overview</h3>
                    <div class="stat-card">
                        <span class="stat-number">${overview.total_passengers}</span>
                        <span class="stat-label">Total Passengers</span>
                    </div>
                    <div class="stat-card highlight">
                        <span class="stat-number">${overview.survival_rate}%</span>
                        <span class="stat-label">Survival Rate</span>
                    </div>
                    <div class="stat-card success">
                        <span class="stat-number">${overview.survived}</span>
                        <span class="stat-label">Survived</span>
                    </div>
                    <div class="stat-card danger">
                        <span class="stat-number">${overview.died}</span>
                        <span class="stat-label">Died</span>
                    </div>
                </div>
            </div>

            <div class="stats-by-class">
                <h3>Survival by Class</h3>
                <div class="class-bars">${statistic_by_pclass.map(c => `
                    <div class="bar-row">
                        <span class="bar-label">${c.pclass}st Class</span>
                        <div class="bar-container">
                            <div class="bar" style="width: ${c.survival_rate}%"></div>
                                <span class="bar-value">${c.survival_rate}% (${c.survived}/${c.total})</span>
                             </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="stats-by-gender">
                <h3>Survival by Gender</h3>
                <div class="gender-cards">
                    <div class="gender-card">
                        <h4>Male</h4>
                        <div class="gender-rate">${statistic_by_gender.male.survival_rate}%</div>
                        <div class="gender-detail">${statistic_by_gender.male.survived} / ${statistic_by_gender.male.total}</div>
                    </div>
                    <div class="gender-card female">
                        <h4>Female</h4>
                        <div class="gender-rate">${statistic_by_gender.female.survival_rate}%</div>
                        <div class="gender-detail">${statistic_by_gender.female.survived} / ${statistic_by_gender.female.total}</div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}