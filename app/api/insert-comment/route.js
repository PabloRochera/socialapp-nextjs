import { insertComment } from "@/app/lib/actions";

export async function POST(request) {
  const formData = await request.formData();
  const result = await insertComment(formData);
  return new Response(JSON.stringify(result));
}