import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    createMood,
    deleteMood,
    getMoods,
    getTodaysMoods
} from '../services/mood.service';
import { verifyToken } from '../utils/jwt-utils';

async function createMoodController(req: Request, res: Response) {
    try {
        const userId = verifyToken(req.cookies.access_token);
        const { mood } = req.body;
        const newMood = await createMood(userId, mood);
        res
            .status(StatusCodes.CREATED)
            .send({
                id: newMood.id,
                mood: newMood.mood,
                createdAt: newMood.date
            });
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).send(err.message);
        }
    }
}

async function deleteMoodController(req: Request, res: Response) {
    try {
        const userId = verifyToken(req.cookies.access_token);
        const moodId = parseInt(req.params.moodId);
        await deleteMood(userId, moodId);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}

async function getMoodsController(req: Request, res: Response) {
    try {
        const userId = verifyToken(req.cookies.access_token);
        const moods = await getMoods(userId);
        res
            .status(StatusCodes.OK)
            .send(moods.map(mood => ({
                id: mood.id,
                mood: mood.mood,
                date: mood.date
            })));
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}

async function getMoodsOnedayController(req: Request, res: Response) {
    try {
        const userId = verifyToken(req.cookies.access_token);
        const moods = await getTodaysMoods(userId);
        res
            .status(StatusCodes.OK)
            .send(moods.map(mood => ({
                id: mood.id,
                mood: mood.mood,
                date: mood.date
            })));
    } catch (err) {
        if (err instanceof Error) {
            res.status(StatusCodes.NOT_FOUND).send(err.message);
        }
    }
}


export {
    createMoodController,
    deleteMoodController,
    getMoodsController,
    getMoodsOnedayController
};