import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const mdFilesRouter = createTRPCRouter({
  //   hello: publicProcedure
  //     .input(z.object({ text: z.string() }))
  //     .query(({ input }) => {
  //       return {
  //         greeting: `Hello ${input.text}`,
  //       };
  //     }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.markdownFile.create({
        data: {
          name: input.name,
          deleteBy: new Date(),
          createdBy: { connect: { id: ctx.session.user.id } },
        },
        select: {
          id: true,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        content: z.string().optional(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.markdownFile.update({
        where: {
          id: input.id,
        },
        data: {
          ...(input.name && { name: input.name }),
          ...(input.content && { content: input.content }),
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.markdownFile.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.markdownFile.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
