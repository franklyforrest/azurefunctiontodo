let azure = require('azure-storage');
let tableService = azure.createTableService();

module.exports = async function (context, req) {
  if (req.params.id) {    
    let item = { PartitionKey: 'todo', RowKey: req.params.id }
    tableService.deleteEntity('Todo', item, (error, result, response) => {
      if (!error) {
        context.res.status(200).send();
      } else {
        context.res.status(500).json({error: error});
      }
    });
  }
};