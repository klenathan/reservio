import { NextRequest, NextResponse } from "next/server";

interface IProps {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, {params}: IProps) {
  
  return NextResponse.json({'res':  `${params.id} cannot be found`},  {status: 200});
}
