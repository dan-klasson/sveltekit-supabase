/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  // response.headers.set('x-custom-header', 'potato');
  console.log("url", response.body);

  return response;
}
