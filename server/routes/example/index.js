'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    let params = {
      TableName: "DEMO_F1DriversStandings",
      //Key: {"driver": "Pierre Gasly"}
    };

    
    console.log("Reading item");
    fastify.dynamo.scan(params, (err, data) => {
      if (err) {
        console.error("Unable to read item", JSON.stringify(err,null,2));
      } else {
        let line = JSON.stringify(data.Items,null,2);
        console.log("GetItem succeeded:", JSON.stringify(data.Items,null,2));
        return line;
      }
    });

    return "Example"
  })
}
