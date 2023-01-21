import { FastifyInstance } from "fastify";
//biblioteca manipular datas
import dayjs from "dayjs";
//validação de schema typescript
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (req) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        //domingo até sábado
        z.number().min(0).max(6)
      ),
    });
    const { title, weekDays } = createHabitBody.parse(req.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
        created_at: today,
      },
    });
  });

  app.get("/day", async (req) => {
    const getDaysParams = z.object({
      //coerce: aceita como string e converte em data
      date: z.coerce.date(),
    });

    const { date } = getDaysParams.parse(req.query);
    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");
    //todos hábitos possíveis
    //habitos que já foram completados

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => {
      return dayHabit.habit_id;
    });

    return {
      possibleHabits,
      completedHabits,
    };
  });

  //marcar e remover um hábito
  app.patch("/habits/:id/toggle", async (req) => {
    const toggleHabitsParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitsParams.parse(req.params);

    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }

    await prisma.dayHabit.create({
      data: {
        day_id: day.id,
        habit_id: id,
      },
    });
  });
}
