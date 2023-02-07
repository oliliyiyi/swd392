import * as CampusDAL from '../../modules/campus/CampusDAL';

export async function getAllCampus(){
    const result = await CampusDAL.getAllCampus();
    return result;
}