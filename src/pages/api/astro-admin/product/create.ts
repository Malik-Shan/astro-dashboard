export const prerender = false;
import type {APIRoute} from 'astro';

export const POST:APIRoute = async ({request}) => {
  console.log(request)
  const fd = await request.formData();
  console.log(fd);
  return new Response('Posted', {
    status:200,
  })
}
