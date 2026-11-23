import { NextRequest, NextResponse } from "next/server";
const API="https://holydon-signal-api.onrender.com";
export async function GET(req:NextRequest){
 const kind=req.nextUrl.searchParams.get("kind")||"analysis";
 const symbol=req.nextUrl.searchParams.get("symbol")||"EUR/USD";
 const interval=req.nextUrl.searchParams.get("interval")||"1min";
 const q=req.nextUrl.searchParams.get("q")||"";
 const category=req.nextUrl.searchParams.get("category")||"forex";
 const allowed=["analysis","execution","search","catalog"];
 if(!allowed.includes(kind))return NextResponse.json({error:"Unsupported request"}, {status:400});
 let path="";
 if(kind==="analysis")path=`/api/analysis?symbol=${encodeURIComponent(symbol)}&interval=${encodeURIComponent(interval)}`;
 if(kind==="execution")path=`/api/execution-status?symbol=${encodeURIComponent(symbol)}`;
 if(kind==="search")path=`/api/markets/search?q=${encodeURIComponent(q)}`;
 if(kind==="catalog")path=`/api/markets?category=${encodeURIComponent(category)}`;
 try{const res=await fetch(API+path,{cache:"no-store",signal:AbortSignal.timeout(30000)});const body=await res.json();return NextResponse.json(body,{status:res.status});}
 catch{return NextResponse.json({error:"Market API is temporarily unreachable. Please retry."},{status:503});}
}