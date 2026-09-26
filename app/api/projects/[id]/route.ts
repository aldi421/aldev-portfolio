import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const projectId = Number(id);

    if (!Number.isInteger(projectId)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID project tidak valid",
        },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil project",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const projectId = Number(id);

    if (!Number.isInteger(projectId)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID project tidak valid",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      number,
      title,
      category,
      description,
      role,
      details,
      tech,
      image,
      icon,
      type,
      link,
    } = body;

    if (
      !number ||
      !title ||
      !category ||
      !description ||
      !role ||
      !Array.isArray(details) ||
      !Array.isArray(tech) ||
      !image ||
      !type
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Data project belum lengkap",
        },
        { status: 400 }
      );
    }

    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        number,
        title,
        category,
        description,
        role,
        details,
        tech,
        image,
        icon: icon || null,
        type,
        link: link || null,
      },
    });

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Gagal memperbarui project",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const projectId = Number(id);

    if (!Number.isInteger(projectId)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID project tidak valid",
        },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Gagal menghapus project",
      },
      { status: 500 }
    );
  }
}