import * as CampusService from '../../service/campus/CampusService';

export async function getAllListCampus(req: any, res: any, next: any){
    try{
        const response = await CampusService.getAllCampus();
        res.json(response);
    } catch (error) {
        return next(error);
    }
}