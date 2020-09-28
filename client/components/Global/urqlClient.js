import { createClient,Provider} from 'urql';

const client = createClient({
  //url: "https://78fnieatwe.execute-api.us-east-2.amazonaws.com/dev/graphql",
  url: "http://localhost:4000/graphql",
});

export {
  client,
  Provider
};
