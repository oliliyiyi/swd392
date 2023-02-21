import * as StudentService from '../../service/student/StudentService';

export async function getStudentInfoByEmail(req: any, res: any, next: any){
    try{
        const email = req.body.email;
        const response = await StudentService.getStudentInfoByEmail(email);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}