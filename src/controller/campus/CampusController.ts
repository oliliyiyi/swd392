import * as CampusService from '../../service/campus/CampusService';
import * as redis from '../../configs/rd_config';
export async function getAllListCampus(req: any, res: any, next: any){
    try{
        const Redisclient = redis.client;
        const cachedProducts = await Redisclient.get("myAllCampus");
        console.log(cachedProducts);
        if(cachedProducts){
            console.log("zô cache");
            return res.send(cachedProducts);
        }else{
            console.log("chưa zô cache");
            const response = await CampusService.getAllCampus();
            console.log(response);
            Redisclient.set("myAllCampus",JSON.stringify(response),"EX",60);
            return res.json(response);
        }
    } catch (error) {
        return next(error);
    }
}