class Schedule {
    constructor(props) {
        this.register = '';
        this.title = '';
        this.intro = '';
        this.place = '';
        this.date = '';
        this.is_share = '';
        this.users = '';
        this.mockup = this.mockup.bind(this);
        this.mockup = this.mockup.bind(this);
    }
    
    mockup() {
        let sche = new Schedule();
        sche.register = "normal";
        sche.title = "Mockup Data";
        sche.intro = "Schedule Data for Mockup";
        sche.place = "in your heart";
        sche.date = new Date(2017,6,25);
        sche.is_share = true;
        this.users = ['js_seo','hk_seo'];

        return sche;
    }
}

export default Schedule;