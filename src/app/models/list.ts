export class List{
    public name: string;
    public is_active: boolean;
    public id: number;

    constructor(
        public new_name?: string,
        public new_is_active?: boolean,
        public new_id?: number,
    ){
        this.name = new_name !== undefined ? new_name : '';
        this.is_active = new_is_active !== undefined ? new_is_active : true;
        this.id = new_id !== undefined ? new_id : 0;
    }
}