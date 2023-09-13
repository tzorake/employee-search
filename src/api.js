const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  // Imitate an error that came from the server
  // throw Error();

  // Imitate waiting for data to be received
  await sleep(1000);

  return data;
}