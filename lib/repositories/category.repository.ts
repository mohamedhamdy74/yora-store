import prisma from '../prisma';

export const CategoryRepository = {
  create: async (data: { name: string }) => {
    return prisma.category.create({ data });
  },

  getAll: async () => {
    return prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  getAllPaginated: async (page: number = 1, limit: number = 6) => {
    const [data, total] = await Promise.all([
      prisma.category.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.category.count(),
    ]);

    return { data, total, totalPages: Math.ceil(total / limit) };
  },

  getById: async (id: string) => {
    return prisma.category.findUnique({
      where: { id },
    });
  },

  update: async (id: string, data: { name?: string }) => {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return prisma.category.delete({
      where: { id },
    });
  },
};
