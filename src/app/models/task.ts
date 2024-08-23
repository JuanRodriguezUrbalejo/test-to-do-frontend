export class Task{
    public id: number;
    public is_active: boolean;
    public list: number;
    public name: string;
    public priority: string;
    public start_date: string;
    public status: boolean;

    constructor(
        new_id?: number,
        new_is_active?: boolean,
        new_list?: number,
        new_name?: string,
        new_priority?: string,
        new_start_date?: string,
        new_status?: boolean,
    ){
        this.id = new_id !== undefined ? new_id : 0;
        this.is_active = new_is_active !== undefined ? new_is_active : true;
        this.list = new_list !== undefined ? new_list : 0;
        this.name = new_name !== undefined ? new_name : '';
        this.priority = new_priority !== undefined ? new_priority : 'M';
        this.start_date = new_start_date !== undefined ? new_start_date : new Date().toISOString();
        this.status = new_status !== undefined ? new_status : false;
    }
}