// app/api/saveForm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'formData.json');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Baca data lama
    let existing = [];
    try {
      const data = await readFile(filePath, 'utf8');
      existing = JSON.parse(data);
    } catch (err) {
      console.log("Belum ada data, bikin baru.");
    }

    // Tambah data baru
    existing.push({
      ...body,
      submittedAt: new Date().toISOString(),
    });

    // Simpan ulang
    await writeFile(filePath, JSON.stringify(existing, null, 2), 'utf8');

    return NextResponse.json({ message: "Berhasil disimpan!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyimpan." }, { status: 500 });
  }
}
