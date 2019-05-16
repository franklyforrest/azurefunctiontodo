let azure = require('azure-storage');
let tableService = azure.createTableService();

module.exports = function (context, req) {
  let item = {
    PartitionKey: 'todo',
    RowKey: require('uuid/v4')(),
    task: req.body.task
  }
  
  tableService.insertOrReplaceEntity('Todo', item, (error, result, response) => {
      if (!error) {
        context.res.status(204).send();
      } else {
        context.res.status(500).json({error: error});
      }
  });
};