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
}
