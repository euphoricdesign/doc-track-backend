import { Request, Response } from "express";
import { getAllDoctorsService } from "../services/doctorService"
import { catchAsync } from "../utils/catchAsync"
import { Doctor } from "../entities/Doctor";

export const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
    const { category } = req.query

    console.log(category)

    const doctors: Doctor[] = await getAllDoctorsService(category as string)
    res.status(200).json(doctors)
})