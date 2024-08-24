import type {APIRoute} from 'astro';

export const POST:APIRoute = async ({}) => {
  // console.log(request)
  // const fd = await request.formData();
  // console.log(fd);
  return new Response('Posted', {
    status:200,
  })
}
