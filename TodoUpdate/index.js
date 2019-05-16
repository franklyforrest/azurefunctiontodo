let azure = require('azure-storage');
let tableService = azure.createTableService();

module.exports = function (context, req) {    
  if (req.body && req.params.id) {
    let item = {
      PartitionKey: 'todo',
      RowKey: req.params.id,
      task: req.body.task
    };

    tableService.replaceEntity('Todo', item, (error, result, response) => {
      if (!error) {
        context.res.status(204).send();
      } else {
        context.res.status(500).json({error: error});
      }
    });
  }
};