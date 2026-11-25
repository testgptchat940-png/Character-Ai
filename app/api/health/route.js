import {NextResponse} from "next/server";
export const dynamic="force-dynamic";
export async function GET(){return NextResponse.json({app:"NOIR",status:"ok",configured:Boolean(process.env.OPENAI_API_KEY),model:process.env.OPENAI_MODEL||null,supabaseConfigured:Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)},{headers:{"Cache-Control":"no-store"}});}
