import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        number: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("GET /api/projects error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil data project",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const project = await prisma.project.create({
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

    return NextResponse.json(
      {
        success: true,
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/projects error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Gagal membuat project",
      },
      { status: 500 }
    );
  }
}