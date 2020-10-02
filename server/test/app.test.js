let assert = require('chai').assert;
let init = require('../build/app');
let testApp = init();


describe('Fastify Service', function() {
  before(function() {
    testApp.listen();
  })
  
  describe('injecting GET on /', function () {
    
    it('responds with success and sdl on /', async function() {
      
      let testResult = await testApp.inject({
        method: 'GET',
        url: '/'
      });
  
      assert.equal(testResult.statusCode,200);
      assert.typeOf(testResult.payload, 'string');
    
      let welcomeMessage = `Welcome to the Apollo GraphQL Server wrapped in Fastify\nplease go to /graphql to play around with the API`;

      assert.equal(testResult.payload,welcomeMessage);
    });
  });

  describe('injecting POST on /graphql', function() {
    it('responds with success and data on /graphql', async function() {
      
      let query = `{
        service
      }`;
      
      let testResult = await testApp.inject({
        method: 'POST',
        url: '/graphql',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query
        })
      });

      assert.equal(testResult.statusCode,200);
      assert.typeOf(testResult.payload, 'string');
      
      let expectedPL = 
      {
        "data": {
          "service": "hello from search"
        }
      };

      assert.equal(
        JSON.stringify(
          JSON.parse(testResult.payload),
          null,
          2
        ),
        JSON.stringify(expectedPL,null,2)
      );
    });
  });

  after(function() {
    testApp.close();
  });
});