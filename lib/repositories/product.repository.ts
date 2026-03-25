import prisma from '../prisma';
import { Prisma } from '@prisma/client';

export const ProductRepository = {
  create: async (data: Prisma.ProductUncheckedCreateInput) => {
    return prisma.product.create({ data });
  },

  getAll: async (params?: { categoryId?: string; inStock?: boolean }) => {
    const where: Prisma.ProductWhereInput = {};
    if (params?.categoryId) where.categoryId = params.categoryId;
    if (params?.inStock) where.stock = { gt: 0 };

    return prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  getAllPaginated: async (
    params?: { categoryId?: string; inStock?: boolean; query?: string },
    page: number = 1,
    limit: number = 6
  ) => {
    const where: Prisma.ProductWhereInput = {};
    if (params?.categoryId) where.categoryId = params.categoryId;
    if (params?.inStock) where.stock = { gt: 0 };
    if (params?.query) {
      where.OR = [
        { name: { contains: params.query, mode: 'insensitive' } },
        { description: { contains: params.query, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return { data, total, totalPages: Math.ceil(total / limit) };
  },

  getById: async (id: string) => {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  },

  update: async (id: string, data: Prisma.ProductUpdateInput) => {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return prisma.product.delete({
      where: { id },
    });
  },
};
