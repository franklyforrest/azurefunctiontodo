let azure = require('azure-storage');
let tableService = azure.createTableService();
const tableName = 'Todo';

module.exports = function (context, req) {
  const id = req.params.id;

  if (id) {
    tableService.retrieveEntity(tableName, 'todo', id, function (error, result, response) {
      if (!error) {
        context.res.status(200).json(response.body);
      } else {
        context.res.status(500).json({error : error});
      }
    });
  } else {
    let query = new azure.TableQuery().top(100);
    tableService.queryEntities(tableName, query, null, function (error, result, response) {
      if(!error){
        context.res.status(200).json(response.body.value);
      } else {
        context.res.status(500).json({error : error});
      }
    });
  }
};