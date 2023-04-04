import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const express = require("express");

const app = express();
app.use(express.json());

const prisma = new PrismaClient();


app.get("/users", async (req: Request, res: Response) => {
  const Users = await prisma.user.findMany();

  res.json({
    success: true,
    payload: Users,
    message: "Operation Successful",
  });
});

app.post("/newUser", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.json({ error: "já existe um usuario c esse email" });
    }

    user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.json(user);
  } catch (error) {
    return res.json({});
  }
});

app.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {workouts: true}
  });

  res.json(user);
});

app.post("/newWorkout", async (req: Request, res: Response) => {
  try {
    const { title, authorId } = req.body;

    // let workouts = await prisma.workouts.findUnique({where: {}})

    // if(workouts){
    // return res.json({error: 'já existe um usuario c esse email'})
    // }

    const workout = await prisma.workouts.create({
      data: {
        title,
        authorId: authorId,
      },
    });

    return res.json(workout);
  } catch (error) {
    return res.json({});
  }
});

app.post("/newExercise", async (req: Request, res: Response) => {

  try {
    const { title, reps, needsMachine, inWorkoutId } = req.body;

    const exercise = await prisma.exercises.create({
      data: {
        title,
        reps,
        needsMachine,
        inWorkoutId,
      },
    });

    return res.json(exercise);
  } catch (error) {
    return res.json({ error });
  }
});

app.listen(3000, () => {
  console.log("rodando na 3000 papai");
});
